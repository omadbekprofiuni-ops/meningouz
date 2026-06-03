import { useMemo, useState } from "react";
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
  Cell,
} from "recharts";
import clsx from "clsx";
import { ChevronDown } from "lucide-react";
import { REGIONS, WEEKLY } from "../data/stats";
import { DISTRICTS, AGE_DISTRIBUTION } from "../data/districts";
import { UZ_REGIONS, UZ_VIEWBOX } from "../data/uzbekistan-geo";
import { SourceLine } from "./SourceLine";
import { useI18n } from "../i18n";

type Level = "viloyat" | "tuman";
type Metric = "cases" | "rate" | "deaths";

// ECDC uslubidagi ketma-ket (sequential) rang shkalasi
const RAMP = ["#FEF3C7", "#FDBA74", "#FB923C", "#EA580C", "#9A3412"];
const NO_DATA = "#E5E7EB";

function rampColor(value: number, max: number): string {
  if (!value || max <= 0) return NO_DATA;
  const r = value / max;
  if (r >= 0.8) return RAMP[4];
  if (r >= 0.55) return RAMP[3];
  if (r >= 0.3) return RAMP[2];
  if (r >= 0.12) return RAMP[1];
  return RAMP[0];
}

interface Row {
  name: string;
  cases: number;
  rate: number;
  deaths: number;
}

