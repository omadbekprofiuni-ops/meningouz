import { BookOpen, FileText, Calendar, Info, Scale, Database, Globe, Library } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { META } from "../data/stats";
import { useI18n } from "../i18n";

// Ma'lumot manbalari — barchasi rasmiy hujjatlardan
const SOURCES = [
  {
    name: "SSV Sanepidqo‘m respublika ma‘lumotnomasi",
    date: "28.03.2026",
    note: "Respublika va viloyatlar kesimida holatlar (jadval va xarita uchun asos).",
  },
  {
    name: "Hokimiyatga ma‘lumotnoma",
    date: "14.04.2026",
    note: "Toshkent shahri: 264 holat, 8,3/100k, lab. tasdiq ulushi.",
  },
  {
    name: "MKI bemorlar ro'yxati (Toshkent shahri)",
    date: "17.04.2026",
    note: "Eng so‘nggi bemorlar ro‘yxati — bosh sahifadagi 277 holat shu manbadan.",
  },
  {
    name: "Vaksina yo‘riqnomasi (ACYW135)",
    date: "Doimiy",
    note: "Amaldagi standart yo‘riqnoma (operativ sanaga bog‘liq emas) — emlash sxemasi va profilaktika ko‘rsatkichlari uchun.",
  },
  {
    name: "Toshkent shahri yillik dinamika jadvali",
    date: "2012–2023",
    note: "Uzoq muddatli kasallanish dinamikasi — oldingi epidemik cho‘qqilar (2016: 88, 2019: 114) va davriylik konteksti.",
  },
  {
    name: "Forma-1 oylik yuqumli kasalliklar hisoboti (respublika)",
    date: "2024–2026",
    note: "Respublika bo‘yicha meningokokk yillik jami (2024: 18, 2025: 35) va viloyat kesimi (2017–2022).",
  },
];

// Codebook (ma'lumotlar lug'ati) — FAIR printsipi: har o'zgaruvchi izohi
const CODEBOOK = [
  { v: "cases", desc: "Ro'yxatga olingan holatlar soni", unit: "butun son", src: "MKI ro'yxati / SSV" },
  { v: "deaths", desc: "Vafot etgan bemorlar soni", unit: "butun son", src: "«Вафот этганлар» varaqasi" },
  { v: "cfr", desc: "O'lim koeffitsiyenti = deaths ÷ cases × 100", unit: "%", src: "hisoblangan" },
  { v: "intensity (per100k)", desc: "Kasallanish intensivligi: cases ÷ aholi × 100 000", unit: "100k aholiga", src: "hisoblangan" },
  { v: "age_group", desc: "Yosh guruhi: <1, 1–2, 3–5, 6–14, ≥15 yosh", unit: "kategoriya", src: "MKI ro'yxati" },
  { v: "social_group", desc: "O'choq turi: uy bolasi, MTT, maktab, kattalar", unit: "kategoriya", src: "epid. surishtiruv" },
  { v: "lab_confirmed", desc: "N. meningitidis laboratoriya tasdig'i", unit: "butun son / %", src: "Hokimiyatga ma'lumotnoma" },
  { v: "contacts_swabbed", desc: "Muloqotdagilardan olingan surtmalar", unit: "butun son", src: "profilaktika hisoboti" },
  { v: "vaccinated", desc: "Epid. ko'rsatma bo'yicha emlangan muloqotdagilar", unit: "butun son", src: "profilaktika hisoboti" },
];

// Xalqaro kontekst — taqqoslash uchun mos yozuvlar (benchmark)
const INTERNATIONAL = [
  {
    metric: "CFR (o'lim koeffitsiyenti)",
    local: "8,3% (95% CI 5,6–12,1%)",
    world: "WHO: davolangan IMD ~10–15%; davolanmagan holda ≈50%",
    note: "Mahalliy CFR xalqaro o'rtacha quyi chegarasida — erta antibiotik terapiya samarasi yoki yengilroq holatlarning ro'yxatga olinishi bilan izohlanishi mumkin (himoyada muhokama qilinadi).",
  },
  {
    metric: "Ustun shakl",
    local: "Meningokokksemiya (septik) — meningial belgilar ~1%",
    world: "Klassik IMD: meningit ~50%, septisemiya ~30%, aralash ~20%",
    note: "O'choqda septik shaklning ustunligi yashin tezligidagi kechish va yuqori letallikni tushuntiradi.",
  },
  {
    metric: "Eng zaif yosh",
    local: "97,5% — 14 yoshgacha; 1–2 yosh eng ko'p",
    world: "ECDC/CDC: eng yuqori incidence <1 yosh va o'smirlar (15–24)",
    note: "Mahalliy taqsimot bog'cha yoshidagi bolalarga siljigan — yopiq bolalar o'yingohlari o'choq omili sifatida.",
  },
];

