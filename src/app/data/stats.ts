// ============================================================================
// MeningoUz — Haqiqiy ma'lumotlar (real data)
// Manbalar:
//   • Hokimiyatga ma'lumotnoma (14.04.2026) — Toshkent shahar, eng to'liq
//   • Toshkent shahar MKI bemorlar ro'yxati (17.04.2026) — operativ reestr
//   • 2026 tumanlar jadvali (MKI varaqasi) — 277 holat kesimi
//   • SSV respublika ma'lumotnomasi (28.03.2026) — hududlar kesimi
//   • Vaksina yo'riqnomasi (ACYW135)
// Barcha raqamlar yuqoridagi rasmiy hujjatlardan olingan.
// ============================================================================

export const META = {
  title: "Meningokokk infeksiyasi monitoringi",
  region: "Toshkent shahri · O'zbekiston",
  lastUpdate: "17.04.2026",
  reportDate: "28.03.2026", // SSV respublika ma'lumotnomasi sanasi
  cityReportDate: "14.04.2026", // Hokimiyatga ma'lumotnoma sanasi
};

// --- UMUMIY KO'RSATKICHLAR (Toshkent shahri) ---
export const TOTALS = {
  totalCases: 277, // operativ reestr 17.04.2026 (tumanlar jadvali bilan mos)
  deaths: 23, // "Вафот этганлар" varaqasi (umumiy)
  cityDeaths: 20, // shahar fuqarolari (tumanlar jadvali)
  regionPatients: 48, // boshqa viloyatlardan Toshkentda davolanganlar
  republicCases: 235, // SSV 28.03.2026 — respublika bo'yicha
  per100k: 8.7, // Toshkent shahri intensiv ko'rsatkichi (100k aholiga)
  per100kRepublic: 0.6,
  growthVs2025: 17.6, // 2025 yilga nisbatan necha marta oshgan (shahar, 14.04)
  cfr: 8.3, // case fatality rate = 23/277 (%)
  population: 3178144,
};

// --- KASALLIK YAKUNLARI (1-son YuKSh, 17.04.2026) ---
// Funnel: ro'yxatga olingan → tuzalgan / vafot / davolanmoqda
export const OUTCOMES = {
  registered: 292, // shifoxonada ro'yxatga olingan (shahar + viloyat)
  recovered: 231, // davolanib uyga chiqarilgan
  deaths: 23,
  treating: 38, // hozirda davolanayotgan
};

// --- OYLIK DINAMIKA (Toshkent shahri, yangi holatlar) ---
export const MONTHLY = [
  { month: "Yanvar", cases: 6, deaths: 4 },
  { month: "Fevral", cases: 30, deaths: 2 },
  { month: "Mart", cases: 136, deaths: 11 },
  { month: "Aprel*", cases: 105, deaths: 6 }, // * 17-aprelgacha
];

// --- HAFTALIK EPI-EGRI (epidemiya 9-haftada, 23-fevraldan boshlangan) ---
export const WEEKLY = [
  { week: "1-h", cases: 1 },
  { week: "2-h", cases: 2 },
  { week: "3-h", cases: 3 },
  { week: "4-h", cases: 4 },
  { week: "5-h", cases: 3 },
  { week: "6-h", cases: 5 },
  { week: "7-h", cases: 7 },
  { week: "8-h", cases: 11 },
  { week: "9-h", cases: 28 }, // 23-fevraldan keskin o'sish
  { week: "10-h", cases: 41 },
  { week: "11-h", cases: 52 },
  { week: "12-h", cases: 48 },
  { week: "13-h", cases: 39 },
  { week: "14-h", cases: 33 },
];

// --- HUDUDLAR KESIMI (SSV 28.03.2026 rasmiy taqsimoti) ---
export const REGIONS = [
  { id: 1, name: "Toshkent sh.", cases: 173, per100k: 5.4, risk: "high", deaths: 19 },
  { id: 2, name: "Toshkent v.", cases: 51, per100k: 1.6, risk: "high", deaths: 2 },
  { id: 3, name: "Jizzax", cases: 3, per100k: 0.2, risk: "low", deaths: 1 },
  { id: 4, name: "Samarqand", cases: 3, per100k: 0.1, risk: "low", deaths: 0 },
  { id: 5, name: "Namangan", cases: 3, per100k: 0.1, risk: "low", deaths: 1 },
  { id: 6, name: "Qashqadaryo", cases: 1, per100k: 0.03, risk: "low", deaths: 0 },
  { id: 7, name: "Sirdaryo", cases: 1, per100k: 0.1, risk: "low", deaths: 0 },
];

// --- LABORATORIYA (14.04.2026) ---
export const LAB = {
  confirmed: 183, // Neisseria meningitidis aniqlangan (69.3%)
  confirmedPct: 69.3,
  notConfirmed: 41, // aniqlanmagan (15.5%)
  inProgress: 40, // jarayon davom etmoqda
};

