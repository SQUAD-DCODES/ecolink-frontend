"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authAPI } from "@/lib/api";

const businessTypes = [
  { value: "trader", label: "Market trader", icon: "🛍️" },
  { value: "artisan", label: "Artisan / craftsperson", icon: "🔨" },
  { value: "gig_worker", label: "Gig / daily worker", icon: "⚡" },
  { value: "farmer", label: "Smallholder farmer", icon: "🌾" },
  { value: "other", label: "Other", icon: "💼" },
];

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ firstName: "", lastName: "", phone: "", businessType: "", location: "" });

  function update(key: string, val: string) {
    setForm((f) => ({ ...f, [key]: val }));
  }

  async function handleCreateAccount() {
    if (!form.location) return;
    setLoading(true);
    setError("");
    try {
      await authAPI.register({
        firstName: form.firstName,
        lastName: form.lastName,
        phone: `234${form.phone}`,
        businessType: form.businessType,
        state: form.location,
      });
      // Store phone so verify page can use it
      localStorage.setItem("ecolink_pending_phone", `234${form.phone}`);
      router.push("/verify");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const steps = [
    { num: 1, label: "Personal" },
    { num: 2, label: "Business" },
    { num: 3, label: "Location" },
  ];

  return (
    <div className="min-h-screen flex" style={{ background: "#FAFAF7" }}>

      {/* Left panel */}
      <div
        className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12"
        style={{ background: "linear-gradient(160deg, #0F6E56 0%, #073D30 100%)" }}
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-white">
            <Image src="/Eco.png" alt="EcoLink" width={26} height={26} style={{ objectFit: "contain" }} />
          </div>
          <span className="text-white font-semibold text-lg tracking-tight">EcoLink</span>
        </div>
        <div>
          <h1 className="text-4xl font-semibold text-white mb-4" style={{ letterSpacing: "-0.03em", lineHeight: 1.2 }}>
            Join 50,000+<br />informal workers<br />already on EcoLink.
          </h1>
          <p className="text-base" style={{ color: "rgba(255,255,255,0.65)", lineHeight: 1.7 }}>
            Set up takes under 3 minutes. No BVN required to start — just your phone number.
          </p>
          <div className="mt-8 p-4 rounded-2xl" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}>
            <p className="text-sm font-medium text-white mb-1">Zero monthly fees</p>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.55)" }}>No hidden charges. EcoLink earns only when you transact.</p>
          </div>
        </div>
        <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>© 2026 EcoLink · Powered by Squad API</p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="flex items-center gap-2 mb-10 lg:hidden">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "#E8F5F0" }}>
            <Image src="/Eco.png" alt="EcoLink" width={26} height={26} style={{ objectFit: "contain" }} />
          </div>
          <span className="font-semibold text-lg tracking-tight" style={{ color: "#1C1B18" }}>EcoLink</span>
        </div>

        <div className="w-full max-w-sm">
          {/* Step indicator */}
          <div className="flex items-center gap-2 mb-8">
            {steps.map((s, i) => (
              <div key={s.num} className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{
                      background: step >= s.num ? "#0F6E56" : "#E8E6DF",
                      color: step >= s.num ? "#fff" : "#9E9B92",
                    }}
                  >
                    {step > s.num ? "✓" : s.num}
                  </div>
                  <span className="text-xs font-medium" style={{ color: step === s.num ? "#0F6E56" : "#9E9B92" }}>
                    {s.label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className="flex-1 h-px w-8" style={{ background: step > s.num ? "#0F6E56" : "#E8E6DF" }} />
                )}
              </div>
            ))}
          </div>

          {error && (
            <div className="mb-4 px-4 py-3 rounded-xl text-sm" style={{ background: "#FEF0EC", color: "#A33E22", border: "1px solid #E8775A" }}>
              {error}
            </div>
          )}

          {step === 1 && (
            <div className="flex flex-col gap-4">
              <div>
                <h2 className="text-2xl font-semibold mb-1" style={{ letterSpacing: "-0.02em" }}>Create your account</h2>
                <p className="text-sm text-muted">Tell us your name and phone number.</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {(["firstName", "lastName"] as const).map((f) => (
                  <div key={f}>
                    <label className="block text-xs font-semibold text-subtle mb-1.5 uppercase tracking-wide">
                      {f === "firstName" ? "First name" : "Last name"}
                    </label>
                    <input
                      type="text"
                      placeholder={f === "firstName" ? "Amaka" : "Obi"}
                      value={form[f]}
                      onChange={(e) => update(f, e.target.value)}
                      className="w-full px-4 py-3 text-sm rounded-xl outline-none"
                      style={{ border: "1px solid #E8E6DF", background: "#fff", color: "#1C1B18" }}
                    />
                  </div>
                ))}
              </div>
              <div>
                <label className="block text-xs font-semibold text-subtle mb-1.5 uppercase tracking-wide">Phone number</label>
                <div className="flex rounded-xl overflow-hidden" style={{ border: "1px solid #E8E6DF", background: "#fff" }}>
                  <span className="flex items-center px-3 text-sm font-medium border-r" style={{ background: "#F4F3EE", color: "#5C5A54", borderColor: "#E8E6DF" }}>+234</span>
                  <input
                    type="tel"
                    placeholder="801 234 5678"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value.replace(/\D/g, ""))}
                    maxLength={11}
                    className="flex-1 px-4 py-3 text-sm outline-none"
                    style={{ background: "transparent", color: "#1C1B18" }}
                  />
                </div>
              </div>
              <button
                onClick={() => setStep(2)}
                disabled={!form.firstName || !form.phone}
                className="btn-primary w-full py-3 text-sm mt-2"
                style={{ opacity: !form.firstName || !form.phone ? 0.5 : 1 }}
              >
                Continue
              </button>
              <p className="text-sm text-center text-muted">
                Already registered?{" "}
                <Link href="/login" className="font-semibold" style={{ color: "#0F6E56" }}>Sign in</Link>
              </p>
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-col gap-4">
              <div>
                <h2 className="text-2xl font-semibold mb-1" style={{ letterSpacing: "-0.02em" }}>What do you do?</h2>
                <p className="text-sm text-muted">This helps us match you with the right gigs.</p>
              </div>
              <div className="flex flex-col gap-2">
                {businessTypes.map((b) => (
                  <button
                    key={b.value}
                    type="button"
                    onClick={() => update("businessType", b.value)}
                    className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-left"
                    style={{
                      border: `2px solid ${form.businessType === b.value ? "#0F6E56" : "#E8E6DF"}`,
                      background: form.businessType === b.value ? "#E8F5F0" : "#fff",
                    }}
                  >
                    <span className="text-xl leading-none">{b.icon}</span>
                    <span className="text-sm font-medium" style={{ color: form.businessType === b.value ? "#0F6E56" : "#1C1B18" }}>
                      {b.label}
                    </span>
                    {form.businessType === b.value && (
                      <svg className="ml-auto" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0F6E56" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    )}
                  </button>
                ))}
              </div>
              <div className="flex gap-3 mt-2">
                <button onClick={() => setStep(1)} className="btn-ghost flex-1 py-3 text-sm">Back</button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!form.businessType}
                  className="btn-primary flex-1 py-3 text-sm"
                  style={{ opacity: !form.businessType ? 0.5 : 1 }}
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="flex flex-col gap-4">
              <div>
                <h2 className="text-2xl font-semibold mb-1" style={{ letterSpacing: "-0.02em" }}>Where are you based?</h2>
                <p className="text-sm text-muted">Used for local job matching. Never shared without your consent.</p>
              </div>
              <div>
                <label className="block text-xs font-semibold text-subtle mb-1.5 uppercase tracking-wide">City / Area</label>
                <input
                  type="text"
                  placeholder="e.g. Bodija Market, Ibadan"
                  value={form.location}
                  onChange={(e) => update("location", e.target.value)}
                  className="w-full px-4 py-3 text-sm rounded-xl outline-none"
                  style={{ border: "1px solid #E8E6DF", background: "#fff", color: "#1C1B18" }}
                />
              </div>
              <div className="rounded-xl p-4" style={{ background: "#E8F5F0", border: "1px solid #C3E6D8" }}>
                <p className="text-xs font-semibold mb-1" style={{ color: "#0F6E56" }}>What happens next</p>
                <p className="text-xs leading-relaxed" style={{ color: "#0F6E56", opacity: 0.8 }}>
                  We'll send you a verification code to confirm your number.
                </p>
              </div>
              <div className="flex gap-3 mt-2">
                <button onClick={() => setStep(2)} className="btn-ghost flex-1 py-3 text-sm">Back</button>
                <button
                  onClick={handleCreateAccount}
                  disabled={!form.location || loading}
                  className="btn-primary flex-1 py-3 text-sm"
                  style={{ opacity: !form.location ? 0.5 : 1 }}
                >
                  {loading ? "Creating…" : "Create account"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}