// Adabiyotlar — iqtibos qilinadigan rasmiy/xalqaro manbalar
const REFERENCES = [
  "World Health Organization. Meningococcal meningitis — Fact sheet. Geneva: WHO; 2023.",
  "World Health Organization. Defeating meningitis by 2030: a global road map. Geneva: WHO; 2021.",
  "European Centre for Disease Prevention and Control. Invasive meningococcal disease — Annual Epidemiological Report. Stockholm: ECDC.",
  "Centers for Disease Control and Prevention. Meningococcal Disease: Surveillance. Atlanta: CDC.",
  "World Medical Association. Declaration of Helsinki — Ethical principles for medical research involving human subjects. 2013.",
  "O'zbekiston Respublikasi. «Shaxsiy ma'lumotlar to'g'risida»gi Qonun (2019, o'zgartirishlar bilan).",
];

// Asosiy atamalar
const DEFINITIONS = [
  {
    term: "CFR (o‘lim koeffitsiyenti)",
    def: "Vafot etganlar sonining tasdiqlangan holatlarga nisbati, foizda. Kasallikning og‘irligini ko‘rsatadi.",
  },
  {
    term: "100k aholiga (incidence)",
    def: "Har 100 000 aholiga to‘g‘ri keladigan holatlar soni — hududlarni teng taqqoslash imkonini beradi.",
  },
  {
    term: "Lab. tasdiqlangan",
    def: "N. meningitidis qo‘zg‘atuvchisi laboratoriya usulida aniqlangan holatlar.",
  },
  {
    term: "Sog‘lom tashuvchi",
    def: "Kasallik belgilarisiz, ammo qo‘zg‘atuvchini tashiydigan shaxs (surtma natijasida aniqlanadi).",
  },
];

