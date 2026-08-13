# mykucukkara.github.io

Muhammed Yusuf Küçükkara'nın kişisel akademik web sayfası.

Saf HTML/CSS/JavaScript. Derleme adımı, paket yöneticisi veya harici bağımlılık
yoktur — dosyaları GitHub'a itmeniz yeterli.

---

## 1. Yayına alma (tek seferlik)

1. GitHub kullanıcı adınızın **`mykucukkara`** olduğundan emin olun.
   Adres bu ada bağlıdır; farklıysa site `mykucukkara.github.io` olmaz.
2. GitHub'da **`mykucukkara.github.io`** adında, herkese açık (public) yeni bir
   depo oluşturun. README/lisans eklemeyin, boş bırakın.
3. Bu klasörde bir terminal açıp şunları çalıştırın:

   ```bash
   git init
   git add .
   git commit -m "İlk sürüm"
   git branch -M main
   git remote add origin https://github.com/mykucukkara/mykucukkara.github.io.git
   git push -u origin main
   ```

4. Depoda **Settings → Pages** bölümüne gidin. *Source* olarak
   **Deploy from a branch**, dal olarak **main / (root)** seçin.
5. 1–2 dakika içinde site `https://mykucukkara.github.io` adresinde yayında olur.

Sonraki güncellemeler için:

```bash
git add .
git commit -m "Yeni yayın eklendi"
git push
```

---

## 2. Yerel önizleme

Dosyaları doğrudan çift tıklayarak da açabilirsiniz, ancak bazı tarayıcılar
`file://` altında dil tercihini hatırlamaz. Küçük bir sunucu ile önizlemek
daha sağlıklıdır:

```bash
python -m http.server 8000
```

Sonra tarayıcıda `http://localhost:8000` adresini açın.

---

## 3. İçeriği düzenleme

**Tüm içerik `data/` klasöründedir. HTML ve CSS dosyalarına dokunmanız
gerekmez.** Dosyaların başında hangi alanın ne işe yaradığı yazılıdır.

| Dosya | İçerik |
|---|---|
| `data/site.js` | Ad, unvan, kurum, iletişim, profil linkleri, biyografi, araştırma alanları ve tüm arayüz metinleri (TR + EN) |
| `data/publications.js` | Yayın listesi |
| `data/news.js` | Ana sayfadaki haber akışı |
| `data/projects.js` | Projeler ve fonlar |
| `data/courses.js` | Verilen dersler |
| `data/cv.js` | Özgeçmiş bölümleri |

İki dilli alanlar `{ tr: "...", en: "..." }` biçimindedir. Metinlerin içine
`<em>`, `<strong>`, `<a href="...">` gibi HTML etiketleri yazabilirsiniz.

### Yeni yayın ekleme

`data/publications.js` içine bir nesne ekleyin — sıralama, yıl gruplaması,
tür filtresi ve BibTeX çıktısı otomatik üretilir:

```js
{
  key: "kucukkara2027ornek",          // BibTeX anahtarı, benzersiz olmalı
  year: 2027,
  type: "journal",                    // journal | conference | chapter | book | thesis | other
  authors: ["Küçükkara, Muhammed Yusuf", "Yazar, Diğer"],  // "Soyad, Ad" biçiminde
  title: "Makalenin tam başlığı",
  venue: "Dergi Adı",
  volume: "12", number: "3", pages: "45--67",
  publisher: "Elsevier",
  doi: "10.1000/ornek",               // sadece numara, https:// yazmayın
  note: { tr: "SCI-E", en: "SCI-E" }, // rozet metni
  citations: 0,
  featured: true                      // ana sayfada "Seçilmiş Yayınlar"da çıksın mı
}
```

Yazar adlarını **"Soyad, Ad"** biçiminde yazmanız önemlidir: site bunu hem
`Küçükkara, M. Y.` gösterimine hem de BibTeX'e otomatik çevirir ve
`site.js > profile.selfKey` ile eşleşen adı kalın yazar.

---

## 4. Doldurulması gereken yerler

İçerik `CV_EN_LATEST.pdf`, doğrulanmış akademik profiller ve sizin verdiğiniz
ders/randevu bilgilerinden oluşturuldu. **Sitede görünen hiçbir yer tutucu yok.**

- [ ] `data/site.js` → **referans mektubu politikası.** Yayına çıkarken halka
      açık bir yer tutucu görünmesin diye bu madde yorum satırına alındı;
      `teaching.resources` içinde hazır blok olarak bekliyor. Kaç hafta önceden
      başvurulacağına karar verince yorumu kaldırmanız yeterli (hem `tr` hem
      `en` tarafında).

İsteğe bağlı, doldurdukça site zenginleşir:

- [ ] `data/cv.js` → **akademik hizmet** (`service: []`) ve **üyelikler**
      (`membership: []`) boş. Hakemlik yaptığınız dergiler, düzenleme kurulu
      üyelikleri, dernek üyelikleri varsa ekleyin — dolu bölümler kendiliğinden
      görünür, boş kalanlar hiç çıkmaz.
