/* ==========================================================================
   SITE.TEST.JS — Siteyi yayına çıkmadan önce sınar
   --------------------------------------------------------------------------
   Çalıştırmak için:  npm test
   (Ayrı bir sunucu başlatmanıza gerek yok; test kendi sunucusunu kurar.)

   İki bölüm var:

     A) VERİ DENETİMİ — data/*.js dosyaları Node içinde çalıştırılıp alan alan
        denetlenir. Elle düzenlerken yapılan hataları (eksik virgül, unutulan
        İngilizce karşılık, tekrar eden BibTeX anahtarı, bozuk DOI) yakalar.

     B) SAYFA DENETİMİ — beş sayfa gerçek bir DOM'da (jsdom) iki dilde açılır.
        Beklenen sayılar VERİDEN TÜRETİLİR; yeni yayın/ders eklediğinizde
        testi güncellemeniz gerekmez.

   Testler yeni içerik eklenince kırılmamalı, YAPI bozulunca kırılmalıdır.
   Sabit sayı yazmayın.
   ========================================================================== */

'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { JSDOM, VirtualConsole } = require('jsdom');

const ROOT = path.resolve(__dirname, '..');
const PORT = Number(process.env.TEST_PORT || 8199);

// Varsayılan: yerel dosyalar kendi sunucumuz üzerinden denetlenir.
// TEST_BASE verilirse yayındaki site denetlenir; beklenen değerler yine
// yerel data/*.js dosyalarından türetilir, yani "push ettiğim şey gerçekten
// canlıda mı?" sorusunu yanıtlar:
//   TEST_BASE=https://mykucukkara.github.io/ npm test
const REMOTE = process.env.TEST_BASE ? process.env.TEST_BASE.replace(/\/*$/, '/') : '';
const BASE = REMOTE || `http://127.0.0.1:${PORT}/`;

let failed = 0;
let passed = 0;
let section = '';

function head(t) { section = t; console.log(`\n\x1b[1m${t}\x1b[0m`); }
function ok(label) { passed++; console.log(`  \x1b[32m✓\x1b[0m ${label}`); }
function bad(label, detail) {
  failed++;
  console.log(`  \x1b[31m✗\x1b[0m ${label}`);
  if (detail) console.log(`      ${String(detail).slice(0, 300)}`);
}
function check(label, cond, detail) { cond ? ok(label) : bad(label, detail); }

/* ==========================================================================
   Yerel statik sunucu — python/npx gerektirmez
   ========================================================================== */

const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.svg': 'image/svg+xml',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png',
  '.pdf': 'application/pdf', '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8', '.json': 'application/json; charset=utf-8',
};

function startServer() {
  const server = http.createServer((req, res) => {
    let rel = decodeURIComponent(req.url.split('?')[0]);
    if (rel.endsWith('/')) rel += 'index.html';
    const file = path.join(ROOT, path.normalize(rel).replace(/^([\\/])+/, ''));
    if (!file.startsWith(ROOT)) { res.writeHead(403).end(); return; }
    fs.readFile(file, (err, buf) => {
      if (err) { res.writeHead(404).end('not found'); return; }
      res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream' });
      res.end(buf);
    });
  });
  return new Promise((resolve) => server.listen(PORT, '127.0.0.1', () => resolve(server)));
}

/* ==========================================================================
   A) VERİ DENETİMİ
   ========================================================================== */

function loadData(file, globalName) {
  const text = fs.readFileSync(path.join(ROOT, 'data', file), 'utf8');
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(text, sandbox, { filename: `data/${file}`, timeout: 5000 });
  return sandbox.window[globalName];
}

const PUB_TYPES = ['journal', 'conference', 'chapter', 'book', 'thesis', 'other'];
const LEVELS = ['undergraduate', 'graduate'];

// { tr, en } alanı iki dilde de dolu mu?
function bothLangs(v) {
  return v && typeof v === 'object' && !Array.isArray(v) &&
    typeof v.tr === 'string' && v.tr.trim() !== '' &&
    typeof v.en === 'string' && v.en.trim() !== '';
}

// İç içe nesnenin anahtar ağacını düz listeye çevirir (dil eşitliği için)
function keyTree(obj, prefix = '') {
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) return [];
  return Object.keys(obj).flatMap((k) => {
    const p = prefix ? `${prefix}.${k}` : k;
    return [p, ...keyTree(obj[k], p)];
  });
}

