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
} from "recharts";
import { Clock, ShieldAlert, FlaskConical, Syringe } from "lucide-react";
import clsx from "clsx";
import {
  META,
  TOTALS,
  OUTCOMES,
  MONTHLY,
  WEEKLY,
  REGIONS,
  LAB,
  PREVENTION,
  CLINICAL_SIGNS,
  HIGHLIGHTS,
} from "../data/stats";
import { AGE_DISTRIBUTION, SOCIAL_DISTRIBUTION } from "../data/districts";
import { RadarPanel } from "../components/RadarPanel";
import { HeroBriefing } from "../components/HeroBriefing";
import { useI18n } from "../i18n";

const AGE_GROUPS = AGE_DISTRIBUTION;
const SETTINGS = SOCIAL_DISTRIBUTION;

const liveUpdates = [
  { id: 1, time: "17.04.2026", text: "Toshkent shahri bo'yicha jami 277 ta holat ro'yxatga olindi. Aprel oyida 105 ta yangi holat qayd etildi." },
  { id: 2, time: "14.04.2026", text: "Hokimiyatga ma'lumotnoma: 264 holat, 8,3/100k — 2025 yilga nisbatan 17,6 barobar ko'p. 183 ta (69,3%) lab. tasdiqlangan." },
  { id: 3, time: "12.04.2026", text: "1,5 oylik chaqaloq Saidov M.X. meningokokksemiya asoratidan vafot etdi (23-vafot holati)." },
  { id: 4, time: "23.02.2026", text: "9-haftadan boshlab kasallanish keskin ko'tarildi. Epidemik ko'rsatma bo'yicha emlash boshlandi." },
  { id: 5, time: "Profilaktika", text: `Muloqotdagilardan ${PREVENTION.contactsSwabbed.toLocaleString()} nafar surtma topshirdi, ${PREVENTION.vaccinated.toLocaleString()} nafar emlandi.` },
];