- [ ] `data/projects.js` → **QuakeMLab'ın destekleyen kurumu**.
- [ ] `data/courses.js` → **ders izlenceleri**. PDF'i `assets/files/` altına
      koyup `syllabus` alanına yolunu yazın; dersin altında indirme bağlantısı
      belirir.
- [ ] `data/news.js` → *Mathematics* ve EGU haberlerinin **ay bilgisi** yayıncı
      kayıtlarından tahmin edildi; kendi kayıtlarınızla doğrulayın.
- [ ] `data/site.js` → `profile.metrics` içindeki atıf/h-indeks değerleri
      Ağustos 2026 itibarıyladır. Ara ara güncelleyin ya da tümünü silin.

**Hazır olanlar:** profil fotoğrafı (`assets/img/profile.jpg`), 2026-2027 Güz
dersleri, Google Takvim randevu sayfası, tüm biyografi ve araştırma metinleri.

### ⚠ CV PDF'i bilerek yayımlanmadı

Europass özgeçmişiniz başlık bölümünde **ev adresi, cep telefonu ve doğum
tarihi** taşıyor. Bu dosya siteye konsaydı `mykucukkara.github.io/assets/files/cv.pdf`
adresinden herkese açık olacak ve arama motorları PDF içeriğini indeksleyecekti;
sonradan silseniz bile önbelleklerde kalabilirdi.

Bu yüzden `data/site.js` içindeki `profile.links.cv` alanı boş bırakıldı —
özgeçmiş sayfasındaki indirme düğmesi ve profil bağlantısı görünmüyor.
**Özgeçmiş sayfası zaten tüm içeriği HTML olarak gösteriyor** ve yazdırma
stiliyle temiz bir PDF'e basılabiliyor.

Yayımlamak isterseniz:

1. CV'den adres, cep telefonu ve doğum tarihi satırlarını çıkarın.
   (Kurumsal e-posta ve akademik profil bağlantıları kalabilir.)
2. Dosyayı `assets/files/cv.pdf` olarak kaydedin.
3. `data/site.js` → `profile.links.cv` alanına `"assets/files/cv.pdf"` yazın.

Düğme ve bağlantı kendiliğinden geri gelir.

> Kök dizindeki `CV_EN_LATEST.pdf` `.gitignore` ile hariç tutuldu; diskinizde
> kalır ama yayına çıkmaz.

---

## 5. Yapı

```
├── index.html          Ana sayfa (hakkımda, araştırma, haberler, seçilmiş yayınlar)
├── publications.html   Yayınlar
├── projects.html       Projeler ve fonlar
├── teaching.html       Dersler
├── cv.html             Özgeçmiş
├── data/               ← İÇERİK BURADA
├── assets/
│   ├── css/style.css   Tüm stiller
│   ├── js/app.js       Site motoru (sayfaları data/ içeriğinden üretir)
│   ├── img/            profile.jpg, favicon.svg
│   └── files/          cv.pdf, ders izlenceleri, makale PDF'leri
├── tests/site.test.js  Yayın öncesi denetim (bkz. bölüm 8)
├── .github/workflows/  Test + otomatik yayın iş akışı
├── package.json        Yalnızca test bağımlılığı; site için gerekmez
├── robots.txt          Arama motoru yönergeleri
├── sitemap.xml         Site haritası (yeni sayfa eklerseniz buraya da ekleyin)
└── .nojekyll           GitHub Pages'in Jekyll işlemesini atlaması için
```

`tests/`, `package.json` ve `.github/` yayına çıkmaz — iş akışı bunları
yayın klasöründen ayıklar.

---

## 6. Özellikler

- **İki dilli (TR/EN)** — sağ üstteki düğme. **Varsayılan İngilizce**: ziyaretçinin
  tarayıcı dili Türkçe olsa bile site İngilizce açılır (uluslararası görünürlük
  önceliği). Türkçeye geçen ziyaretçinin tercihi tarayıcısında saklanır ve
  sonraki gelişlerinde hatırlanır. `?lang=tr` ekiyle doğrudan Türkçe bağlantı
  paylaşabilirsiniz. Varsayılanı Türkçe yapmak isterseniz `assets/js/app.js`
  içindeki `getLang()` fonksiyonunun son satırını `return 'tr';` yapın ve
  HTML dosyalarındaki `lang="en"` / `<title>` / `description` değerlerini
  Türkçeye çevirin.
- **Açık/koyu tema** — sistem tercihine uyar, elle değiştirilebilir.
- **Otomatik BibTeX** — her yayının altındaki düğmeden açılır, kopyalanabilir.
- **Randevu takvimi** — Google Takvim randevu sayfanız Dersler sayfasına gömülü
  gelir, ayrıca ana sayfada ve profil bağlantılarında düğme olarak çıkar.
  Adresi `data/site.js` → `profile.appointment.url` içinde; sonuna `?gv=true`
  eklemeyin, site gömme sürümünü kendisi üretir. Randevuyu kapatmak için bu
  alanı boş bırakmanız yeterli — ilgili bölümler tamamen kaybolur.
