import {
  GraduationCap, Target, ListChecks, Lightbulb, FlaskConical, Filter, Sigma,
  ShieldCheck, Sparkles, BookOpen, TrendingUp, Activity, CalendarClock, Microscope,
} from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { RESEARCH } from "../data/research";
import { useI18n } from "../i18n";

// [..] joy-tutgichni amber "to'ldiriladi" ko'rinishida ajratib ko'rsatish
function isPlaceholder(v: string) {
  return /\[.*\]/.test(v);
}
function Field({ label, value }: { label: string; value: string }) {
  const { t } = useI18n();
  const ph = isPlaceholder(value);
  return (
    <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 py-2.5 border-b border-[#F1F5F9] last:border-0">
      <div className="text-[12px] font-semibold text-[#64748B] sm:w-[180px] flex-shrink-0">{t(label)}</div>
      <div className={ph ? "text-[13px] text-[#92400E] bg-[#FEF3C7] border border-[#FDE68A] rounded px-2 py-0.5 inline-block" : "text-[13px] text-[#0F172A] font-medium"}>
        {value}
      </div>
    </div>
  );
}

function Card({ icon: Icon, title, children }: { icon: any; title: string; children: React.ReactNode }) {
  const { t } = useI18n();
  return (
    <section className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm overflow-hidden">
      <div className="flex items-center gap-2 p-5 border-b border-[#E5E7EB] bg-[#FAFAFA]">
        <Icon className="w-5 h-5 text-[#10B981]" />
        <h2 className="text-[16px] font-semibold text-[#111827]">{t(title)}</h2>
      </div>
      <div className="p-5">{children}</div>
    </section>
  );
}

// Dissertatsiya figurasi — rasm + raqam + sarlavha + manba (1-rasm / 2-rasm)
function Figure({ figNo, src, caption, source }: { figNo: string; src: string; caption: string; source?: string }) {
  const { t } = useI18n();
  return (
    <figure className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] overflow-hidden">
      <div className="bg-white p-3 flex items-center justify-center">
        <ImageWithFallback src={src} alt={t(caption)} className="w-full h-auto max-w-[760px] rounded-md" />
      </div>
      <figcaption className="px-4 py-3 border-t border-[#E2E8F0]">
        <span className="text-[12px] font-bold text-[#1d3d63]">{figNo}. </span>
        <span className="text-[12.5px] text-[#374151]">{t(caption)}</span>
        {source && <div className="text-[11px] text-[#94A3B8] mt-1">{t("Manba")}: {source}</div>}
      </figcaption>
    </figure>
  );
}

