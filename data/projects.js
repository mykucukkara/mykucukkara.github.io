/* ==========================================================================
   PROJECTS.JS — Araştırma projeleri ve fonlar
   --------------------------------------------------------------------------
   İki dilli alanlarda { tr: "...", en: "..." } biçimini kullanın.

   Alanlar:
     title   (zorunlu) Proje adı — { tr, en }
     funder  (zorunlu) Destekleyen kurum
     code    Proje / burs numarası
     role    Görev — { tr, en }
     start   Başlangıç yılı
     end     Bitiş yılı; devam ediyorsa null (o zaman "Devam eden" bölümünde çıkar)
     desc    Açıklama — { tr, en }
     link    Proje web sayfası

   NOT: Burs numarası ve QuakeMLab'ın destekleyen kurumu hâlâ eksik.
   ========================================================================== */

window.PROJECTS = [

  {
    title: {
      tr: "Siber Güvenlikte Saldırı Tespiti için Yeni Bir Hibrit Kuantum Sinir Ağı Modeli",
      en: "A New Hybrid Quantum Neural Network Model for Attack Detection in Cybersecurity"
    },
    funder: "TÜBİTAK BİDEB 2211-C",
    code: "",
    role: { tr: "Bursiyer (doktora tez çalışması)", en: "Fellow (doctoral thesis)" },
    start: 2025,
    end: 2026,
    desc: {
      tr: "Yurt İçi Öncelikli Alanlar Doktora Burs Programı kapsamında desteklenen doktora tez çalışması. " +
          "Nesnelerin interneti ağlarında saldırı tespiti için pekiştirmeli öğrenmeyi kuantum sinir ağlarıyla " +
          "birleştiren CDRL-QNN yöntemi geliştirildi; yöntem kısıtlı kaynaklı cihazlarda kararlı tespit hedefliyor.",
      en: "Doctoral thesis supported under the National Priority Areas Doctoral Scholarship Programme. " +
          "It produced CDRL-QNN, a method combining reinforcement learning with quantum neural networks for " +
          "intrusion detection in Internet of Things networks, aiming at stable detection on resource-constrained devices."
    },
    link: "https://doi.org/10.3390/math14101608"
  },

  {
    title: {
      tr: "QuakeMLab — Derin Öğrenme ile Otomatik Sismik Faz Belirleme",
      en: "QuakeMLab — Deep Learning-Based Automated Seismic Phase Picking"
    },
    funder: "[DESTEKLEYEN KURUM — doldurun]",
    code: "",
    role: { tr: "Araştırmacı", en: "Researcher" },
    start: 2025,
    end: null,
    desc: {
      tr: "PhaseNet tabanlı derin öğrenme modelleriyle sismik dalga fazlarının otomatik belirlenmesi üzerine " +
          "yürütülen çok disiplinli proje. İlk aşama sonuçları EGU General Assembly 2026'da sunuldu.",
      en: "A multidisciplinary project on automated picking of seismic wave phases using PhaseNet-based deep " +
          "learning models. First-phase results were presented at the EGU General Assembly 2026."
    },
    link: "https://doi.org/10.5194/egusphere-egu26-8055"
  }

];
