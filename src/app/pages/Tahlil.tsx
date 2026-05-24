import { useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Cell,
  PieChart,
  Pie,
  Legend,
} from "recharts";
import clsx from "clsx";
import { TrendingUp, Users, FlaskConical, Activity, Layers, BarChart3 } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import {
  LAB,
  TRANSMISSION,
  COMPARISON,
  OUTCOMES,
  TOTALS,
  META,
} from "../data/stats";
import { DISTRICTS, AGE_DISTRIBUTION, SOCIAL_DISTRIBUTION, DISTRICT_TOTALS } from "../data/districts";
import { useI18n } from "../i18n";

const labData = [
  { name: "Tasdiqlangan", value: LAB.confirmed, color: "#10B981" },
  { name: "Aniqlanmagan", value: LAB.notConfirmed, color: "#9CA3AF" },
  { name: "Jarayonda", value: LAB.inProgress, color: "#F59E0B" },
];

function Section({ icon: Icon, title, sub, children }: { icon: any; title: string; sub?: string; children: React.ReactNode }) {
  const { t } = useI18n();
  return (
    <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-1">
        <Icon className="w-5 h-5 text-[#10B981]" />
        <h2 className="text-[16px] font-semibold text-[#111827]">{t(title)}</h2>
      </div>
      {sub && <p className="text-[13px] text-[#6B7280] mb-4">{t(sub)}</p>}
      {children}
    </div>
  );
}