- **E-posta gizleme** — adres kaynak kodda düz metin durmaz, tarayıcıda
  birleştirilir. Spam botlarına karşı basit ama etkili bir önlem.
- **JSON-LD** — arama motorlarına `schema.org/Person` verisi sunulur.
- **Yazdırma stili** — özgeçmiş sayfası kâğıda temiz çıkar.
- **Erişilebilirlik** — klavye ile gezinme, "içeriğe geç" bağlantısı,
  odak halkaları, anlamlı `aria` etiketleri.

---

## 8. Testler ve otomatik yayın

### Neden var

İçerik `data/*.js` dosyalarında JavaScript olarak duruyor. Bir virgülü unutmak
**tüm siteyi bembeyaz bırakır** — sayfa açılır ama hiçbir şey görünmez. Push
ettiğiniz an canlıya çıkar ve fark etmeyebilirsiniz.

Bunu önlemek için `main` dalına her push'ta bir denetim koşar. **Denetim
geçmezse site yayınlanmaz**; canlıdaki son çalışan sürüm yerinde kalır.

### Yerelde çalıştırma

İlk seferde bir kez:

```bash
npm install
```

Sonra her değişiklikten sonra:

```bash
npm test
```

Ayrı bir sunucu başlatmanıza gerek yok, test kendi sunucusunu kurar.
Sitede bir şeye elle bakmak isterseniz `npm run serve` ile
`http://localhost:8123` açılır.

### Ne denetleniyor (174 kontrol)

**Veri denetimi** — `data/*.js` dosyaları okunup alan alan sınanır:

- Dosyalar geçerli JavaScript mi (eksik virgül, kapanmamış tırnak)
- Her yayında benzersiz BibTeX anahtarı, geçerli tür, "Soyad, Ad" biçiminde
  yazarlar, `10.xxxx/yyy` biçiminde DOI (başına `https://` yazılmamış)
- `site.js` içinde **`tr` ve `en` anahtar ağaçları birebir aynı mı** —
  Türkçesini ekleyip İngilizcesini unutmayı yakalar
- Biyografi, araştırma alanı ve öğrenci kaynağı listeleri iki dilde
  aynı uzunlukta mı
- `[DOLDURUN]` gibi yer tutucular metinlere sızmış mı
- Fotoğraf, PDF ve izlence dosyaları gerçekten var mı

**Sayfa denetimi** — beş sayfa gerçek bir tarayıcı DOM'unda iki dilde açılır:

- JavaScript hatasız çalışıyor ve içerik üretiliyor mu
- Sayılar veriyle uyuşuyor mu (yayın, ders, proje, haber, özgeçmiş girdisi)
- Tür filtreleri doğru sayıda kayıt gösteriyor mu
- Her yayın için BibTeX üretiliyor mu
- Varsayılan dil İngilizce mi, `?lang=tr` çalışıyor mu
- Randevu takvimi gömülüyor ve yedek bağlantısı var mı

> Beklenen sayılar **veri dosyalarından türetilir**. Yeni yayın veya ders
> eklediğinizde testi güncellemeniz gerekmez; testler ancak *yapı* bozulunca
> kırılır.

### Doğrulandı

Denetimin işe yaradığı, kasten bozarak sınandı. Sekiz senaryonun sekizi de
yakalandı: eksik virgül, tekrar eden BibTeX anahtarı, `https://` ile yazılmış
DOI, yanlış biçimli yazar adı, unutulan İngilizce karşılık, sızmış yer tutucu,
geçersiz ders düzeyi, motorda çalışma zamanı hatası.

### GitHub ayarı (bir kez yapılmalı)

Korumanın işlemesi için Pages'in Actions'tan yayınlaması gerekir:

> **Settings → Pages → Build and deployment → Source: GitHub Actions**

"Deploy from a branch" seçili kalırsa testler yine koşar ve size hata
bildirilir, ama yayın onlardan bağımsız ilerler — yani bozuk site canlıya
çıkabilir.

---

## 7. Özel alan adı (isteğe bağlı)

İleride `mykucukkara.com` gibi bir alan adı alırsanız:

1. Depo köküne `CNAME` adında bir dosya oluşturup içine yalnızca alan adını
   yazın (`mykucukkara.com`).
2. Alan adı sağlayıcınızda `A` kayıtlarını GitHub'ın IP adreslerine
   (`185.199.108.153`, `185.199.109.153`, `185.199.110.153`,
   `185.199.111.153`) yönlendirin.
3. Settings → Pages bölümünden **Enforce HTTPS** seçeneğini işaretleyin.
