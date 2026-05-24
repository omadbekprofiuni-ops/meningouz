import { Outlet, useLocation, Link } from "react-router";
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
  ShieldCheck,
  ChevronRight,
  Globe,
  AlertTriangle,
  Phone,
  Mail,
} from "lucide-react";
import clsx from "clsx";
import { useI18n, type Lang } from "../i18n";

const navItems = [
  { icon: LayoutDashboard, path: "/", label: "Bosh sahifa", group: "Monitoring" },
  { icon: BarChart3, path: "/tahlil", label: "Tahlil", group: "Monitoring" },
  { icon: MapIcon, path: "/map", label: "Xarita", group: "Monitoring" },
  { icon: Activity, path: "/risk", label: "Risk skrining", group: "Klinik" },
  { icon: User, path: "/kabinet", label: "Kabinet", group: "Klinik" },
  { icon: Syringe, path: "/vaksinatsiya", label: "Vaksinatsiya", group: "Profilaktika" },
  { icon: ShieldCheck, path: "/choralar", label: "Choralar", group: "Profilaktika" },
];

const navGroups = ["Monitoring", "Klinik", "Profilaktika"];

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
  const { lang, setLang, t } = useI18n();
  const current = navItems.find(
    (item) => location.pathname === item.path || (item.path !== "/" && location.pathname.startsWith(item.path))
  );
  const pageTitle = current?.label || "Bosh sahifa";

  return (
    <div className="flex h-screen bg-[#F1F5F9] font-inter text-[#111827] overflow-hidden">
      {/* Sidebar — custom labeled navigation */}
      <aside className="w-[244px] hidden md:flex flex-col flex-shrink-0 z-20 relative"
        style={{ background: "linear-gradient(180deg, #0E1424 0%, #0A0E1A 100%)" }}>
        <div className="absolute top-0 right-0 w-32 h-40 petechiae opacity-40 pointer-events-none" />

        {/* Brand */}
        <Link to="/" className="flex items-center gap-3 px-5 h-[66px] border-b border-white/[0.06] relative z-10">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-display font-bold text-lg shadow-lg"
            style={{ background: "linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)", boxShadow: "0 6px 18px rgba(139,92,246,0.4)" }}>
            M
          </div>
          <div className="leading-tight">
            <div className="text-white font-display font-bold text-[16px]">MeningoUz</div>
            <div className="text-[10px] text-slate-500 tracking-wide">{t("Epidemiologik monitoring")}</div>
          </div>
        </Link>

        {/* Grouped nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 relative z-10">
          {navGroups.map((group) => (
            <div key={group} className="mb-5">
              <div className="px-3 mb-1.5 text-[10px] font-semibold tracking-[0.14em] uppercase text-slate-600">{t(group)}</div>
              {navItems.filter((n) => n.group === group).map((item) => {
                const isActive = location.pathname === item.path || (item.path !== "/" && location.pathname.startsWith(item.path));
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={clsx(
                      "relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13.5px] font-medium transition-all mb-0.5",
                      isActive ? "bg-white/[0.07] text-white" : "text-slate-400 hover:text-white hover:bg-white/[0.03]"
                    )}
                  >
                    {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 rounded-r bg-[#8B5CF6]" />}
                    <item.icon className={clsx("w-[18px] h-[18px]", isActive ? "text-[#A78BFA]" : "text-slate-500")} />
                    {t(item.label)}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Live status card */}
        <div className="px-3 relative z-10">
          <div className="rounded-xl bg-[#F43F5E]/10 border border-[#F43F5E]/20 px-3 py-2.5">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F43F5E] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F43F5E]" />
              </span>
              <span className="text-[11px] font-bold text-[#FCA5A5] tracking-wide">{t("EPIDEMIK HOLAT: YUQORI")}</span>
            </div>
            <div className="text-[10px] text-slate-500 pl-4">{t("Yangilangan: 17.04.2026")}</div>
          </div>
        </div>

        {/* User */}
        <div className="flex items-center gap-3 px-4 py-4 mt-2 border-t border-white/[0.06] relative z-10">
          <div className="w-9 h-9 rounded-full bg-[#0B5FA5] flex items-center justify-center text-white text-[12px] font-semibold flex-shrink-0">SE</div>
          <div className="leading-tight flex-1 min-w-0">
            <div className="text-[13px] font-semibold text-white truncate">Sanepidqo‘m</div>
            <div className="text-[11px] text-slate-500">{t("Epidemiolog")}</div>
          </div>
          <button className="text-slate-500 hover:text-white transition-colors" title="Sozlamalar">
            <Settings className="w-[18px] h-[18px]" />
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Government utility banner */}
        <div className="h-8 bg-[#0B1220] text-slate-300 flex items-center justify-between px-4 md:px-6 flex-shrink-0 text-[11px]">
          <div className="flex items-center gap-2 min-w-0">
            <Emblem size={16} />
            <span className="truncate font-medium tracking-wide">
              {t("O‘ZBEKISTON RESPUBLIKASI SOG‘LIQNI SAQLASH VAZIRLIGI")}
              <span className="hidden lg:inline text-slate-500">{t(" · Sanitariya-epidemiologik osoyishtalik agentligi (Sanepidqo‘m)")}</span>
            </span>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <span className="hidden sm:flex items-center gap-1 text-slate-400"><Globe className="w-3 h-3" /></span>
            <div className="flex items-center gap-1.5 font-medium">
              {(["uz", "ru", "en"] as Lang[]).map((l, i) => (
                <span key={l} className="flex items-center gap-1.5">
                  {i > 0 && <span className="text-slate-600">·</span>}
                  <button
                    onClick={() => setLang(l)}
                    className={clsx("uppercase transition-colors", lang === l ? "text-white font-bold" : "text-slate-400 hover:text-white")}
                  >
                    {l}
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Top Header */}
        <header className="h-[58px] bg-white border-b border-[#E2E8F0] px-4 md:px-6 flex items-center justify-between flex-shrink-0 z-10">
          <div className="flex items-center gap-3 min-w-0">
            <Emblem size={34} />
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 text-[11px] text-[#94A3B8] leading-none">
                <Link to="/" className="hover:text-[#10B981]">{t("Bosh sahifa")}</Link>
                {pageTitle !== "Bosh sahifa" && (
                  <>
                    <ChevronRight className="w-3 h-3" />
                    <span className="text-[#64748B] font-medium">{t(pageTitle)}</span>
                  </>
                )}
              </div>
              <h1 className="text-[16px] md:text-[17px] font-bold text-[#0F172A] leading-tight mt-0.5 truncate">
                MeningoUz <span className="hidden sm:inline font-normal text-[#94A3B8] text-[13px]">{t("— epidemiologik monitoring")}</span>
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-4 md:gap-5">
            <div className="relative hidden md:block w-[260px]">
              <Search className="w-4 h-4 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={t("Hudud yoki ko'rsatkich qidirish...")}
                className="w-full pl-9 pr-4 py-2 bg-[#F1F5F9] border border-transparent focus:border-[#CBD5E1] rounded-md text-[13px] focus:ring-1 focus:ring-[#10B981] outline-none placeholder:text-[#94A3B8]"
              />
            </div>
            <button className="relative text-[#64748B] hover:text-[#0F172A]">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#EF4444] rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-2 cursor-pointer pl-3 border-l border-[#E2E8F0]">
              <div className="w-8 h-8 rounded-full bg-[#0B5FA5] flex items-center justify-center text-white text-[12px] font-semibold">SE</div>
              <div className="hidden sm:block leading-tight">
                <div className="text-[13px] font-semibold text-[#0F172A]">Sanepidqo‘m</div>
                <div className="text-[11px] text-[#94A3B8]">{t("Epidemiolog")}</div>
              </div>
            </div>
          </div>
        </header>

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
          <footer className="bg-[#0F172A] text-slate-400 mt-10">
            <div className="max-w-[1280px] mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="md:col-span-1">
                <div className="flex items-center gap-2 mb-3">
                  <Emblem size={30} />
                  <span className="text-white font-bold text-[15px]">MeningoUz</span>
                </div>
                <p className="text-[12px] leading-relaxed">
                  {t("Meningokokk infeksiyasi bo‘yicha epidemiologik monitoring va profilaktika platformasi.")}
                </p>
              </div>
              <div>
                <h4 className="text-white font-semibold text-[13px] mb-3 uppercase tracking-wide">{t("Bo‘limlar")}</h4>
                <ul className="space-y-2 text-[12px]">
                  {navItems.slice(0, 5).map((n) => (
                    <li key={n.path}><Link to={n.path} className="hover:text-[#10B981]">{t(n.label)}</Link></li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold text-[13px] mb-3 uppercase tracking-wide">{t("Ma‘lumot manbalari")}</h4>
                <ul className="space-y-2 text-[12px]">
                  <li>Sanepidqo‘m ma‘lumotnomasi (28.03.2026)</li>
                  <li>Hokimiyatga ma‘lumotnoma (14.04.2026)</li>
                  <li>MKI beмorlar ro‘yxati (17.04.2026)</li>
                  <li>Vaksina yo‘riqnomasi (ACYW135)</li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold text-[13px] mb-3 uppercase tracking-wide">{t("Bog‘lanish")}</h4>
                <ul className="space-y-2 text-[12px]">
                  <li className="flex items-center gap-2"><Phone className="w-3.5 h-3.5" /> +998 71 120 55 77</li>
                  <li className="flex items-center gap-2"><Mail className="w-3.5 h-3.5" /> info@ssv.uz</li>
                  <li className="flex items-center gap-2"><Globe className="w-3.5 h-3.5" /> ssv.uz · sanepid.uz</li>
                </ul>
              </div>
            </div>
            <div className="border-t border-slate-800">
              <div className="max-w-[1280px] mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500">
                <span>{t("© 2026 O‘zbekiston Respublikasi SSV · Sanepidqo‘m. Barcha huquqlar himoyalangan.")}</span>
                <span>{t("Ma‘lumotlar rasmiy hisobotlar asosida · Tibbiy maslahat o‘rnini bosmaydi.")}</span>
              </div>
            </div>
          </footer>
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#E2E8F0] flex items-center justify-around h-[60px] z-20 pb-safe overflow-x-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || (item.path !== "/" && location.pathname.startsWith(item.path));
          return (
            <Link
              key={item.path}
              to={item.path}
              className={clsx(
                "flex flex-col items-center justify-center min-w-[64px] h-full text-[9px] font-medium transition-colors flex-shrink-0",
                isActive ? "text-[#10B981]" : "text-[#94A3B8]"
              )}
            >
              <item.icon className={clsx("w-5 h-5 mb-1", isActive ? "text-[#10B981]" : "text-[#94A3B8]")} />
              {t(item.label)}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
