import { useState, useMemo } from "react";
import { Search, ZoomIn, ZoomOut, Maximize, AlertCircle } from "lucide-react";
import clsx from "clsx";
import { REGIONS } from "../data/stats";
import { UZ_REGIONS, UZ_VIEWBOX } from "../data/uzbekistan-geo";

type Risk = "high" | "medium" | "low";

const riskColor: Record<Risk, string> = {
  high: "#EF4444",
  medium: "#F59E0B",
  low: "#10B981",
};

// Holatlar soniga qarab xarita rangi (choropleth)
function fillForCases(cases: number | undefined): string {
  if (cases === undefined || cases === 0) return "#CBD5E1"; // ma'lumot yo'q — ko'rinadigan kulrang
  if (cases <= 10) return "#A7F3D0";
  if (cases <= 50) return "#34D399";
  if (cases <= 150) return "#FBBF24";
  return "#EF4444";
}

export function MapPage() {
  const [selectedRegion, setSelectedRegion] = useState<string>("Toshkent sh.");
  const [hovered, setHovered] = useState<string | null>(null);
  const [riskFilter, setRiskFilter] = useState<"all" | Risk>("all");
  const [query, setQuery] = useState("");
  const [zoom, setZoom] = useState(1);

  const byName = useMemo(() => Object.fromEntries(REGIONS.map((r) => [r.name, r])), []);

  const filtered = REGIONS.filter(
    (r) =>
      (riskFilter === "all" || r.risk === riskFilter) &&
      r.name.toLowerCase().includes(query.toLowerCase())
  );
  const filteredNames = new Set(filtered.map((r) => r.name));

  const selected = byName[selectedRegion];
  const hoveredData = hovered ? byName[hovered] : null;

  return (
    <div className="h-full flex flex-col relative overflow-hidden bg-[#FAFAFA]">
      {/* Top Filter Bar */}
      <div className="absolute top-4 left-4 right-4 md:right-[340px] z-10 flex flex-wrap gap-3">
        <div className="bg-white rounded-lg shadow-sm border border-[#E5E7EB] flex items-center p-1">
          <div className="flex items-center gap-2 px-3">
            <Search className="w-4 h-4 text-[#9CA3AF]" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Viloyat qidirish..."
              className="w-[150px] text-[13px] py-1.5 outline-none border-none placeholder:text-[#9CA3AF]"
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-[#E5E7EB] flex items-center p-1 gap-1">
          {([
            ["all", "Barchasi"],
            ["high", "Yuqori xavf"],
            ["medium", "O'rta xavf"],
            ["low", "Past xavf"],
          ] as const).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setRiskFilter(key)}
              className={clsx(
                "px-3 py-1.5 text-[13px] font-medium rounded-md transition-colors",
                riskFilter === key ? "bg-[#F3F4F6] text-[#111827]" : "text-[#6B7280] hover:bg-[#F9FAFB]"
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Map Container — REAL Uzbekistan choropleth */}
      <div className="flex-1 relative overflow-hidden flex items-center justify-center md:pr-[320px]"
        style={{ background: "radial-gradient(circle at 60% 40%, #F1F5F9 0%, #E2E8F0 100%)" }}>
        <div className="w-full h-full flex items-center justify-center p-6 pt-20">
          <svg
            viewBox={`0 0 ${UZ_VIEWBOX.w} ${UZ_VIEWBOX.h}`}
            className="w-full h-full max-w-[1040px]"
            style={{ filter: "drop-shadow(0 10px 24px rgba(15,23,42,0.18))" }}
          >
            <g style={{ transform: `scale(${zoom})`, transformOrigin: "center", transition: "transform .25s ease" }}>
              {/* Region polygons */}
              {UZ_REGIONS.map((geo) => {
                const data = byName[geo.name];
                const isSel = selectedRegion === geo.name;
                const isHov = hovered === geo.name;
                const dimmed = riskFilter !== "all" && data && !filteredNames.has(geo.name);
                const baseFill = fillForCases(data?.cases);
                return (
                  <path
                    key={geo.name}
                    d={geo.d}
                    fill={baseFill}
                    stroke={isSel ? "#0F172A" : "#F8FAFC"}
                    strokeWidth={isSel ? 3 : 1.4}
                    strokeLinejoin="round"
                    opacity={dimmed ? 0.35 : isHov ? 0.88 : 1}
                    style={{ cursor: data ? "pointer" : "default", transition: "opacity .15s, fill .15s", filter: isSel ? "drop-shadow(0 2px 6px rgba(15,23,42,0.3))" : "none" }}
                    onMouseEnter={() => setHovered(geo.name)}
                    onMouseLeave={() => setHovered((h) => (h === geo.name ? null : h))}
                    onClick={() => data && setSelectedRegion(geo.name)}
                  >
                    <title>{data ? `${geo.name}: ${data.cases} ta holat` : `${geo.name}: holat qayd etilmagan`}</title>
                  </path>
                );
              })}

              {/* 1-bosqich: barcha nuqtalar */}
              {UZ_REGIONS.filter((g) => byName[g.name]).map((geo) => {
                const data = byName[geo.name]!;
                const dimmed = riskFilter !== "all" && !filteredNames.has(geo.name);
                if (dimmed) return null;
                const active = (hovered || selectedRegion) === geo.name;
                return (
                  <circle
                    key={"d-" + geo.name}
                    cx={geo.cx}
                    cy={geo.cy}
                    r={active ? 7 : 4.5}
                    fill={riskColor[data.risk as Risk]}
                    stroke="#fff"
                    strokeWidth={2}
                    style={{ transition: "r .15s", pointerEvents: "none" }}
                  />
                );
              })}

              {/* 2-bosqich: faqat BITTA faol yozuv (hover ustun), eng ustida chiziladi */}
              {(() => {
                const name = hovered || selectedRegion;
                const geo = UZ_REGIONS.find((g) => g.name === name);
                const data = geo && byName[geo.name];
                if (!geo || !data) return null;
                if (riskFilter !== "all" && !filteredNames.has(geo.name)) return null;
                const text = `${geo.name} · ${data.cases} ta holat`;
                const labelW = text.length * 6.2 + 20;
                const labelLeft = geo.cx + labelW + 14 > UZ_VIEWBOX.w;
                const lx = labelLeft ? geo.cx - labelW - 12 : geo.cx + 12;
                return (
                  <g style={{ pointerEvents: "none" }}>
                    <line x1={geo.cx} y1={geo.cy} x2={lx + (labelLeft ? labelW : 0)} y2={geo.cy} stroke="#0F172A" strokeWidth={1} opacity={0.5} />
                    <g transform={`translate(${lx}, ${geo.cy - 11})`}>
                      <rect x={0} y={0} rx={5} width={labelW} height={22} fill="#0F172A" stroke="#334155" strokeWidth={0.5} />
                      <text x={labelW / 2} y={15} textAnchor="middle" fill="#fff" fontSize={11.5} fontWeight={700}>
                        {text}
                      </text>
                    </g>
                  </g>
                );
              })()}
            </g>
          </svg>
        </div>

        {/* Hover tooltip card */}
        {hoveredData && (
          <div className="absolute top-20 left-6 bg-white rounded-lg shadow-lg border border-[#E5E7EB] px-4 py-2.5 z-10 pointer-events-none">
            <div className="text-[13px] font-bold text-[#111827]">{hovered}</div>
            <div className="text-[12px] text-[#6B7280]">{hoveredData.cases} ta holat · {hoveredData.deaths} vafot · {hoveredData.per100k}/100k</div>
          </div>
        )}

        {/* Legend */}
        <div className="absolute bottom-6 left-6 bg-white rounded-lg shadow-sm border border-[#E5E7EB] p-3 text-[12px] space-y-1.5 z-10">
          <div className="font-semibold text-[#374151] mb-1">Holatlar soni</div>
          {[
            ["#EF4444", "150+"],
            ["#FBBF24", "51–150"],
            ["#34D399", "11–50"],
            ["#A7F3D0", "1–10"],
            ["#CBD5E1", "Holat qayd etilmagan"],
          ].map(([c, l]) => (
            <div key={l} className="flex items-center gap-2 text-[#6B7280]">
              <span className="w-3.5 h-3.5 rounded-sm border border-[#E5E7EB]" style={{ backgroundColor: c }} />
              {l}
            </div>
          ))}
        </div>

        {/* Zoom Controls */}
        <div className="absolute bottom-6 right-6 md:right-[340px] flex flex-col gap-2 z-10">
          <div className="bg-white rounded-lg shadow-sm border border-[#E5E7EB] flex flex-col p-1">
            <button onClick={() => setZoom((z) => Math.min(z + 0.3, 3))} className="p-2 text-[#4B5563] hover:text-[#111827] hover:bg-[#F3F4F6] rounded transition-colors"><ZoomIn className="w-5 h-5" /></button>
            <div className="w-full h-px bg-[#E5E7EB] my-1" />
            <button onClick={() => setZoom((z) => Math.max(z - 0.3, 1))} className="p-2 text-[#4B5563] hover:text-[#111827] hover:bg-[#F3F4F6] rounded transition-colors"><ZoomOut className="w-5 h-5" /></button>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-[#E5E7EB] p-1">
            <button onClick={() => setZoom(1)} className="p-2 text-[#4B5563] hover:text-[#111827] hover:bg-[#F3F4F6] rounded transition-colors"><Maximize className="w-5 h-5" /></button>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Region Details */}
      <div className="absolute top-0 right-0 bottom-0 w-full md:w-[320px] bg-white border-l border-[#E5E7EB] shadow-xl z-20 flex flex-col overflow-y-auto hidden md:flex">
        <div className="p-5 border-b border-[#E5E7EB]">
          <h2 className="text-[16px] font-semibold text-[#111827]">Viloyatlar ro'yxati</h2>
          <p className="text-[13px] text-[#6B7280] mt-1">{filtered.length} ta hudud · ССВ ma'lumoti (28.03.2026)</p>
        </div>

        {selected && (
          <div className="p-4 m-3 rounded-xl bg-[#ECFDF5] border border-[#A7F3D0]">
            <p className="text-[12px] text-[#059669] font-medium">Tanlangan hudud</p>
            <h3 className="text-[18px] font-bold text-[#111827]">{selected.name}</h3>
            <div className="grid grid-cols-3 gap-2 mt-3 text-center">
              <div><div className="text-[18px] font-bold text-[#111827] tabular-nums">{selected.cases}</div><div className="text-[11px] text-[#6B7280]">Holat</div></div>
              <div><div className="text-[18px] font-bold text-[#EF4444] tabular-nums">{selected.deaths}</div><div className="text-[11px] text-[#6B7280]">Vafot</div></div>
              <div><div className="text-[18px] font-bold text-[#3B82F6] tabular-nums">{selected.per100k}</div><div className="text-[11px] text-[#6B7280]">100k ga</div></div>
            </div>
          </div>
        )}

        <div className="p-3 flex flex-col gap-2 flex-1">
          {filtered.map((r) => (
            <button
              key={r.id}
              onClick={() => setSelectedRegion(r.name)}
              onMouseEnter={() => setHovered(r.name)}
              onMouseLeave={() => setHovered(null)}
              className={clsx(
                "p-4 rounded-xl border text-left transition-all",
                selectedRegion === r.name ? "border-[#10B981] bg-[#ECFDF5] shadow-sm" : "border-[#E5E7EB] hover:border-[#9CA3AF] bg-white"
              )}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="font-semibold text-[#111827] text-[14px]">{r.name}</span>
                {r.risk === "high" && <AlertCircle className="w-4 h-4 text-[#EF4444]" />}
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[12px] text-[#6B7280] mb-0.5">Jami holat</p>
                  <p className="text-[18px] font-semibold text-[#111827] tabular-nums leading-none">{r.cases.toLocaleString()}</p>
                </div>
                <div
                  className={clsx(
                    "text-[12px] font-medium px-2 py-1 rounded-md",
                    r.risk === "high" ? "text-[#EF4444] bg-[#FEE2E2]" : r.risk === "medium" ? "text-[#F59E0B] bg-[#FEF3C7]" : "text-[#10B981] bg-[#D1FAE5]"
                  )}
                >
                  {r.per100k}/100k
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
