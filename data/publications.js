/* ==========================================================================
   PUBLICATIONS.JS — Yayın listesi
   --------------------------------------------------------------------------
   Aşağıdaki künyelerin tamamı Crossref / OpenAlex üzerinden doğrulandı.
   Yazar sıraları ve sayfa numaraları yayıncı kaydıyla birebir uyuşuyor.

   Yeni yayın eklemek için listeye bir nesne ekleyin; sıralama otomatiktir
   (yıla göre yeniden eskiye).

   Alanlar:
     key       (zorunlu) BibTeX anahtarı — benzersiz olmalı
     year      (zorunlu) Yayın yılı — sayı
     type      (zorunlu) "journal" | "conference" | "chapter" | "book"
                         | "thesis" | "other"
     authors   (zorunlu) DİZİ, her biri "Soyad, Ad" biçiminde.
                         Site bunu hem "Küçükkara, M. Y." gösterimine hem de
                         BibTeX'e otomatik çevirir. site.js > profile.selfKey
                         ile eşleşen yazar kalın gösterilir.
     title     (zorunlu) Yayın başlığı
     venue     (zorunlu) Dergi / konferans / kitap adı
     volume, number, pages   Künye ayrıntıları
     publisher Yayıncı (kitap bölümü ve bildiriler için faydalı)
     doi       Sadece DOI numarası — "10.xxxx/yyy" (https:// yazmayın)
     url       DOI yoksa doğrudan bağlantı
     pdf       Yerel PDF yolu — ör. "assets/files/2024-qute.pdf"
     note      Rozet metni — { tr, en } ya da düz metin
     citations Atıf sayısı (isteğe bağlı, elle güncellenir)
     featured  true ise ana sayfadaki "Seçilmiş Yayınlar" listesinde çıkar
   ========================================================================== */

window.PUBLICATIONS = [

  {
    key: "kucukkara2026cdrlqnn",
    year: 2026,
    type: "journal",
    authors: ["Küçükkara, Muhammed Yusuf", "Atban, Furkan", "Bayılmış, Cüneyt"],
    title: "A New Hybrid Method: CDRL-QNN for Stable IoT Intrusion Detection",
    venue: "Mathematics",
    volume: "14",
    number: "10",
    pages: "1608",
    publisher: "MDPI",
    doi: "10.3390/math14101608",
    note: { tr: "SCI-E", en: "SCI-E" },
    featured: true
  },

  {
    key: "tezel2026quakemlab",
    year: 2026,
    type: "conference",
    authors: [
      "Tezel, Timur", "Erden, Caner", "Arıkan, Hazal",
      "Küçükkara, Muhammed Yusuf", "Yanık, Kenan", "Utkucu, Murat"
    ],
    title: "QuakeMLab Phase I: Deep Learning-Based Automated Seismic Phase Picking Using PhaseNet",
    venue: "EGU General Assembly 2026",
    publisher: "Copernicus",
    doi: "10.5194/egusphere-egu26-8055",
    note: { tr: "Bildiri özeti", en: "Abstract" },
    featured: false
  },

  {
    key: "atban2025vqc",
    year: 2025,
    type: "journal",
    authors: ["Atban, Furkan", "Küçükkara, Muhammed Yusuf", "Bayılmış, Cüneyt"],
    title: "Enhancing variational quantum classifier performance with meta-heuristic feature selection for credit card fraud detection",
    venue: "The European Physical Journal Special Topics",
    volume: "234",
    number: "15",
    pages: "3705--3718",
    publisher: "Springer",
    doi: "10.1140/epjs/s11734-025-01703-y",
    note: { tr: "SCI-E", en: "SCI-E" },
    citations: 13,
    featured: true
  },

  {
    key: "kucukkara2024qnn",
    year: 2024,
    type: "journal",
    authors: ["Küçükkara, Muhammed Yusuf", "Atban, Furkan", "Bayılmış, Cüneyt"],
    title: "Quantum-Neural Network Model for Platform Independent DDoS Attack Classification in Cyber Security",
    venue: "Advanced Quantum Technologies",
    volume: "7",
    number: "10",
    pages: "2400084",
    publisher: "Wiley",
    doi: "10.1002/qute.202400084",
    note: { tr: "SCI-E", en: "SCI-E" },
    citations: 38,
    featured: true
  },

  {
    key: "kucukkara2024roleve",
    year: 2024,
    type: "journal",
    authors: ["Küçükkara, Muhammed Yusuf", "Özacar, Kasım", "Ortakcı, Yasin"],
    title: "Mimarlık Öğrencilerinin Sanal Gerçeklik Ortamında Safranbolu Tabakhanesinde Rölöve Alma Deneyimi",
    venue: "Fırat Üniversitesi Mühendislik Bilimleri Dergisi",
    volume: "36",
    number: "1",
    pages: "35--47",
    doi: "10.35234/fumbd.1322782",
    note: { tr: "TR Dizin", en: "TR Index" },
    citations: 3,
    featured: false
  },

  {
    key: "ozacar2023vrarch",
    year: 2023,
    type: "journal",
    authors: ["Özacar, Kasım", "Ortakcı, Yasin", "Küçükkara, Muhammed Yusuf"],
    title: "VRArchEducation: Redesigning building survey process in architectural education using collaborative virtual reality",
    venue: "Computers & Graphics",
    volume: "113",
    pages: "1--9",
    publisher: "Elsevier",
    doi: "10.1016/j.cag.2023.04.008",
    note: { tr: "SCI-E", en: "SCI-E" },
    citations: 39,
    featured: true
  },

  {
    key: "pellegrino2023xrsurgical",
    year: 2023,
    type: "conference",
    authors: [
      "Pellegrino, Giulia", "Barba, Maria Cristina", "D'Errico, Giovanni",
      "Küçükkara, Muhammed Yusuf", "De Paolis, Lucio Tommaso"
    ],
    title: "eXtended Reality & Artificial Intelligence-Based Surgical Training: A Review of Reviews",
    venue: "Extended Reality (XR Salento 2023), Lecture Notes in Computer Science",
    pages: "345--355",
    publisher: "Springer",
    doi: "10.1007/978-3-031-43401-3_22",
    note: { tr: "Lecce, İtalya", en: "Lecce, Italy" },
    citations: 11,
    featured: false
  },

  /* --- Tezler ------------------------------------------------------- */

  {
    key: "kucukkara2026tez",
    year: 2026,
    type: "thesis",
    authors: ["Küçükkara, Muhammed Yusuf"],
    title: "A New Hybrid Quantum Neural Network Model for Attack Detection in Cybersecurity",
    venue: {
      tr: "Doktora tezi, Sakarya Üniversitesi, Fen Bilimleri Enstitüsü",
      en: "Ph.D. dissertation, Sakarya University, Institute of Natural Sciences"
    },
    note: { tr: "Doktora tezi", en: "Ph.D. dissertation" },
    featured: false
  },

  {
    key: "kucukkara2022tez",
    year: 2022,
    type: "thesis",
    authors: ["Küçükkara, Muhammed Yusuf"],
    title: "Design and Implementation of Relievo Techniques in a Virtual Reality Environment for Architectural Education",
    venue: {
      tr: "Yüksek lisans tezi, Karabük Üniversitesi, Fen Bilimleri Enstitüsü",
      en: "M.Sc. thesis, Karabük University, Institute of Graduate Studies"
    },
    note: { tr: "Yüksek lisans tezi", en: "M.Sc. thesis" },
    featured: false
  }

];
