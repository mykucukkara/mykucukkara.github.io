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
├── robots.txt          Arama motoru yönergeleri
├── sitemap.xml         Site haritası (yeni sayfa eklerseniz buraya da ekleyin)
└── .nojekyll           GitHub Pages'in Jekyll işlemesini atlaması için
```

---

## 6. Özellikler

- **İki dilli (TR/EN)** — sağ üstteki düğme. Tercih tarayıcıda saklanır.
  `?lang=en` ekiyle doğrudan İngilizce bağlantı paylaşabilirsiniz.
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

## 7. Özel alan adı (isteğe bağlı)

İleride `mykucukkara.com` gibi bir alan adı alırsanız:

1. Depo köküne `CNAME` adında bir dosya oluşturup içine yalnızca alan adını
   yazın (`mykucukkara.com`).
2. Alan adı sağlayıcınızda `A` kayıtlarını GitHub'ın IP adreslerine
   (`185.199.108.153`, `185.199.109.153`, `185.199.110.153`,
   `185.199.111.153`) yönlendirin.
3. Settings → Pages bölümünden **Enforce HTTPS** seçeneğini işaretleyin.
