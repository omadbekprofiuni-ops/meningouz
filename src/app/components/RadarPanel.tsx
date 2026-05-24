import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  Tooltip as RechartsTooltip,
  Legend,
} from "recharts";
import { useI18n } from "../i18n";

export interface RadarSeries {
  name: string;
  color: string;
  /** key in each data row holding this series value */
  key: string;
}

interface RadarPanelProps {
  title: string;
  subtitle?: string;
  /** rows like { axis: "Isitma", a: 100, b: 80 } */
  data: Record<string, string | number>[];
  axisKey: string;
  series: RadarSeries[];
  /** dark FIFA-style panel */
  dark?: boolean;
}

export function RadarPanel({ title, subtitle, data, axisKey, series, dark }: RadarPanelProps) {
  const { t } = useI18n();
  return (
    <div
      className={
        dark
          ? "rounded-2xl p-5 shadow-sm bg-[#0F172A] text-white"
          : "rounded-2xl p-5 shadow-sm bg-white border border-[#E5E7EB] text-[#111827]"
      }
    >
      <div className="flex items-baseline justify-between mb-1">
        <h2 className={dark ? "text-[16px] font-semibold text-white" : "text-[16px] font-semibold text-[#111827]"}>
          {t(title)}
        </h2>
      </div>
      {subtitle && (
        <p className={dark ? "text-[12px] text-slate-400 mb-2" : "text-[12px] text-[#6B7280] mb-2"}>{t(subtitle)}</p>
      )}

      <div className="h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data} outerRadius="62%" margin={{ top: 20, right: 70, bottom: 20, left: 70 }}>
            <PolarGrid stroke={dark ? "#334155" : "#E5E7EB"} />
            <PolarAngleAxis
              dataKey={axisKey}
              tickFormatter={(v: string) => t(v)}
              tick={{ fill: dark ? "#CBD5E1" : "#374151", fontSize: 11, fontWeight: 500 }}
            />
            {series.map((s) => (
              <Radar
                key={s.key}
                name={t(s.name)}
                dataKey={s.key}
                stroke={s.color}
                fill={s.color}
                fillOpacity={0.25}
                strokeWidth={2}
                dot={{ r: 3, fill: s.color }}
              />
            ))}
            {series.length > 1 && (
              <Legend wrapperStyle={{ fontSize: 12, color: dark ? "#CBD5E1" : "#374151" }} />
            )}
            <RechartsTooltip
              contentStyle={{
                backgroundColor: dark ? "#1E293B" : "#111827",
                border: "none",
                borderRadius: 8,
                color: "#fff",
                fontSize: 13,
              }}
              itemStyle={{ color: "#fff" }}
              labelStyle={{ color: "#fff" }}
              formatter={(v: number) => [`${v}%`, ""]}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
