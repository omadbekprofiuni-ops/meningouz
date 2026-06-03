import { useState } from "react";
import { FlaskConical, Activity, FileText, Skull } from "lucide-react";
import clsx from "clsx";
import { DEATHS, DEATH_STATS } from "../data/deaths";
import { LAB } from "../data/stats";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { PageHeader } from "../components/PageHeader";
import { useI18n } from "../i18n";

const labData = [
  { name: "Tasdiqlangan", value: LAB.confirmed, color: "#10B981" },
  { name: "Tasdiqlanmagan", value: LAB.notConfirmed, color: "#9CA3AF" },
  { name: "Jarayonda", value: LAB.inProgress, color: "#F59E0B" },
];

// Maxfiylik — familiyani niqoblash: "Saidov M.X." -> "S. M.X."
function maskFio(fio: string): string {
  const parts = fio.trim().split(/\s+/);
  if (parts.length === 0) return fio;
  const masked = parts[0].charAt(0).toUpperCase() + ".";
  return [masked, ...parts.slice(1)].join(" ");
}

export function Kabinet() {
  const { t, lang, fmt } = useI18n();
  const [query, setQuery] = useState("");
  // Bolalar ulushi (issue #5): 19/23 ≈ 82,6% — avvalgi 78,9% xato edi
  const childrenPct = fmt(DEATH_STATS.childrenPct, 1);
  const childrenSummary =
    lang === "ru"
      ? `${DEATH_STATS.children} (${childrenPct}%) — дети`
      : lang === "en"
        ? `${DEATH_STATS.children} (${childrenPct}%) are children`
        : `${DEATH_STATS.children} nafari (${childrenPct}%) bolalar`;
  const filtered = DEATHS.filter(
    (d) => d.fio.toLowerCase().includes(query.toLowerCase()) || d.district.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="p-4 md:p-8 max-w-[1280px] mx-auto space-y-8">
      <PageHeader
        icon={Skull}
        title="Tibbiyot xodimlari kabineti"
        subtitle="Klinik reestr, laboratoriya natijalari va statistik hisobot"
        accent="#F43F5E"
        kpis={[
          { label: "Vafot etgan", value: DEATH_STATS.total, color: "#F43F5E" },
          { label: "Lab. tasdiq", value: LAB.confirmed, color: "#22D3EE" },
          { label: "Jarayonda", value: LAB.inProgress, color: "#FBBF24" },
        ]}
      />

      {/* Stat tiles */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Skull, label: "Vafot etganlar", value: DEATH_STATS.total, sub: `${DEATH_STATS.children} ${t("bola")} · ${DEATH_STATS.adults} ${t("katta")}`, color: "#EF4444" },
          { icon: Activity, label: "O'rtacha kechish", value: `${DEATH_STATS.avgDaysToDeath} ${t("kun")}`, sub: t("kasallikdan vafotgacha"), color: "#F59E0B" },
          { icon: FlaskConical, label: "Lab. tasdiqlangan", value: LAB.confirmed, sub: `N. meningitidis (${LAB.confirmedPct}%)`, color: "#10B981" },
          { icon: FileText, label: "Tahlil jarayonda", value: LAB.inProgress, sub: t("natija kutilmoqda"), color: "#3B82F6" },
        ].map((c) => (
          <div key={c.label} className="bg-white rounded-xl border border-[#E5E7EB] p-5 shadow-sm relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1" style={{ backgroundColor: c.color }} />
            <div className="flex items-center gap-2 mb-2">
              <c.icon className="w-4 h-4" style={{ color: c.color }} />
              <span className="text-[12px] font-medium text-[#6B7280] uppercase tracking-wide">{t(c.label)}</span>
            </div>
            <div className="text-[26px] font-bold text-[#111827] tabular-nums leading-none">{typeof c.value === "number" ? c.value.toLocaleString() : c.value}</div>
            <p className="text-[12px] text-[#9CA3AF] mt-1">{c.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lab pie */}
        <div className="bg-white rounded-2xl border border-[#E5E7EB] p-5 shadow-sm">
          <h2 className="text-[16px] font-semibold text-[#111827] mb-1">{t("Laboratoriya natijalari")}</h2>
          <p className="text-[13px] text-[#6B7280] mb-2">{t("Olingan namunalar bo'yicha")}</p>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={labData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={85} paddingAngle={2} isAnimationActive={false}>
                  {labData.map((d) => <Cell key={d.name} fill={d.color} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 8, fontSize: 13 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-1.5">
            {labData.map((d) => (
              <div key={d.name} className="flex items-center justify-between text-[13px]">
                <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm" style={{ backgroundColor: d.color }} />{t(d.name)}</span>
                <span className="font-semibold tabular-nums">{d.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Death registry */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-[#E5E7EB] shadow-sm overflow-hidden flex flex-col">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 border-b border-[#E5E7EB] bg-[#FAFAFA]">
            <div>
              <h2 className="text-[16px] font-semibold text-[#111827]">{t("Vafot etgan bemorlar reestri")}</h2>
              <p className="text-[13px] text-[#6B7280]">{t("Yakuniy tashxis: yashin tezligidagi meningokokksemiya")}</p>
            </div>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("F.I.Sh yoki tuman...")}
              className="px-3 py-2 bg-[#F3F4F6] border-none rounded-md text-[13px] focus:ring-2 focus:ring-[#10B981] outline-none w-full sm:w-[200px]"
            />
          </div>
          <div className="overflow-x-auto max-h-[420px] overflow-y-auto">
            <table className="w-full text-left border-collapse min-w-[640px]">
              <thead className="sticky top-0 bg-[#F9FAFB] z-10">
                <tr className="border-b-2 border-[#E5E7EB]">
                  {["#", "F.I.Sh.", "Yosh", "Tuman", "Kasallangan", "Yotqizilgan", "Vafot"].map((h) => (
                    <th key={h} className="px-3 py-2.5 text-[11px] font-bold text-[#6B7280] uppercase tracking-wider whitespace-nowrap">{t(h)}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E7EB]">
                {filtered.map((d) => (
                  <tr key={d.n} className="hover:bg-[#F3F4F6] transition-colors">
                    <td className="px-3 py-2 text-[13px] text-[#6B7280] text-center">{d.n}</td>
                    <td className="px-3 py-2 text-[13px] font-medium text-[#111827] whitespace-nowrap">{maskFio(d.fio)}</td>
                    <td className="px-3 py-2">
                      <span className={clsx("text-[12px] px-2 py-0.5 rounded font-medium", d.isChild ? "bg-[#FEE2E2] text-[#EF4444]" : "bg-[#EFF6FF] text-[#3B82F6]")}>
                        {d.age}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-[13px] text-[#374151]">{d.district}</td>
                    <td className="px-3 py-2 text-[13px] text-[#6B7280] tabular-nums">{d.sick}</td>
                    <td className="px-3 py-2 text-[13px] text-[#6B7280] tabular-nums">{d.hosp}</td>
                    <td className="px-3 py-2 text-[13px] font-semibold text-[#EF4444] tabular-nums">{d.death}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-5 py-3 border-t border-[#E5E7EB] bg-[#FAFAFA] text-[12px] text-[#6B7280]">
            {t("Jami")} {filtered.length} {t("ta yozuv")} · {childrenSummary}
          </div>
        </div>
      </div>
    </div>
  );
}
