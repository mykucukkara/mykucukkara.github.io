/* ==========================================================================
   APP.JS — Site motoru
   --------------------------------------------------------------------------
   Tüm sayfalar bu dosya tarafından data/*.js içeriğinden üretilir.
   Normalde bu dosyaya dokunmanız gerekmez; içerik değişiklikleri için
   data/ klasöründeki dosyaları düzenleyin.

   Bölümler:
     1. Yardımcılar        2. Dil ve tema      3. İkonlar
     4. Yayın biçimleme    5. Üst menü/alt bilgi
     6. Sayfa üreticileri  7. Başlatma
   ========================================================================== */

(function () {
  'use strict';

  var LANG_KEY  = 'myk-lang';
  var THEME_KEY = 'myk-theme';

  var PAGES = [
    { id: 'home',         file: 'index.html',        nav: 'home' },
    { id: 'publications', file: 'publications.html', nav: 'publications' },
    { id: 'projects',     file: 'projects.html',     nav: 'projects' },
    { id: 'teaching',     file: 'teaching.html',     nav: 'teaching' },
    { id: 'cv',           file: 'cv.html',           nav: 'cv' }
  ];

  /* --- 1. Yardımcılar --------------------------------------------------- */

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  // { tr: "...", en: "..." } nesnesinden aktif dildeki değeri seçer.
  // Düz metin verilirse olduğu gibi döndürür.
  function pick(v, lang) {
    if (v == null) return '';
    if (typeof v === 'object' && !Array.isArray(v)) {
      return v[lang] != null ? v[lang] : (v.tr != null ? v.tr : (v.en || ''));
    }
    return v;
  }

  function $(sel, root) { return (root || document).querySelector(sel); }

  function dashes(s) { return String(s || '').replace(/--/g, '–'); }

  function email() {
    var p = window.SITE.profile;
    return p.emailUser + '@' + p.emailDomain;
  }

  /* --- 2. Dil ve tema --------------------------------------------------- */

  function getLang() {
    var q = new URLSearchParams(location.search).get('lang');
    if (q === 'tr' || q === 'en') return q;
    var saved = null;
    try { saved = localStorage.getItem(LANG_KEY); } catch (e) {}
    if (saved === 'tr' || saved === 'en') return saved;
    return String(navigator.language || '').toLowerCase().indexOf('tr') === 0 ? 'tr' : 'en';
  }

  function setLang(lang) {
    // localStorage kullanılabiliyorsa tercihi oraya yazıp URL'yi temiz bırakırız.
    // Bazı tarayıcılar file:// altında localStorage'a izin vermez; o durumda
    // dil ?lang= parametresiyle taşınır ki yerel önizleme de çalışsın.
    var stored = false;
    try { localStorage.setItem(LANG_KEY, lang); stored = true; } catch (e) {}
    var url = new URL(location.href);
    if (stored) url.searchParams.delete('lang');
    else        url.searchParams.set('lang', lang);
    location.replace(url.href);
  }

  function getTheme() {
    var saved = null;
    try { saved = localStorage.getItem(THEME_KEY); } catch (e) {}
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia &&
           window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
  }

  function toggleTheme() {
    var next = getTheme() === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem(THEME_KEY, next); } catch (e) {}
    applyTheme(next);
    renderThemeButton();
  }

  /* --- 3. İkonlar (satır içi SVG, harici bağımlılık yok) ---------------- */

  var ICONS = {
    email: '<path d="M3 6.5A1.5 1.5 0 0 1 4.5 5h15A1.5 1.5 0 0 1 21 6.5v11a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.5z"/><path d="m3.5 7 8.5 6 8.5-6"/>',
    scholar: '<path d="M12 4 2 9.2l10 5.2 10-5.2z"/><path d="M6 11.6v4.2c0 1.8 2.7 3.2 6 3.2s6-1.4 6-3.2v-4.2"/>',
    orcid: '<circle cx="12" cy="12" r="9"/><path d="M9 9v7"/><circle cx="9" cy="6.9" r=".4" fill="currentColor"/><path d="M12.7 16V9h2.1a3.5 3.5 0 0 1 0 7z"/>',
    github: '<path d="M9 19c-4.3 1.4-4.3-2.3-6-2.7m12 4.7v-3.6a3.1 3.1 0 0 0-.9-2.4c2.9-.3 6-1.5 6-6.6a5.1 5.1 0 0 0-1.4-3.6 4.8 4.8 0 0 0-.1-3.6s-1.1-.3-3.7 1.4a12.6 12.6 0 0 0-6.6 0C5.7 1.2 4.6 1.5 4.6 1.5a4.8 4.8 0 0 0-.1 3.6A5.1 5.1 0 0 0 3 8.7c0 5.1 3.1 6.3 6 6.6a3.1 3.1 0 0 0-.9 2.4V21" transform="translate(0 1)"/>',
    linkedin: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7.5 10.5V17M7.5 7.6v.1M11.5 17v-3.6a2 2 0 0 1 4 0V17"/>',
    researchgate: '<circle cx="12" cy="12" r="9"/><path d="M9.5 16.5v-9h2.2a2.2 2.2 0 0 1 0 4.4H9.5m3 0 2.5 4.6"/>',
    file: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18"/>',
    book: '<path d="M4 4.5A1.5 1.5 0 0 1 5.5 3H19v16H5.5A1.5 1.5 0 0 0 4 20.5z"/><path d="M4 17.5A1.5 1.5 0 0 1 5.5 16H19"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    moon: '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>',
    print: '<path d="M6 9V3h12v6"/><path d="M6 18H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2"/><path d="M6 14h12v7H6z"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/><path d="m9.5 15 1.8 1.8L15 13.2"/>',
    download: '<path d="M12 3v12"/><path d="m7.5 10.5 4.5 4.5 4.5-4.5"/><path d="M4 20h16"/>',
    x: '<path d="M3 3h5.2l4.6 6.1L18.3 3H21l-7 8.3L21.5 21H16l-4.9-6.5L5.4 21H2.7l7.5-8.8L3 3zm2.7 1.5 11 15h1.7l-11-15H5.7z"/>'
  };

  // Marka logoları dolgu ister, çizgi ikonlar istemez
  var FILLED = { x: true };

  function icon(name) {
    if (!ICONS[name]) return '';
    var fill = FILLED[name] ? 'currentColor' : 'none';
    var stroke = FILLED[name] ? 'none' : 'currentColor';
    return '<svg viewBox="0 0 24 24" fill="' + fill + '" stroke="' + stroke + '" ' +
           'stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" ' +
           'aria-hidden="true">' + ICONS[name] + '</svg>';
  }

  /* --- 4. Yayın biçimleme ----------------------------------------------- */

  // "Küçükkara, Muhammed Yusuf" -> "Küçükkara, M. Y."
  function abbreviate(full) {
    var parts = String(full).split(',');
    if (parts.length < 2) return full;
    var surname = parts[0].trim();
    var initials = parts.slice(1).join(',').trim().split(/\s+/)
      .filter(Boolean)
      .map(function (w) { return w.charAt(0).toLocaleUpperCase('tr-TR') + '.'; })
      .join(' ');
    return surname + ', ' + initials;
  }

  function formatAuthors(authors, selfKey) {
    var items = (authors || []).map(function (a) {
      var s = esc(abbreviate(a));
      return a === selfKey ? '<span class="self">' + s + '</span>' : s;
    });
    if (!items.length) return '';
    if (items.length === 1) return items[0];
    if (items.length === 2) return items[0] + ' &amp; ' + items[1];
    return items.slice(0, -1).join(', ') + ', &amp; ' + items[items.length - 1];
  }

  function venueLine(p, lang) {
    // venue düz metin ya da { tr, en } olabilir (tez künyeleri için gerekli)
    var out = '<em>' + esc(pick(p.venue, lang)) + '</em>';
    if (p.type === 'conference' || p.type === 'chapter') {
      out = (lang === 'tr' ? 'İçinde: ' : 'In ') + out;
    }
    if (p.volume) {
      out += ', ' + esc(p.volume);
      if (p.number) out += '(' + esc(p.number) + ')';
    }
    if (p.pages) out += ', ' + esc(dashes(p.pages));
    out += ' (' + p.year + ').';
    return out;
  }

  function bibtex(p) {
    var map = {
      journal: 'article', conference: 'inproceedings', chapter: 'incollection',
      book: 'book', thesis: 'phdthesis', other: 'misc'
    };
    var f = [];
    f.push(['author', (p.authors || []).join(' and ')]);
    f.push(['title', p.title]);
    var venue = pick(p.venue, 'en') || pick(p.venue, 'tr');
    if (p.type === 'journal')                                 f.push(['journal', venue]);
    else if (p.type === 'conference' || p.type === 'chapter') f.push(['booktitle', venue]);
    else if (p.type === 'thesis')                             f.push(['school', venue]);
    else                                                      f.push(['howpublished', venue]);
    if (p.volume)    f.push(['volume', p.volume]);
    if (p.number)    f.push(['number', p.number]);
    if (p.pages)     f.push(['pages', p.pages]);
    f.push(['year', String(p.year)]);
    if (p.publisher) f.push(['publisher', p.publisher]);
    if (p.doi)       f.push(['doi', p.doi]);

    var width = f.reduce(function (m, x) { return Math.max(m, x[0].length); }, 0);
    var body = f.map(function (x) {
      return '  ' + x[0] + new Array(width - x[0].length + 1).join(' ') + ' = {' + x[1] + '}';
    }).join(',\n');
    return '@' + (map[p.type] || 'misc') + '{' + p.key + ',\n' + body + '\n}';
  }

  function pubLink(p) {
    if (p.doi) return 'https://doi.org/' + p.doi;
    return p.url || '';
  }

  function renderPub(p, t, lang, selfKey) {
    var link = pubLink(p);
    var title = esc(p.title);
    var titleHtml = link
      ? '<a href="' + esc(link) + '" rel="noopener">' + title + '</a>'
      : title;

    var tags = '<span class="tag">' + esc(t.pubTypes[p.type] || p.type) + '</span>';
    if (p.note) tags += '<span class="tag tag--muted">' + esc(pick(p.note, lang)) + '</span>';
    if (p.citations) {
      tags += '<span class="tag tag--muted">' + p.citations + ' ' + esc(t.ui.citations) + '</span>';
    }

    var actions = '';
    if (p.pdf) {
      actions += '<a class="action" href="' + esc(p.pdf) + '">PDF</a>';
    }
    if (p.doi) {
      actions += '<a class="action" href="https://doi.org/' + esc(p.doi) + '" rel="noopener">DOI</a>';
    } else if (p.url) {
      actions += '<a class="action" href="' + esc(p.url) + '" rel="noopener">' + esc(t.ui.abstract) + '</a>';
    }
    if (p.key) {
      actions += '<button class="action" type="button" data-bib="' + esc(p.key) + '" ' +
                 'aria-expanded="false">BibTeX</button>';
    }

    var bib = p.key
      ? '<div class="bibtex" id="bib-' + esc(p.key) + '" hidden>' +
          '<pre>' + esc(bibtex(p)) + '</pre>' +
          '<div class="bibtex-bar">' +
            '<button class="action" type="button" data-copy="' + esc(p.key) + '">' +
              esc(t.ui.copy) + '</button>' +
          '</div>' +
        '</div>'
      : '';

    return '<li class="pub">' +
      '<div class="pub-num"></div>' +
      '<div class="pub-body">' +
        '<div class="pub-tags">' + tags + '</div>' +
        '<div class="pub-title">' + titleHtml + '</div>' +
        '<div class="pub-authors">' + formatAuthors(p.authors, selfKey) + '</div>' +
        '<div class="pub-venue">' + venueLine(p, lang) + '</div>' +
        '<div class="pub-actions">' + actions + '</div>' +
        bib +
      '</div>' +
    '</li>';
  }

  function bindPubActions(root) {
    var t = window.SITE[getLang()].ui;

    root.addEventListener('click', function (ev) {
      var openBtn = ev.target.closest('[data-bib]');
      if (openBtn) {
        var box = document.getElementById('bib-' + openBtn.getAttribute('data-bib'));
        if (box) {
          var show = box.hidden;
          box.hidden = !show;
          openBtn.setAttribute('aria-expanded', String(show));
        }
        return;
      }

      var copyBtn = ev.target.closest('[data-copy]');
      if (copyBtn) {
        var pre = $('#bib-' + copyBtn.getAttribute('data-copy') + ' pre');
        if (!pre) return;
        var done = function () {
          copyBtn.textContent = t.copied;
          setTimeout(function () { copyBtn.textContent = t.copy; }, 1600);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(pre.textContent).then(done, function () {});
        } else {
          var sel = window.getSelection();
          var range = document.createRange();
          range.selectNodeContents(pre);
          sel.removeAllRanges(); sel.addRange(range);
          try { document.execCommand('copy'); done(); } catch (e) {}
          sel.removeAllRanges();
        }
      }
    });
  }

  /* --- 5. Üst menü ve alt bilgi ----------------------------------------- */

  function currentPageId() {
    return document.body.getAttribute('data-page') || 'home';
  }

  function renderHeader(t, lang) {
    var host = $('#site-header');
    if (!host) return;
    var here = currentPageId();

    var nav = PAGES.map(function (p) {
      var cur = p.id === here ? ' aria-current="page"' : '';
      return '<a href="' + p.file + '"' + cur + '>' + esc(t.nav[p.nav]) + '</a>';
    }).join('');

    host.innerHTML =
      '<div class="wrap header-inner">' +
        '<a class="brand" href="index.html">' + esc(window.SITE.profile.name) + '</a>' +
        '<nav class="site-nav" aria-label="' + esc(t.nav.home) + '">' + nav + '</nav>' +
        '<div class="header-tools">' +
          '<button class="tool-btn" type="button" id="lang-btn" title="' +
            esc(t.ui.langToggle) + '">' + (lang === 'tr' ? 'EN' : 'TR') + '</button>' +
          '<button class="tool-btn" type="button" id="theme-btn" title="' +
            esc(t.ui.themeToggle) + '" aria-label="' + esc(t.ui.themeToggle) + '"></button>' +
        '</div>' +
      '</div>';

    $('#lang-btn').addEventListener('click', function () {
      setLang(lang === 'tr' ? 'en' : 'tr');
    });
    $('#theme-btn').addEventListener('click', toggleTheme);
    renderThemeButton();
  }

  function renderThemeButton() {
    var btn = $('#theme-btn');
    if (btn) btn.innerHTML = icon(getTheme() === 'dark' ? 'sun' : 'moon');
  }

  function renderFooter(t) {
    var host = $('#site-footer');
    if (!host) return;
    var year = new Date().getFullYear();
    host.innerHTML =
      '<div class="wrap footer-inner">' +
        '<span>&copy; ' + year + ' ' + esc(window.SITE.profile.name) + '</span>' +
        '<span>' + esc(t.footerNote) + '</span>' +
      '</div>';
  }

  /* --- Bağlantı satırı (profil linkleri) -------------------------------- */

  function linkChips(t) {
    var L = window.SITE.profile.links;
    var A = window.SITE.profile.appointment;
    var defs = [
      ['email',        'email',        t.ui.email,       'mailto:' + email()],
      ['calendar',     'calendar',     t.ui.book,        A && A.url],
      ['scholar',      'scholar',      'Google Scholar', L.scholar],
      ['orcid',        'orcid',        'ORCID',          L.orcid],
      ['researchgate', 'researchgate', 'ResearchGate',   L.researchgate],
      ['linkedin',     'linkedin',     'LinkedIn',       L.linkedin],
      ['github',       'github',       'GitHub',         L.github],
      ['x',            'x',            'X',              L.x],
      ['dergipark',    'book',         'DergiPark',      L.dergipark],
      ['subu',         'globe',        'SUBÜ',           L.subu],
      ['cv',           'file',         t.ui.downloadCV,  L.cv]
    ];

    return defs.filter(function (d) { return !!d[3]; }).map(function (d) {
      return '<a class="link-chip" href="' + esc(d[3]) + '"' +
             (d[0] === 'email' ? '' : ' rel="noopener"') + '>' +
             icon(d[1]) + '<span>' + esc(d[2]) + '</span></a>';
    }).join('');
  }

  /* --- 6. Sayfa üreticileri --------------------------------------------- */

  function sectionHead(title) {
    return '<h2 class="section-title">' + esc(title) + '</h2>';
  }

  function emptyNote(t) {
    return '<p class="empty-note">' + esc(t.ui.empty) + '</p>';
  }

  /* Google Takvim randevu penceresi. Gömülü çerçeve engellenirse (gizlilik
     eklentileri, eski tarayıcılar) altındaki düz bağlantı devreye girer. */
  function appointmentSection(t) {
    var A = window.SITE.profile.appointment;
    if (!A || !A.url) return '';
    return '<section class="section">' + sectionHead(t.teaching.appointmentHeading) +
      (t.teaching.appointmentNote
        ? '<p class="page-intro">' + esc(t.teaching.appointmentNote) + '</p>' : '') +
      '<div class="calendar-embed">' +
        '<iframe src="' + esc(A.url) + '?gv=true" loading="lazy" ' +
        'title="' + esc(t.teaching.appointmentHeading) + '"></iframe>' +
      '</div>' +
      '<p class="embed-fallback">' +
        '<a href="' + esc(A.url) + '" rel="noopener">' + esc(t.ui.bookExternal) + '</a>' +
      '</p>' +
    '</section>';
  }

  /* Ana sayfa */
  function pageHome(t, lang) {
    var P = window.SITE.profile;
    var initials = P.name.split(/\s+/).map(function (w) {
      return w.charAt(0);
    }).join('').slice(0, 3);

    var photo =
      '<div class="profile-photo">' +
        '<img src="' + esc(P.photo) + '" alt="' + esc(P.name) + '" ' +
        'onerror="this.outerHTML=\'<div class=&quot;photo-fallback&quot;>' +
        esc(initials) + '</div>\'">' +
      '</div>';

    var metrics = (P.metrics || []).length
      ? '<div class="metrics">' + P.metrics.map(function (m) {
          return '<div><div class="metric-value">' + esc(m.value) + '</div>' +
                 '<div class="metric-label">' + esc(pick(m.label, lang)) +
                 (m.source ? ' · ' + esc(m.source) : '') + '</div></div>';
        }).join('') + '</div>'
      : '';

    var head =
      '<div class="profile">' +
        '<div class="profile-text">' +
          '<h1 class="profile-name">' + esc(P.name) + '</h1>' +
          '<div class="profile-role">' +
            '<span><strong>' + esc(t.role) + '</strong></span>' +
            '<span>' + esc(t.department) + (t.faculty ? ', ' + esc(t.faculty) : '') + '</span>' +
            '<span>' + esc(t.university) + '</span>' +
          '</div>' +
          '<div class="link-row">' + linkChips(t) + '</div>' +
          '<div class="meta-row">' +
            '<span><b>' + esc(t.ui.office) + ':</b> ' + esc(t.office) + '</span>' +
            '<span><b>' + esc(t.ui.email) + ':</b> ' +
              '<a href="mailto:' + email() + '">' + esc(email()) + '</a></span>' +
          '</div>' +
        '</div>' +
        photo +
      '</div>' + metrics;

    var bio = '<div class="section bio">' +
      t.home.bio.map(function (p) { return '<p>' + p + '</p>'; }).join('') +
    '</div>';

    var research = '<section class="section">' + sectionHead(t.home.researchHeading) +
      '<div class="research-list">' +
        t.home.research.map(function (r) {
          return '<div class="research-item"><h3>' + esc(r.title) + '</h3><p>' + r.desc + '</p></div>';
        }).join('') +
      '</div></section>';

    var news = renderNews(t, lang);
    var selected = renderSelected(t, lang);

    var A = window.SITE.profile.appointment;
    var contact = '<section class="section">' + sectionHead(t.home.contactHeading) +
      '<p>' + esc(t.home.contactNote) + '</p>' +
      '<div class="meta-row">' +
        '<span><b>' + esc(t.ui.email) + ':</b> <a href="mailto:' + email() + '">' +
          esc(email()) + '</a></span>' +
        '<span><b>' + esc(t.ui.office) + ':</b> ' + esc(t.office) + ', ' +
          esc(t.department) + '</span>' +
      '</div>' +
      (A && A.url
        ? '<div class="btn-row" style="margin-top:18px;margin-bottom:0">' +
            '<a class="btn" href="' + esc(A.url) + '" rel="noopener">' +
              icon('calendar') + esc(t.ui.book) + '</a>' +
          '</div>'
        : '') +
    '</section>';

    return head + bio + research + news + selected + contact;
  }

  function renderNews(t, lang) {
    var news = (window.NEWS || []).slice().sort(function (a, b) {
      return String(b.date).localeCompare(String(a.date));
    }).slice(0, 5);

    if (!news.length) return '';

    var months = {
      tr: ['Oca','Şub','Mar','Nis','May','Haz','Tem','Ağu','Eyl','Eki','Kas','Ara'],
      en: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    };

    var items = news.map(function (n) {
      var bits = String(n.date).split('-');
      var label = bits[0];
      if (bits[1]) label = months[lang][parseInt(bits[1], 10) - 1] + ' ' + bits[0];
      return '<div class="news-item">' +
        '<div class="news-date">' + esc(label) + '</div>' +
        '<div class="news-text">' + pick(n.text, lang) + '</div>' +
      '</div>';
    }).join('');

    return '<section class="section">' + sectionHead(t.home.newsHeading) +
      '<div class="news-list">' + items + '</div></section>';
  }

  function renderSelected(t, lang) {
    var selfKey = window.SITE.profile.selfKey;
    var pubs = (window.PUBLICATIONS || [])
      .filter(function (p) { return p.featured; })
      .sort(function (a, b) { return b.year - a.year; });

    if (!pubs.length) return '';

    return '<section class="section">' + sectionHead(t.home.selectedHeading) +
      '<ol class="pub-list">' +
        pubs.map(function (p) { return renderPub(p, t, lang, selfKey); }).join('') +
      '</ol>' +
      '<div class="section-more"><a href="publications.html">' + esc(t.ui.viewAll) + '</a></div>' +
    '</section>';
  }

  /* Yayınlar sayfası */
  function pagePublications(t, lang) {
    var all = (window.PUBLICATIONS || []).slice();
    if (!all.length) return '<h1 class="page-title">' + esc(t.publications.heading) + '</h1>' + emptyNote(t);

    var types = [];
    all.forEach(function (p) { if (types.indexOf(p.type) === -1) types.push(p.type); });

    var filters = '<button class="filter-btn" type="button" data-filter="all" ' +
                  'aria-pressed="true">' + esc(t.ui.all) + '</button>' +
      types.map(function (ty) {
        return '<button class="filter-btn" type="button" data-filter="' + esc(ty) + '" ' +
               'aria-pressed="false">' + esc(t.pubTypes[ty] || ty) + '</button>';
      }).join('');

    return '<h1 class="page-title">' + esc(t.publications.heading) + '</h1>' +
      '<p class="page-intro">' + t.publications.intro + '</p>' +
      '<div class="pub-filters">' + filters + '</div>' +
      '<div id="pub-groups"></div>';
  }

  function drawPubGroups(filter, t, lang) {
    var selfKey = window.SITE.profile.selfKey;
    var list = (window.PUBLICATIONS || [])
      .filter(function (p) { return filter === 'all' || p.type === filter; })
      .sort(function (a, b) { return b.year - a.year; });

    var years = [];
    list.forEach(function (p) { if (years.indexOf(p.year) === -1) years.push(p.year); });

    var host = $('#pub-groups');
    if (!host) return;

    if (!list.length) { host.innerHTML = emptyNote(t); return; }

    host.innerHTML = years.map(function (y) {
      var group = list.filter(function (p) { return p.year === y; });
      return '<div class="year-group">' +
        '<h2 class="year-label">' + y + '</h2>' +
        '<ol class="pub-list">' +
          group.map(function (p) { return renderPub(p, t, lang, selfKey); }).join('') +
        '</ol>' +
      '</div>';
    }).join('');
  }

  function bindPubFilters(t, lang) {
    var bar = $('.pub-filters');
    if (!bar) return;
    drawPubGroups('all', t, lang);

    bar.addEventListener('click', function (ev) {
      var btn = ev.target.closest('[data-filter]');
      if (!btn) return;
      Array.prototype.forEach.call(bar.querySelectorAll('[data-filter]'), function (b) {
        b.setAttribute('aria-pressed', String(b === btn));
      });
      drawPubGroups(btn.getAttribute('data-filter'), t, lang);
    });
  }

  /* Projeler sayfası */
  function pageProjects(t, lang) {
    var all = (window.PROJECTS || []).slice().sort(function (a, b) {
      return (b.start || 0) - (a.start || 0);
    });

    var head = '<h1 class="page-title">' + esc(t.projects.heading) + '</h1>' +
               '<p class="page-intro">' + esc(t.projects.intro) + '</p>';

    if (!all.length) return head + emptyNote(t);

    function block(items, label) {
      if (!items.length) return '';
      return '<section class="section">' + sectionHead(label) +
        items.map(function (pr) {
          var span = (pr.start || '') + ' – ' + (pr.end ? pr.end : t.ui.present);
          var meta = '<span><b>' + esc(t.ui.funder) + ':</b> ' + esc(pr.funder) +
                     (pr.code ? ' · ' + esc(pr.code) : '') + '</span>';
          if (pr.role) meta += '<span><b>' + esc(t.ui.role) + ':</b> ' + esc(pick(pr.role, lang)) + '</span>';
          meta += '<span>' + esc(span) + '</span>';

          var title = esc(pick(pr.title, lang));
          if (pr.link) title = '<a href="' + esc(pr.link) + '" rel="noopener">' + title + '</a>';

          return '<article class="project">' +
            '<h3>' + title + '</h3>' +
            '<div class="project-meta">' + meta + '</div>' +
            '<p>' + pick(pr.desc, lang) + '</p>' +
          '</article>';
        }).join('') +
      '</section>';
    }

    return head +
      block(all.filter(function (p) { return !p.end; }), t.ui.ongoing) +
      block(all.filter(function (p) { return !!p.end; }), t.ui.completed);
  }

  /* Dersler sayfası */
  function pageTeaching(t, lang) {
    var all = window.COURSES || [];
    var head = '<h1 class="page-title">' + esc(t.teaching.heading) + '</h1>' +
               '<p class="page-intro">' + esc(t.teaching.intro) + '</p>';

    function level(key) {
      var items = all.filter(function (c) { return c.level === key; });
      if (!items.length) return '';
      return '<section class="section">' + sectionHead(t.courseLevels[key]) +
        items.map(function (c) {
          var name = esc(pick(c.name, lang));
          if (c.link) name = '<a href="' + esc(c.link) + '" rel="noopener">' + name + '</a>';
          // terms öğeleri düz metin ya da { tr, en } olabilir
          var terms = (c.terms || []).map(function (x) { return pick(x, lang); }).join(' · ');
          var syl = c.syllabus
            ? '<div class="pub-actions"><a class="action" href="' + esc(c.syllabus) + '">' +
              esc(t.ui.syllabus) + '</a></div>'
            : '';
          return '<article class="course">' +
            '<div class="course-head">' +
              (c.code ? '<span class="course-code">' + esc(c.code) + '</span>' : '') +
              '<h3 class="course-name">' + name + '</h3>' +
              (terms ? '<span class="course-terms">' + esc(terms) + '</span>' : '') +
            '</div>' +
            '<p>' + pick(c.desc, lang) + '</p>' + syl +
          '</article>';
        }).join('') +
      '</section>';
    }

    var courses = level('undergraduate') + level('graduate');
    if (!courses) courses = '<section class="section">' + emptyNote(t) + '</section>';

    var res = (t.teaching.resources || []).length
      ? '<section class="section">' + sectionHead(t.teaching.resourcesHeading) +
        t.teaching.resources.map(function (r) {
          return '<div class="resource"><h3>' + esc(r.title) + '</h3><p>' + r.desc + '</p></div>';
        }).join('') + '</section>'
      : '';

    return head + courses + res + appointmentSection(t);
  }

  /* Özgeçmiş sayfası */
  function pageCV(t, lang) {
    var CV = window.CV || {};
    var order = ['education', 'experience', 'awards', 'service',
                 'languages', 'skills', 'volunteering', 'membership'];

    var buttons = '<div class="btn-row">';
    if (window.SITE.profile.links.cv) {
      buttons += '<a class="btn" href="' + esc(window.SITE.profile.links.cv) + '">' +
                 icon('download') + esc(t.ui.downloadCV) + '</a>';
    }
    buttons += '<button class="btn btn--ghost" type="button" id="print-btn">' +
               icon('print') + esc(t.ui.print) + '</button></div>';

    var body = order.map(function (key) {
      var items = CV[key] || [];
      if (!items.length) return '';
      return '<section class="section">' + sectionHead(t.cv.sections[key]) +
        items.map(function (e) {
          // period, org ve note düz metin ya da { tr, en } olabilir
          var note = pick(e.note, lang);
          var org = pick(e.org, lang);
          return '<div class="cv-entry">' +
            '<div class="cv-period">' + esc(pick(e.period, lang)) + '</div>' +
            '<div>' +
              '<div class="cv-title">' + esc(pick(e.title, lang)) + '</div>' +
              (org ? '<div class="cv-org">' + esc(org) + '</div>' : '') +
              (note ? '<div class="cv-note">' + note + '</div>' : '') +
            '</div>' +
          '</div>';
        }).join('') +
      '</section>';
    }).join('');

    return '<h1 class="page-title">' + esc(t.cv.heading) + '</h1>' +
           '<p class="page-intro">' + esc(t.cv.intro) + '</p>' +
           buttons + (body || emptyNote(t));
  }

  /* --- Arama motorları için yapılandırılmış veri ------------------------ */

  function injectJsonLd(t) {
    var P = window.SITE.profile;
    var sameAs = Object.keys(P.links)
      .filter(function (k) { return k !== 'cv' && k !== 'email' && P.links[k]; })
      .map(function (k) { return P.links[k]; });

    var data = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: P.name,
      jobTitle: t.role,
      email: 'mailto:' + email(),
      image: new URL(P.photo, location.href).href,
      url: location.origin + location.pathname.replace(/[^/]*$/, ''),
      affiliation: { '@type': 'CollegeOrUniversity', name: t.university },
      worksFor: { '@type': 'CollegeOrUniversity', name: t.university },
      sameAs: sameAs
    };

    var el = document.createElement('script');
    el.type = 'application/ld+json';
    el.textContent = JSON.stringify(data);
    document.head.appendChild(el);
  }

  /* --- 7. Başlatma ------------------------------------------------------ */

  function init() {
    var lang = getLang();
    var t = window.SITE[lang];
    var page = currentPageId();

    applyTheme(getTheme());
    document.documentElement.lang = t.htmlLang;

    var pageName = t.nav[(PAGES.filter(function (p) { return p.id === page; })[0] || {}).nav];
    document.title = page === 'home'
      ? t.siteTitle + ' — ' + t.role + ', ' + t.university
      : (pageName ? pageName.charAt(0).toLocaleUpperCase(t.htmlLang) + pageName.slice(1) : '') +
        ' · ' + t.siteTitle;

    var desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', t.metaDescription);

    var skip = $('.skip');
    if (skip) skip.textContent = t.ui.skip;

    renderHeader(t, lang);
    renderFooter(t);

    var main = $('#main');
    if (main) {
      var builders = {
        home: pageHome, publications: pagePublications,
        projects: pageProjects, teaching: pageTeaching, cv: pageCV
      };
      main.innerHTML = (builders[page] || pageHome)(t, lang);
      bindPubActions(main);
    }

    if (page === 'publications') bindPubFilters(t, lang);

    var printBtn = $('#print-btn');
    if (printBtn) printBtn.addEventListener('click', function () { window.print(); });

    injectJsonLd(t);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
