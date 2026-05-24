// ============================================================================
// Toshkent shahri — TUMANLAR kesimida (2026, rasmiy jadval "МКИ" varaqasi).
// Jami 277 holat. Har tuman: holat, intensivlik (100k), vafot, ijtimoiy guruh,
// yosh guruhi, aholi soni.
// ============================================================================

export interface District {
  name: string;
  cases: number;
  intensity: number; // 100k aholiga
  deaths: number;
  social: { uy: number; bogcha: number; maktab: number; katta: number };
  population: number;
}

export const DISTRICTS: District[] = [
  { name: "Olmazor", cases: 43, intensity: 10.3, deaths: 3, social: { uy: 25, bogcha: 9, maktab: 9, katta: 0 }, population: 418341 },
  { name: "Chilonzor", cases: 34, intensity: 12.3, deaths: 2, social: { uy: 17, bogcha: 12, maktab: 4, katta: 1 }, population: 277502 },
  { name: "Uchtepa", cases: 32, intensity: 10.5, deaths: 2, social: { uy: 17, bogcha: 10, maktab: 3, katta: 2 }, population: 304367 },
  { name: "Yunusobod", cases: 30, intensity: 7.6, deaths: 1, social: { uy: 15, bogcha: 11, maktab: 4, katta: 0 }, population: 392971 },
  { name: "Shayxontohur", cases: 27, intensity: 7.2, deaths: 3, social: { uy: 14, bogcha: 6, maktab: 6, katta: 1 }, population: 373686 },
  { name: "Sergeli", cases: 24, intensity: 13.4, deaths: 2, social: { uy: 14, bogcha: 5, maktab: 5, katta: 0 }, population: 178704 },
  { name: "Yashnobod", cases: 23, intensity: 7.3, deaths: 1, social: { uy: 12, bogcha: 9, maktab: 1, katta: 1 }, population: 317240 },
  { name: "Yangihayot", cases: 22, intensity: 11.0, deaths: 1, social: { uy: 17, bogcha: 4, maktab: 1, katta: 0 }, population: 200502 },
  { name: "M.Ulug'bek", cases: 15, intensity: 4.4, deaths: 1, social: { uy: 6, bogcha: 7, maktab: 1, katta: 1 }, population: 342226 },
  { name: "Yakkasaroy", cases: 14, intensity: 9.7, deaths: 3, social: { uy: 8, bogcha: 5, maktab: 1, katta: 0 }, population: 144821 },
  { name: "Bektemir", cases: 8, intensity: 11.2, deaths: 1, social: { uy: 4, bogcha: 4, maktab: 0, katta: 0 }, population: 71319 },
  { name: "Mirobod", cases: 5, intensity: 3.2, deaths: 0, social: { uy: 3, bogcha: 2, maktab: 0, katta: 0 }, population: 156465 },
];

// Yosh guruhlari — shahar bo'yicha jami (rasmiy jadval "Жами" satri)
export const AGE_DISTRIBUTION = [
  { label: "1 yoshgacha", value: 24, color: "#DC2626" },
  { label: "1–2 yosh", value: 106, color: "#EF4444" },
  { label: "3–5 yosh", value: 85, color: "#F59E0B" },
  { label: "6–14 yosh", value: 55, color: "#10B981" },
  { label: "15 yosh va katta", value: 7, color: "#3B82F6" },
];

// Ijtimoiy guruh — shahar bo'yicha jami
export const SOCIAL_DISTRIBUTION = [
  { label: "Uy bolalari", value: 152, pct: 54.9 },
  { label: "Bog'cha (MTT)", value: 84, pct: 30.3 },
  { label: "Maktab", value: 35, pct: 12.6 },
  { label: "Kattalar", value: 6, pct: 2.2 },
];

export const DISTRICT_TOTALS = {
  cases: 277,
  intensity: 8.7,
  children: 270, // 14 yoshgacha
  childrenPct: 97.5,
  deaths: 20, // shahar fuqarolari (umumiy 23, qolgani viloyat/boshqa)
  population: 3178144,
};
