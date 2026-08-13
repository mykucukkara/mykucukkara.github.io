/* ==========================================================================
   CV.JS — Özgeçmiş içeriği
   --------------------------------------------------------------------------
   Kaynak: CV_EN_LATEST.pdf (Europass).

   Her bölüm bir girdi dizisidir. Girdi alanları:
     period  (zorunlu) Tarih aralığı. Düz metin ya da { tr, en }
     title   (zorunlu) Derece / görev / ödül adı — { tr, en }
     org     Kurum adı. Düz metin ya da { tr, en }
     note    Ek açıklama — { tr, en }

   Bölüm sırası assets/js/app.js içinde tanımlıdır:
     education, experience, awards, service, languages, skills,
     volunteering, membership
   Boş bırakılan bölümler ([]) sitede hiç gösterilmez.
   ========================================================================== */

window.CV = {

  education: [
    {
      period: "2022 – 2026",
      title: { tr: "Doktora, Bilgisayar Mühendisliği", en: "Ph.D., Computer Engineering" },
      org: { tr: "Sakarya Üniversitesi", en: "Sakarya University" },
      note: {
        tr: "Tez: “A New Hybrid Quantum Neural Network Model for Attack Detection in Cybersecurity”. " +
            "Siber güvenlik, kuantum makine öğrenmesi, pekiştirmeli öğrenme ve hibrit kuantum sinir ağı modelleri.",
        en: "Dissertation: “A New Hybrid Quantum Neural Network Model for Attack Detection in Cybersecurity”. " +
            "Cybersecurity, quantum machine learning, reinforcement learning and hybrid quantum neural network models."
      }
    },
    {
      period: "2020 – 2022",
      title: { tr: "Yüksek Lisans, Bilgisayar Mühendisliği", en: "M.Sc., Computer Engineering" },
      org: { tr: "Karabük Üniversitesi", en: "Karabük University" },
      note: {
        tr: "Tez: “Design and Implementation of Relievo Techniques in a Virtual Reality Environment " +
            "for Architectural Education”. Mezuniyet notu: 3,07.",
        en: "Thesis: “Design and Implementation of Relievo Techniques in a Virtual Reality Environment " +
            "for Architectural Education”. GPA: 3.07."
      }
    },
    {
      period: "2015 – 2020",
      title: { tr: "Lisans, Bilgisayar Mühendisliği", en: "B.Sc., Computer Engineering" },
      org: { tr: "Karabük Üniversitesi", en: "Karabük University" },
      note: {
        tr: "Bitirme projesi: “Indoor Navigation System with Augmented Reality” — " +
            "artırılmış gerçeklikle, ek donanım gerektirmeyen düşük maliyetli bina içi yön bulma sistemi. " +
            "Mezuniyet notu: 2,95.",
        en: "Capstone project: “Indoor Navigation System with Augmented Reality” — a low-cost indoor " +
            "wayfinding system using augmented reality without additional hardware. GPA: 2.95."
      }
    }
  ],

  experience: [
    {
      period: { tr: "Oca 2022 – günümüz", en: "Jan 2022 – present" },
      title: { tr: "Araştırma Görevlisi", en: "Research / Teaching Assistant" },
      org: {
        tr: "Sakarya Uygulamalı Bilimler Üniversitesi, Teknoloji Fakültesi, Bilgisayar Mühendisliği Bölümü",
        en: "Sakarya University of Applied Sciences, Faculty of Technology, Department of Computer Engineering"
      },
      note: {
        tr: "Lisans dersleri: nesneye yönelik programlama, yazılım doğrulama ve sınama, " +
            "bitirme tasarım projesi ve bölüme giriş. Daha önce Django tabanlı web geliştirme " +
            "derslerinde uygulama asistanlığı. Ders materyali, ödev ve sınav hazırlığı; " +
            "haftalık görüşme saatleri ve birebir destek.",
        en: "Undergraduate courses: object-oriented programming, software verification and testing, " +
            "capstone design project and introduction to the discipline. Previously teaching assistant " +
            "for Django-based web development courses. Preparation of course materials, assignments " +
            "and exams; weekly meeting hours and one-to-one support."
      }
    },
    {
      period: { tr: "Şub – Tem 2025", en: "Feb – Jul 2025" },
      title: { tr: "Misafir Doktora Araştırmacısı", en: "Visiting Ph.D. Researcher" },
      org: {
        tr: "Letonya Üniversitesi, Kuantum Hesaplama Bilimi Merkezi — Riga, Letonya",
        en: "University of Latvia, Center for Quantum Computing Science — Riga, Latvia"
      },
      note: {
        tr: "Kuantum algoritmaları ve hibrit yöntemlerle siber saldırı sınıflandırması üzerine araştırma. " +
            "Kuantum ve klasik hesaplama paradigmalarını birleştiren yaklaşımların tasarımı ve değerlendirilmesi.",
        en: "Research on cyber-attack classification using quantum algorithms and hybrid methods. " +
            "Design and evaluation of approaches integrating quantum and classical computing paradigms."
      }
    },
    {
      period: { tr: "Oca – May 2023", en: "Jan – May 2023" },
      title: { tr: "Misafir Araştırma Görevlisi", en: "Visiting Research Assistant" },
      org: {
        tr: "Salento Üniversitesi — Lecce, İtalya",
        en: "University of Salento — Lecce, Italy"
      },
      note: {
        tr: "Genişletilmiş gerçeklik ve yapay zekâ destekli cerrahi eğitim üzerine araştırma.",
        en: "Research on extended reality and artificial intelligence-based surgical training."
      }
    },
    {
      period: { tr: "Haz 2020 – Oca 2022", en: "Jun 2020 – Jan 2022" },
      title: { tr: "Yazılım Mühendisi (Serbest)", en: "Software Engineer (Freelance)" },
      org: { tr: "Türkiye", en: "Türkiye" },
      note: {
        tr: "Unity 3D ile artırılmış ve sanal gerçeklik uygulamaları geliştirme. " +
            "Unity XR Toolkit, Mixed Reality Toolkit, Photon Network, Firebase ve Oculus Quest 2 ile çalışma.",
        en: "Development of augmented and virtual reality applications with Unity 3D, using " +
            "Unity XR Toolkit, Mixed Reality Toolkit, Photon Network, Firebase and Oculus Quest 2."
      }
    }
  ],

  awards: [
    {
      period: "2025",
      title: {
        tr: "2211-C Yurt İçi Öncelikli Alanlar Doktora Burs Programı",
        en: "2211-C National Priority Areas Doctoral Scholarship Programme"
      },
      org: "TÜBİTAK BİDEB",
      note: {
        tr: "Doktora tez çalışması kapsamında verilen burs.",
        en: "Scholarship awarded in support of the doctoral thesis."
      }
    }
  ],

  /* Hakemlik, düzenleme kurulu üyeliği vb. — CV'de yer almıyordu.
     Doldurduğunuzda sitede otomatik görünür. */
  service: [],

  languages: [
    {
      period: { tr: "Ana dil", en: "Native" },
      title: { tr: "Türkçe", en: "Turkish" },
      org: "",
      note: { tr: "", en: "" }
    },
    {
      period: "B2",
      title: { tr: "İngilizce", en: "English" },
      org: "",
      note: {
        tr: "Avrupa Dil Portfolyosu: dinleme B2, okuma B2, konuşma B2, yazma B2.",
        en: "Common European Framework: listening B2, reading B2, speaking B2, writing B2."
      }
    }
  ],

  skills: [
    {
      period: { tr: "Programlama", en: "Programming" },
      title: { tr: "Python · Java · C#", en: "Python · Java · C#" },
      org: "", note: { tr: "", en: "" }
    },
    {
      period: { tr: "Kuantum", en: "Quantum" },
      title: {
        tr: "Qiskit · kuantum sinir ağları · varyasyonel kuantum sınıflandırıcılar",
        en: "Qiskit · quantum neural networks · variational quantum classifiers"
      },
      org: "", note: { tr: "", en: "" }
    },
    {
      period: { tr: "XR / Oyun", en: "XR / Games" },
      title: {
        tr: "Unity 3D · Unity XR Toolkit · Mixed Reality Toolkit · ARCore · Vuforia · Oculus Quest 2",
        en: "Unity 3D · Unity XR Toolkit · Mixed Reality Toolkit · ARCore · Vuforia · Oculus Quest 2"
      },
      org: "", note: { tr: "", en: "" }
    },
    {
      period: { tr: "Web ve servisler", en: "Web and services" },
      title: {
        tr: "Django · Photon Network · Firebase · Google Cloud Anchor",
        en: "Django · Photon Network · Firebase · Google Cloud Anchor"
      },
      org: "", note: { tr: "", en: "" }
    }
  ],

  volunteering: [
    {
      period: "2016 – 2019",
      title: { tr: "Ülke Direktörü", en: "Country Director" },
      org: { tr: "Let's Do It! — Türkiye", en: "Let's Do It! — Türkiye" },
      note: {
        tr: "113 ülkede 16,5 milyon gönüllüsü bulunan çevre temizliği hareketinin Türkiye ayağı. " +
            "2018 Dünya Temizlik Günü: 41.623 katılımcı, 84 nokta, 128 ton atık. " +
            "2019: 116.898 katılımcı, 152 nokta, 790 ton atık.",
        en: "The Türkiye branch of an environmental clean-up movement with 16.5 million volunteers in 113 countries. " +
            "2018 World Cleanup Day: 41,623 participants, 84 sites, 128 tonnes of waste. " +
            "2019: 116,898 participants, 152 sites, 790 tonnes."
      }
    },
    {
      period: "2016 – 2018",
      title: { tr: "Sayman", en: "Treasurer" },
      org: { tr: "Civil Life Association", en: "Civil Life Association" },
      note: { tr: "", en: "" }
    }
  ],

  membership: []

};
