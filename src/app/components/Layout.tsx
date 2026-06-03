import { useState, useRef, useEffect } from "react";
import { Outlet, useLocation, Link, useNavigate } from "react-router";
import {
  LayoutDashboard,
  Map as MapIcon,
  Activity,
  Syringe,
  User,
  Settings,
  Bell,
  Search,
  BarChart3,
  LineChart,
  ShieldCheck,
  ChevronRight,
  Globe,
  AlertTriangle,
  Phone,
  Mail,
  BookOpen,
  GraduationCap,
  Check,
  CornerDownLeft,
} from "lucide-react";
import clsx from "clsx";
import { useI18n, type Lang } from "../i18n";

const navItems = [
  { icon: LayoutDashboard, path: "/", label: "Bosh sahifa", group: "Monitoring" },
  { icon: BarChart3, path: "/tahlil", label: "Tahlil", group: "Monitoring" },
  { icon: LineChart, path: "/statistika", label: "Statistika", group: "Monitoring" },
  { icon: MapIcon, path: "/map", label: "Xarita", group: "Monitoring" },
  { icon: BookOpen, path: "/metodologiya", label: "Metodologiya", group: "Monitoring" },
  { icon: GraduationCap, path: "/tadqiqot", label: "Tadqiqot", group: "Akademik" },
  { icon: Activity, path: "/risk", label: "Risk skrining", group: "Klinik" },
  { icon: User, path: "/kabinet", label: "Kabinet", group: "Klinik" },
  { icon: Syringe, path: "/vaksinatsiya", label: "Vaksinatsiya", group: "Profilaktika" },
  { icon: ShieldCheck, path: "/choralar", label: "Choralar", group: "Profilaktika" },
];

const USER = { name: "Mustanov Azamat Yunusovich", initials: "MA", role: "Epidemiolog" };

// Qidiruv indeksi (issue #3) — sahifalar + asosiy ko'rsatkichlar/bo'limlar.
type SearchItem = { label: string; path: string; hint: string };
const SEARCH_INDEX: SearchItem[] = [
  ...navItems.map((n) => ({ label: n.label, path: n.path, hint: n.group })),
  { label: "Vafot reestri", path: "/kabinet", hint: "Klinik" },
  { label: "CFR / o‘lim koeffitsiyenti", path: "/tahlil", hint: "Monitoring" },
  { label: "Tumanlar reytingi", path: "/tahlil", hint: "Monitoring" },
  { label: "Yosh taqsimoti", path: "/statistika", hint: "Monitoring" },
  { label: "Vaksina ACYW135", path: "/vaksinatsiya", hint: "Profilaktika" },
];

// Bildirishnomalar (issue #4) — so'nggi epidemiologik signal va yangilanishlar.
const NOTIFICATIONS = [
  { time: "17.04.2026", text: "MKI bemorlar ro‘yxati yangilandi — 277 holat, 23 vafot.", path: "/" },
  { time: "14.04.2026", text: "Hokimiyatga ma‘lumotnoma: 264 holat, 8,3/100k.", path: "/tahlil" },
  { time: "12.04.2026", text: "23-vafot holati qayd etildi (Yashnobod tumani).", path: "/kabinet" },
];

// O'zbekiston bayrog'i ranglaridagi emblema (sxematik)
function Emblem({ size = 32 }: { size?: number }) {
  return (
    <div
      className="rounded-md overflow-hidden flex flex-col flex-shrink-0 shadow-sm"
      style={{ width: size, height: size }}
    >
      <div className="flex-1 bg-[#0099B5]" />
      <div className="h-[2px] bg-white" />
      <div className="flex-1 bg-white flex items-center justify-center">
        <span className="text-[#1EB53A] font-bold leading-none" style={{ fontSize: size * 0.42 }}>
          ⚕
        </span>
      </div>
      <div className="h-[2px] bg-white" />
      <div className="flex-1 bg-[#1EB53A]" />
    </div>
  );
}

