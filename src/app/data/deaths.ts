// ============================================================================
// Vafot etgan bemorlar reestri — "Вафот этганлар" varaqasidan (17.04.2026).
// Maxfiylik uchun F.I.Sh. faqat bosh harflar bilan ko'rsatilgan.
// Barchasida yakuniy tashxis: "Meningokokk infeksiya, tarqoq turi,
// meningokokksemiya — yashin tezligida o'ta og'ir kechishi".
// ============================================================================

export interface DeathRecord {
  n: number;
  fio: string;
  age: string;      // yosh
  isChild: boolean;
  district: string; // tuman / hudud
  sick: string;     // kasal bo'lgan kun
  hosp: string;     // shifoxonaga yotqizilgan kun
  death: string;    // vafot sanasi
}

export const DEATHS: DeathRecord[] = [
  { n: 1, fio: "Faxriddinov A.K.", age: "2 yosh 3 oy", isChild: true, district: "Yunusobod", sick: "02.01.2026", hosp: "03.01.2026", death: "03.01.2026" },
  { n: 2, fio: "Rahmatullaeva M.S.", age: "1 yosh 1 oy", isChild: true, district: "M.Ulug'bek", sick: "21.01.2026", hosp: "22.01.2026", death: "26.01.2026" },
  { n: 3, fio: "Lazizov X.Z.", age: "1 yosh 9 oy", isChild: true, district: "Olmazor", sick: "26.01.2026", hosp: "27.01.2026", death: "29.01.2026" },
  { n: 4, fio: "Turakulova Z.R.", age: "58 yosh", isChild: false, district: "Toshkent v.", sick: "24.01.2026", hosp: "26.01.2026", death: "26.01.2026" },
  { n: 5, fio: "Toymetova K.E.", age: "58 yosh", isChild: false, district: "Uchtepa", sick: "01.02.2026", hosp: "01.02.2026", death: "03.02.2026" },
  { n: 6, fio: "Shavkatova A.J.", age: "2,5 oylik", isChild: true, district: "Shayxontohur", sick: "22.02.2026", hosp: "22.02.2026", death: "23.02.2026" },
  { n: 7, fio: "Asxodjaev U.X.", age: "1,5 yosh", isChild: true, district: "Zangiota", sick: "04.03.2026", hosp: "04.03.2026", death: "04.03.2026" },
  { n: 8, fio: "Azimova X.A.", age: "56 yosh", isChild: false, district: "Shayxontohur", sick: "04.03.2026", hosp: "06.03.2026", death: "08.03.2026" },
  { n: 9, fio: "Mirzoxodjaev B.A.", age: "57 yosh", isChild: false, district: "Uchtepa", sick: "06.03.2026", hosp: "07.03.2026", death: "07.03.2026" },
  { n: 10, fio: "Rahimberdiev M.M.", age: "2 yosh 11 oy", isChild: true, district: "Chilonzor", sick: "09.03.2026", hosp: "09.03.2026", death: "10.03.2026" },
  { n: 11, fio: "Azimboev M.O.", age: "4 yosh", isChild: true, district: "Yangihayot", sick: "12.03.2026", hosp: "13.03.2026", death: "13.03.2026" },
  { n: 12, fio: "Azizov A.G'.", age: "3,5 oylik", isChild: true, district: "Yakkasaroy", sick: "18.03.2026", hosp: "19.03.2026", death: "19.03.2026" },
  { n: 13, fio: "Zohidjonov M.D.", age: "5 yosh", isChild: true, district: "Bektemir", sick: "23.03.2026", hosp: "24.03.2026", death: "24.03.2026" },
  { n: 14, fio: "Amanova M.B.", age: "10 oylik", isChild: true, district: "Yakkasaroy", sick: "25.03.2026", hosp: "25.03.2026", death: "25.03.2026" },
  { n: 15, fio: "Abduvohidova M.A.", age: "11 oylik", isChild: true, district: "Olmazor", sick: "25.03.2026", hosp: "26.03.2026", death: "26.03.2026" },
  { n: 16, fio: "Xolmatov Z.J.", age: "1 yosh 4 oy", isChild: true, district: "Shayxontohur", sick: "27.03.2026", hosp: "27.03.2026", death: "29.03.2026" },
  { n: 17, fio: "Abdumannopov A.A.", age: "3 yosh", isChild: true, district: "Sergeli", sick: "31.03.2026", hosp: "01.04.2026", death: "01.04.2026" },
  { n: 18, fio: "Abdukarimov M.D.", age: "2 yosh", isChild: true, district: "Sergeli", sick: "31.03.2026", hosp: "01.04.2026", death: "01.04.2026" },
  { n: 19, fio: "Baxtiyorova M.J.", age: "5 yosh", isChild: true, district: "Chilonzor", sick: "01.04.2026", hosp: "01.04.2026", death: "01.04.2026" },
  { n: 20, fio: "Yashinov Sh.L.", age: "11 yosh", isChild: true, district: "Uchtepa", sick: "01.04.2026", hosp: "03.04.2026", death: "04.04.2026" },
  { n: 21, fio: "Oripova A.J.", age: "1,5 yosh", isChild: true, district: "Mirobod", sick: "05.04.2026", hosp: "05.04.2026", death: "05.04.2026" },
  { n: 22, fio: "Davronova H.I.", age: "1 yosh", isChild: true, district: "Olmazor", sick: "07.04.2026", hosp: "07.04.2026", death: "08.04.2026" },
  { n: 23, fio: "Saidov M.X.", age: "1,5 oylik", isChild: true, district: "Yashnobod", sick: "10.04.2026", hosp: "12.04.2026", death: "12.04.2026" },
];

// Vafot bo'yicha tahlil
const _total = DEATHS.length;
const _children = DEATHS.filter((d) => d.isChild).length;

export const DEATH_STATS = {
  total: _total,
  children: _children,
  adults: DEATHS.filter((d) => !d.isChild).length,
  // bolalar ulushi (%) — 19/23 ≈ 82,6% (issue #5: avval 78,9% noto'g'ri edi)
  childrenPct: Math.round((_children / _total) * 1000) / 10,
  // kasal bo'lgandan vafotgacha o'rtacha kunlar (yashin tezligi)
  avgDaysToDeath: 2,
};
