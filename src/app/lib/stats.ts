// ============================================================================
// Epidemiologik statistik hisob-kitoblar (dissertatsiya darajasi).
// Barcha formulalar standart epidemiologiya adabiyotidan; natijalar mijoz
// tomonida (brauzerda) hisoblanadi va tekshirilishi mumkin.
//   • Wilson score interval — nisbat (proportion) uchun 95% CI
//   • Poisson (log) — ikki holat soni nisbati (incidence rate ratio) 95% CI
//   • Pearson χ² — 2×2 jadval uchun ahamiyatlilik testi
// Tekshiruv uchun R ekvivalentlari sharhlarda keltirilgan.
// ============================================================================

export interface CI {
  estimate: number; // nuqta-baho
  low: number; // 95% CI quyi chegara
  high: number; // 95% CI yuqori chegara
}

// Nisbat uchun Wilson score 95% ishonch oralig'i. Natija — FOIZ (0–100).
// R: binom.confint(x, n, methods = "wilson")  yoki  Hmisc::binconf(x, n)
export function wilsonCI(x: number, n: number, z = 1.96): CI {
  if (n === 0) return { estimate: 0, low: 0, high: 0 };
  const p = x / n;
  const z2 = z * z;
  const denom = 1 + z2 / n;
  const center = (p + z2 / (2 * n)) / denom;
  const margin = (z / denom) * Math.sqrt((p * (1 - p)) / n + z2 / (4 * n * n));
  return {
    estimate: p * 100,
    low: Math.max(0, (center - margin) * 100),
    high: Math.min(100, (center + margin) * 100),
  };
}

// Ikki holat soni nisbati (incidence rate ratio, aholi ~ o'zgarmas deb).
// Poisson log-CI:  exp( ln(a/b) ± z·√(1/a + 1/b) )
// R: epitools::rateratio(matrix(c(b, a, P, P), nrow = 2))
export function rateRatioCI(a: number, b: number, z = 1.96): CI {
  if (a === 0 || b === 0) return { estimate: 0, low: 0, high: 0 };
  const rr = a / b;
  const ln = Math.log(rr);
  const se = Math.sqrt(1 / a + 1 / b);
  return { estimate: rr, low: Math.exp(ln - z * se), high: Math.exp(ln + z * se) };
}

// Pearson χ² (2×2), Yeyts tuzatishisiz. 1 erkinlik darajasi.
// R: chisq.test(matrix(c(a, b, c, d), nrow = 2), correct = FALSE)
export function chiSquare2x2(a: number, b: number, c: number, d: number): { chi2: number; p: number } {
  const n = a + b + c + d;
  if (n === 0) return { chi2: 0, p: 1 };
  const num = n * Math.pow(a * d - b * c, 2);
  const den = (a + b) * (c + d) * (a + c) * (b + d);
  if (den === 0) return { chi2: 0, p: 1 };
  const chi2 = num / den;
  return { chi2, p: chiSquarePValue(chi2, 1) };
}

// χ² taqsimoti uchun yuqori dum p-qiymati (df = 1 holati uchun aniq formula:
// p = 2·(1 − Φ(√χ²)) ). Φ — standart normal CDF (Abramowitz–Stegun yaqinlashuvi).
function chiSquarePValue(chi2: number, df: number): number {
  if (df === 1) return 2 * (1 - normalCDF(Math.sqrt(chi2)));
  // df > 1 uchun kerak bo'lmaydi (bu loyihada faqat 2×2 ishlatiladi)
  return 1;
}

function normalCDF(x: number): number {
  // Abramowitz & Stegun 26.2.17
  const t = 1 / (1 + 0.2316419 * Math.abs(x));
  const d = 0.3989422804014327 * Math.exp(-(x * x) / 2);
  const prob =
    d * t * (0.319381530 + t * (-0.356563782 + t * (1.781477937 + t * (-1.821255978 + t * 1.330274429))));
  return x > 0 ? 1 - prob : prob;
}

// p-qiymatni akademik ko'rinishda ifodalash: <0,001 / 0,0NN
export function formatP(p: number, locale = "uz-UZ"): string {
  if (p < 0.001) return "< 0,001";
  const nf = new Intl.NumberFormat(locale, { minimumFractionDigits: 3, maximumFractionDigits: 3 });
  return nf.format(p);
}
