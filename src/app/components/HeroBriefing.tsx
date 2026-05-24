import { TOTALS, OUTCOMES, LAB, WEEKLY, MONTHLY } from "../data/stats";
import { useI18n } from "../i18n";

// Epidemik egri (backdrop sparkline) — WEEKLY ma'lumotidan SVG area path
function curvePath(w: number, h: number) {
  const max = Math.max(...WEEKLY.map((d) => d.cases));
  const step = w / (WEEKLY.length - 1);
  const pts = WEEKLY.map((d, i) => [i * step, h - (d.cases / max) * h]);
  const line = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");
  return { line, area: `${line} L${w},${h} L0,${h} Z` };
}

export function HeroBriefing() {
  const { t } = useI18n();
  const { line, area } = curvePath(800, 200);
  const aprel = MONTHLY[MONTHLY.length - 1].cases;

  const stats = [
    { label: "Vafot etgan", value: TOTALS.deaths, sub: "85% bolalar", color: "#F43F5E" },
    { label: "Tuzalgan", value: OUTCOMES.recovered, sub: "uyga chiqarilgan", color: "#34D399" },
    { label: "Lab. tasdiq", value: LAB.confirmed, sub: `${LAB.confirmedPct}% · N. meningitidis`, color: "#22D3EE" },
  ];

  return (
    <div className="relative overflow-hidden rounded-[20px] border border-white/[0.07] shadow-2xl"
      style={{ background: "radial-gradient(120% 120% at 80% 0%, #1B1030 0%, #0C1020 45%, #080B14 100%)" }}>
      {/* mesh + petechiae motiflar */}
      <div className="absolute inset-0 grid-mesh opacity-60 pointer-events-none" />
      <div className="absolute -top-10 -right-10 w-[340px] h-[340px] petechiae opacity-90 pointer-events-none" />

      {/* epidemik egri backdrop */}
      <svg viewBox="0 0 800 200" preserveAspectRatio="none" className="absolute bottom-0 left-0 w-full h-[46%] pointer-events-none">
        <defs>
          <linearGradient id="heroCurve" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={area} fill="url(#heroCurve)" />
        <path d={line} fill="none" stroke="#A78BFA" strokeWidth="2" opacity="0.5" />
      </svg>

      <div className="relative z-10 p-6 md:p-9">
        {/* top row */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-7">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F43F5E] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#F43F5E]" />
            </span>
            <span className="text-[11px] font-semibold tracking-[0.18em] text-[#F43F5E] uppercase">{t("Jonli o'choq monitoringi")}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[12px] text-slate-400">{t("Toshkent shahri")} · 17.04.2026</span>
            <span className="text-[11px] font-bold tracking-wide text-[#FCA5A5] bg-[#F43F5E]/15 border border-[#F43F5E]/30 px-2.5 py-1 rounded-full">
              {t("XAVF: YUQORI")}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8 items-end">
          {/* big number */}
          <div>
            <h2 className="text-[15px] md:text-[17px] font-semibold text-slate-300 mb-1">
              {t("Meningokokk infeksiyasi o'chog'i")}
            </h2>
            <div className="text-[11px] font-semibold tracking-[0.2em] text-slate-500 uppercase mb-2">
              {t("Kasallanganlar")} · Toshkent sh.
            </div>
            <div className="flex items-end gap-4">
              <span className="font-display text-white text-[72px] md:text-[96px] leading-[0.85] text-glow-violet">
                {TOTALS.totalCases}
              </span>
              <div className="pb-2 space-y-1.5">
                <div className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#FCA5A5] bg-[#F43F5E]/10 px-2 py-0.5 rounded">
                  ↑ +{aprel} {t("aprelda")}
                </div>
                <div className="text-[12px] text-slate-400">
                  {t("2025 yilga nisbatan")} <span className="text-[#FBBF24] font-bold">{TOTALS.growthVs2025}×</span> · {t("respublika")} {TOTALS.republicCases}
                </div>
              </div>
            </div>
          </div>

          {/* stat chips */}
          <div className="grid grid-cols-3 gap-3">
            {stats.map((s) => (
              <div key={s.label} className="relative rounded-xl bg-white/[0.04] border border-white/[0.06] px-3 py-3 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ backgroundColor: s.color }} />
                <div className="text-[10px] font-semibold uppercase tracking-wide text-slate-400 mb-1">{t(s.label)}</div>
                <div className="font-display text-[28px] md:text-[32px] leading-none" style={{ color: s.color }}>
                  {s.value}
                </div>
                <div className="text-[10px] text-slate-500 mt-1 leading-tight">{t(s.sub)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* severity meter */}
        <div className="mt-7 pt-5 border-t border-white/[0.06]">
          <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2">
            <span>{t("O'lim koeffitsiyenti (CFR)")}</span>
            <span className="text-[#F43F5E] font-bold">{TOTALS.cfr}%</span>
          </div>
          <div className="h-1.5 w-full bg-white/[0.06] rounded-full overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-[#FBBF24] via-[#F43F5E] to-[#F43F5E]"
              style={{ width: `${Math.min(TOTALS.cfr * 6, 100)}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}