export function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { lang, setLang, t } = useI18n();
  const current = navItems.find(
    (item) => location.pathname === item.path || (item.path !== "/" && location.pathname.startsWith(item.path))
  );
  const pageTitle = current?.label || "Bosh sahifa";
  const isActive = (item: (typeof navItems)[number]) =>
    location.pathname === item.path || (item.path !== "/" && location.pathname.startsWith(item.path));

  // Header boshqaruvi: qidiruv / bildirishnoma / sozlamalar popoverlari (issue #3, #4)
  const [openMenu, setOpenMenu] = useState<null | "search" | "bell" | "settings">(null);
  const [query, setQuery] = useState("");
  const controlsRef = useRef<HTMLDivElement>(null);

  const results = query.trim()
    ? SEARCH_INDEX.filter((s) => t(s.label).toLowerCase().includes(query.trim().toLowerCase())).slice(0, 7)
    : [];

  const go = (path: string) => {
    navigate(path);
    setOpenMenu(null);
    setQuery("");
  };

  // Tashqariga bosilganda / Escape bosilganda popoverlarni yopish
  useEffect(() => {
    if (!openMenu) return;
    const onDown = (e: MouseEvent) => {
      if (controlsRef.current && !controlsRef.current.contains(e.target as Node)) setOpenMenu(null);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenMenu(null);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [openMenu]);

  // Sahifa almashganda popover yopilsin
  useEffect(() => setOpenMenu(null), [location.pathname]);

  return (
    <div className="flex flex-col h-screen bg-[#F1F5F9] font-inter text-[#111827] overflow-hidden">
      {/* Government utility banner */}
      <div className="h-8 bg-[#ECFDF5] text-[#475569] border-b border-[#D1FAE5] flex items-center justify-between px-4 md:px-6 flex-shrink-0 text-[11px]">
        <div className="flex items-center gap-2 min-w-0">
          <Emblem size={16} />
          <span
            className="truncate font-medium tracking-wide"
            title={t("O‘ZBEKISTON RESPUBLIKASI SOG‘LIQNI SAQLASH VAZIRLIGI") + " · " + t("Sanitariya-epidemiologik osoyishtalik agentligi (Sanepidqo‘m)")}
          >
            {t("O‘ZBEKISTON RESPUBLIKASI SOG‘LIQNI SAQLASH VAZIRLIGI")}
            <span className="hidden lg:inline text-[#94A3B8]"> · {t("Sanitariya-epidemiologik osoyishtalik agentligi (Sanepidqo‘m)")}</span>
          </span>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <span className="hidden sm:flex items-center gap-1 text-[#94A3B8]"><Globe className="w-3 h-3" /></span>
          <div className="flex items-center gap-1.5 font-medium">
            {(["uz", "ru", "en"] as Lang[]).map((l, i) => (
              <span key={l} className="flex items-center gap-1.5">
                {i > 0 && <span className="text-[#CBD5E1]">·</span>}
                <button
                  onClick={() => setLang(l)}
                  aria-label={`${t("Til")}: ${l.toUpperCase()}`}
                  className={clsx("uppercase transition-colors", lang === l ? "text-[#059669] font-bold" : "text-[#94A3B8] hover:text-[#0F172A]")}
                >
                  {l}
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Top Header — brand + controls */}
      <header className="h-[58px] bg-white border-b border-[#E2E8F0] px-4 md:px-6 flex items-center justify-between flex-shrink-0 z-30">
        <Link to="/" className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-display font-bold text-lg shadow-lg flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #10B981 0%, #047857 100%)", boxShadow: "0 6px 18px rgba(16,185,129,0.35)" }}>
            M
          </div>
          <div className="min-w-0">
            <div className="text-[16px] md:text-[17px] font-display font-bold text-[#0F172A] leading-tight">
              MeningoUz <span className="hidden lg:inline font-normal text-[#94A3B8] text-[13px]">{t("— epidemiologik monitoring")}</span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-[#94A3B8] leading-none mt-0.5">
              <Link to="/" className="hover:text-[#10B981]">{t("Bosh sahifa")}</Link>
              {pageTitle !== "Bosh sahifa" && (
                <>
                  <ChevronRight className="w-3 h-3" />
                  <span className="text-[#64748B] font-medium">{t(pageTitle)}</span>
                </>
              )}
            </div>
          </div>
        </Link>

        <div ref={controlsRef} className="flex items-center gap-3 md:gap-4">
          {/* Qidiruv (issue #3) — funksional, natijalar dropdownida sahifalarga o'tadi */}
          <div className="relative hidden lg:block w-[240px]">
            <Search className="w-4 h-4 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setOpenMenu("search");
              }}
              onFocus={() => setOpenMenu("search")}
              onKeyDown={(e) => {
                if (e.key === "Enter" && results[0]) go(results[0].path);
              }}
              placeholder={t("Hudud yoki ko'rsatkich qidirish...")}
              aria-label={t("Hudud yoki ko'rsatkich qidirish...")}
              className="w-full pl-9 pr-4 py-2 bg-[#F1F5F9] border border-transparent focus:border-[#CBD5E1] rounded-md text-[13px] focus:ring-1 focus:ring-[#10B981] outline-none placeholder:text-[#94A3B8]"
            />
            {openMenu === "search" && query.trim() && (
              <div className="absolute top-full mt-2 left-0 w-[300px] bg-white border border-[#E2E8F0] rounded-xl shadow-xl py-1.5 z-50 overflow-hidden">
                {results.length === 0 ? (
                  <div className="px-4 py-3 text-[13px] text-[#94A3B8]">{t("Hech narsa topilmadi")}</div>
                ) : (
                  <>
                    {results.map((r) => (
                      <button
                        key={r.label + r.path}
                        onClick={() => go(r.path)}
                        className="w-full flex items-center justify-between gap-3 px-4 py-2 text-left hover:bg-[#F1F5F9] transition-colors"
                      >
                        <span className="text-[13px] text-[#0F172A] truncate">{t(r.label)}</span>
                        <span className="text-[10px] uppercase tracking-wide text-[#94A3B8] flex-shrink-0">{t(r.hint)}</span>
                      </button>
                    ))}
                    <div className="px-4 pt-1.5 mt-1 border-t border-[#F1F5F9] text-[10.5px] text-[#94A3B8] flex items-center gap-1.5">
                      <CornerDownLeft className="w-3 h-3" /> {t("Natijaga o‘tish uchun Enter")}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Bildirishnomalar (issue #4) */}
          <div className="relative">
            <button
              onClick={() => setOpenMenu(openMenu === "bell" ? null : "bell")}
              className={clsx("relative transition-colors", openMenu === "bell" ? "text-[#0F172A]" : "text-[#64748B] hover:text-[#0F172A]")}
              aria-label={t("Bildirishnomalar")}
              aria-expanded={openMenu === "bell"}
              title={t("Bildirishnomalar")}
            >
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#EF4444] rounded-full border-2 border-white" />
            </button>
            {openMenu === "bell" && (
              <div className="absolute top-full mt-2.5 right-0 w-[320px] bg-white border border-[#E2E8F0] rounded-xl shadow-xl z-50 overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#F1F5F9]">
                  <span className="text-[13px] font-semibold text-[#0F172A]">{t("Bildirishnomalar")}</span>
                  <span className="text-[10px] font-bold text-[#EF4444] bg-[#FEE2E2] px-1.5 py-0.5 rounded uppercase tracking-wide">{NOTIFICATIONS.length} {t("Yangi")}</span>
                </div>
                <div className="max-h-[280px] overflow-y-auto">
                  {NOTIFICATIONS.map((n) => (
                    <button
                      key={n.time + n.text}
                      onClick={() => go(n.path)}
                      className="w-full text-left px-4 py-3 hover:bg-[#F1F5F9] transition-colors border-b border-[#F1F5F9] last:border-0"
                    >
                      <div className="text-[11px] font-semibold text-[#94A3B8] mb-0.5 tabular-nums">{n.time}</div>
                      <div className="text-[12.5px] text-[#374151] leading-snug">{t(n.text)}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sozlamalar (issue #4) — til tanlash + boshqalar (tez orada) */}
          <div className="relative">
            <button
              onClick={() => setOpenMenu(openMenu === "settings" ? null : "settings")}
              className={clsx("transition-colors", openMenu === "settings" ? "text-[#0F172A]" : "text-[#64748B] hover:text-[#0F172A]")}
              aria-label={t("Sozlamalar")}
              aria-expanded={openMenu === "settings"}
              title={t("Sozlamalar")}
            >
              <Settings className="w-5 h-5" />
            </button>
            {openMenu === "settings" && (
              <div className="absolute top-full mt-2.5 right-0 w-[240px] bg-white border border-[#E2E8F0] rounded-xl shadow-xl z-50 overflow-hidden py-1.5">
                <div className="px-4 pt-1.5 pb-1 text-[10px] font-semibold uppercase tracking-wide text-[#94A3B8]">{t("Interfeys tili")}</div>
                {(["uz", "ru", "en"] as Lang[]).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className="w-full flex items-center justify-between px-4 py-2 text-[13px] text-[#0F172A] hover:bg-[#F1F5F9] transition-colors"
                  >
                    <span className="uppercase font-medium">{l}</span>
                    {lang === l && <Check className="w-4 h-4 text-[#10B981]" />}
                  </button>
                ))}
                <div className="border-t border-[#F1F5F9] mt-1.5 pt-1.5">
                  <div className="w-full flex items-center justify-between px-4 py-2 text-[13px] text-[#94A3B8] cursor-default">
                    <span>{t("Yordam va qo‘llanma")}</span>
                    <span className="text-[10px] uppercase tracking-wide bg-[#F1F5F9] px-1.5 py-0.5 rounded">{t("Tez orada")}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 cursor-pointer pl-3 border-l border-[#E2E8F0]">
            <div className="w-8 h-8 rounded-full bg-[#0B5FA5] flex items-center justify-center text-white text-[12px] font-semibold flex-shrink-0">{USER.initials}</div>
            <div className="hidden md:block leading-tight max-w-[180px]">
              <div className="text-[13px] font-semibold text-[#0F172A] truncate" title={USER.name}>{USER.name}</div>
              <div className="text-[11px] text-[#94A3B8]">{t(USER.role)}</div>
            </div>
          </div>
        </div>
      </header>

      {/* Primary navigation — header bar (oddiy, fonsiz) */}
      <nav className="hidden md:flex relative flex-shrink-0 z-20 px-3 md:px-5 items-center gap-1 overflow-x-auto bg-white border-b border-[#E2E8F0]">
        {navItems.map((item) => {
          const active = isActive(item);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={clsx(
                "relative flex items-center gap-2 px-3.5 py-3 text-[13.5px] font-medium whitespace-nowrap transition-colors",
                active ? "text-[#059669]" : "text-[#64748B] hover:text-[#111827]"
              )}
            >
              <item.icon className={clsx("w-[17px] h-[17px]", active ? "text-[#10B981]" : "text-[#94A3B8]")} />
              {t(item.label)}
              {active && <span className="absolute left-2 right-2 bottom-0 h-[2.5px] rounded-t bg-[#10B981]" />}
            </Link>
          );
        })}
      </nav>

      {/* Epidemic status strip */}
      <div className="flex-shrink-0 bg-[#FEF2F2] border-b border-[#FECACA] px-4 md:px-6 py-1.5 flex items-center gap-2 text-[12px]">
        <AlertTriangle className="w-3.5 h-3.5 text-[#DC2626] flex-shrink-0" />
        <span className="text-[#991B1B]">
          <b>{t("Epidemik holat: YUQORI")}</b>{t(" — Toshkent shahrida faol o‘choq (23-fevraldan beri).")}
        </span>
        <span className="ml-auto text-[#B91C1C] font-medium hidden sm:block">{t("So‘nggi yangilanish: 17.04.2026")}</span>
      </div>

      {/* Scrollable Page Content + Footer */}
      <div className="flex-1 overflow-auto">
        <Outlet />

        {/* Footer */}
        <footer className="bg-[#F8FAFC] text-[#64748B] border-t border-[#E2E8F0] mt-10">
          <div className="max-w-[1280px] mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-3">
                <Emblem size={30} />
                <span className="text-[#0F172A] font-bold text-[15px]">MeningoUz</span>
              </div>
              <p className="text-[12px] leading-relaxed">
                {t("Meningokokk infeksiyasi bo‘yicha epidemiologik monitoring va profilaktika platformasi.")}
              </p>
            </div>
            <div>
              <h4 className="text-[#334155] font-semibold text-[13px] mb-3 uppercase tracking-wide">{t("Barcha bo‘limlar")}</h4>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-[12px]">
                {navItems.map((n) => (
                  <li key={n.path}><Link to={n.path} className="hover:text-[#059669]">{t(n.label)}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[#334155] font-semibold text-[13px] mb-3 uppercase tracking-wide">{t("Ma‘lumot manbalari")}</h4>
              <ul className="space-y-2 text-[12px]">
                <li>SSV Sanepidqo‘m ma‘lumotnomasi (28.03.2026)</li>
                <li>Hokimiyatga ma‘lumotnoma (14.04.2026)</li>
                <li>MKI bemorlar ro‘yxati (17.04.2026)</li>
                <li>Vaksina yo‘riqnomasi (ACYW135)</li>
              </ul>
            </div>
            <div>
              <h4 className="text-[#334155] font-semibold text-[13px] mb-3 uppercase tracking-wide">{t("Bog‘lanish")}</h4>
              <ul className="space-y-2 text-[12px]">
                <li className="flex items-center gap-2"><Phone className="w-3.5 h-3.5" /> +998 (71) 120-55-77</li>
                <li className="flex items-center gap-2"><Mail className="w-3.5 h-3.5" /> info@ssv.uz</li>
                <li className="flex items-center gap-2"><Globe className="w-3.5 h-3.5" /> ssv.uz · sanepid.uz</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[#E2E8F0]">
            <div className="max-w-[1280px] mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-[#94A3B8]">
              <span>{t("© 2026 O‘zbekiston Respublikasi SSV · Sanepidqo‘m. Barcha huquqlar himoyalangan.")}</span>
              <span>{t("Ma‘lumotlar rasmiy hisobotlar asosida · Tibbiy maslahat o‘rnini bosmaydi.")}</span>
            </div>
          </div>
        </footer>
      </div>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#E2E8F0] flex items-center justify-around h-[60px] z-20 pb-safe overflow-x-auto">
        {navItems.map((item) => {
          const active = isActive(item);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={clsx(
                "flex flex-col items-center justify-center min-w-[64px] h-full text-[9px] font-medium transition-colors flex-shrink-0",
                active ? "text-[#10B981]" : "text-[#94A3B8]"
              )}
            >
              <item.icon className={clsx("w-5 h-5 mb-1", active ? "text-[#10B981]" : "text-[#94A3B8]")} />
              {t(item.label)}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
