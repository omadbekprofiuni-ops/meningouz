import {
  Syringe,
  ShieldCheck,
  Thermometer,
  Ban,
  Info,
  Package,
  Snowflake,
  CheckCircle2,
} from "lucide-react";
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, Tooltip } from "recharts";
import {
  VACCINE,
  INDICATIONS,
  CONTRAINDICATIONS,
  SIDE_EFFECTS,
  SCHEDULE,
} from "../data/vaccine";
import { PREVENTION } from "../data/stats";
import { PageHeader } from "../components/PageHeader";

// 4 seroguruh qamrovi radari (ACYW135 — har biri 50 mkg)
const coverageData = VACCINE.serogroups.map((g) => ({ axis: g, value: 100 }));

export function Vaksinatsiya() {
  return (
    <div className="p-4 md:p-8 max-w-[1200px] mx-auto space-y-8">
      {/* Header */}
      <PageHeader
        icon={Syringe}
        title="Vaksinatsiya va profilaktika"
        subtitle={VACCINE.name}
        accent="#22D3EE"
        kpis={[
          { label: "Emlanganlar", value: PREVENTION.vaccinated.toLocaleString(), color: "#34D399" },
          { label: "Dozalar haridi", value: PREVENTION.dosesPurchased.toLocaleString(), color: "#22D3EE" },
          { label: "Tib. xodimlari", value: PREVENTION.medicalStaffVaccinated.toLocaleString(), color: "#FBBF24" },
        ]}
      />

      {/* Top: vaccine card + coverage radar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Vaccine info */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-[#E5E7EB] p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-11 h-11 rounded-xl bg-[#ECFDF5] flex items-center justify-center">
              <Syringe className="w-6 h-6 text-[#10B981]" />
            </div>
            <div>
              <h2 className="text-[16px] font-semibold text-[#111827]">{VACCINE.name}</h2>
              <p className="text-[13px] text-[#6B7280]">ATX: {VACCINE.atc} · {VACCINE.form}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            {[
              { icon: Syringe, label: "Doza", value: VACCINE.dose },
              { icon: ShieldCheck, label: "Yosh chegarasi", value: VACCINE.ageLimit },
              { icon: Snowflake, label: "Saqlash", value: VACCINE.storage },
              { icon: Package, label: "Yaroqlilik", value: VACCINE.shelfLife },
              { icon: Info, label: "Berilishi", value: VACCINE.dispensing },
              { icon: ShieldCheck, label: "Ishlab chiqaruvchi", value: VACCINE.manufacturer },
            ].map((item) => (
              <div key={item.label} className="flex gap-3">
                <item.icon className="w-4 h-4 text-[#10B981] mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-[11px] text-[#9CA3AF] uppercase tracking-wide">{item.label}</div>
                  <div className="text-[13px] text-[#111827] font-medium">{item.value}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-[#E5E7EB] pt-4">
            <h3 className="text-[13px] font-semibold text-[#111827] uppercase tracking-wide mb-3">Tarkibi (1 doza)</h3>
            <div className="grid grid-cols-2 gap-2">
              {VACCINE.composition.map((c) => (
                <div key={c.group} className="flex justify-between text-[13px] bg-[#FAFAFA] rounded-lg px-3 py-2">
                  <span className="text-[#374151]">{c.group}</span>
                  <span className="font-semibold tabular-nums">{c.amount}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Coverage radar */}
        <div className="bg-[#0F172A] rounded-2xl p-5 shadow-sm text-white">
          <h2 className="text-[16px] font-semibold mb-1">Seroguruh qamrovi</h2>
          <p className="text-[12px] text-slate-400 mb-2">ACYW135 — to'rt seroguruhga qarshi himoya</p>
          <div className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={coverageData} outerRadius="70%">
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="axis" tick={{ fill: "#CBD5E1", fontSize: 13, fontWeight: 600 }} />
                <Radar dataKey="value" stroke="#10B981" fill="#10B981" fillOpacity={0.3} strokeWidth={2} />
                <Tooltip contentStyle={{ backgroundColor: "#1E293B", border: "none", borderRadius: 8, fontSize: 13 }} formatter={(v: number) => [`${v}%`, "qamrov"]} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-[12px] text-slate-400 text-center">
            Eslatma: vaksina <b className="text-white">B seroguruh</b>ga qarshi himoya qilmaydi.
          </p>
        </div>
      </div>

      {/* Schedule / steps */}
      <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 shadow-sm">
        <h2 className="text-[16px] font-semibold text-[#111827] mb-5">O'choqda profilaktika bosqichlari</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {SCHEDULE.map((s, i) => (
            <div key={s.step} className="relative p-4 rounded-xl border border-[#E5E7EB] bg-[#FAFAFA]">
              <div className="w-7 h-7 rounded-full bg-[#10B981] text-white text-[13px] font-bold flex items-center justify-center mb-3">{i + 1}</div>
              <h3 className="text-[14px] font-semibold text-[#111827]">{s.title}</h3>
              <p className="text-[12px] text-[#6B7280] mt-1">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Indications / contraindications / side effects */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 className="w-5 h-5 text-[#10B981]" />
            <h2 className="text-[15px] font-semibold text-[#111827]">Ko'rsatmalar</h2>
          </div>
          <ul className="space-y-2.5">
            {INDICATIONS.map((t) => (
              <li key={t} className="flex gap-2 text-[13px] text-[#4B5563]">
                <span className="text-[#10B981] mt-0.5">•</span>{t}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Ban className="w-5 h-5 text-[#EF4444]" />
            <h2 className="text-[15px] font-semibold text-[#111827]">Qarshi ko'rsatmalar</h2>
          </div>
          <ul className="space-y-2.5">
            {CONTRAINDICATIONS.map((t) => (
              <li key={t} className="flex gap-2 text-[13px] text-[#4B5563]">
                <span className="text-[#EF4444] mt-0.5">•</span>{t}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Thermometer className="w-5 h-5 text-[#F59E0B]" />
            <h2 className="text-[15px] font-semibold text-[#111827]">Nojo'ya ta'sirlar</h2>
          </div>
          <div className="mb-3">
            <p className="text-[11px] text-[#9CA3AF] uppercase tracking-wide mb-1">Mahalliy</p>
            <p className="text-[13px] text-[#4B5563]">{SIDE_EFFECTS.local.join(", ")}</p>
          </div>
          <div className="mb-3">
            <p className="text-[11px] text-[#9CA3AF] uppercase tracking-wide mb-1">Tizimli</p>
            <p className="text-[13px] text-[#4B5563]">{SIDE_EFFECTS.systemic.join(", ")}</p>
          </div>
          <p className="text-[12px] text-[#9CA3AF] italic">{SIDE_EFFECTS.note}</p>
        </div>
      </div>
    </div>
  );
}
