/* ==========================================================================
   SITE.JS — Kişisel bilgiler ve tüm sabit metinler
   --------------------------------------------------------------------------
   Bilgilerin çoğu webdeki akademik profillerinizden çekildi.
   [TASLAK] işaretli metinler benim yazdığım taslaklardır — kendi
   üslubunuzla yeniden yazmanız iyi olur.
   Metin alanlarına <em>, <a>, <strong> gibi HTML etiketleri yazabilirsiniz.
   ========================================================================== */

window.SITE = {

  /* --- Dile bağlı OLMAYAN bilgiler ------------------------------------- */
  profile: {
    name: "Muhammed Yusuf Küçükkara",
    photo: "assets/img/profile.jpg",

    // E-posta kaynak kodda düz metin durmaz; parça parça saklanıp
    // tarayıcıda birleştirilir (spam botlarına karşı).
    emailUser: "muhammedkucukkara",
    emailDomain: "subu.edu.tr",

    // Yayın listesinde kalın gösterilecek yazar (data/publications.js
    // içindeki "Soyad, Ad" yazımıyla birebir aynı olmalı).
    selfKey: "Küçükkara, Muhammed Yusuf",

    // Boş bırakılan linkler sitede hiç görünmez.
    links: {
      email:        true,
      scholar:      "https://scholar.google.com/citations?user=llkVQWsAAAAJ",
      orcid:        "https://orcid.org/0000-0003-0600-3651",
      researchgate: "https://www.researchgate.net/profile/Muhammed-Kuecuekkara",
      linkedin:     "https://www.linkedin.com/in/mykucukkara/",
      github:       "https://github.com/mykucukkara",
      x:            "https://twitter.com/mykucukkara",
      dergipark:    "https://dergipark.org.tr/tr/pub/@mykucukkara",
      subu:         "https://muhammedkucukkara.subu.edu.tr",

      // CV PDF'i şimdilik yayımlanmıyor: Europass sürümü ev adresi, cep
      // telefonu ve doğum tarihi içeriyordu. Bu alanları çıkarılmış bir PDF
      // hazırlayıp assets/files/cv.pdf olarak koyduğunuzda buraya
      // "assets/files/cv.pdf" yazın — indirme düğmesi ve profil bağlantısı
      // kendiliğinden geri gelir. Özgeçmiş sayfası zaten HTML olarak tam.
      cv:           ""
    },

    // Google Takvim randevu sayfası. Dersler sayfasına gömülü olarak,
    // ana sayfaya ve profil bağlantılarına düğme olarak eklenir.
    // Sonuna "?gv=true" EKLEMEYİN — site gömme sürümünü kendisi üretir.
    // Randevu almayı kapatmak için url değerini "" yapın.
    appointment: {
      url: "https://calendar.google.com/calendar/appointments/schedules/AcZssZ3PzTTFrrtlV2f_c6EgmaT_X5ovD-KWzFhLEp7G0K3Q12SRsu29f9eycPQmE_2GiqhoDDIPJj16"
    },

    // Ana sayfada gösterilen ölçütler. Güncellemeyi unutursanız
    // yanlış bilgi vermemek için istediğinizi silebilirsiniz.
    metrics: [
      { value: "104", label: { tr: "atıf",     en: "citations" }, source: "Google Scholar" },
      { value: "4",   label: { tr: "h-indeks", en: "h-index"   }, source: "OpenAlex" },
      { value: "3",   label: { tr: "i10",      en: "i10"       }, source: "OpenAlex" }
    ]
  },

  /* --- TÜRKÇE ---------------------------------------------------------- */
  tr: {
    htmlLang: "tr",
    role: "Arş. Gör. Dr.",
    department: "Bilgisayar Mühendisliği Bölümü",
    faculty: "Teknoloji Fakültesi",
    university: "Sakarya Uygulamalı Bilimler Üniversitesi",
    office: "T3-354",

    siteTitle: "Muhammed Yusuf Küçükkara",
    metaDescription: "Muhammed Yusuf Küçükkara — Arş. Gör. Dr., Sakarya Uygulamalı Bilimler Üniversitesi Bilgisayar Mühendisliği. Kuantum makine öğrenmesi, siber güvenlik ve genişletilmiş gerçeklik üzerine araştırmalar.",

    nav: {
      home:         "hakkımda",
      publications: "yayınlar",
      projects:     "projeler",
      teaching:     "dersler",
      cv:           "özgeçmiş"
    },

    ui: {
      contact:     "İletişim",
      email:       "E-posta",
      office:      "Ofis",
      book:        "Randevu al",
      bookExternal: "Takvim açılmıyorsa doğrudan randevu sayfasına gidin ↗",
      downloadCV:  "Özgeçmiş (PDF)",
      print:       "Yazdır",
      all:         "Tümü",
      viewAll:     "Tüm yayınlar →",
      viewAllNews: "Tüm haberler →",
      syllabus:    "İzlence",
      abstract:    "Özet",
      ongoing:     "Devam eden",
      completed:   "Tamamlanan",
      present:     "devam ediyor",
      role:        "Görev",
      funder:      "Destekleyen",
      cite:        "Atıf",
      copied:      "Kopyalandı",
      copy:        "Kopyala",
      citations:   "atıf",
      themeToggle: "Temayı değiştir",
      langToggle:  "Switch to English",
      empty:       "Bu bölüm henüz doldurulmadı.",
      skip:        "İçeriğe geç"
    },

    pubTypes: {
      journal:    "Makale",
      conference: "Bildiri",
      chapter:    "Kitap Bölümü",
      book:       "Kitap",
      thesis:     "Tez",
      other:      "Diğer"
    },

    courseLevels: {
      undergraduate: "Lisans Dersleri",
      graduate:      "Lisansüstü Dersler"
    },

    /* --- Ana sayfa --- */
    home: {
      bio: [
        "Sakarya Uygulamalı Bilimler Üniversitesi Teknoloji Fakültesi Bilgisayar Mühendisliği Bölümü'nde araştırma görevlisiyim. Çalışmalarım <strong>kuantum makine öğrenmesinin siber güvenlik problemlerine uygulanması</strong> üzerinde yoğunlaşıyor: kuantum sinir ağları ve varyasyonel kuantum sınıflandırıcılarıyla saldırı tespiti, DDoS sınıflandırması ve nesnelerin interneti güvenliği.",
        "Doktoramı 2026'da Sakarya Üniversitesi'nde, “A New Hybrid Quantum Neural Network Model for Attack Detection in Cybersecurity” başlıklı tezle tamamladım; çalışma <strong>TÜBİTAK BİDEB 2211-C Yurt İçi Öncelikli Alanlar Doktora Burs Programı</strong> kapsamında desteklendi. Lisans ve yüksek lisans derecelerimi Karabük Üniversitesi Bilgisayar Mühendisliği Bölümü'nden aldım.",
        "2025'in ilk yarısında <strong>Letonya Üniversitesi Kuantum Hesaplama Bilimi Merkezi</strong>'nde, 2023 baharında ise İtalya'da <strong>Salento Üniversitesi</strong>'nde misafir araştırmacı olarak bulundum. Kuantum makine öğrenmesinin yanı sıra <strong>sanal ve genişletilmiş gerçeklik</strong> alanında çalışıyorum; mimarlık ve cerrahi eğitiminde iş birlikçi VR ortamları üzerine yayınlarım bulunuyor."
      ],

      researchHeading: "Araştırma Alanları",
      research: [
        {
          title: "Kuantum Makine Öğrenmesi",
          desc: "Kuantum sinir ağlarının (QNN) ve varyasyonel kuantum sınıflandırıcıların gerçek dünya verisinde nasıl davrandığını araştırıyorum. Temel sorum şu: bugünün donanımındaki sınırlı kübit bütçesi altında, öznitelik seçimi ve devre tasarımı doğruluğu ne kadar taşıyabilir? Meta-sezgisel öznitelik seçimiyle varyasyonel sınıflandırıcı performansını iyileştirme çalışmam bu soruya bir yanıt denemesi."
        },
        {
          title: "Siber Güvenlik ve Saldırı Tespiti",
          desc: "Nesnelerin interneti ağlarında izinsiz giriş ve DDoS tespiti için hibrit kuantum–klasik modeller geliştiriyorum. Amaç, kısıtlı kaynaklı cihazlarda çalışabilen, platformdan bağımsız ve kararlı tespit sistemleri kurmak. Doktora tezimde önerdiğim CDRL-QNN yöntemi, pekiştirmeli öğrenmeyi kuantum sinir ağıyla birleştirerek tespit kararlılığını artırmayı hedefliyor."
        },
        {
          title: "Sanal ve Genişletilmiş Gerçeklik",
          desc: "İş birlikçi VR ortamlarının eğitimde ne işe yaradığını inceliyorum. Mimarlık öğrencilerinin uzaktan rölöve alması için geliştirdiğimiz VRArchEducation sisteminde, fiziksel olarak ayrı yerlerdeki öğrenciler aynı tarihî yapıda birlikte ölçüm yapabiliyor. Cerrahi eğitimde XR ve yapay zekânın birlikte kullanımı üzerine de derleme çalışmam var."
        }
      ],

      newsHeading: "Haberler",
      selectedHeading: "Seçilmiş Yayınlar",
      contactHeading: "İletişim",
      contactNote: "Araştırma iş birlikleri, lisansüstü danışmanlık ve konuşma davetleri için e-posta ile ulaşabilirsiniz."
    },

    publications: {
      heading: "Yayınlar",
      intro: "Her zaman güncel liste için <a href=\"https://scholar.google.com/citations?user=llkVQWsAAAAJ\">Google Scholar</a> profilime bakabilirsiniz."
    },

    projects: {
      heading: "Projeler ve Fonlar",
      intro: "Yürüttüğüm ve katkı verdiğim araştırma projeleri."
    },

    teaching: {
      heading: "Dersler",
      intro: "Bilgisayar Mühendisliği Bölümü'nde birinci sınıftan bitirme projesine uzanan dersler veriyorum: bölüme girişten nesneye yönelik programlamaya, yazılım doğrulama ve sınamadan son sınıf tasarım projesine. Derslerde kavramı anlatmaktan çok, öğrencinin kendi projesini kurarken takıldığı yerde yanında olmayı önemsiyorum — çalışan bir sistem üretmek, konuyu ezberlemekten daha kalıcı oluyor.",

      appointmentHeading: "Randevu",
      appointmentNote: "Görüşmek istediğiniz konuyu kısaca yazıp aşağıdaki takvimden uygun bir saat seçebilirsiniz. Ders saatleri dışında kalan zamanlar burada görünür.",

      resourcesHeading: "Öğrenciler İçin",
      resources: [
        {
          title: "Görüşme",
          desc: "Ofisim <strong>T3-354</strong>, Bilgisayar Mühendisliği Bölümü. Görüşmek için sayfanın altındaki takvimden uygun bir saat seçin — kapıda beklemenize gerek kalmaz."
        },
        {
          title: "Bitirme Projesi ve Tez Danışmanlığı",
          desc: "Kuantum makine öğrenmesi, nesnelerin interneti güvenliği ve VR/XR alanlarında proje öğrencisi kabul ediyorum. Başvururken hangi konuyu neden merak ettiğinizi anlatan kısa bir yazı ve transkriptinizi gönderin."
        }

        /* Referans mektubu politikanızı belirleyince şu bloğu yukarıdaki
           maddenin ardına ekleyin (öndeki virgülü unutmayın):

        ,{
          title: "Referans Mektubu",
          desc: "Referans mektubu talepleri için en az [X] hafta önceden e-posta gönderin. Transkriptinizi, güncel özgeçmişinizi ve başvuracağınız program bilgisini ekleyin."
        }
        */
      ]
    },

    cv: {
      heading: "Özgeçmiş",
      intro: "Ayrıntılı özgeçmişin PDF sürümünü aşağıdan indirebilirsiniz.",
      sections: {
        education:    "Eğitim",
        experience:   "Görevler",
        awards:       "Ödüller ve Burslar",
        service:      "Akademik Hizmet",
        languages:    "Diller",
        skills:       "Beceriler",
        volunteering: "Gönüllü Çalışmalar",
        membership:   "Üyelikler"
      }
    },

    footerNote: "Bu site GitHub Pages üzerinde barındırılmaktadır."
  },

  /* --- ENGLISH --------------------------------------------------------- */
  en: {
    htmlLang: "en",
    role: "Research Assistant, Ph.D.",
    department: "Department of Computer Engineering",
    faculty: "Faculty of Technology",
    university: "Sakarya University of Applied Sciences",
    office: "T3-354",

    siteTitle: "Muhammed Yusuf Küçükkara",
    metaDescription: "Muhammed Yusuf Küçükkara — Research Assistant, Ph.D., Department of Computer Engineering, Sakarya University of Applied Sciences. Research on quantum machine learning, cyber security and extended reality.",

    nav: {
      home:         "about",
      publications: "publications",
      projects:     "projects",
      teaching:     "teaching",
      cv:           "cv"
    },

    ui: {
      contact:     "Contact",
      email:       "Email",
      office:      "Office",
      book:        "Book a meeting",
      bookExternal: "If the calendar does not load, open the booking page directly ↗",
      downloadCV:  "CV (PDF)",
      print:       "Print",
      all:         "All",
      viewAll:     "All publications →",
      viewAllNews: "All news →",
      syllabus:    "Syllabus",
      abstract:    "Abstract",
      ongoing:     "Ongoing",
      completed:   "Completed",
      present:     "present",
      role:        "Role",
      funder:      "Funder",
      cite:        "Cite",
      copied:      "Copied",
      copy:        "Copy",
      citations:   "citations",
      themeToggle: "Toggle theme",
      langToggle:  "Türkçe'ye geç",
      empty:       "This section has not been filled in yet.",
      skip:        "Skip to content"
    },

    pubTypes: {
      journal:    "Journal",
      conference: "Conference",
      chapter:    "Chapter",
      book:       "Book",
      thesis:     "Thesis",
      other:      "Other"
    },

    courseLevels: {
      undergraduate: "Undergraduate Courses",
      graduate:      "Graduate Courses"
    },

    home: {
      bio: [
        "I am a research assistant in the Department of Computer Engineering, Faculty of Technology, Sakarya University of Applied Sciences. My work centres on <strong>applying quantum machine learning to cyber security problems</strong>: intrusion detection with quantum neural networks and variational quantum classifiers, DDoS classification, and Internet of Things security.",
        "I completed my Ph.D. in 2026 at Sakarya University with the dissertation “A New Hybrid Quantum Neural Network Model for Attack Detection in Cybersecurity”, supported by the <strong>TÜBİTAK BİDEB 2211-C National Priority Areas Doctoral Scholarship Programme</strong>. I hold B.Sc. and M.Sc. degrees in Computer Engineering from Karabük University.",
        "In the first half of 2025 I was a visiting researcher at the <strong>Center for Quantum Computing Science, University of Latvia</strong>, and in spring 2023 at the <strong>University of Salento</strong> in Italy. Alongside quantum machine learning I work on <strong>virtual and extended reality</strong>, with publications on collaborative VR environments in architectural and surgical education."
      ],

      researchHeading: "Research Interests",
      research: [
        {
          title: "Quantum Machine Learning",
          desc: "I study how quantum neural networks (QNNs) and variational quantum classifiers behave on real-world data. My central question: under the limited qubit budget of today's hardware, how far can feature selection and circuit design carry accuracy? My work on improving variational classifier performance through meta-heuristic feature selection is one attempt at an answer."
        },
        {
          title: "Cyber Security and Intrusion Detection",
          desc: "I develop hybrid quantum–classical models for intrusion and DDoS detection in Internet of Things networks, aiming at platform-independent, stable detection systems that can run on resource-constrained devices. CDRL-QNN, the method proposed in my dissertation, combines reinforcement learning with a quantum neural network to improve detection stability."
        },
        {
          title: "Virtual and Extended Reality",
          desc: "I examine what collaborative VR environments actually contribute to education. In VRArchEducation, a system we built for remote architectural surveying, students in physically separate locations can take measurements together inside the same historic building. I have also reviewed the combined use of XR and artificial intelligence in surgical training."
        }
      ],

      newsHeading: "News",
      selectedHeading: "Selected Publications",
      contactHeading: "Contact",
      contactNote: "Feel free to reach out by email for research collaborations, graduate supervision and speaking invitations."
    },

    publications: {
      heading: "Publications",
      intro: "For an always-current list, see my <a href=\"https://scholar.google.com/citations?user=llkVQWsAAAAJ\">Google Scholar</a> profile."
    },

    projects: {
      heading: "Projects and Funding",
      intro: "Research projects I lead or contribute to."
    },

    teaching: {
      heading: "Teaching",
      intro: "I teach courses across the curriculum in the Department of Computer Engineering, from the first-year introduction to the senior capstone: object-oriented programming, software verification and testing, and design projects. Rather than lecturing at the concept, I try to be there at the point where a student gets stuck building their own project — a working system sticks far better than a memorised topic.",

      appointmentHeading: "Book a Meeting",
      appointmentNote: "Write a line about what you would like to discuss and pick a slot from the calendar below. Times outside my teaching hours appear there.",

      resourcesHeading: "For Students",
      resources: [
        {
          title: "Meetings",
          desc: "My office is <strong>T3-354</strong>, Department of Computer Engineering. To meet, pick a slot from the calendar at the bottom of this page — no need to wait at the door."
        },
        {
          title: "Capstone and Thesis Supervision",
          desc: "I accept project students in quantum machine learning, Internet of Things security and VR/XR. When applying, please send your transcript and a short note on which topic interests you and why."
        }

        /* Once you have settled your reference-letter policy, add this block
           after the entry above (mind the leading comma):

        ,{
          title: "Reference Letters",
          desc: "Please email me at least [X] weeks in advance for reference letters, attaching your transcript, current CV and details of the programme you are applying to."
        }
        */
      ]
    },

    cv: {
      heading: "Curriculum Vitae",
      intro: "A detailed PDF version of my CV is available below.",
      sections: {
        education:    "Education",
        experience:   "Appointments",
        awards:       "Awards and Fellowships",
        service:      "Academic Service",
        languages:    "Languages",
        skills:       "Skills",
        volunteering: "Volunteering",
        membership:   "Memberships"
      }
    },

    footerNote: "This site is hosted on GitHub Pages."
  }
};