export function Metodologiya() {
  const { t } = useI18n();

  return (
    <div className="p-4 md:p-8 max-w-[1100px] mx-auto space-y-6">
      <PageHeader
        icon={BookOpen}
        title="Metodologiya va ma‘lumot manbalari"
        subtitle="Ushbu platformadagi barcha raqamlar rasmiy hisobotlardan olingan. Quyida manbalar, sanalar va atamalar izohlangan."
        kpis={[
          { label: "Manbalar", value: 6, color: "#34D399" },
          { label: "Tarixiy qamrov", value: "2012–2026", color: "#1d3d63" },
          { label: "So‘nggi yangilanish", value: META.lastUpdate, color: "#34D399" },
        ]}
      />

      {/* Manbalar */}
      <section className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm overflow-hidden">
        <div className="flex items-center gap-2 p-5 border-b border-[#E5E7EB] bg-[#FAFAFA]">
          <FileText className="w-5 h-5 text-[#10B981]" />
          <h2 className="text-[16px] font-semibold text-[#111827]">{t("Ma‘lumot manbalari")}</h2>
        </div>
        <ul className="divide-y divide-[#F1F5F9]">
          {SOURCES.map((s) => (
            <li key={s.name} className="card-interactive p-5 flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4">
              <div className="flex items-center gap-1.5 text-[12px] font-semibold text-[#6B7280] sm:w-[110px] flex-shrink-0">
                <Calendar className="w-3.5 h-3.5" />
                <span className="tabular-nums">{t(s.date)}</span>
              </div>
              <div>
                <div className="text-[14px] font-semibold text-[#111827]">{t(s.name)}</div>
                <p className="text-[13px] text-[#6B7280] mt-0.5 leading-relaxed">{t(s.note)}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Dual-date izohi */}
      <section className="bg-[#FFFBEB] border border-[#FDE68A] rounded-xl p-5">
        <div className="flex items-center gap-2 mb-2">
          <Info className="w-5 h-5 text-[#B45309]" />
          <h2 className="text-[15px] font-bold text-[#92400E]">{t("Nega ikki xil raqam: 277 va 173?")}</h2>
        </div>
        <p className="text-[13px] text-[#78350F] leading-relaxed">
          {t(
            "Bu xato emas — har bir ko‘rsatkich o‘z sanasiga ega. Bosh sahifadagi 277 — Toshkent shahri bo‘yicha eng so‘nggi (17.04.2026) bemorlar ro‘yxatidan. Hududlar jadvali va xaritadagi 173 esa rasmiy SSV ma‘lumotnomasidan (28.03.2026, o‘sha kunги respublika jami — 235). Ikkalasi ham haqiqiy, faqat turli sanalarga tegishli; har bir ko‘rinish o‘z sanasi bilan belgilangan.",
          )}
        </p>
      </section>

      {/* Atamalar */}
      <section className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm overflow-hidden">
        <div className="flex items-center gap-2 p-5 border-b border-[#E5E7EB] bg-[#FAFAFA]">
          <BookOpen className="w-5 h-5 text-[#10B981]" />
          <h2 className="text-[16px] font-semibold text-[#111827]">{t("Asosiy atamalar")}</h2>
        </div>
        <dl className="grid sm:grid-cols-2 gap-px bg-[#F1F5F9]">
          {DEFINITIONS.map((d) => (
            <div key={d.term} className="bg-white p-5">
              <dt className="text-[14px] font-semibold text-[#111827] mb-1">{t(d.term)}</dt>
              <dd className="text-[13px] text-[#6B7280] leading-relaxed">{t(d.def)}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Codebook — ma'lumotlar lug'ati (FAIR) */}
      <section className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm overflow-hidden">
        <div className="flex items-center gap-2 p-5 border-b border-[#E5E7EB] bg-[#FAFAFA]">
          <Database className="w-5 h-5 text-[#10B981]" />
          <h2 className="text-[16px] font-semibold text-[#111827]">{t("Codebook (ma‘lumotlar lug‘ati)")}</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[640px]">
            <thead>
              <tr className="bg-[#F9FAFB] border-b-2 border-[#E5E7EB]">
                <th className="px-4 py-2.5 text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">{t("O‘zgaruvchi")}</th>
                <th className="px-4 py-2.5 text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">{t("Ta‘rifi")}</th>
                <th className="px-4 py-2.5 text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">{t("Birlik")}</th>
                <th className="px-4 py-2.5 text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">{t("Manba")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9]">
              {CODEBOOK.map((c) => (
                <tr key={c.v} className="hover:bg-[#F9FAFB]">
                  <td className="px-4 py-2.5 text-[13px] font-mono font-medium text-[#1d3d63] whitespace-nowrap">{c.v}</td>
                  <td className="px-4 py-2.5 text-[13px] text-[#374151]">{t(c.desc)}</td>
                  <td className="px-4 py-2.5 text-[12px] text-[#6B7280] whitespace-nowrap">{t(c.unit)}</td>
                  <td className="px-4 py-2.5 text-[12px] text-[#6B7280]">{t(c.src)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="px-5 py-3 text-[11px] text-[#9CA3AF] border-t border-[#F1F5F9]">{t("FAIR printsipi: ma‘lumotlar Topiladigan, Ochiq, O‘zaro moslashuvchan va Qayta ishlatiladigan.")}</p>
      </section>

      {/* Xalqaro kontekst */}
      <section className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm overflow-hidden">
        <div className="flex items-center gap-2 p-5 border-b border-[#E5E7EB] bg-[#FAFAFA]">
          <Globe className="w-5 h-5 text-[#10B981]" />
          <h2 className="text-[16px] font-semibold text-[#111827]">{t("Xalqaro kontekst va taqqoslash")}</h2>
        </div>
        <ul className="divide-y divide-[#F1F5F9]">
          {INTERNATIONAL.map((row) => (
            <li key={row.metric} className="p-5">
              <div className="text-[14px] font-semibold text-[#111827] mb-2">{t(row.metric)}</div>
              <div className="grid sm:grid-cols-2 gap-3 mb-2">
                <div className="rounded-lg bg-[#ECFDF5] border border-[#D1FAE5] px-3 py-2">
                  <div className="text-[10px] font-semibold uppercase tracking-wide text-[#059669] mb-0.5">{t("Toshkent sh. (joriy)")}</div>
                  <div className="text-[13px] text-[#0F172A]">{t(row.local)}</div>
                </div>
                <div className="rounded-lg bg-[#F1F5F9] border border-[#E2E8F0] px-3 py-2">
                  <div className="text-[10px] font-semibold uppercase tracking-wide text-[#64748B] mb-0.5">{t("Xalqaro (WHO/ECDC/CDC)")}</div>
                  <div className="text-[13px] text-[#0F172A]">{t(row.world)}</div>
                </div>
              </div>
              <p className="text-[12.5px] text-[#6B7280] leading-relaxed">{t(row.note)}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Adabiyotlar */}
      <section className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm overflow-hidden">
        <div className="flex items-center gap-2 p-5 border-b border-[#E5E7EB] bg-[#FAFAFA]">
          <Library className="w-5 h-5 text-[#10B981]" />
          <h2 className="text-[16px] font-semibold text-[#111827]">{t("Adabiyotlar")}</h2>
        </div>
        <ol className="p-5 space-y-2.5 list-decimal list-inside">
          {REFERENCES.map((r, i) => (
            <li key={i} className="text-[13px] text-[#374151] leading-relaxed pl-1">{r}</li>
          ))}
        </ol>
        <p className="px-5 pb-4 text-[11px] text-[#9CA3AF]">{t("Eslatma: mintaqaviy taqqoslash (Rossiya, Qozog‘iston epidemiyalari) uchun aniq raqamlar va iqtiboslar dissertatsiya matnidan qo‘shiladi.")}</p>
      </section>

      {/* Litsenziya */}
      <section className="flex items-start gap-3 text-[13px] text-[#6B7280] bg-white rounded-xl border border-[#E5E7EB] shadow-sm p-5">
        <Scale className="w-5 h-5 text-[#10B981] flex-shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <span className="font-semibold text-[#111827]">{t("Litsenziya va foydalanish")}:</span>{" "}
          {t(
            "Ma‘lumotlar CC BY 4.0 sharti bilan qayta ishlatilishi mumkin — manba ko‘rsatilishi shart. Ushbu platforma tibbiy maslahat o‘rnini bosmaydi; tashxis va davolash uchun shifokorga murojaat qiling.",
          )}
        </p>
      </section>
    </div>
  );
}
