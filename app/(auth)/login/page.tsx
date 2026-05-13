"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [pin, setPin] = useState("");
  const [step, setStep] = useState<"phone" | "pin">("phone");
  const [loading, setLoading] = useState(false);

  function handlePhoneSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (phone.length >= 10) setStep("pin");
  }

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => router.push("/"), 1200);
  }

  return (
    <div className="min-h-screen flex" style={{ background: "#FAFAF7" }}>

      {/* Left panel — branding (desktop only) */}
      <div
        className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12"
        style={{ background: "linear-gradient(160deg, #0F6E56 0%, #073D30 100%)" }}
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-white">
            <Image src="/eco.png" alt="EcoLink" width={26} height={26} style={{ objectFit: "contain" }} />
          </div>
          <span className="text-white font-semibold text-lg tracking-tight">EcoLink</span>
        </div>

        <div>
          <h1 className="text-4xl font-semibold text-white leading-tight mb-4" style={{ letterSpacing: "-0.03em" }}>
            The economic OS<br/>for everyday Nigerians.
          </h1>
          <p className="text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
            Payments, gig jobs, rotating savings and community credit — built for how the informal economy actually works.
          </p>

          <div className="flex flex-col gap-4 mt-10">
            {[
              { icon: "💳", label: "Virtual Squad account", sub: "Send, receive, pay — no branch needed" },
              { icon: "🎤", label: "Vocal Reputation", sub: "Your community's voice becomes your credit score" },
              { icon: "🤝", label: "Ajo & Esusu groups", sub: "Digital rotating savings, auto-managed" },
            ].map((f) => (
              <div key={f.label} className="flex items-start gap-3">
                <span className="text-xl leading-none mt-0.5">{f.icon}</span>
                <div>
                  <p className="text-sm font-semibold text-white">{f.label}</p>
                  <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.55)" }}>{f.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
          © 2026 EcoLink · Powered by Squad API
        </p>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        {/* Mobile logo */}
        <div className="flex items-center gap-2 mb-10 lg:hidden">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "#E8F5F0" }}>
            <Image src="/eco.png" alt="EcoLink" width={26} height={26} style={{ objectFit: "contain" }} />
          </div>
          <span className="font-semibold text-lg tracking-tight" style={{ color: "#1C1B18" }}>EcoLink</span>
        </div>

        <div className="w-full max-w-sm">
          <h2 className="text-2xl font-semibold mb-1" style={{ letterSpacing: "-0.02em", color: "#1C1B18" }}>
            {step === "phone" ? "Welcome back" : "Enter your PIN"}
          </h2>
          <p className="text-sm text-muted mb-8">
            {step === "phone"
              ? "Sign in with your phone number"
              : `Signing in as +234 ${phone.slice(-10)}`}
          </p>

          {step === "phone" ? (
            <form onSubmit={handlePhoneSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-semibold text-subtle mb-1.5 uppercase tracking-wide">Phone number</label>
                <div className="flex" style={{ border: "1px solid #E8E6DF", borderRadius: "10px", background: "#fff", overflow: "hidden" }}>
                  <span className="flex items-center px-3 text-sm font-medium border-r" style={{ background: "#F4F3EE", color: "#5C5A54", borderColor: "#E8E6DF" }}>
                    +234
                  </span>
                  <input
                    type="tel"
                    placeholder="801 234 5678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                    maxLength={11}
                    className="flex-1 px-4 py-3 text-sm outline-none"
                    style={{ background: "transparent", color: "#1C1B18" }}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="btn-primary w-full py-3 text-sm mt-2">
                Continue
              </button>

              <p className="text-sm text-center text-muted">
                No account?{" "}
                <Link href="/register" className="font-semibold" style={{ color: "#0F6E56" }}>
                  Register free
                </Link>
              </p>
            </form>
          ) : (
            <form onSubmit={handleLogin} className="flex flex-col gap-6">
              {/* PIN dots */}
              <div>
                <label className="block text-xs font-semibold text-subtle mb-3 uppercase tracking-wide">4-digit PIN</label>
                <div className="flex gap-3 justify-center">
                  {[0,1,2,3].map((i) => (
                    <div
                      key={i}
                      className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl font-bold"
                      style={{
                        border: `2px solid ${i < pin.length ? "#0F6E56" : "#E8E6DF"}`,
                        background: i < pin.length ? "#E8F5F0" : "#fff",
                        color: "#0F6E56",
                      }}
                    >
                      {i < pin.length ? "•" : ""}
                    </div>
                  ))}
                </div>
                {/* Hidden real input */}
                <input
                  type="password"
                  inputMode="numeric"
                  maxLength={4}
                  value={pin}
                  onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0,4))}
                  className="sr-only"
                  autoFocus
                />
              </div>

              {/* Numpad */}
              <div className="grid grid-cols-3 gap-3">
                {["1","2","3","4","5","6","7","8","9","","0","⌫"].map((k) => (
                  <button
                    key={k}
                    type="button"
                    disabled={k === ""}
                    onClick={() => {
                      if (k === "⌫") setPin((p) => p.slice(0,-1));
                      else if (pin.length < 4) setPin((p) => p + k);
                    }}
                    className="h-14 rounded-xl text-lg font-medium flex items-center justify-center"
                    style={{
                      background: k === "" ? "transparent" : "#fff",
                      border: k === "" ? "none" : "1px solid #E8E6DF",
                      color: "#1C1B18",
                      cursor: k === "" ? "default" : "pointer",
                    }}
                  >
                    {k}
                  </button>
                ))}
              </div>

              <button
                type="submit"
                disabled={pin.length < 4 || loading}
                className="btn-primary w-full py-3 text-sm"
                style={{ opacity: pin.length < 4 ? 0.5 : 1 }}
              >
                {loading ? "Signing in…" : "Sign in"}
              </button>

              <button type="button" onClick={() => { setStep("phone"); setPin(""); }} className="text-sm text-muted text-center">
                ← Change number
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