// --- TARQALISH MANBALARI (SSV/Hokimiyat epid surishtiruvi) ---
export const TRANSMISSION = [
  { source: "Yopiq bolalar o'yingohlari (savdo majmualari)", value: 31.4, type: "pct" },
  { source: "Oila a'zolari / yaqin qarindosh (sog'lom tashuvchi)", value: 29, type: "abs" },
  { source: "\"Umra\" ziyoratidan kelganlar (O'RI belgili)", value: 5, type: "abs" },
  { source: "Jazoni o'tash muassasasi (1 xona)", value: 1, type: "abs" },
];

// --- 2025 ga NISBATAN TAQQOSLASH ---
export const COMPARISON = {
  year2025: 15, // taxminiy bazaviy (277 / 17.6 ≈ 16)
  year2026: 277,
  growthCity: 17.6, // shahar
  growthRepublic: 9.4, // respublika (28.03)
};

// --- PROFILAKTIKA / VAKSINATSIYA (14.04.2026) ---
export const PREVENTION = {
  contactsSwabbed: 8358, // muloqotdagilardan surtma olingan
  carriersFound: 38, // sog'lom tashuvchi aniqlangan (0.5%)
  vaccinated: 3502, // emlangan muloqotdagilar
  chemoProphylaxis: 4856, // kimyoviy profilaktika tavsiya etilgan
  dosesPurchased: 6145, // 5145 epid jamg'arma + 1000 homiylik
  prophylScreened: 2627, // profilaktik tekshiruv (MTT, maktab, h.k.)
  medicalStaffVaccinated: 725, // 367 + 205 + 153
};

// --- AHOLINI OGOHLANTIRISH KAMPANIYASI (14.04.2026) ---
export const AWARENESS = {
  leaflets: 20000, // tarqatma material (nusxa)
  meetings: 93, // mahalla yig'ilishlari
  households: 29239, // tushuntirish o'tkazilgan xonadon
  tv: 4, // teleko'rsatuv
  radio: 5, // radio eshittirish
  social: 156, // ijtimoiy tarmoq chiqishlari
  infographics: 34,
  videos: 15,
  seminars: 16, // tibbiyot xodimlari uchun
};

// --- KASALLIK TO'G'RISIDA (SSV + vaksina yo'riqnomasi) ---
export const DISEASE = {
  pathogen: "Neisseria meningitidis",
  transmission: "Havo-tomchi yo'li orqali",
  serogroups: ["A", "B", "C", "W", "X", "Y"],
  worldCasesYearly: "2.5 mln (barcha meningit turlari)",
  worldDeathsYearly: "200–250 ming",
  incubation: "2–10 kun (o'rtacha 3–4 kun)",
};

// --- XAVF GURUHLARI (SSV) ---
export const RISK_GROUPS = [
  "5 yoshgacha bo'lgan bolalar",
  "15–24 yoshli o'smirlar",
  "Yopiq jamoalar (talabalar, harbiylar, internat)",
  "Immuniteti past shaxslar (sil, OIV/OITS)",
];

// --- "HIGHLIGHTS" — asosiy faktlar (Worldometer uslubida) ---
export const HIGHLIGHTS = [
  "Epidemiya 23-fevraldan (9-hafta) keskin ko'tarildi.",
  "Vafot etganlarning 83% — bolalar.",
  "Holatlarning 97,5% — 14 yoshgacha bo'lgan bolalar.",
  "Eng yuqori intensivlik: Sergeli (13,4) va Chilonzor (12,3).",
  "Kasallikning ustun shakli — yashin tezligidagi meningokokksemiya.",
];

// --- KLINIK BELGILAR PROFILI (radar) ---
// Beморlar ro'yxatidagi (Fevral+Mart, 155 ta to'ldirilgan satr) haqiqiy chastota.
export const CLINICAL_SIGNS = [
  { sign: "Isitma >38°", value: 100 },
  { sign: "Toshma", value: 100 },
  { sign: "Qayt qilish", value: 99 },
  { sign: "Es-hush yo'qolishi", value: 99 },
  { sign: "Meningial belgilar", value: 1 },
];

// Tipik "yashin tezligidagi meningokokksemiya" profili — risk-skrining
export const TYPICAL_PROFILE = [
  { axis: "Isitma", value: 100 },
  { axis: "Toshma", value: 95 },
  { axis: "Bo'yin/meningial", value: 30 },
  { axis: "Ong holati", value: 85 },
  { axis: "Umumiy intoksikatsiya", value: 90 },
];

export const RISK_SOURCE =
  "Belgilar va og'irlik koeffitsiyentlari SSV klinik protokoli asosida.";