export function SurveillanceAtlas() {
  const { t } = useI18n();
  const [level, setLevel] = useState<Level>("viloyat");
  const [metric, setMetric] = useState<Metric>("rate");
  const [selected, setSelected] = useState<string | null>(null);

  const rows: Row[] = useMemo(() => {
    if (level === "viloyat") {
      return REGIONS.map((r) => ({ name: r.name, cases: r.cases, rate: r.per100k, deaths: r.deaths }));
    }
    return DISTRICTS.map((d) => ({ name: d.name, cases: d.cases, rate: d.intensity, deaths: d.deaths }));
  }, [level]);

  const metricKey: Record<Metric, keyof Row> = { cases: "cases", rate: "rate", deaths: "deaths" };
  const metricLabel: Record<Metric, string> = {
    cases: "Holatlar soni",
    rate: "Intensivlik (100k aholiga)",
    deaths: "Vafot",
  };

  const valueOf = (row: Row) => row[metricKey[metric]] as number;
  const sorted = [...rows].sort((a, b) => valueOf(b) - valueOf(a));
  const max = Math.max(...rows.map(valueOf), 0);
  const byName = Object.fromEntries(rows.map((r) => [r.name, r]));

  const ageData = AGE_DISTRIBUTION.map((a) => ({ label: a.label, value: a.value, color: a.color }));

  const Dropdown = ({
    value,
    onChange,
    options,
  }: {
    value: string;
    onChange: (v: string) => void;
    options: { v: string; label: string }[];
  }) => (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none bg-white border border-[#10B981] text-[#065F46] font-medium text-[13px] rounded-md pl-3 pr-8 py-1.5 outline-none focus:ring-2 focus:ring-[#10B981]/40 cursor-pointer"
      >
        {options.map((o) => (
          <option key={o.v} value={o.v}>
            {t(o.label)}
          </option>
        ))}
      </select>
      <ChevronDown className="w-4 h-4 text-[#10B981] absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
    </div>
  );

  // Legend bandlari
  const legendBands = [
    { c: RAMP[0], l: "Past" },
    { c: RAMP[1], l: "" },
    { c: RAMP[2], l: "O'rta" },
    { c: RAMP[3], l: "" },
    { c: RAMP[4], l: "Yuqori" },
    { c: NO_DATA, l: "Ma'lumot yo'q" },
  ];

  return (
    <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm overflow-hidden">
      {/* Boshqaruv paneli (ECDC uslubidagi selektorlar) */}
      <div className="flex flex-wrap items-center gap-2.5 p-4 border-b border-[#E5E7EB] bg-[#F0FDF4]">
        <span className="text-[12px] font-bold text-[#065F46] uppercase tracking-wide mr-1">{t("Kuzatuv atlasi")}</span>
        <Dropdown
          value={level}
          onChange={(v) => { setLevel(v as Level); setSelected(null); }}
          options={[{ v: "viloyat", label: "Viloyatlar (respublika)" }, { v: "tuman", label: "Tumanlar (Toshkent sh.)" }]}
        />
        <Dropdown
          value={metric}
          onChange={(v) => setMetric(v as Metric)}
          options={[
            { v: "cases", label: "Holatlar soni" },
            { v: "rate", label: "Intensivlik (100k)" },
            { v: "deaths", label: "Vafot" },
          ]}
        />
        <span className="ml-auto text-[12px] font-semibold text-[#065F46] bg-white border border-[#A7F3D0] rounded-md px-2.5 py-1.5">
          {level === "viloyat" ? "2026 · 28.03" : "2026 · 17.04"}
        </span>
      </div>

      {/* 4-kvadrant */}
      <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-[#E5E7EB]">
        {/* TL — jadval */}
        <div className="flex flex-col">
          <div className="px-4 py-2.5 bg-[#F9FAFB] border-b border-[#E5E7EB]">
            <h4 className="text-[13px] font-bold text-[#374151]">{t(level === "viloyat" ? "Hududlar" : "Tumanlar")} · {t(metricLabel[metric])}</h4>
          </div>
          <div className="overflow-auto max-h-[340px]">
            <table className="w-full text-left text-[13px]">
              <thead className="sticky top-0 bg-white shadow-[0_1px_0_#E5E7EB]">
                <tr>
                  <th className="px-4 py-2 text-[11px] font-bold text-[#6B7280] uppercase tracking-wide">{t(level === "viloyat" ? "Hudud" : "Tuman")}</th>
                  <th className="px-4 py-2 text-[11px] font-bold text-[#6B7280] uppercase tracking-wide text-right">{t(metricLabel[metric])}</th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((r) => {
                  const v = valueOf(r);
                  const isSel = selected === r.name;
                  return (
                    <tr
                      key={r.name}
                      onMouseEnter={() => setSelected(r.name)}
                      onClick={() => setSelected(r.name)}
                      className={clsx("cursor-pointer transition-colors border-b border-[#F1F5F9]", isSel ? "bg-[#ECFDF5]" : "hover:bg-[#F9FAFB]")}
                    >
                      <td className="px-4 py-2 font-medium text-[#374151] flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ backgroundColor: rampColor(v, max) }} />
                        {r.name}
                      </td>
                      <td className="px-4 py-2 text-right tabular-nums font-semibold text-[#111827]">
                        {metric === "rate" ? v.toFixed(1) : v.toLocaleString("uz-UZ")}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* TR — xarita / choropleth */}
        <div className="flex flex-col">
          <div className="px-4 py-2.5 bg-[#F9FAFB] border-b border-[#E5E7EB] flex items-center justify-between">
            <h4 className="text-[13px] font-bold text-[#374151]">{t("Xarita")}</h4>
            <div className="flex items-center gap-1">
              {legendBands.map((b, i) => (
                <span key={i} className="w-3.5 h-3.5 rounded-sm border border-white" style={{ backgroundColor: b.c }} title={t(b.l)} />
              ))}
            </div>
          </div>
          <div className="flex-1 p-3 flex items-center justify-center bg-[#FAFAFA] min-h-[300px]">
            {level === "viloyat" ? (
              <svg viewBox={`0 0 ${UZ_VIEWBOX.w} ${UZ_VIEWBOX.h}`} className="w-full h-full max-h-[320px]">
                {UZ_REGIONS.map((geo) => {
                  const d = byName[geo.name];
                  const fill = d ? rampColor(valueOf(d), max) : NO_DATA;
                  const isSel = selected === geo.name;
                  return (
                    <path
                      key={geo.name}
                      d={geo.d}
                      fill={fill}
                      stroke={isSel ? "#065F46" : "#fff"}
                      strokeWidth={isSel ? 2.5 : 0.8}
                      style={{ cursor: d ? "pointer" : "default", transition: "fill .2s" }}
                      onMouseEnter={() => d && setSelected(geo.name)}
                    >
                      <title>{d ? `${geo.name}: ${metric === "rate" ? valueOf(d).toFixed(1) : valueOf(d)}` : `${geo.name}: ${t("ma'lumot yo'q")}`}</title>
                    </path>
                  );
                })}
              </svg>
            ) : (
              // Tumanlar uchun kartogramma (tile-grid) — district polygon yo'q
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 w-full">
                {sorted.map((r) => {
                  const v = valueOf(r);
                  const isSel = selected === r.name;
                  const dark = v / max >= 0.55;
                  return (
                    <button
                      key={r.name}
                      onMouseEnter={() => setSelected(r.name)}
                      onClick={() => setSelected(r.name)}
                      className={clsx("rounded-lg p-2 text-left transition-all border", isSel ? "ring-2 ring-[#065F46] border-transparent" : "border-black/5")}
                      style={{ backgroundColor: rampColor(v, max) }}
                    >
                      <div className={clsx("text-[11px] font-semibold truncate", dark ? "text-white" : "text-[#374151]")}>{r.name}</div>
                      <div className={clsx("text-[15px] font-bold tabular-nums", dark ? "text-white" : "text-[#111827]")}>
                        {metric === "rate" ? v.toFixed(1) : v}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* BL — trend (haftalik epi-egri) */}
        <div className="flex flex-col border-t border-[#E5E7EB]">
          <div className="px-4 py-2.5 bg-[#F9FAFB] border-b border-[#E5E7EB]">
            <h4 className="text-[13px] font-bold text-[#374151]">{t("Haftalik dinamika (Toshkent sh., 2026)")}</h4>
          </div>
          <div className="p-3 h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={WEEKLY} margin={{ top: 10, right: 14, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="week" tick={{ fontSize: 11, fill: "#6B7280" }} axisLine={false} tickLine={false} interval={1} />
                <YAxis tick={{ fontSize: 11, fill: "#6B7280" }} axisLine={false} tickLine={false} />
                <RechartsTooltip contentStyle={{ backgroundColor: "#111827", color: "#fff", borderRadius: 8, border: "none", fontSize: 13 }} formatter={(v: number) => [`${v} ${t("ta")}`, t("Holat")]} />
                <Line type="monotone" dataKey="cases" stroke="#EA580C" strokeWidth={2.5} dot={false} activeDot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* BR — yosh guruhlari (age-specific) */}
        <div className="flex flex-col border-t border-[#E5E7EB]">
          <div className="px-4 py-2.5 bg-[#F9FAFB] border-b border-[#E5E7EB]">
            <h4 className="text-[13px] font-bold text-[#374151]">{t("Yosh guruhlari kesimi (holatlar)")}</h4>
          </div>
          <div className="p-3 h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ageData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="label" tickFormatter={(v: string) => t(v)} tick={{ fontSize: 10, fill: "#6B7280" }} axisLine={false} tickLine={false} interval={0} angle={-12} dy={8} height={42} />
                <YAxis tick={{ fontSize: 11, fill: "#6B7280" }} axisLine={false} tickLine={false} />
                <RechartsTooltip cursor={{ fill: "#F9FAFB" }} contentStyle={{ backgroundColor: "#111827", color: "#fff", borderRadius: 8, border: "none", fontSize: 13 }} formatter={(v: number) => [`${v} ${t("ta")}`, t("Holat")]} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]} maxBarSize={48}>
                  {ageData.map((a) => <Cell key={a.label} fill={a.color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="px-4 py-3 border-t border-[#E5E7EB]">
        <SourceLine
          source={level === "viloyat" ? "SSV Sanepidqo‘m respublika ma‘lumotnomasi" : "2026 tumanlar jadvali (MKI)"}
          updated={level === "viloyat" ? "28.03.2026" : "17.04.2026"}
        />
      </div>
    </div>
  );
}
