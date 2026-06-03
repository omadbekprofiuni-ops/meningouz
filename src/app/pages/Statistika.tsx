import { LineChart, Layers } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { ChartExplorer } from "../components/ChartExplorer";
import { SurveillanceAtlas } from "../components/SurveillanceAtlas";
import { MONTHLY, WEEKLY, COMPARISON, TOTALS, META } from "../data/stats";
import { DISTRICTS, AGE_DISTRIBUTION } from "../data/districts";
import { CITY_HISTORY, HISTORY_FACTS } from "../data/history";
import { useI18n } from "../i18n";

export function Statistika() {
  const { t } = useI18n();

  // Yillik taqqoslash (real: 2025 ≈ baza, 2026 = 277)
  const yearData = [
    { year: "2025", cases: COMPARISON.year2025 },
    { year: "2026", cases: COMPARISON.year2026 },
  ];

  // Oylik dinamika (2026) — holatlar + vafot
  const monthData = MONTHLY.map((m) => ({ month: m.month, cases: m.cases, deaths: m.deaths }));

  // Tumanlar (holat bo'yicha kamayish tartibida)
  const districtData = [...DISTRICTS]
    .sort((a, b) => b.cases - a.cases)
    .map((d) => ({ name: d.name, cases: d.cases, deaths: d.deaths }));

  const ageData = AGE_DISTRIBUTION.map((a) => ({ label: a.label, value: a.value }));
  const ageColors = AGE_DISTRIBUTION.map((a) => a.color);

  // 15 yillik tarixiy dinamika (2012–2026) — oldingi cho'qqilar va joriy epidemiya
  const historyData = CITY_HISTORY.map((h) => ({ year: String(h.year), cases: h.cases }));
  const historyColors = CITY_HISTORY.map((h) =>
    h.year === 2026 ? "#F43F5E" : h.year === 2019 || h.year === 2016 ? "#F59E0B" : "#34D399"
  );

  return (
    <div className="p-4 md:p-8 max-w-[1280px] mx-auto space-y-12 pb-16">
      <PageHeader
        icon={LineChart}
        title="Interaktiv statistika"
        subtitle="Ma'lumotlarni o'zingiz o'rganing — ko'rinishni almashtiring (chiziq / ustun / jadval), yillarni va hududlarni solishtiring."
        kpis={[
          { label: "Jami holat", value: TOTALS.totalCases, color: "#34D399" },
          { label: "2025 ga nisbatan", value: `${COMPARISON.growthCity}×`, color: "#F43F5E" },
          { label: "CFR", value: `${TOTALS.cfr}%`, color: "#FBBF24" },
        ]}
      />

      {/* OWID "Explore" sarlavhasi */}
      <div className="border-b border-[#E5E7EB] pb-4">
        <h1 className="font-display text-[28px] md:text-[34px] font-bold text-[#1d3d63]">{t("Ma'lumotlarni o'rganing")}</h1>
        <p className="text-[14px] text-[#6B7280] mt-1">
          {t("Toshkent shahridagi meningokokk infeksiyasi o'chog'i bo'yicha interaktiv grafiklar to'plami.")} · {META.cityReportDate}–{META.lastUpdate}
        </p>
      </div>

      {/* 0. Featured — 15 yillik tarixiy dinamika (eng kuchli kontekst) */}
      <ChartExplorer
        title="15 yillik tarixiy dinamika (2012–2026)"
        narrative={[
          `Toshkent shahrida meningokokk infeksiyasi davriy ko'tarilishlar bilan kechgan: 2016-yil ${88} va 2019-yil ${HISTORY_FACTS.priorPeakCases} holat oldingi cho'qqilar bo'lgan.`,
          `2026-yildagi ${HISTORY_FACTS.currentCases} holat — kuzatuv tarixidagi eng yuqori ko'rsatkich bo'lib, 2026 gacha bo'lgan rekorddan (${HISTORY_FACTS.priorPeakCases}, 2019) ${HISTORY_FACTS.vsPriorPeak} barobar yuqori.`,
          "2024–2025 yillar bo'yicha shahar darajasidagi alohida ko'rsatkich ushbu hujjatlarda yo'q (respublika: 18 va 35) — grafikda bo'sh qoldirilgan.",
        ]}
        data={historyData}
        xKey="year"
        series={[{ key: "cases", name: "Holatlar soni", color: "#34D399" }]}
        views={["bar", "table"]}
        defaultView="bar"
        barCellColors={historyColors}
        source="Toshkent sh. 2012–2023 yillik jadvali (SSV) + 2026 operativ reestr"
        updated={META.lastUpdate}
        note="Qizil — 2026 (joriy epidemiya); sariq — oldingi cho'qqilar (2016, 2019)."
      />

      {/* 1. Featured — yillik taqqoslash (chap hikoя + o'ng grafik) */}
      <ChartExplorer
        title="Kasallanish 2025 yilga nisbatan necha barobar oshdi?"
        narrative={[
          "2026 yilning birinchi choragida Toshkent shahrida meningokokk infeksiyasi holatlari keskin ko'tarildi.",
          `Joriy yilda jami ${COMPARISON.year2026} holat qayd etildi — bu 2025 yildagi darajadan ${COMPARISON.growthCity} barobar yuqori. Respublika bo'yicha o'sish ${COMPARISON.growthRepublic} barobarni tashkil etdi.`,
          "Ko'rinishni almashtirib (Ustun / Jadval) raqamlarni batafsil ko'rishingiz mumkin.",
        ]}
        data={yearData}
        xKey="year"
        series={[{ key: "cases", name: "Holatlar soni", color: "#F43F5E" }]}
        views={["bar", "table"]}
        defaultView="bar"
        barCellColors={["#94A3B8", "#F43F5E"]}
        source="Hokimiyatga ma'lumotnoma"
        updated={META.cityReportDate}
        note="2025 yil — bazaviy daraja (operativ baholash). 2026 — 17.04 holati."
      />

      {/* 2. Oylik dinamika */}
      <ChartExplorer
        title="Oylik dinamika (2026)"
        subtitle="Toshkent shahri · yangi holatlar va vafot etganlar"
        data={monthData}
        xKey="month"
        series={[
          { key: "cases", name: "Holatlar", color: "#3B82F6" },
          { key: "deaths", name: "Vafot", color: "#EF4444" },
        ]}
        views={["line", "bar", "table"]}
        defaultView="line"
        source="MKI bemorlar ro'yxati"
        updated={META.lastUpdate}
        note="* Aprel — 17-aprelgacha bo'lgan ma'lumot."
      />

      {/* 3. Haftalik epi-egri */}
      <ChartExplorer
        title="Haftalik epidemik egri"
        subtitle="Epidemiya 9-haftada (23-fevral) keskin ko'tarildi"
        data={WEEKLY}
        xKey="week"
        series={[{ key: "cases", name: "Holatlar soni", color: "#10B981" }]}
        views={["line", "bar", "table"]}
        defaultView="line"
        source="MKI bemorlar ro'yxati"
        updated={META.lastUpdate}
      />

      {/* 4. Yosh taqsimoti */}
      <ChartExplorer
        title="Yosh guruhlari kesimi"
        subtitle="Holatlarning 97,5% — 14 yoshgacha bo'lgan bolalar"
        data={ageData}
        xKey="label"
        series={[{ key: "value", name: "Holatlar soni", color: "#10B981" }]}
        views={["bar", "table"]}
        defaultView="bar"
        barCellColors={ageColors}
        source="2026 tumanlar jadvali (MKI)"
        updated={META.lastUpdate}
      />

      {/* 5. Tumanlar */}
      <ChartExplorer
        title="Tumanlar kesimida holatlar"
        subtitle="Toshkent shahridagi 12 tuman bo'yicha"
        data={districtData}
        xKey="name"
        series={[{ key: "cases", name: "Holatlar soni", color: "#F59E0B" }]}
        views={["bar", "table"]}
        defaultView="bar"
        source="2026 tumanlar jadvali (MKI)"
        updated={META.lastUpdate}
      />

      {/* ECDC-uslubidagi kuzatuv atlasi */}
      <div className="border-t border-[#E5E7EB] pt-10">
        <div className="flex items-center gap-2 mb-1">
          <Layers className="w-6 h-6 text-[#10B981]" />
          <h1 className="font-display text-[28px] md:text-[34px] font-bold text-[#1d3d63]">{t("Kuzatuv atlasi")}</h1>
        </div>
        <p className="text-[14px] text-[#6B7280] mb-6 max-w-2xl">
          {t("Hudud darajasi va ko'rsatkichni tanlang — jadval, xarita, dinamika va yosh kesimi birgalikda yangilanadi (ECDC Surveillance Atlas uslubida).")}
        </p>
        <SurveillanceAtlas />
      </div>
    </div>
  );
}