export function Tadqiqot() {
  const { t } = useI18n();
  const r = RESEARCH;

  return (
    <div className="p-4 md:p-8 max-w-[1100px] mx-auto space-y-6">
      <PageHeader
        icon={GraduationCap}
        title="Tadqiqot pasporti"
        subtitle="Dissertatsiya maqsadi, vazifalari, ko‘p yillik dinamika va TBATS bashorat tahlili"
        accent="#1d3d63"
      />

      {/* Kirish */}
      <Card icon={BookOpen} title="Kirish (mavzuning dolzarbligi)">
        <div className="space-y-3">
          {r.intro.map((p, i) => (
            <p key={i} className="text-[14px] text-[#374151] leading-relaxed">{p}</p>
          ))}
        </div>
      </Card>

      {/* Mavzu va identifikatsiya */}
      <Card icon={GraduationCap} title="Mavzu va identifikatsiya">
        <div className="mb-3">
          <div className="text-[11px] font-semibold uppercase tracking-wide text-[#94A3B8] mb-1">{t("Dissertatsiya mavzusi")}</div>
          <div className="text-[18px] font-display font-bold text-[#1d3d63] leading-snug">{r.title}</div>
        </div>
        <Field label="Muallif" value={`${r.author.name} · ${r.author.role}`} />
        <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 py-2.5 border-b border-[#F1F5F9]">
          <div className="text-[12px] font-semibold text-[#64748B] sm:w-[180px] flex-shrink-0">{t("Ilmiy rahbarlar")}</div>
          <ul className="space-y-1">
            {r.advisors.map((a, i) => (
              <li key={i} className="text-[13px] text-[#0F172A] font-medium flex gap-2"><span className="text-[#10B981]">•</span>{a}</li>
            ))}
          </ul>
        </div>
        <Field label="Muassasa" value={r.institution} />
        <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 py-2.5 border-b border-[#F1F5F9]">
          <div className="text-[12px] font-semibold text-[#64748B] sm:w-[180px] flex-shrink-0">{t("Ixtisosliklar")}</div>
          <div className="flex flex-wrap gap-1.5">
            {r.specialties.map((s, i) => (
              <span key={i} className="text-[12px] font-semibold text-[#1d3d63] bg-[#EFF6FF] border border-[#BFDBFE] rounded-full px-2.5 py-0.5">{s}</span>
            ))}
          </div>
        </div>
        <Field label="Himoya yili" value={r.defenseYear} />
        <p className="text-[11px] text-[#9CA3AF] mt-3">{t("Sariq bilan belgilangan maydonlar real qiymatlar bilan to‘ldiriladi (research.ts).")}</p>
      </Card>

      {/* Maqsad */}
      <Card icon={Target} title="Tadqiqot maqsadi">
        <p className="text-[14px] text-[#374151] leading-relaxed">{r.aim}</p>
      </Card>

      {/* Vazifalar */}
      <Card icon={ListChecks} title="Tadqiqot vazifalari">
        <ol className="space-y-2.5 list-decimal list-inside">
          {r.objectives.map((o, i) => (
            <li key={i} className="text-[14px] text-[#374151] leading-relaxed pl-1">{o}</li>
          ))}
        </ol>
      </Card>

      {/* Ko'p yillik dinamika (2012–2021) */}
      <Card icon={Activity} title="Ko‘p yillik dinamika (2012–2021)">
        <Figure figNo={r.dynamics.figNo} src={r.dynamics.image} caption={r.dynamics.caption} source={r.dynamics.source} />
        <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 mt-4">
          <div className="rounded-lg bg-[#FEF2F2] border border-[#FECACA] px-3 py-2.5 text-center">
            <div className="text-[10px] font-semibold uppercase tracking-wide text-[#B91C1C]">{t("Respublika · 2019")}</div>
            <div className="text-[22px] font-display font-bold text-[#DC2626]">{r.dynamics.peak.republic.toLocaleString("uz-UZ")}</div>
            <div className="text-[10px] text-[#94A3B8]">{t("100 000 aholiga")}</div>
          </div>
          <div className="rounded-lg bg-[#EFF6FF] border border-[#BFDBFE] px-3 py-2.5 text-center">
            <div className="text-[10px] font-semibold uppercase tracking-wide text-[#1D4ED8]">{t("Toshkent sh. · 2019")}</div>
            <div className="text-[22px] font-display font-bold text-[#2563EB]">{r.dynamics.peak.city.toLocaleString("uz-UZ")}</div>
            <div className="text-[10px] text-[#94A3B8]">{t("100 000 aholiga")}</div>
          </div>
        </div>
        <div className="mt-4">
          <div className="text-[12px] font-semibold text-[#059669] mb-2">{t("Tahlil va xulosalar")}</div>
          <ul className="space-y-2">
            {r.dynamics.points.map((p, i) => (
              <li key={i} className="text-[13.5px] text-[#374151] leading-relaxed flex gap-2"><span className="text-[#10B981] font-bold">›</span>{p}</li>
            ))}
          </ul>
        </div>
      </Card>

      {/* TBATS bashorat */}
      <Card icon={TrendingUp} title="TBATS eksponensial model bilan bashoratlash">
        <Figure figNo={r.forecast.figNo} src={r.forecast.image} caption={r.forecast.caption} />
        <div className="grid sm:grid-cols-2 gap-3 mt-4 mb-4">
          <div className="rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] px-3 py-2">
            <div className="text-[10px] font-semibold uppercase tracking-wide text-[#64748B]">{t("Model")}</div>
            <div className="text-[13px] text-[#0F172A] font-mono font-medium">{r.forecast.model}</div>
          </div>
          <div className="rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] px-3 py-2">
            <div className="text-[10px] font-semibold uppercase tracking-wide text-[#64748B]">{t("Bashorat ufqi")}</div>
            <div className="text-[13px] text-[#0F172A] font-medium">{r.forecast.horizonYears} {t("yil")}</div>
          </div>
        </div>
        <p className="text-[12px] text-[#6B7280] leading-relaxed mb-4">{r.forecast.legend}</p>

        {/* Bashorat cho'qqilari */}
        <div className="text-[12px] font-semibold text-[#1d3d63] mb-2 flex items-center gap-1.5">
          <CalendarClock className="w-4 h-4" /> {t("Bashorat qilingan epidemik cho‘qqilar")}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-4">
          {r.forecast.peaks.map((pk, i) => (
            <div key={i} className="rounded-lg bg-gradient-to-b from-[#FEF3C7] to-[#FFFBEB] border border-[#FDE68A] px-3 py-2.5 text-center">
              <div className="text-[13px] font-bold text-[#92400E]">{pk.year}</div>
              <div className="text-[18px] font-display font-bold text-[#B45309]">{pk.cases}</div>
              <div className="text-[10px] text-[#A16207]">{t("holat")}</div>
            </div>
          ))}
        </div>

        <div>
          <div className="text-[12px] font-semibold text-[#059669] mb-2">{t("Tahlil va xulosalar")}</div>
          <ul className="space-y-2">
            {r.forecast.points.map((p, i) => (
              <li key={i} className="text-[13.5px] text-[#374151] leading-relaxed flex gap-2"><span className="text-[#10B981] font-bold">›</span>{p}</li>
            ))}
          </ul>
        </div>
      </Card>

      {/* Gipoteza */}
      <Card icon={Lightbulb} title="Ilmiy gipoteza">
        <p className="text-[14px] text-[#374151] leading-relaxed">{r.hypothesis}</p>
      </Card>

      {/* Material va usullar */}
      <Card icon={FlaskConical} title="Material va usullar">
        <div className="grid sm:grid-cols-2 gap-3 mb-4">
          <div className="rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] px-3 py-2">
            <div className="text-[10px] font-semibold uppercase tracking-wide text-[#64748B]">{t("Tadqiqot dizayni")}</div>
            <div className="text-[13px] text-[#0F172A] font-medium">{r.design}</div>
          </div>
          <div className="rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] px-3 py-2">
            <div className="text-[10px] font-semibold uppercase tracking-wide text-[#64748B]">{t("Davr")}</div>
            <div className="text-[13px] text-[#0F172A] font-medium">{r.period}</div>
          </div>
          <div className="rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] px-3 py-2">
            <div className="text-[10px] font-semibold uppercase tracking-wide text-[#64748B]">{t("Hudud")}</div>
            <div className="text-[13px] text-[#0F172A] font-medium">{r.setting}</div>
          </div>
          <div className="rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] px-3 py-2">
            <div className="text-[10px] font-semibold uppercase tracking-wide text-[#64748B]">{t("Statistik dastur")}</div>
            <div className="text-[13px] text-[#0F172A] font-medium">{r.software}</div>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <div className="flex items-center gap-1.5 text-[12px] font-semibold text-[#059669] mb-1.5"><Filter className="w-3.5 h-3.5" /> {t("Inklyuziya mezonlari")}</div>
            <ul className="space-y-1.5">
              {r.inclusion.map((x, i) => <li key={i} className="text-[13px] text-[#374151] flex gap-2"><span className="text-[#10B981]">•</span>{x}</li>)}
            </ul>
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-[12px] font-semibold text-[#B91C1C] mb-1.5"><Filter className="w-3.5 h-3.5" /> {t("Eksklyuziya mezonlari")}</div>
            <ul className="space-y-1.5">
              {r.exclusion.map((x, i) => <li key={i} className="text-[13px] text-[#374151] flex gap-2"><span className="text-[#EF4444]">•</span>{x}</li>)}
            </ul>
          </div>
        </div>
      </Card>

      {/* Statistik usullar */}
      <Card icon={Sigma} title="Statistik usullar">
        <ul className="space-y-2">
          {r.methods.map((m, i) => <li key={i} className="text-[13.5px] text-[#374151] flex gap-2"><span className="text-[#1d3d63] font-bold">›</span>{m}</li>)}
        </ul>
        <p className="text-[12px] text-[#6B7280] mt-3">{t("Natijalar «Tahlil» sahifasida 95% CI bilan ko‘rsatilgan.")}</p>
      </Card>

      {/* Serologik diagnostika — ELISA (IgM/IgG) */}
      <Card icon={Microscope} title="Serologik diagnostika — ELISA (IgM/IgG)">
        <p className="text-[14px] text-[#374151] leading-relaxed mb-4">{t(r.serology.abstract)}</p>

        {/* Test ko'rsatkichlari — sezgirlik / xoslik */}
        <div className="grid sm:grid-cols-2 gap-3 mb-5">
          {r.serology.performance.map((pf, i) => (
            <div key={i} className="rounded-lg bg-gradient-to-b from-[#ECFDF5] to-[#F0FDFA] border border-[#A7F3D0] px-4 py-3">
              <div className="text-[10px] font-semibold uppercase tracking-wide text-[#059669] mb-0.5">{t(pf.label)}</div>
              <div className="text-[26px] font-display font-bold text-[#047857] leading-none mb-1.5">{pf.value}</div>
              <p className="text-[12px] text-[#475569] leading-relaxed">{t(pf.note)}</p>
            </div>
          ))}
        </div>

        {/* Usul */}
        <div className="mb-4">
          <div className="text-[12px] font-semibold text-[#1d3d63] mb-2">{t("Usul (qisqacha)")}</div>
          <ul className="space-y-1.5">
            {r.serology.method.map((m, i) => (
              <li key={i} className="text-[13px] text-[#374151] flex gap-2"><span className="text-[#10B981]">•</span>{t(m)}</li>
            ))}
          </ul>
        </div>

        {/* Asosiy natijalar */}
        <div className="mb-4">
          <div className="text-[12px] font-semibold text-[#059669] mb-2">{t("Asosiy natijalar")}</div>
          <ul className="space-y-2">
            {r.serology.findings.map((f, i) => (
              <li key={i} className="text-[13.5px] text-[#374151] leading-relaxed flex gap-2"><span className="text-[#10B981] font-bold">›</span>{t(f)}</li>
            ))}
          </ul>
        </div>

        {/* Xulosa */}
        <div className="rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] px-4 py-3">
          <div className="text-[12px] font-semibold text-[#1d3d63] mb-1">{t("Xulosa")}</div>
          <p className="text-[13.5px] text-[#374151] leading-relaxed">{t(r.serology.conclusion)}</p>
        </div>

        <p className="text-[11px] text-[#9CA3AF] mt-3">
          {t("Manba")}: <span className="text-[#92400E] bg-[#FEF3C7] border border-[#FDE68A] rounded px-1.5 py-0.5">{r.serology.source}</span>
        </p>
      </Card>

      {/* Etika */}
      <Card icon={ShieldCheck} title="Etika asoslari">
        <p className="text-[14px] text-[#374151] leading-relaxed mb-2">{r.ethicsNote}</p>
        <div className="text-[13px] text-[#92400E] bg-[#FEF3C7] border border-[#FDE68A] rounded px-3 py-2">{r.ethicsApproval}</div>
      </Card>

      {/* Ilmiy yangilik */}
      <Card icon={Sparkles} title="Ilmiy yangilik">
        <p className="text-[14px] text-[#374151] leading-relaxed">{r.novelty}</p>
      </Card>
    </div>
  );
}
