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

export function PageHeader({ icon: Icon, title, subtitle, kpis, accent = "#10B981" }: PageHeaderProps) {
  const { t } = useI18n();
  return (
    <div className="relative overflow-hidden rounded-[18px] border border-[#E2E8F0] shadow-sm"
      style={{ background: "radial-gradient(120% 140% at 92% 0%, #ECFDF5 0%, #F6FEFB 45%, #FFFFFF 100%)" }}>
      {/* accent glow */}
      <div className="absolute left-0 top-0 bottom-0 w-1.5" style={{ background: accent }} />

      <div className="relative z-10 p-5 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="flex items-start gap-3.5">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: `${accent}1f`, border: `1px solid ${accent}3a` }}>
            <Icon className="w-5 h-5" style={{ color: accent }} />
          </div>
          <div>
            <h1 className="font-display text-[22px] md:text-[26px] font-bold text-[#0F172A] leading-tight">{t(title)}</h1>
            {subtitle && <p className="text-[13px] text-[#64748B] mt-1 max-w-xl">{t(subtitle)}</p>}
          </div>
        </div>

        {kpis && kpis.length > 0 && (
          <div className="flex gap-3 flex-wrap">
            {kpis.map((k) => (
              <div key={k.label} className="rounded-xl bg-white border border-[#E2E8F0] shadow-sm px-4 py-2.5 min-w-[92px]">
                <div className="font-display text-[24px] leading-none tabular-nums" style={{ color: k.color || "#0F172A" }}>{k.value}</div>
                <div className="text-[11px] text-[#64748B] mt-1">{t(k.label)}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