export function Dashboard() {
  const { t } = useI18n();
  const [chartMetric, setChartMetric] = useState<"monthly" | "weekly">("monthly");

  const chartData =
    chartMetric === "monthly"
      ? MONTHLY.map((m) => ({ label: m.month, cases: m.cases }))
      : WEEKLY.map((w) => ({ label: w.week, cases: w.cases }));

  return (
    <div className="p-4 md:p-8 max-w-[1440px] mx-auto space-y-8">
      {/* 1. CUSTOM OUTBREAK BRIEFING HERO */}
      <HeroBriefing />

      {/* 1b. HIGHLIGHTS (Worldometer uslubida asosiy faktlar) */}
      <div className="bg-white border border-[#E5E7EB] border-l-4 border-l-[#F59E0B] rounded-r-xl rounded-l-sm p-5 shadow-sm">
        <h2 className="text-[13px] font-bold text-[#B45309] uppercase tracking-wide mb-3">{t("Asosiy faktlar")}</h2>
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2.5">
          {HIGHLIGHTS.map((h) => (
            <li key={h} className="flex gap-2 text-[13px] text-[#374151] leading-snug">
              <span className="text-[#F59E0B] mt-0.5 flex-shrink-0">▸</span>
              {t(h)}
            </li>
          ))}
        </ul>
      </div>

      {/* 2. PROFILAKTIKA KO'RSATKICHLARI */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Surtma topshirdi", value: PREVENTION.contactsSwabbed, sub: "muloqotdagilar", color: "#3B82F6", icon: FlaskConical },
          { label: "Sog'lom tashuvchi", value: PREVENTION.carriersFound, sub: "aniqlangan (0,5%)", color: "#F59E0B", icon: ShieldAlert },
          { label: "Emlanganlar", value: PREVENTION.vaccinated, sub: "muloqotdagilar", color: "#10B981", icon: Syringe },
          { label: "Kimyoviy profilaktika", value: PREVENTION.chemoProphylaxis, sub: "tavsiya etilgan", color: "#6B7280", icon: ShieldAlert },
        ].map((c) => (
          <div key={c.label} className="bg-white rounded-xl border border-[#E5E7EB] p-5 shadow-sm relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1" style={{ backgroundColor: c.color }} />
            <div className="flex items-center gap-2 mb-2">
              <c.icon className="w-4 h-4" style={{ color: c.color }} />
              <span className="text-[12px] font-medium text-[#6B7280] uppercase tracking-wide">{t(c.label)}</span>
            </div>
            <div className="text-[28px] font-bold text-[#111827] tabular-nums leading-none">{c.value.toLocaleString()}</div>
            <p className="text-[12px] text-[#9CA3AF] mt-1">{t(c.sub)}</p>
          </div>
        ))}
      </div>

      {/* 3. CHART & LIVE UPDATES SPLIT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-[#E5E7EB] p-5 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
            <h2 className="text-[16px] font-semibold text-[#111827]">{t("Kasallanish dinamikasi")}</h2>
            <div className="flex bg-[#F3F4F6] p-1 rounded-lg">
              <button
                onClick={() => setChartMetric("monthly")}
                className={clsx(
                  "px-4 py-1.5 text-[13px] font-medium rounded-md transition-all",
                  chartMetric === "monthly" ? "bg-white text-[#111827] shadow-sm" : "text-[#6B7280] hover:text-[#111827]"
                )}
              >
                {t("Oylik")}
              </button>
              <button
                onClick={() => setChartMetric("weekly")}
                className={clsx(
                  "px-4 py-1.5 text-[13px] font-medium rounded-md transition-all",
                  chartMetric === "weekly" ? "bg-white text-[#111827] shadow-sm" : "text-[#6B7280] hover:text-[#111827]"
                )}
              >
                {t("Haftalik")}
              </button>
            </div>
          </div>

          <div className="h-[280px] w-full min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6B7280" }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6B7280" }} />
                <RechartsTooltip
                  cursor={{ fill: "#F9FAFB" }}
                  contentStyle={{ backgroundColor: "#111827", color: "#fff", borderRadius: "8px", border: "none", fontSize: "13px" }}
                  itemStyle={{ color: "#fff" }}
                  labelStyle={{ color: "#fff" }}
                  formatter={(v: number) => [v, "Holat"]}
                />
                <Bar dataKey="cases" fill="#10B981" radius={[4, 4, 0, 0]} maxBarSize={48}>
                  {chartData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={index === chartData.length - 1 ? "#3B82F6" : "#10B981"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-[12px] text-[#9CA3AF] mt-2">
            {chartMetric === "weekly"
              ? t("Epidemiya 9-haftada (23-fevral) keskin ko'tarildi.")
              : t("* Aprel — 17-aprelgacha bo'lgan ma'lumot.")}
          </p>
        </div>

        {/* Live Updates Timeline */}
        <div className="bg-white rounded-xl border border-[#E5E7EB] p-5 shadow-sm flex flex-col h-full">
          <div className="flex items-center gap-2 mb-6">
            <ShieldAlert className="w-5 h-5 text-[#EF4444]" />
            <h2 className="text-[16px] font-semibold text-[#111827]">{t("So'nggi Yangiliklar")}</h2>
          </div>

          <div className="flex-1 overflow-y-auto pr-2 space-y-6">
            {liveUpdates.map((update, idx) => (
              <div key={update.id} className="relative pl-6">
                {idx !== liveUpdates.length - 1 && (
                  <div className="absolute left-[5px] top-5 bottom-[-24px] w-px bg-[#E5E7EB]"></div>
                )}
                <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 border-white bg-[#10B981] shadow-sm"></div>
                <div className="text-[12px] font-bold text-[#6B7280] mb-1 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {update.time}
                </div>
                <p className="text-[13px] text-[#111827] leading-relaxed">{t(update.text)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. YOSH GURUHLARI + IJTIMOIY GURUH */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Age groups pie */}
        <div className="bg-white rounded-xl border border-[#E5E7EB] p-5 shadow-sm">
          <h2 className="text-[16px] font-semibold text-[#111827] mb-1">{t("Yosh guruhlari kesimi")}</h2>
          <p className="text-[13px] text-[#6B7280] mb-4">{t("97,5% — 14 yoshgacha bo'lgan bolalar")}</p>
          <div className="flex items-center gap-4">
            <div className="h-[180px] w-[180px] flex-shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={AGE_GROUPS} dataKey="value" nameKey="label" cx="50%" cy="50%" innerRadius={45} outerRadius={80} paddingAngle={2}>
                    {AGE_GROUPS.map((g) => (
                      <Cell key={g.label} fill={g.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip formatter={(v: number) => [`${v} ta`, ""]} contentStyle={{ borderRadius: 8, fontSize: 13 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-2">
              {AGE_GROUPS.map((g) => (
                <div key={g.label} className="flex items-center justify-between text-[13px]">
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: g.color }} />
                    {t(g.label)}
                  </span>
                  <span className="font-semibold tabular-nums">{g.value} {t("ta")}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Settings / o'choq */}
        <div className="bg-white rounded-xl border border-[#E5E7EB] p-5 shadow-sm">
          <h2 className="text-[16px] font-semibold text-[#111827] mb-1">{t("Kasallik o'choqlari")}</h2>
          <p className="text-[13px] text-[#6B7280] mb-4">{t("Holatlar qayerda qayd etilgani bo'yicha")}</p>
          <div className="space-y-3">
            {SETTINGS.map((s) => (
              <div key={s.label}>
                <div className="flex justify-between text-[13px] mb-1">
                  <span className="text-[#374151]">{t(s.label)}</span>
                  <span className="font-semibold tabular-nums text-[#111827]">
                    {s.value} <span className="text-[#9CA3AF] font-normal">({s.pct}%)</span>
                  </span>
                </div>
                <div className="w-full h-2 bg-[#F3F4F6] rounded-full overflow-hidden">
                  <div className="h-full bg-[#10B981] rounded-full" style={{ width: `${s.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4b. KLINIK BELGILAR RADARI (FIFA-uslubidagi pentagon) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RadarPanel
          dark
          title="Klinik belgilar profili"
          subtitle="Beмorlarda kuzatilgan belgilar chastotasi (%) — septik (meningokokksemiya) shakli ustun"
          data={CLINICAL_SIGNS}
          axisKey="sign"
          series={[{ name: "Chastota", key: "value", color: "#10B981" }]}
        />
        <div className="lg:col-span-2 bg-white rounded-2xl border border-[#E5E7EB] p-6 shadow-sm flex flex-col justify-center">
          <h3 className="text-[16px] font-semibold text-[#111827] mb-3">{t("Profil nimani ko'rsatadi?")}</h3>
          <ul className="space-y-3 text-[14px] text-[#4B5563]">
            <li className="flex gap-3">
              <span className="text-[#10B981] font-bold">100%</span>
              <span>{t("Isitma va toshma deyarli har bir bemorda kuzatilgan — bu kasallikning eng erta va doimiy belgisi.")}</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#10B981] font-bold">99%</span>
              <span>{t("Es-hush yo'qolishi va qayt qilish — og'ir intoksikatsiya alomatlari.")}</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#EF4444] font-bold">1%</span>
              <span>{t("Meningial belgilar kam — bu o'choq meningokokksemiya (qon sepsisi) shaklida kechgani, klassik meningit emasligini ko'rsatadi. Shu sabab kasallik yashin tezligida kechib, yuqori letallikka olib kelgan.")}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* 5. THE MEGA TABLE — hududlar */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm overflow-hidden flex flex-col">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 border-b border-[#E5E7EB] bg-[#FAFAFA] gap-4">
          <div>
            <h2 className="text-[18px] font-bold text-[#111827]">{t("Hududlar kesimida tahlil")}</h2>
            <p className="text-[13px] text-[#6B7280]">{t("ССВ ma'lumotnomasi")} · {META.reportDate}</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-[#F9FAFB] border-b-2 border-[#E5E7EB]">
                <th className="px-4 py-3 text-[11px] font-bold text-[#6B7280] uppercase tracking-wider border-r border-[#E5E7EB] w-12 text-center">#</th>
                <th className="px-4 py-3 text-[11px] font-bold text-[#6B7280] uppercase tracking-wider border-r border-[#E5E7EB]">{t("Hudud")}</th>
                <th className="px-4 py-3 text-[11px] font-bold text-[#6B7280] uppercase tracking-wider border-r border-[#E5E7EB] text-right">{t("Jami Holat")}</th>
                <th className="px-4 py-3 text-[11px] font-bold text-[#6B7280] uppercase tracking-wider border-r border-[#E5E7EB] text-right">{t("Vafot")}</th>
                <th className="px-4 py-3 text-[11px] font-bold text-[#6B7280] uppercase tracking-wider border-r border-[#E5E7EB] text-right">{t("100k aholiga")}</th>
                <th className="px-4 py-3 text-[11px] font-bold text-[#6B7280] uppercase tracking-wider text-right">{t("Xavf")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {REGIONS.map((row, idx) => (
                <tr key={row.id} className="hover:bg-[#F3F4F6] transition-colors">
                  <td className="px-4 py-2.5 text-[13px] text-[#6B7280] border-r border-[#E5E7EB] text-center font-medium">{idx + 1}</td>
                  <td className="px-4 py-2.5 font-bold text-[#3B82F6] text-[14px] border-r border-[#E5E7EB]">{row.name}</td>
                  <td className="px-4 py-2.5 font-semibold text-[#111827] tabular-nums text-right border-r border-[#E5E7EB]">{row.cases.toLocaleString()}</td>
                  <td className="px-4 py-2.5 font-semibold tabular-nums text-right border-r border-[#E5E7EB]" style={{ color: row.deaths ? "#EF4444" : "#9CA3AF" }}>{row.deaths}</td>
                  <td className="px-4 py-2.5 text-[#6B7280] tabular-nums text-right border-r border-[#E5E7EB] font-medium">{row.per100k}</td>
                  <td className="px-4 py-2.5 text-right">
                    <span
                      className={clsx(
                        "inline-block px-2 py-0.5 rounded text-[12px] font-bold",
                        row.risk === "high" ? "text-[#EF4444] bg-[#FEE2E2]" : row.risk === "medium" ? "text-[#F59E0B] bg-[#FEF3C7]" : "text-[#10B981] bg-[#D1FAE5]"
                      )}
                    >
                      {row.risk === "high" ? t("Yuqori") : row.risk === "medium" ? t("O'rta") : t("Past")}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-[#F9FAFB] border-t-2 border-[#E5E7EB]">
              <tr>
                <td className="px-4 py-3 border-r border-[#E5E7EB]"></td>
                <td className="px-4 py-3 font-bold text-[#111827] text-[14px] border-r border-[#E5E7EB] text-right">{t("JAMI")}:</td>
                <td className="px-4 py-3 font-bold text-[#111827] tabular-nums text-right border-r border-[#E5E7EB]">
                  {REGIONS.reduce((a, r) => a + r.cases, 0).toLocaleString()}
                </td>
                <td className="px-4 py-3 font-bold text-[#EF4444] tabular-nums text-right border-r border-[#E5E7EB]">
                  {REGIONS.reduce((a, r) => a + r.deaths, 0)}
                </td>
                <td className="px-4 py-3 border-r border-[#E5E7EB]"></td>
                <td className="px-4 py-3"></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
