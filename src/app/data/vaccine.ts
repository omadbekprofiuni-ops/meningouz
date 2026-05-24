// ============================================================================
// Vaksina ma'lumotlari — "Менингококковая полисахаридная вакцина ACYW135"
// yo'riqnomasidan (Инстр МК Вакцина рус фин).
// ============================================================================

export const VACCINE = {
  name: "Meningokokk polisaxarid vaksinasi ACYW135",
  inn: "Meningokokk polisaxarid vaksinasi",
  form: "Liofilizat (eritkich bilan to'plamda)",
  atc: "N01BA02",
  serogroups: ["A", "C", "Y", "W135"],
  manufacturer: "Beijing Zhifei Lvzhu Biopharmaceutical Co., Ltd.",
  storage: "2–8 °C, yorug'likdan himoyalangan holda",
  shelfLife: "24 oy",
  dispensing: "Shifokor retsepti bo'yicha",
  dose: "0,5 ml (bir martalik), elka deltasimon mushagiga",
  ageLimit: "2 yoshdan katta bolalar va kattalar",
  composition: [
    { group: "A guruh polisaxaridi", amount: "50 mkg" },
    { group: "C guruh polisaxaridi", amount: "50 mkg" },
    { group: "Y guruh polisaxaridi", amount: "50 mkg" },
    { group: "W135 guruh polisaxaridi", amount: "50 mkg" },
  ],
};

export const INDICATIONS = [
  "Yuqori xavf guruhidagi shaxslar uchun epidemik meningitdan profilaktika",
  "Meningit xavfi yuqori hududlarga (masalan, Afrikaning Sahroi Kabir yaqini) sayohat qiluvchilar",
  "Vaksina ishlab chiqarish va tahlili bilan bog'liq xodimlar",
  "ССВ bashorati bo'yicha epidemiya kutilayotgan hududlar aholisi",
];

export const CONTRAINDICATIONS = [
  "Vaksina yoki uning komponentlariga allergiya",
  "Epilepsiya, ensefalopatiya va anamnezda allergik reaksiyalar",
  "Buyrak, yurak kasalliklari, aktiv sil, OIV-infeksiyasi",
  "O'tkir yuqumli kasalliklar va isitma",
];

export const SIDE_EFFECTS = {
  local: ["Og'riq", "Qizarish", "Shish", "Yuborilgan joyda qichishish"],
  systemic: [
    "Isitma",
    "Bosh og'rig'i",
    "Holsizlik, uyquchanlik",
    "Ko'ngil aynishi, qayt qilish",
    "Miyalgiya, toshma",
  ],
  note: "Reaksiyalar odatda 72 soat ichida o'tib ketadi.",
};

// Emlash kalendari / muloqotdagilar uchun bosqichlar (epid ko'rsatma bo'yicha)
export const SCHEDULE = [
  {
    step: "Aniqlash",
    title: "Muloqotda bo'lganlarni aniqlash",
    desc: "Bemor bilan o'choqda mulokotda bo'lgan barcha shaxslar ro'yxatga olinadi.",
  },
  {
    step: "Tekshiruv",
    title: "Bakteriologik surtma",
    desc: "Burun-halqumdan surtma olinib, tashuvchanlik aniqlanadi.",
  },
  {
    step: "Emlash",
    title: "Epid ko'rsatma bo'yicha emlash",
    desc: "Tibbiy moneligi bo'lmagan muloqotdagilar 0,5 ml dozada emlanadi.",
  },
  {
    step: "Kuzatuv",
    title: "10 kunlik tibbiy kuzatuv",
    desc: "O'choqda 10 kun davomida qat'iy tibbiy kuzatuv olib boriladi.",
  },
];
