import { useI18n } from "../i18n";

type SourceLineProps = {
  // Ma'lumot manbai (masalan: "SSV Sanepid ma'lumotnomasi")
  source?: string;
  // Yangilangan sana (kun.oy.yil)
  updated?: string;
  // Litsenziya yorlig'i
  license?: string;
  className?: string;
};

// Har chart/jadval ostida turadigan ishonch (provenance) qatori.
// WHO/OWID uslubi: manba · yangilangan sana · litsenziya.
export function SourceLine({
  source = "SSV Sanepidqo‘m ma‘lumotnomasi",
  updated = "17.04.2026",
  license = "CC BY 4.0",
  className = "",
}: SourceLineProps) {
  const { t } = useI18n();
  return (
    <p
      className={`text-[11px] text-[#9CA3AF] leading-relaxed mt-3 pt-2 border-t border-[#F1F5F9] ${className}`}
    >
      <span className="font-medium text-[#6B7280]">{t("Manba")}:</span> {t(source)}
      <span className="mx-1.5 text-[#D1D5DB]">·</span>
      {t("Yangilangan")} {updated}
      <span className="mx-1.5 text-[#D1D5DB]">·</span>
      <span className="tabular-nums">{license}</span>
    </p>
  );
}
