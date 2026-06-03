import { useState } from "react";
import { useNavigate } from "react-router";
import clsx from "clsx";
import { ShieldAlert, Stethoscope, Microscope, Activity, AlertTriangle } from "lucide-react";

export function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState<"admin" | "doctor" | "epidemiologist">("epidemiologist");

  const roles = [
    { id: "admin", label: "SuperAdmin", icon: ShieldAlert },
    { id: "doctor", label: "Shifokor", icon: Stethoscope },
    { id: "epidemiologist", label: "Epidemiolog", icon: Microscope },
  ] as const;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 font-inter">
      {/* Left — branding / outbreak panel */}
      <div className="relative overflow-hidden hidden lg:flex flex-col justify-between p-12 text-white"
        style={{ background: "radial-gradient(130% 130% at 75% 10%, #1C1033 0%, #0C1020 50%, #070A12 100%)" }}>
        <div className="absolute inset-0 grid-mesh opacity-50 pointer-events-none" />
        <div className="absolute -top-10 right-0 w-[420px] h-[420px] petechiae opacity-90 pointer-events-none" />

        <div className="relative z-10 flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center font-display font-bold text-xl"
            style={{ background: "linear-gradient(135deg, #10B981, #047857)", boxShadow: "0 8px 24px rgba(16,185,129,0.45)" }}>M</div>
          <div>
            <div className="font-display font-bold text-[20px]">MeningoUz</div>
            <div className="text-[12px] text-slate-400">Epidemiologik monitoring platformasi</div>
          </div>
        </div>

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] uppercase text-[#FCA5A5] bg-[#F43F5E]/10 border border-[#F43F5E]/25 px-3 py-1.5 rounded-full mb-6">
            <AlertTriangle className="w-3.5 h-3.5" /> Epidemik holat: Yuqori
          </div>
          <h1 className="font-display text-[34px] font-bold leading-tight mb-3">
            Meningokokk infeksiyasi<br />ustidan real vaqt nazorati
          </h1>
          <p className="text-slate-400 text-[14px] max-w-md leading-relaxed">
            Toshkent shahri bo'yicha kasallanish, vafot, laboratoriya va profilaktika
            ko'rsatkichlari yagona tizimda. Erta aniqlash — hayot saqlaydi.
          </p>

          <div className="flex gap-8 mt-9">
            {[
              { v: "277", l: "Kasallangan", c: "#34D399" },
              { v: "23", l: "Vafot", c: "#F43F5E" },
              { v: "8.3%", l: "CFR", c: "#FBBF24" },
            ].map((s) => (
              <div key={s.l}>
                <div className="font-display text-[34px] leading-none" style={{ color: s.c }}>{s.v}</div>
                <div className="text-[12px] text-slate-500 mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 text-[12px] text-slate-500">
          O'zbekiston Respublikasi SSV · Sanepidqo'm
        </div>
      </div>

      {/* Right — login form */}
      <div className="flex flex-col items-center justify-center bg-[#F1F5F9] p-6">
        <div className="w-full max-w-[420px] bg-white rounded-2xl shadow-xl border border-[#E2E8F0] p-8">
          <div className="lg:hidden flex flex-col items-center mb-6 text-center">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-display font-bold text-2xl mb-3"
              style={{ background: "linear-gradient(135deg, #10B981, #047857)" }}>M</div>
            <h1 className="font-display text-2xl font-bold text-[#0F172A]">MeningoUz</h1>
          </div>

          <div className="mb-7">
            <h2 className="font-display text-[22px] font-bold text-[#0F172A]">Tizimga kirish</h2>
            <p className="text-[13px] text-[#64748B] mt-1">Rolingizni tanlab, hisobingizga kiring</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2.5">
              <label className="text-[12px] font-semibold text-[#475569] uppercase tracking-wider">Rolni tanlang</label>
              <div className="grid grid-cols-3 gap-3">
                {roles.map((r) => {
                  const isActive = role === r.id;
                  return (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setRole(r.id)}
                      className={clsx(
                        "flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all text-center",
                        isActive ? "border-[#10B981] bg-[#10B981]/[0.06] text-[#047857]" : "border-[#E2E8F0] hover:border-[#CBD5E1] text-[#64748B]"
                      )}
                    >
                      <r.icon className="w-5 h-5" />
                      <span className="text-[11px] font-semibold">{r.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[13px] font-medium text-[#374151]">Email yoki ID</label>
                <input type="text" defaultValue="epidemiolog@sanepid.uz"
                  className="w-full px-4 py-2.5 rounded-lg border border-[#E2E8F0] text-[14px] focus:ring-2 focus:ring-[#10B981] focus:border-[#10B981] outline-none transition-all" required />
              </div>
              <div className="space-y-1.5">
                <label className="text-[13px] font-medium text-[#374151]">Parol</label>
                <input type="password" defaultValue="password123"
                  className="w-full px-4 py-2.5 rounded-lg border border-[#E2E8F0] text-[14px] focus:ring-2 focus:ring-[#10B981] focus:border-[#10B981] outline-none transition-all" required />
              </div>
            </div>

            <button type="submit"
              className="w-full text-white font-semibold py-3 rounded-lg transition-all text-[14px] flex items-center justify-center gap-2"
              style={{ background: "linear-gradient(135deg, #10B981, #047857)", boxShadow: "0 8px 20px rgba(16,185,129,0.35)" }}>
              <Activity className="w-4 h-4" /> Tizimga kirish
            </button>
          </form>

          <p className="text-[11px] text-[#94A3B8] text-center mt-6">
            O'zbekiston SSV tasdiqlagan tizim · © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </div>
  );
}
