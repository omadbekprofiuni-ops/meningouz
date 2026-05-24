import {
  Megaphone,
  Syringe,
  ShieldCheck,
  GraduationCap,
  Tv,
  Radio,
  FileText,
  Home,
  Users,
  CheckCircle2,
} from "lucide-react";
import { AWARENESS, PREVENTION } from "../data/stats";
import { PageHeader } from "../components/PageHeader";
import { useI18n } from "../i18n";

// ССВ ma'lumotnomasidagi tavsiya etilgan chora-tadbirlar
const RECOMMENDATIONS = [
  "Aholi orasida tashuvchanlik darajasini o'rganish, xavf guruhlarida (bolalar va o'smirlar) laboratoriya tekshiruvlarini tashkil etish va tibbiy kuzatuvni kuchaytirish.",
  "Davlat va nodavlat muassasalarda \"Nazofaringit\" tashxisi qo'yilganlardan diagnostik laborator tahlillarni o'tkazish.",
  "Muloqotdagilarni aniqlash doirasini kengaytirish, barchasini bir vaqtda to'liq kimyoviy profilaktika bilan qamrash.",
  "Kasallik o'choqlarida 10 kunlik qat'iy tibbiy kuzatuvni ta'minlash.",
  "Vaksina zaxirasini yaratish uchun qo'shimcha mablag' ajratish (oyiga ~1000 doza).",
  "\"Haj\" va \"Umra\" safari oldidan meningokokk infeksiyasiga qarshi emlashni qat'iy belgilash.",
  "Tez-tez kasallanuvchi va dispanser nazoratidagi bolalarni sog'lomlashtirish.",
  "Ma'lumotlarni \"DMED\" elektron tizimiga kiritish.",
  "Rekonvalessentlarni 2 yil davomida dispanser nazoratiga olish (UASh, nevropatolog).",
  "Nodavlat maktab va MTTlarni tibbiyot xodimlari bilan ta'minlash.",
  "Maktab va MTTlarda filtr, tozalash, zararsizlantirish va shamollatishni muntazam amalga oshirish.",
  "Savdo majmualaridagi yopiq bolalar o'yingohlarida kundalik tozalash tadbirlarini yo'lga qo'yish.",
  "Laboratoriyada ozuqa muhitlar va zardoblar zaxirasini yaratish, seroguruhni aniqlash.",
  "OAV va ijtimoiy tarmoqlar orqali tushuntirish ishlarini kuchaytirish.",
];

const doneMeasures = [
  { icon: Syringe, label: "Emlanganlar (muloqotdagilar)", value: PREVENTION.vaccinated, color: "#10B981" },
  { icon: ShieldCheck, label: "Kimyoviy profilaktika", value: PREVENTION.chemoProphylaxis, color: "#3B82F6" },
  { icon: Syringe, label: "Harid qilingan vaksina (doza)", value: PREVENTION.dosesPurchased, color: "#8B5CF6" },
  { icon: Users, label: "Emlangan tibbiyot xodimlari", value: PREVENTION.medicalStaffVaccinated, color: "#F59E0B" },
];

const awarenessTiles = [
  { icon: FileText, label: "Tarqatma material (nusxa)", value: AWARENESS.leaflets },
  { icon: Home, label: "Qamrab olingan xonadon", value: AWARENESS.households },
  { icon: Megaphone, label: "Mahalla yig'ilishlari", value: AWARENESS.meetings },
  { icon: Tv, label: "Teleko'rsatuvlar", value: AWARENESS.tv },
  { icon: Radio, label: "Radio eshittirishlar", value: AWARENESS.radio },
  { icon: Megaphone, label: "Ijtimoiy tarmoq chiqishlari", value: AWARENESS.social },
  { icon: FileText, label: "Infografika", value: AWARENESS.infographics },
  { icon: GraduationCap, label: "Tibbiy seminarlar", value: AWARENESS.seminars },
];

export function Choralar() {
  const { t } = useI18n();
  return (
    <div className="p-4 md:p-8 max-w-[1200px] mx-auto space-y-8">
      <PageHeader
        icon={ShieldCheck}
        title="Profilaktika va epidemiyaga qarshi choralar"
        subtitle="Amalga oshirilgan tadbirlar va ССВ tavsiyalari (14.04.2026 holatiga)"
        accent="#34D399"
        kpis={[
          { label: "Emlangan", value: PREVENTION.vaccinated.toLocaleString(), color: "#34D399" },
          { label: "Kimyoviy prof.", value: PREVENTION.chemoProphylaxis.toLocaleString(), color: "#22D3EE" },
          { label: "Vaksina (doza)", value: PREVENTION.dosesPurchased.toLocaleString(), color: "#A78BFA" },
        ]}
      />

      {/* Done measures */}
      <div>
        <h2 className="text-[15px] font-semibold text-[#111827] mb-3">{t("Amalga oshirilgan tadbirlar")}</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {doneMeasures.map((m) => (
            <div key={m.label} className="bg-white rounded-xl border border-[#E5E7EB] p-5 shadow-sm relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1" style={{ backgroundColor: m.color }} />
              <m.icon className="w-5 h-5 mb-2" style={{ color: m.color }} />
              <div className="text-[26px] font-bold text-[#111827] tabular-nums leading-none">{m.value.toLocaleString()}</div>
              <p className="text-[12px] text-[#6B7280] mt-1">{t(m.label)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Awareness campaign */}
      <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Megaphone className="w-5 h-5 text-[#10B981]" />
          <h2 className="text-[16px] font-semibold text-[#111827]">{t("Aholini ogohlantirish kampaniyasi")}</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {awarenessTiles.map((tile) => (
            <div key={tile.label} className="flex items-center gap-3 bg-[#FAFAFA] rounded-xl p-4">
              <div className="w-10 h-10 rounded-lg bg-[#ECFDF5] flex items-center justify-center flex-shrink-0">
                <tile.icon className="w-5 h-5 text-[#10B981]" />
              </div>
              <div>
                <div className="text-[20px] font-bold text-[#111827] tabular-nums leading-none">{tile.value.toLocaleString()}</div>
                <p className="text-[11px] text-[#6B7280] mt-1 leading-tight">{t(tile.label)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle2 className="w-5 h-5 text-[#10B981]" />
          <h2 className="text-[16px] font-semibold text-[#111827]">{t("Tavsiya etilgan chora-tadbirlar")}</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-x-8 gap-y-3">
          {RECOMMENDATIONS.map((r, i) => (
            <div key={i} className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-[#ECFDF5] text-[#059669] text-[12px] font-bold flex items-center justify-center flex-shrink-0">{i + 1}</span>
              <p className="text-[13px] text-[#4B5563] leading-snug">{t(r)}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="text-[12px] text-[#9CA3AF] border-t border-[#E5E7EB] pt-4">
        {t("Manba: O'zR ССВ huzuridagi Sanepidqo'm respublika ma'lumotnomasi (28.03.2026) va Toshkent shahar Hokimiyatiga ma'lumotnoma (14.04.2026).")}
      </div>
    </div>
  );
}
