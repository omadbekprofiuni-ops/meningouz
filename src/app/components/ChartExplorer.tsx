import { useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  Cell,
} from "recharts";
import { LineChart as LineIcon, BarChart3, Table as TableIcon } from "lucide-react";
import clsx from "clsx";
import { SourceLine } from "./SourceLine";
import { useI18n } from "../i18n";

export type ExplorerView = "line" | "bar" | "table";
export type ExplorerSeries = { key: string; name: string; color: string };

export interface ChartExplorerProps {
  title: string;
  subtitle?: string;
  // Chap tomondagi hikoя matni (OWID "featured" uslubi). Bo'lsa — 2 ustunli.
  narrative?: string[];
  data: Record<string, string | number>[];
  xKey: string;
  series: ExplorerSeries[];
  views?: ExplorerView[];
  defaultView?: ExplorerView;
  unit?: string;
  source?: string;
  updated?: string;
  note?: string;
  // Ustun grafikda har katakni o'z rangi bilan (bitta seriya uchun)
  barCellColors?: string[];
}

const tooltipStyle = {
  backgroundColor: "#111827",
  color: "#fff",
  borderRadius: "8px",
  border: "none",
  fontSize: "13px",
};

export function ChartExplorer({
  title,
  subtitle,
  narrative,
  data,
  xKey,
  series,
  views = ["line", "bar", "table"],
  defaultView = "line",
  unit = "ta",
  source,
  updated,
  note,
  barCellColors,
}: ChartExplorerProps) {
  const { t } = useI18n();
  const [view, setView] = useState<ExplorerView>(defaultView);

  const viewMeta: Record<ExplorerView, { label: string; icon: typeof LineIcon }> = {
    line: { label: "Chiziq", icon: LineIcon },
    bar: { label: "Ustun", icon: BarChart3 },
    table: { label: "Jadval", icon: TableIcon },
  };

  const renderChart = () => {
    if (view === "table") {
      return (
        <div className="h-full overflow-auto">
          <table className="w-full text-left border-collapse text-[13px]">
            <thead className="sticky top-0 bg-[#F9FAFB]">
              <tr className="border-b-2 border-[#E5E7EB]">
                <th className="px-3 py-2 text-[11px] font-bold text-[#6B7280] uppercase tracking-wider">
                  {t(xKey === "year" ? "Yil" : "Davr")}
                </th>
                {series.map((s) => (
                  <th key={s.key} className="px-3 py-2 text-[11px] font-bold text-[#6B7280] uppercase tracking-wider text-right">
                    {t(s.name)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9]">
              {data.map((row, i) => (
                <tr key={i} className="hover:bg-[#F9FAFB]">
                  <td className="px-3 py-2 font-medium text-[#374151]">{String(row[xKey])}</td>
                  {series.map((s) => (
                    <td key={s.key} className="px-3 py-2 text-right tabular-nums font-semibold text-[#111827]">
                      {typeof row[s.key] === "number" ? (row[s.key] as number).toLocaleString("uz-UZ") : row[s.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    if (view === "bar") {
      return (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -18, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
            <XAxis dataKey={xKey} tick={{ fontSize: 12, fill: "#6B7280" }} axisLine={false} tickLine={false} dy={6} />
            <YAxis tick={{ fontSize: 12, fill: "#6B7280" }} axisLine={false} tickLine={false} />
            <RechartsTooltip cursor={{ fill: "#F9FAFB" }} contentStyle={tooltipStyle} formatter={(v: number, n) => [`${v} ${t(unit)}`, t(String(n))]} />
            {series.length > 1 && <Legend wrapperStyle={{ fontSize: 12 }} />}
            {series.map((s) => (
              <Bar key={s.key} dataKey={s.key} name={t(s.name)} fill={s.color} radius={[4, 4, 0, 0]} maxBarSize={64}>
                {barCellColors && series.length === 1
                  ? data.map((_, i) => <Cell key={i} fill={barCellColors[i] ?? s.color} />)
                  : null}
              </Bar>
            ))}
          </BarChart>
        </ResponsiveContainer>
      );
    }

    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 14, left: -18, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
          <XAxis dataKey={xKey} tick={{ fontSize: 12, fill: "#6B7280" }} axisLine={false} tickLine={false} dy={6} />
          <YAxis tick={{ fontSize: 12, fill: "#6B7280" }} axisLine={false} tickLine={false} />
          <RechartsTooltip contentStyle={tooltipStyle} formatter={(v: number, n) => [`${v} ${t(unit)}`, t(String(n))]} />
          {series.length > 1 && <Legend wrapperStyle={{ fontSize: 12 }} />}
          {series.map((s) => (
            <Line
              key={s.key}
              type="monotone"
              dataKey={s.key}
              name={t(s.name)}
              stroke={s.color}
              strokeWidth={2.5}
              dot={{ r: 3, fill: s.color }}
              activeDot={{ r: 5 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    );
  };

  const chartCard = (
    <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm overflow-hidden flex flex-col h-full">
      {/* Chart sarlavhasi + ko'rinish almashtirgich (OWID uslubi) */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 p-4 border-b border-[#F1F5F9]">
        <div className="min-w-0">
          <h3 className="text-[16px] font-bold text-[#1d3d63] leading-tight">{t(title)}</h3>
          {subtitle && <p className="text-[12.5px] text-[#6B7280] mt-0.5">{t(subtitle)}</p>}
        </div>
        {views.length > 1 && (
          <div className="flex bg-[#F3F4F6] p-1 rounded-lg flex-shrink-0 self-start">
            {views.map((v) => {
              const M = viewMeta[v];
              return (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  aria-pressed={view === v}
                  className={clsx(
                    "flex items-center gap-1.5 px-3 py-1.5 text-[12.5px] font-medium rounded-md transition-all",
                    view === v ? "bg-white text-[#111827] shadow-sm" : "text-[#6B7280] hover:text-[#111827]"
                  )}
                >
                  <M.icon className="w-3.5 h-3.5" />
                  {t(M.label)}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="p-4 flex-1">
        <div className="h-[300px] w-full min-w-0">{renderChart()}</div>
        {note && <p className="text-[12px] text-[#9CA3AF] mt-2">{t(note)}</p>}
        <SourceLine source={source} updated={updated} />
      </div>
    </div>
  );

  if (!narrative || narrative.length === 0) return chartCard;

  // OWID "featured" — chap hikoя + o'ng grafik
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,420px)_1fr] gap-6 items-stretch">
      <div className="flex flex-col justify-center">
        <h2 className="font-display text-[24px] md:text-[28px] font-bold text-[#1d3d63] leading-tight mb-3">{t(title)}</h2>
        {narrative.map((p, i) => (
          <p key={i} className="text-[14px] text-[#374151] leading-relaxed mb-3">{t(p)}</p>
        ))}
      </div>
      {chartCard}
    </div>
  );
}