export function Tahlil() {
  const { t } = useI18n();
  const [districtMetric, setDistrictMetric] = useState<"cases" | "intensity">("cases");
  const districtsSorted = [...DISTRICTS].sort((a, b) =>
    districtMetric === "cases" ? b.cases - a.cases : b.intensity - a.intensity
  );
  const maxD = Math.max(...districtsSorted.map((d) => (districtMetric === "cases" ? d.cases : d.intensity)));

  const funnel = [
    { label: "Ro'yxatga olingan", value: OUTCOMES.registered, color: "#3B82F6" },
    { label: "Tuzalgan / chiqarilgan", value: OUTCOMES.recovered, color: "#10B981" },
    { label: "Davolanmoqda", value: OUTCOMES.treating, color: "#F59E0B" },
    { label: "Vafot etgan", value: OUTCOMES.deaths, color: "#EF4444" },
  ];

  return (
    <div className="p-4 md:p-8 max-w-[1280px] mx-auto space-y-6">
      <PageHeader
        icon={BarChart3}
        title="Chuqur tahlil"
        subtitle={`Toshkent shahri · 277 holat kesimida statistik tahlil (${META.cityReportDate}–${META.lastUpdate})`}
        kpis={[
          { label: "Intensivlik / 100k", value: DISTRICT_TOTALS.intensity, color: "#22D3EE" },
          { label: "Bolalar ulushi", value: `${DISTRICT_TOTALS.childrenPct}%`, color: "#FBBF24" },
          { label: "CFR", value: `${TOTALS.cfr}%`, color: "#F43F5E" },
          { label: "2025 ga nisbatan", value: `${COMPARISON.growthCity}×`, color: "#34D399" },
        ]}
      />

      {/* District ranking */}
      <Section icon={Layers} title="Tumanlar reytingi" sub="Toshkent shahridagi 12 tuman bo'yicha">
        <div className="flex justify-end mb-4">
          <div className="flex bg-[#F3F4F6] p-1 rounded-lg">
            {([["cases", "Holatlar soni"], ["intensity", "Intensivlik (100k)"]] as const).map(([k, l]) => (
              <button
                key={k}
                onClick={() => setDistrictMetric(k)}
                className={clsx(
                  "px-4 py-1.5 text-[13px] font-medium rounded-md transition-all",
                  districtMetric === k ? "bg-white text-[#111827] shadow-sm" : "text-[#6B7280] hover:text-[#111827]"
                )}
              >
                {t(l)}
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-2.5">
          {districtsSorted.map((d, i) => {
            const v = districtMetric === "cases" ? d.cases : d.intensity;
            const pct = (v / maxD) * 100;
            const color = d.intensity >= 11 ? "#EF4444" : d.intensity >= 8 ? "#F59E0B" : "#10B981";
            return (
              <div key={d.name} className="flex items-center gap-3">
                <span className="w-5 text-[12px] text-[#9CA3AF] text-right tabular-nums">{i + 1}</span>
                <span className="w-28 text-[13px] font-medium text-[#374151] truncate">{d.name}</span>
                <div className="flex-1 h-6 bg-[#F3F4F6] rounded-md overflow-hidden relative">
                  <div className="h-full rounded-md transition-all flex items-center justify-end pr-2" style={{ width: `${Math.max(pct, 8)}%`, backgroundColor: color }}>
                    <span className="text-[11px] font-bold text-white tabular-nums">{v}{districtMetric === "intensity" ? "" : ""}</span>
                  </div>
                </div>
                <span className="w-10 text-[12px] text-[#EF4444] text-right tabular-nums">{d.deaths ? `†${d.deaths}` : ""}</span>
              </div>
            );
          })}
        </div>
        <p className="text-[11px] text-[#9CA3AF] mt-3">{t("† — tumanda qayd etilgan vafot soni. Rang: intensivlik darajasi (qizil ≥11, sariq ≥8).")}</p>
      </Section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Age distribution */}
        <Section icon={Users} title="Yosh taqsimoti" sub="14 yoshgacha bolalar — 97,5%">
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={AGE_DISTRIBUTION} layout="vertical" margin={{ left: 20, right: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#F3F4F6" />
                <XAxis type="number" tick={{ fontSize: 12, fill: "#6B7280" }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="label" tickFormatter={(v: string) => t(v)} tick={{ fontSize: 12, fill: "#374151" }} width={100} axisLine={false} tickLine={false} />
                <RechartsTooltip formatter={(v: number) => [`${v} ta`, "Holat"]} contentStyle={{ borderRadius: 8, fontSize: 13 }} />
                <Bar dataKey="value" radius={[0, 6, 6, 0]} maxBarSize={28}>
                  {AGE_DISTRIBUTION.map((g) => <Cell key={g.label} fill={g.color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Section>

        {/* Social groups */}
        <Section icon={Activity} title="Ijtimoiy guruh / o'choq" sub="Holatlar qayerda qayd etilgani">
          <div className="space-y-4 pt-3">
            {SOCIAL_DISTRIBUTION.map((s) => (
              <div key={s.label}>
                <div className="flex justify-between text-[13px] mb-1">
                  <span className="text-[#374151] font-medium">{t(s.label)}</span>
                  <span className="font-semibold tabular-nums text-[#111827]">{s.value} <span className="text-[#9CA3AF] font-normal">({s.pct}%)</span></span>
                </div>
                <div className="w-full h-3 bg-[#F3F4F6] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#10B981] to-[#34D399] rounded-full" style={{ width: `${s.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Lab donut */}
        <Section icon={FlaskConical} title="Laboratoriya natijalari" sub={`${LAB.confirmedPct}% — N. meningitidis tasdiqlangan`}>
          <div className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={labData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={55} outerRadius={90} paddingAngle={2}>
                  {labData.map((d) => <Cell key={d.name} fill={d.color} />)}
                </Pie>
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <RechartsTooltip formatter={(v: number) => [`${v} ta`, ""]} contentStyle={{ borderRadius: 8, fontSize: 13 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Section>

        {/* Outcomes funnel */}
        <Section icon={TrendingUp} title="Kasallik yakunlari" sub={`1-son YuKSh · ${OUTCOMES.registered} bemor ro'yxatga olingan`}>
          <div className="space-y-3 pt-2">
            {funnel.map((f) => {
              const pct = (f.value / OUTCOMES.registered) * 100;
              return (
                <div key={f.label}>
                  <div className="flex justify-between text-[13px] mb-1">
                    <span className="text-[#374151] font-medium">{t(f.label)}</span>
                    <span className="font-semibold tabular-nums" style={{ color: f.color }}>{f.value} ({pct.toFixed(0)}%)</span>
                  </div>
                  <div className="w-full h-7 bg-[#F3F4F6] rounded-md overflow-hidden">
                    <div className="h-full rounded-md transition-all" style={{ width: `${Math.max(pct, 4)}%`, backgroundColor: f.color }} />
                  </div>
                </div>
              );
            })}
          </div>
        </Section>
      </div>

      {/* Transmission + comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Section icon={Layers} title="Taxminiy yuqish manbalari" sub="Epidemiologik surishtiruv natijalari">
          <div className="space-y-3 pt-2">
            {TRANSMISSION.map((tr) => (
              <div key={tr.source} className="flex items-center gap-3">
                <div className="flex-1 text-[13px] text-[#374151]">{t(tr.source)}</div>
                <div className="text-[15px] font-bold text-[#111827] tabular-nums whitespace-nowrap">
                  {tr.type === "pct" ? `${tr.value}%` : `${tr.value} ${t("ta")}`}
                </div>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-[#9CA3AF] mt-3">{t("31,4% holat savdo majmualaridagi yopiq bolalar o'yingohlarida yuqtirilgan deb gumon qilinmoqda.")}</p>
        </Section>

        <Section icon={TrendingUp} title="2025 — 2026 taqqoslash" sub={`Kasallanish ${COMPARISON.growthCity} barobar oshgan`}>
          <div className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[{ y: "2025", v: COMPARISON.year2025 }, { y: "2026", v: COMPARISON.year2026 }]}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                <XAxis dataKey="y" tick={{ fontSize: 13, fill: "#374151" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "#6B7280" }} axisLine={false} tickLine={false} />
                <RechartsTooltip formatter={(v: number) => [`${v} ta`, "Holat"]} contentStyle={{ borderRadius: 8, fontSize: 13 }} />
                <Bar dataKey="v" radius={[6, 6, 0, 0]} maxBarSize={90}>
                  <Cell fill="#94A3B8" />
                  <Cell fill="#EF4444" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Section>
      </div>

      {/* Source footer */}
      <div className="text-[12px] text-[#9CA3AF] border-t border-[#E5E7EB] pt-4">
        <b>{t("Ma‘lumot manbalari")}:</b> {t("Toshkent shahar Hokimiyatiga ma'lumotnoma (14.04.2026), MKI beмorlar ro'yxati (17.04.2026), 2026 tumanlar jadvali, ССВ respublika ma'lumotnomasi (28.03.2026). Tumanlar kesimi 277 ta holatga asoslangan.")}
      </div>
    </div>
  );
}
