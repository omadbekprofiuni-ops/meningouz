import type { LucideIcon } from "lucide-react";
import { useI18n } from "../i18n";

interface KPI {
  label: string;
  value: string | number;
  color?: string;
}

interface PageHeaderProps {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  kpis?: KPI[];
  accent?: string; // brand accent (default violet)
}

export function PageHeader({ icon: Icon, title, subtitle, kpis, accent = "#8B5CF6" }: PageHeaderProps) {
  const { t } = useI18n();
  return (
    <div className="relative overflow-hidden rounded-[18px] border border-white/[0.07] shadow-xl"
      style={{ background: "radial-gradient(120% 140% at 88% 0%, #1A1030 0%, #0C1020 50%, #080B14 100%)" }}>
      <div className="absolute inset-0 grid-mesh opacity-50 pointer-events-none" />
      <div className="absolute -top-8 -right-6 w-[220px] h-[200px] petechiae opacity-80 pointer-events-none" />
      {/* accent glow */}
      <div className="absolute left-0 top-0 bottom-0 w-1.5" style={{ background: accent }} />

      <div className="relative z-10 p-5 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="flex items-start gap-3.5">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: `${accent}1f`, border: `1px solid ${accent}3a` }}>
            <Icon className="w-5 h-5" style={{ color: accent }} />
          </div>
          <div>
            <h1 className="font-display text-[22px] md:text-[26px] font-bold text-white leading-tight">{t(title)}</h1>
            {subtitle && <p className="text-[13px] text-slate-400 mt-1 max-w-xl">{t(subtitle)}</p>}
          </div>
        </div>

        {kpis && kpis.length > 0 && (
          <div className="flex gap-3 flex-wrap">
            {kpis.map((k) => (
              <div key={k.label} className="rounded-xl bg-white/[0.04] border border-white/[0.07] px-4 py-2.5 min-w-[92px]">
                <div className="font-display text-[24px] leading-none" style={{ color: k.color || "#fff" }}>{k.value}</div>
                <div className="text-[11px] text-slate-500 mt-1">{t(k.label)}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