function validateData() {
  head('A) Veri denetimi');

  let SITE, PUBS, NEWS, PROJECTS, COURSES, CV;
  try {
    SITE = loadData('site.js', 'SITE');
    PUBS = loadData('publications.js', 'PUBLICATIONS');
    NEWS = loadData('news.js', 'NEWS');
    PROJECTS = loadData('projects.js', 'PROJECTS');
    COURSES = loadData('courses.js', 'COURSES');
    CV = loadData('cv.js', 'CV');
    ok('tüm veri dosyaları geçerli JavaScript');
  } catch (e) {
    bad('veri dosyası ayrıştırılamadı — SİTE AÇILMAZ', e.message);
    return null;
  }

  /* --- site.js --- */
  const P = SITE.profile;
  check('profile.name dolu', !!(P && P.name && P.name.trim()));
  check('profile e-posta parçaları dolu', !!(P.emailUser && P.emailDomain));
  check('profile.selfKey "Soyad, Ad" biçiminde', /.+,\s*.+/.test(P.selfKey || ''), P.selfKey);
  check('profil fotoğrafı dosyası var', fs.existsSync(path.join(ROOT, P.photo)), P.photo);

  // En kritik dil kontrolü: tr ve en aynı anahtar ağacına sahip olmalı.
  const trKeys = keyTree(SITE.tr).sort();
  const enKeys = keyTree(SITE.en).sort();
  const onlyTr = trKeys.filter((k) => !enKeys.includes(k));
  const onlyEn = enKeys.filter((k) => !trKeys.includes(k));
  check('site.js tr/en anahtarları birebir aynı', onlyTr.length === 0 && onlyEn.length === 0,
    `yalnız tr: [${onlyTr}]  yalnız en: [${onlyEn}]`);

  ['home.bio', 'home.research', 'teaching.resources'].forEach((p) => {
    const get = (o) => p.split('.').reduce((x, k) => (x || {})[k], o);
    const a = get(SITE.tr), b = get(SITE.en);
    check(`${p} tr/en aynı uzunlukta`, Array.isArray(a) && Array.isArray(b) && a.length === b.length,
      `tr=${(a || []).length} en=${(b || []).length}`);
  });

  // Yayına çıkmaması gereken yer tutucular
  const siteText = JSON.stringify(SITE);
  check('site.js içinde yer tutucu yok',
    !/\[DOLDURUN|\[FILL IN|\[TASLAK\]|\[DRAFT\]/.test(siteText),
    (siteText.match(/\[(DOLDURUN|FILL IN|TASLAK|DRAFT)[^"\]]{0,40}/g) || []).join(' | '));

  const appt = P.appointment;
  if (appt && appt.url) {
    check('randevu adresinde ?gv=true yok (site kendi ekler)', !/gv=true/.test(appt.url), appt.url);
  }

  /* --- publications.js --- */
  check('yayın listesi boş değil', Array.isArray(PUBS) && PUBS.length > 0);
  const keys = new Set();
  let selfSeen = false;
  PUBS.forEach((p, i) => {
    const at = `yayın #${i + 1} (${String(p.title || '?').slice(0, 45)}…)`;
    if (!p.key || keys.has(p.key)) bad(`${at}: BibTeX anahtarı eksik ya da tekrar ediyor`, p.key);
    else { keys.add(p.key); }
    if (typeof p.year !== 'number' || p.year < 1950 || p.year > 2100) bad(`${at}: yıl geçersiz`, p.year);
    if (!PUB_TYPES.includes(p.type)) bad(`${at}: tür geçersiz`, `${p.type} — ${PUB_TYPES}`);
    if (!Array.isArray(p.authors) || !p.authors.length) bad(`${at}: yazar listesi boş`);
    else p.authors.forEach((a) => {
      if (!/.+,\s*.+/.test(a)) bad(`${at}: yazar "Soyad, Ad" biçiminde değil`, a);
      if (a === P.selfKey) selfSeen = true;
    });
    if (!p.title || !String(p.title).trim()) bad(`${at}: başlık boş`);
    const venue = typeof p.venue === 'object' ? (p.venue.tr && p.venue.en) : p.venue;
    if (!venue) bad(`${at}: venue boş ya da tek dilli`);
    if (p.doi && !/^10\.\d{4,9}\/\S+$/.test(p.doi)) bad(`${at}: DOI biçimi bozuk (https:// yazmayın)`, p.doi);
    if (p.pdf && !fs.existsSync(path.join(ROOT, p.pdf))) bad(`${at}: PDF dosyası yok`, p.pdf);
    if (p.note && !bothLangs(p.note) && typeof p.note !== 'string') bad(`${at}: rozet tek dilli`);
  });
  check('BibTeX anahtarları benzersiz', keys.size === PUBS.length);
  check('selfKey en az bir yayında geçiyor', selfSeen,
    `"${P.selfKey}" hiçbir yayının yazar listesinde yok — adınız kalın gösterilmez`);

  /* --- news.js --- */
  NEWS.forEach((n, i) => {
    if (!/^\d{4}-\d{2}(-\d{2})?$/.test(n.date || '')) bad(`haber #${i + 1}: tarih YYYY-MM olmalı`, n.date);
    if (!bothLangs(n.text)) bad(`haber #${i + 1}: metin iki dilde dolu değil`);
  });
  ok(`haber kayıtları geçerli (${NEWS.length})`);

  /* --- projects.js --- */
  PROJECTS.forEach((pr, i) => {
    const at = `proje #${i + 1}`;
    if (!bothLangs(pr.title)) bad(`${at}: başlık iki dilde dolu değil`);
    if (!bothLangs(pr.desc)) bad(`${at}: açıklama iki dilde dolu değil`);
    if (!pr.funder) bad(`${at}: destekleyen kurum boş`);
    if (typeof pr.start !== 'number') bad(`${at}: başlangıç yılı sayı olmalı`, pr.start);
    if (pr.end !== null && (typeof pr.end !== 'number' || pr.end < pr.start))
      bad(`${at}: bitiş yılı null ya da başlangıçtan büyük olmalı`, pr.end);
  });
  ok(`proje kayıtları geçerli (${PROJECTS.length})`);

  /* --- courses.js --- */
  COURSES.forEach((c, i) => {
    const at = `ders #${i + 1} (${c.code || 'kodsuz'})`;
    if (!bothLangs(c.name)) bad(`${at}: ders adı iki dilde dolu değil`);
    if (!LEVELS.includes(c.level)) bad(`${at}: düzey geçersiz`, `${c.level} — ${LEVELS}`);
    if (!Array.isArray(c.terms)) bad(`${at}: dönemler dizi olmalı`);
    if (c.syllabus && !fs.existsSync(path.join(ROOT, c.syllabus))) bad(`${at}: izlence dosyası yok`, c.syllabus);
  });
  ok(`ders kayıtları geçerli (${COURSES.length})`);

  /* --- cv.js --- */
  Object.keys(CV).forEach((sec) => {
    if (!Array.isArray(CV[sec])) { bad(`cv.${sec} dizi olmalı`); return; }
    CV[sec].forEach((e, i) => {
      const at = `cv.${sec}[${i}]`;
      if (!e.period) bad(`${at}: dönem boş`);
      if (!bothLangs(e.title)) bad(`${at}: başlık iki dilde dolu değil`);
    });
  });
  const cvCount = Object.values(CV).reduce((n, a) => n + (Array.isArray(a) ? a.length : 0), 0);
  ok(`özgeçmiş girdileri geçerli (${cvCount})`);

  // site.js'te karşılığı olmayan CV bölümü sitede başlıksız kalır
  Object.keys(CV).forEach((sec) => {
    if (CV[sec].length && !SITE.tr.cv.sections[sec])
      bad(`cv.${sec} dolu ama site.js > cv.sections içinde başlığı yok`);
  });

  return { SITE, PUBS, NEWS, PROJECTS, COURSES, CV, cvCount };
}

/* ==========================================================================
   B) SAYFA DENETİMİ
   ========================================================================== */

function loadPage(url, opts = {}) {
  const errors = [];
  const vc = new VirtualConsole();
  vc.on('jsdomError', (e) => errors.push(e.message));
  vc.on('error', (...a) => errors.push('console.error: ' + a.join(' ')));
  return JSDOM.fromURL(url, {
    runScripts: 'dangerously', resources: 'usable', virtualConsole: vc,
    beforeParse(w) {
      if (opts.lang) {
        Object.defineProperty(w.navigator, 'language', { get: () => opts.lang });
      }
    },
  }).then(async (dom) => {
    await new Promise((r) => {
      if (dom.window.document.readyState === 'complete') return r();
      dom.window.addEventListener('load', r);
      setTimeout(r, 4000);
    });
    await new Promise((r) => setTimeout(r, 150));
    return { dom, d: dom.window.document, errors };
  });
}

const PAGES = ['index.html', 'publications.html', 'projects.html', 'teaching.html', 'cv.html'];
const PLACEHOLDER = /\[DOLDURUN|\[FILL IN|\[TASLAK\]|\[DRAFT\]/;
const MOJIBAKE = /Ã¼|Ã§|Ä±|Å|Ã¶/;

async function validatePages(data) {
  for (const lang of ['en', 'tr']) {
    head(`B) Sayfa denetimi — ${lang.toUpperCase()}`);

    for (const page of PAGES) {
      const { dom, d, errors } = await loadPage(`${BASE}${page}?lang=${lang}`);
      const main = d.querySelector('#main');
      const tag = `${page}`;

      check(`${tag}: JavaScript hatasız çalıştı`, errors.length === 0, errors.join(' ;; '));
      check(`${tag}: içerik üretildi`, main && main.innerHTML.trim().length > 400,
        main ? `${main.innerHTML.length} karakter` : '#main yok');
      check(`${tag}: menü ve aktif sayfa işareti`,
        d.querySelectorAll('.site-nav a').length === PAGES.length &&
        !!d.querySelector('.site-nav a[aria-current="page"]'));
      check(`${tag}: alt bilgi üretildi`,
        (d.querySelector('#site-footer') || {}).textContent.includes(data.SITE.profile.name));
      check(`${tag}: dil etiketi doğru`, d.documentElement.lang === lang, d.documentElement.lang);
      check(`${tag}: "undefined" sızmadı`, !main.innerHTML.includes('undefined'));
      check(`${tag}: yer tutucu görünmüyor`, !PLACEHOLDER.test(main.textContent),
        (main.textContent.match(PLACEHOLDER) || [])[0]);
      check(`${tag}: karakter kodlaması sağlam`, !MOJIBAKE.test(main.textContent));

      let ld = null;
      try { ld = JSON.parse(d.querySelector('script[type="application/ld+json"]').textContent); } catch (e) {}
      check(`${tag}: JSON-LD geçerli`, !!ld && ld.name === data.SITE.profile.name);

      // Sayfaya özel, VERİDEN türetilmiş kontroller
      if (page === 'index.html') {
        const featured = data.PUBS.filter((p) => p.featured).length;
        check(`${tag}: seçilmiş yayın sayısı veriyle uyuşuyor`,
          d.querySelectorAll('.pub').length === featured,
          `sayfa=${d.querySelectorAll('.pub').length} veri=${featured}`);
        check(`${tag}: haber sayısı doğru (en fazla 5)`,
          d.querySelectorAll('.news-item').length === Math.min(5, data.NEWS.length));
        check(`${tag}: araştırma alanı sayısı doğru`,
          d.querySelectorAll('.research-item').length === data.SITE[lang].home.research.length);
        check(`${tag}: e-posta tarayıcıda birleştirildi`,
          main.innerHTML.includes(`${data.SITE.profile.emailUser}@${data.SITE.profile.emailDomain}`));
        check(`${tag}: fotoğraf yüklendi`, !d.querySelector('.photo-fallback'));
      }

      if (page === 'publications.html') {
        const years = new Set(data.PUBS.map((p) => p.year));
        const types = new Set(data.PUBS.map((p) => p.type));
        check(`${tag}: yayın sayısı veriyle uyuşuyor`,
          d.querySelectorAll('.pub').length === data.PUBS.length,
          `sayfa=${d.querySelectorAll('.pub').length} veri=${data.PUBS.length}`);
        check(`${tag}: yıl grubu sayısı doğru`, d.querySelectorAll('.year-group').length === years.size);
        check(`${tag}: filtre düğmesi sayısı doğru (tümü + türler)`,
          d.querySelectorAll('.filter-btn').length === types.size + 1);
        check(`${tag}: her yayının başlığı ve yazarı var`,
          [...d.querySelectorAll('.pub')].every((el) =>
            el.querySelector('.pub-title').textContent.trim() &&
            el.querySelector('.pub-authors').textContent.trim()));
        check(`${tag}: her yayın için BibTeX üretildi`,
          d.querySelectorAll('.bibtex pre').length === data.PUBS.length);
        check(`${tag}: BibTeX'ler "@tür{anahtar," ile başlıyor`,
          [...d.querySelectorAll('.bibtex pre')].every((p) => /^@\w+\{[^,]+,/.test(p.textContent)));

        // Her tür filtresi doğru sayıyı göstermeli
        const click = (el) => el.dispatchEvent(new dom.window.MouseEvent('click', { bubbles: true }));
        for (const t of types) {
          const btn = [...d.querySelectorAll('.filter-btn')].find((b) => b.getAttribute('data-filter') === t);
          click(btn);
          const want = data.PUBS.filter((p) => p.type === t).length;
          check(`${tag}: "${t}" filtresi ${want} kayıt gösteriyor`,
            d.querySelectorAll('.pub').length === want, `${d.querySelectorAll('.pub').length}`);
        }
      }

      if (page === 'projects.html') {
        check(`${tag}: proje sayısı veriyle uyuşuyor`,
          d.querySelectorAll('.project').length === data.PROJECTS.length);
      }

      if (page === 'teaching.html') {
        check(`${tag}: ders sayısı veriyle uyuşuyor`,
          d.querySelectorAll('.course').length === data.COURSES.length,
          `sayfa=${d.querySelectorAll('.course').length} veri=${data.COURSES.length}`);
        check(`${tag}: öğrenci kaynağı sayısı doğru`,
          d.querySelectorAll('.resource').length === data.SITE[lang].teaching.resources.length);
        if (data.SITE.profile.appointment && data.SITE.profile.appointment.url) {
          const fr = d.querySelector('.calendar-embed iframe');
          check(`${tag}: randevu takvimi gömüldü ve ?gv=true aldı`, !!fr && /\?gv=true$/.test(fr.src));
          check(`${tag}: takvim engellenirse yedek bağlantı var`,
            !!d.querySelector('.embed-fallback a'));
        }
      }

      if (page === 'cv.html') {
        check(`${tag}: özgeçmiş girdi sayısı veriyle uyuşuyor`,
          d.querySelectorAll('.cv-entry').length === data.cvCount,
          `sayfa=${d.querySelectorAll('.cv-entry').length} veri=${data.cvCount}`);
        const nonEmpty = Object.values(data.CV).filter((a) => a.length).length;
        check(`${tag}: boş bölümler gizlendi`,
          d.querySelectorAll('.section-title').length === nonEmpty);
        check(`${tag}: yazdır düğmesi var`, !!d.querySelector('#print-btn'));
      }

      dom.window.close();
    }
  }

  /* --- Dil davranışı --- */
  head('B) Dil davranışı');

  let r = await loadPage(`${BASE}index.html`, { lang: 'tr-TR' });
  check('tarayıcı dili Türkçe olsa da varsayılan İngilizce', r.d.documentElement.lang === 'en',
    r.d.documentElement.lang);
  r.dom.window.close();

  r = await loadPage(`${BASE}index.html?lang=tr`, { lang: 'en-US' });
  check('?lang=tr elle seçimi kazanıyor', r.d.documentElement.lang === 'tr');
  r.dom.window.close();

  /* --- JavaScript'siz statik kabuk (arama motoru botları) --- */
  head('B) Statik kabuk (JS çalışmadan)');
  for (const page of PAGES) {
    const raw = fs.readFileSync(path.join(ROOT, page), 'utf8');
    check(`${page}: lang="en"`, /<html lang="en">/.test(raw));
    check(`${page}: başlık ve açıklama dolu`,
      /<title>[^<]{5,}<\/title>/.test(raw) && /<meta name="description" content="[^"]{20,}"/.test(raw));
    check(`${page}: hreflang etiketleri (en/tr/x-default)`,
      (raw.match(/hreflang=/g) || []).length === 3);
    check(`${page}: tüm veri dosyaları ve motor yükleniyor`,
      (raw.match(/<script src="data\//g) || []).length === 6 && raw.includes('assets/js/app.js'));
  }
}

/* ==========================================================================
   Çalıştır
   ========================================================================== */

(async () => {
  console.log('\n\x1b[1mmykucukkara.github.io — yayın öncesi denetim\x1b[0m');

  const data = validateData();
  if (!data) {
    console.log('\n\x1b[31mVeri dosyaları okunamadı; sayfa denetimi atlandı.\x1b[0m\n');
    process.exit(1);
  }

  const server = REMOTE ? null : await startServer();
  if (REMOTE) console.log(`\n  (yayındaki site denetleniyor: ${REMOTE})`);
  try {
    await validatePages(data);
  } finally {
    if (server) server.close();
  }

  const total = passed + failed;
  console.log(`\n${'─'.repeat(58)}`);
  if (failed === 0) {
    console.log(`\x1b[32m✓ ${total} kontrolün tamamı geçti — yayına hazır.\x1b[0m\n`);
    process.exit(0);
  }
  console.log(`\x1b[31m✗ ${failed}/${total} kontrol başarısız — site yayına ÇIKMAYACAK.\x1b[0m`);
  console.log('  Yukarıdaki hataları düzeltip yeniden push edin.\n');
  process.exit(1);
})().catch((e) => {
  console.error('\n\x1b[31mTest çalıştırılamadı:\x1b[0m', e);
  process.exit(1);
});
