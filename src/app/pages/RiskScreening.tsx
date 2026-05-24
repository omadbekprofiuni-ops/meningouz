import { useState, useMemo } from "react";
import { 
  Thermometer, 
  Brain, 
  Activity, 
  AlertTriangle, 
  Sun, 
  Wind, 
  Frown, 
  HelpCircle,
  PhoneCall,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import clsx from "clsx";
import { RadarPanel } from "../components/RadarPanel";
import { PageHeader } from "../components/PageHeader";
import { TYPICAL_PROFILE } from "../data/stats";

// axis = radar o'qi (TYPICAL_PROFILE bilan mos kelishi kerak)
const SYMPTOMS = [
  { id: "fever", name: "Yuqori isitma", desc: "Tana harorati 38.5°C dan yuqori", icon: Thermometer, weight: 15, axis: "Isitma" },
  { id: "headache", name: "Kuchli bosh og'rig'i", desc: "Birdan boshlanadigan kuchli og'riq", icon: Brain, weight: 15, axis: "Ong holati" },
  { id: "neck", name: "Bo'yin qotishi", desc: "Iyagini ko'kragiga tekkiza olmaslik", icon: Activity, weight: 25, axis: "Bo'yin/meningial" },
  { id: "rash", name: "Toshmalar", desc: "Bosganda yo'qolmaydigan qizil/binafsha toshmalar", icon: AlertTriangle, weight: 30, axis: "Toshma" },
  { id: "photo", name: "Yorug'likka ta'sirchanlik", desc: "Yorug'likdan ko'z qamashishi", icon: Sun, weight: 10, axis: "Bo'yin/meningial" },
  { id: "nausea", name: "Ko'ngil aynishi", desc: "Sababsiz qayt qilish", icon: Frown, weight: 10, axis: "Umumiy intoksikatsiya" },
  { id: "chills", name: "Qaltirash", desc: "Sovuq qotish va titroq", icon: Wind, weight: 5, axis: "Umumiy intoksikatsiya" },
  { id: "confusion", name: "Ong chalkashishi", desc: "Savollarga javob berishga qiynalish", icon: HelpCircle, weight: 20, axis: "Ong holati" },
];

const AXES = ["Isitma", "Toshma", "Bo'yin/meningial", "Ong holati", "Umumiy intoksikatsiya"];

export function RiskScreening() {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleSymptom = (id: string) => {
    setSelected(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const score = useMemo(() => {
    const total = selected.reduce((acc, id) => {
      const sym = SYMPTOMS.find(s => s.id === id);
      return acc + (sym?.weight || 0);
    }, 0);
    return Math.min(total, 100);
  }, [selected]);

  // Bemor profili vs tipik meningokokksemiya profili (radar uchun)
  const radarData = useMemo(() => {
    const typical = Object.fromEntries(TYPICAL_PROFILE.map((t) => [t.axis, t.value]));
    return AXES.map((axis) => {
      const axisSymptoms = SYMPTOMS.filter((s) => s.axis === axis);
      const maxW = axisSymptoms.reduce((a, s) => a + s.weight, 0) || 1;
      const got = axisSymptoms
        .filter((s) => selected.includes(s.id))
        .reduce((a, s) => a + s.weight, 0);
      return {
        axis,
        bemor: Math.round((got / maxW) * 100),
        tipik: typical[axis] ?? 0,
      };
    });
  }, [selected]);

  // Determine risk level
  const riskLevel = score >= 60 ? 'high' : score >= 30 ? 'medium' : 'low';
  
  const riskConfig = {
    low: { color: '#10B981', text: 'Past xavf', bg: '#ECFDF5' },
    medium: { color: '#F59E0B', text: "O'rta xavf", bg: '#FEF3C7' },
    high: { color: '#EF4444', text: 'Yuqori xavf', bg: '#FEE2E2' },
  };

  const { color, text, bg } = riskConfig[riskLevel];

  // SVG Circular Progress math
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="p-6 h-full overflow-y-auto">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Full-width page header */}
        <div className="lg:col-span-12">
          <PageHeader
            icon={Activity}
            title="Risk skrining kalkulyatori"
            subtitle="Bemorda kuzatilayotgan simptomlarni belgilang — tizim avtomatik ravishda xavf darajasini hisoblaydi."
            accent="#F43F5E"
          />
        </div>

        {/* Left Column - Symptoms */}
        <div className="lg:col-span-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SYMPTOMS.map((sym) => {
              const isSelected = selected.includes(sym.id);
              return (
                <button
                  key={sym.id}
                  onClick={() => toggleSymptom(sym.id)}
                  className={clsx(
                    "flex items-start gap-4 p-4 rounded-xl border-2 transition-all text-left",
                    isSelected 
                      ? "border-[#10B981] bg-[#ECFDF5]" 
                      : "border-[#E5E7EB] bg-white hover:border-[#9CA3AF]"
                  )}
                >
                  <div className={clsx(
                    "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5",
                    isSelected ? "bg-[#10B981] text-white" : "bg-[#F3F4F6] text-[#6B7280]"
                  )}>
                    <sym.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className={clsx("font-semibold text-[15px]", isSelected ? "text-[#059669]" : "text-[#111827]")}>
                      {sym.name}
                    </h3>
                    <p className={clsx("text-[13px] mt-1", isSelected ? "text-[#059669]" : "text-[#6B7280]")}>
                      {sym.desc}
                    </p>
                  </div>
                  
                  <div className="ml-auto mt-2">
                    <div className={clsx(
                      "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                      isSelected ? "border-[#10B981] bg-[#10B981]" : "border-[#D1D5DB]"
                    )}>
                      {isSelected && <CheckCircle2 className="w-3 h-3 text-white" />}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Comparison radar — bemor profili vs tipik meningokokksemiya */}
          <div className="mt-6">
            <RadarPanel
              title="Profil solishtiruvi"
              subtitle="Yashil — bemorning belgilar profili. Kulrang — tipik meningokokksemiyaning namunaviy (taqqoslash uchun) profili."
              data={radarData}
              axisKey="axis"
              series={[
                { name: "Tipik MKI (namuna)", key: "tipik", color: "#94A3B8" },
                { name: "Bemor", key: "bemor", color: "#10B981" },
              ]}
            />
          </div>
        </div>

        {/* Right Column - Results */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-2xl border border-[#E5E7EB] p-6 shadow-sm sticky top-6">
            <h2 className="text-[16px] font-semibold text-[#111827] mb-6 text-center">Natija va Tavsiyalar</h2>
            
            {/* Circular Progress */}
            <div className="relative w-[200px] h-[200px] mx-auto mb-6">
              <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 200 200">
                <circle 
                  cx="100" cy="100" r={radius}
                  fill="none" stroke="#F3F4F6" strokeWidth="16"
                />
                <circle 
                  cx="100" cy="100" r={radius}
                  fill="none" stroke={color} strokeWidth="16"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-all duration-700 ease-in-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-[48px] font-semibold tabular-nums leading-none" style={{ color }}>{score}</span>
                <span className="text-[13px] text-[#6B7280] font-medium mt-1">Risk Ball</span>
              </div>
            </div>

            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-3" style={{ backgroundColor: bg }}>
                <AlertCircle className="w-4 h-4" style={{ color }} />
                <span className="text-[14px] font-semibold" style={{ color }}>{text}</span>
              </div>
              <p className="text-[14px] text-[#4B5563]">
                {score >= 60 ? "Bemorda meningokokk infeksiyasiga gumon yuqori." : 
                 score >= 30 ? "Bemorni nazoratga olish va qo'shimcha tekshiruvlar zarur." : 
                 "Hozirgi simptomlar asosida xavf past darajada."}
              </p>
            </div>

            <div className="space-y-3 mb-8">
              <h3 className="text-[13px] font-semibold text-[#111827] uppercase tracking-wider">Tavsiyalar:</h3>
              <ul className="text-[13px] text-[#4B5563] space-y-2">
                {score >= 60 ? (
                  <>
                    <li className="flex gap-2"><span className="text-[#EF4444]">•</span> Zudlik bilan reanimatsiya yoki yuqumli kasalliklar bo'limiga yotqizish.</li>
                    <li className="flex gap-2"><span className="text-[#EF4444]">•</span> Lumbal punksiya va qon tahlili o'tkazish.</li>
                    <li className="flex gap-2"><span className="text-[#EF4444]">•</span> Empirik antibiotik terapiyani boshlash.</li>
                  </>
                ) : score >= 30 ? (
                  <>
                    <li className="flex gap-2"><span className="text-[#F59E0B]">•</span> Bemorni 24 soatlik qat'iy nazoratga olish.</li>
                    <li className="flex gap-2"><span className="text-[#F59E0B]">•</span> Tana harorati va qon bosimi monitoringi.</li>
                    <li className="flex gap-2"><span className="text-[#F59E0B]">•</span> Simptomlar kuchaysa shifoxonaga yuborish.</li>
                  </>
                ) : (
                  <>
                    <li className="flex gap-2"><span className="text-[#10B981]">•</span> Suyuqlik ichish tartibini nazorat qilish.</li>
                    <li className="flex gap-2"><span className="text-[#10B981]">•</span> Isitma tushiruvchi vositalar qabul qilish.</li>
                    <li className="flex gap-2"><span className="text-[#10B981]">•</span> Oila shifokori nazoratida bo'lish.</li>
                  </>
                )}
              </ul>
            </div>

            {score >= 60 && (
              <button className="w-full bg-[#EF4444] hover:bg-[#DC2626] text-white font-medium py-3 rounded-xl transition-all shadow-lg shadow-[#EF4444]/30 flex items-center justify-center gap-2 animate-pulse">
                <PhoneCall className="w-5 h-5" />
                Shoshilinch murojaat
              </button>
            )}
            
            {score < 60 && (
              <button className="w-full bg-[#F3F4F6] hover:bg-[#E5E7EB] text-[#374151] font-medium py-3 rounded-xl transition-colors">
                Natijani saqlash
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
