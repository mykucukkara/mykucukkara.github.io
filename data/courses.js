/* ==========================================================================
   COURSES.JS — Verilen dersler
   --------------------------------------------------------------------------
   Alanlar:
     code     Ders kodu — ör. "BIL 101". Boş bırakılırsa etiket hiç görünmez.
     name     (zorunlu) Ders adı — { tr, en }
     level    (zorunlu) "undergraduate" (lisans) | "graduate" (lisansüstü)
     terms    Verildiği dönemler — dizi. Öğeler düz metin ya da { tr, en }
     desc     Kısa ders tanımı — { tr, en }
     syllabus İzlence PDF yolu — ör. "assets/files/bil101-izlence.pdf"
     link     Ders sayfası / LMS bağlantısı

   Yeni bir dönem eklerken ilgili dersin terms dizisine bir öğe ekleyin;
   eski dönemler de listede kalır:
     terms: [
       { tr: "2027-2028 Güz", en: "2027-2028 Fall" },
       { tr: "2026-2027 Güz", en: "2026-2027 Fall" }
     ]
   ========================================================================== */

window.COURSES = [

  {
    code: "BIL 101",
    name: {
      tr: "Kariyer Planlama ve Bilgisayar Mühendisliğine Giriş",
      en: "Career Planning and Introduction to Computer Engineering"
    },
    level: "undergraduate",
    terms: [{ tr: "2026-2027 Güz", en: "2026-2027 Fall" }],
    desc: {
      tr: "Bölüme yeni başlayan öğrenciler için bilgisayar mühendisliğinin alt " +
          "alanlarına ve mesleki yönelim seçeneklerine giriş.",
      en: "An introduction to the subfields of computer engineering and to career " +
          "paths, for students beginning the programme."
    },
    syllabus: "",
    link: ""
  },

  {
    code: "BIL 201",
    name: {
      tr: "Nesneye Yönelik Programlama",
      en: "Object-Oriented Programming"
    },
    level: "undergraduate",
    terms: [{ tr: "2026-2027 Güz · B şubesi", en: "2026-2027 Fall · Section B" }],
    desc: {
      tr: "Nesneye yönelik tasarımın temelleri: sınıflar, kalıtım, çok biçimlilik " +
          "ve kapsülleme.",
      en: "Foundations of object-oriented design: classes, inheritance, polymorphism " +
          "and encapsulation."
    },
    syllabus: "",
    link: ""
  },

  {
    code: "BIL 002",
    name: {
      tr: "Yazılım Doğrulama ve Sınama",
      en: "Software Verification and Testing"
    },
    level: "undergraduate",
    terms: [{ tr: "2026-2027 Güz", en: "2026-2027 Fall" }],
    desc: {
      tr: "Yazılımın doğru çalıştığını gösterme yöntemleri: birim ve bütünleşme " +
          "testleri, test tasarımı, hata ayıklama ve doğrulama teknikleri.",
      en: "Methods for showing that software works: unit and integration testing, " +
          "test design, debugging and verification techniques."
    },
    syllabus: "",
    link: ""
  },

  {
    code: "BIL 401",
    name: {
      tr: "Bilgisayar Mühendisliği Tasarımı",
      en: "Computer Engineering Design"
    },
    level: "undergraduate",
    terms: [{ tr: "2026-2027 Güz", en: "2026-2027 Fall" }],
    desc: {
      tr: "Son sınıf tasarım projesi. Öğrenciler bir problemi baştan sona ele alıp " +
          "çalışan bir sistem ortaya koyuyor.",
      en: "Senior capstone design project. Students take a problem end to end and " +
          "deliver a working system."
    },
    syllabus: "",
    link: ""
  }

];
