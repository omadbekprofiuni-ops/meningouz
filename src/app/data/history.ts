// ============================================================================
// Toshkent shahri — meningokokk infeksiyasi yillik dinamikasi (2012–2026).
// Manba: «Тошкент шаҳрида 2012–2023 йилда менингококк инфекцияси билан
// касалланганлар сони» rasmiy jadvali (SSV Sanepidqo'm arxivi) + 2026 operativ
// reestr (17.04.2026, joriy o'choq). Qiymat = МИ gumon bo'yicha ro'yxatga
// olingan holatlar (shoshilinch xabarnomalar) soni.
//
// MUHIM: 2024–2025 yillar uchun Toshkent SHAHRI bo'yicha alohida yillik
// ko'rsatkich ushbu hujjatlar to'plamida yo'q (faqat respublika bo'yicha:
// 2024 = 18, 2025 = 35 holat — oylik forma-1 hisobotidan). Shu sabab grafikada
// bu ikki yil bo'sh (null) qoldirilgan va izohda ko'rsatilgan.
// ============================================================================

export interface HistoryYear {
  year: number;
  cases: number | null; // shahar bo'yicha ro'yxatga olingan holatlar
  note?: string;
}

export const CITY_HISTORY: HistoryYear[] = [
  { year: 2012, cases: 4 },
  { year: 2013, cases: 0 },
  { year: 2014, cases: 6 },
  { year: 2015, cases: 3 },
  { year: 2016, cases: 88, note: "oldingi epidemik ko'tarilish" },
  { year: 2017, cases: 75 },
  { year: 2018, cases: 44 },
  { year: 2019, cases: 114, note: "2026 gacha bo'lgan eng yuqori ko'rsatkich" },
  { year: 2020, cases: 7 },
  { year: 2021, cases: 3 },
  { year: 2022, cases: 2 },
  { year: 2023, cases: 0 },
  { year: 2024, cases: null, note: "shahar bo'yicha alohida yillik ko'rsatkich yo'q (resp. 18)" },
  { year: 2025, cases: null, note: "shahar bo'yicha alohida yillik ko'rsatkich yo'q (resp. 35)" },
  { year: 2026, cases: 277, note: "joriy epidemik o'choq (17.04 holatiga)" },
];

// Respublika bo'yicha qiyosiy kontekst (forma-1, oylik hisobot, dekabr holatiga)
export const REPUBLIC_RECENT = [
  { year: 2024, cases: 18, per100k: 0.05 },
  { year: 2025, cases: 35, per100k: 0.10 },
];

// Tahlil uchun mustahkam faktlar
export const HISTORY_FACTS = {
  priorPeakYear: 2019,
  priorPeakCases: 114,
  currentCases: 277,
  // 2026 oldingi rekordga nisbatan necha barobar
  vsPriorPeak: +(277 / 114).toFixed(1), // ≈ 2.4×
  // 2012–2023 o'rtacha (kuzatilgan yillar)
  meanBeforeOutbreak: Math.round(
    [4, 0, 6, 3, 88, 75, 44, 114, 7, 3, 2, 0].reduce((a, b) => a + b, 0) / 12
  ), // ≈ 29
};
