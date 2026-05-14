"use client";

import Link from "next/link";
import { useState } from "react";
import { creditAPI } from "@/lib/api";

const loanPurposes = [
  { id: "inventory", label: "Stock / inventory", icon: "📦" },
  { id: "equipment", label: "Equipment / tools", icon: "🔧" },
  { id: "rent", label: "Shop / stall rent", icon: "🏪" },
  { id: "transport", label: "Transport / delivery", icon: "🏍️" },
  { id: "emergency", label: "Emergency", icon: "⚡" },
  { id: "other", label: "Other", icon: "💼" },
];

const loanAmounts = [10000, 25000, 50000, 100000, 150000];

export default function CreditApplyPage() {
  const [step, setStep] = useState<1|2|3>(1);
  const [purpose, setPurpose] = useState("inventory");
  const [amount, setAmount] = useState(25000);
  const [tenure, setTenure] = useState(30);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loanData, setLoanData] = useState<any>(null);

  const interestRate = 0.035;
  const interest = Math.round(amount * interestRate * (tenure / 30));
  const totalRepay = amount + interest;
  const weekly = Math.round(totalRepay / (tenure / 7));

  async function handleSubmit() {
    setLoading(true);
    setError("");
    try {
      const res = await creditAPI.apply({ amount, purpose, durationDays: tenure });
      setLoanData(res.data);
      setSubmitted(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Application failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div style={{ background: "#FAFAF7", minHeight: "100vh" }} className="flex items-center justify-center px-6">
        <div className="flex flex-col items-center text-center gap-6 max-w-sm">
          <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ background: "#FEF6E4" }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#9A6A05" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          </div>
          <div>
            <h2 className="text-2xl font-semibold" style={{ letterSpacing: "-0.02em" }}>Application submitted</h2>
            <p className="text-sm text-muted mt-2 leading-relaxed">Your micro-loan application is approved. Funds will be disbursed to your Squad wallet shortly.</p>
          </div>
          <div className="card p-4 w-full flex flex-col gap-3">
            {[
              { label: "Amount", value: `₦${amount.toLocaleString()}` },
              { label: "Tenure", value: `${tenure} days` },
              { label: "Total repayment", value: `₦${totalRepay.toLocaleString()}` },
              { label: "Status", value: loanData?.status || "approved", badge: true },
            ].map((r) => (
              <div key={r.label} className="flex items-center justify-between">
                <span className="text-xs text-muted">{r.label}</span>
                {r.badge ? <span className="badge-amber">{r.value}</span> : <span className="text-sm font-semibold">{r.value}</span>}
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-2 w-full">
            <Link href="/credit" className="btn-primary py-3 text-sm w-full">Back to credit</Link>
            <Link href="/" className="btn-ghost py-3 text-sm w-full">Go to dashboard</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "#FAFAF7", minHeight: "100vh" }}>
      <header style={{ background: "#ffffff", borderBottom: "1px solid #E8E6DF", minHeight: "64px" }}>
        <div className="flex items-center gap-3 px-6 h-16" style={{ maxWidth: "720px", margin: "0 auto" }}>
          <Link href="/credit" className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "#F4F3EE", color: "#5C5A54" }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          </Link>
          <div className="flex-1"><h1 className="text-lg font-semibold" style={{ letterSpacing: "-0.02em" }}>Apply for micro-loan</h1><p className="text-xs text-muted">Step {step} of 3</p></div>
          <div className="flex items-center gap-1.5">
            {[1,2,3].map((s) => (<div key={s} className="rounded-full transition-all" style={{ width: s === step ? 24 : 8, height: 8, background: s <= step ? "#0F6E56" : "#E8E6DF" }}/>))}
          </div>
        </div>
      </header>

      <div className="px-6 py-8" style={{ maxWidth: "720px", margin: "0 auto" }}>

        {error && <div className="mb-4 px-4 py-3 rounded-xl text-sm" style={{ background: "#FEF0EC", color: "#A33E22", border: "1px solid #E8775A" }}>{error}</div>}

        {step === 1 && (
          <div className="flex flex-col gap-6">
            <div><h2 className="text-xl font-semibold mb-1" style={{ letterSpacing: "-0.02em" }}>What do you need it for?</h2><p className="text-sm text-muted">This helps us match you to the right loan product.</p></div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {loanPurposes.map((p) => (
                <button key={p.id} onClick={() => setPurpose(p.id)} className="flex flex-col items-start gap-1.5 px-4 py-3 rounded-xl text-left transition-all" style={{ background: purpose === p.id ? "#E8F5F0" : "#fff", border: `1.5px solid ${purpose === p.id ? "#0F6E56" : "#E8E6DF"}` }}>
                  <span className="text-xl">{p.icon}</span>
                  <span className="text-xs font-medium" style={{ color: purpose === p.id ? "#0F6E56" : "#1C1B18" }}>{p.label}</span>
                </button>
              ))}
            </div>
            <div>
              <label className="text-sm font-medium block mb-3">How much do you need?</label>
              <div className="flex flex-wrap gap-2 mb-4">
                {loanAmounts.map((a) => (
                  <button key={a} onClick={() => setAmount(a)} className="px-4 py-2 rounded-full text-sm font-medium transition-all" style={{ background: amount === a ? "#0F6E56" : "#fff", color: amount === a ? "#fff" : "#5C5A54", border: `1px solid ${amount === a ? "#0F6E56" : "#E8E6DF"}` }}>
                    ₦{a.toLocaleString()}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl" style={{ border: "1.5px solid #E8E6DF", background: "#fff" }}>
                <span className="text-lg font-semibold" style={{ color: "#9E9B92" }}>₦</span>
                <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} className="flex-1 outline-none text-xl font-semibold bg-transparent" style={{ color: "#1C1B18" }} />
              </div>
            </div>
            <button onClick={() => setStep(2)} className="btn-primary py-3.5 text-sm">Continue</button>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-6">
            <div><h2 className="text-xl font-semibold mb-1" style={{ letterSpacing: "-0.02em" }}>Repayment plan</h2><p className="text-sm text-muted">Choose a schedule that works for your income cycle.</p></div>
            <div className="rounded-2xl p-5 text-white" style={{ background: "linear-gradient(135deg, #0F6E56 0%, #1D9E75 100%)" }}>
              <p className="text-xs uppercase tracking-widest mb-1" style={{ opacity: 0.7 }}>Loan amount</p>
              <p className="text-4xl font-bold tracking-tight">₦{amount.toLocaleString()}</p>
              <p className="text-sm mt-1" style={{ opacity: 0.6 }}>3.5% flat interest</p>
            </div>
            <div>
              <label className="text-sm font-medium block mb-3">Repayment period</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[{ days: 14, label: "14 days" }, { days: 30, label: "30 days" }, { days: 60, label: "60 days" }, { days: 90, label: "90 days" }].map((t) => (
                  <button key={t.days} onClick={() => setTenure(t.days)} className="flex flex-col items-center px-3 py-3 rounded-xl transition-all" style={{ background: tenure === t.days ? "#E8F5F0" : "#fff", border: `1.5px solid ${tenure === t.days ? "#0F6E56" : "#E8E6DF"}` }}>
                    <span className="text-sm font-semibold" style={{ color: tenure === t.days ? "#0F6E56" : "#1C1B18" }}>{t.label}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="card p-5 flex flex-col gap-3">
              {[
                { label: "Principal", value: `₦${amount.toLocaleString()}` },
                { label: `Interest (3.5% × ${tenure/30} month)`, value: `₦${interest.toLocaleString()}`, sub: true },
                { label: "Total repayment", value: `₦${totalRepay.toLocaleString()}`, bold: true },
                { label: "Weekly instalment", value: `₦${weekly.toLocaleString()}`, color: "#0F6E56" },
              ].map((r) => (
                <div key={r.label} className="flex items-center justify-between py-2" style={{ borderBottom: r.bold ? "none" : "1px solid #F4F3EE" }}>
                  <span className={`text-sm ${r.sub ? "text-muted" : ""}`}>{r.label}</span>
                  <span className="text-sm" style={{ fontWeight: r.bold ? 700 : 500, color: r.color ?? (r.bold ? "#1C1B18" : "#5C5A54") }}>{r.value}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="btn-ghost flex-1 py-3.5 text-sm">Back</button>
              <button onClick={() => setStep(3)} className="btn-primary flex-1 py-3.5 text-sm">Continue</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col gap-6">
            <div><h2 className="text-xl font-semibold mb-1" style={{ letterSpacing: "-0.02em" }}>Confirm application</h2><p className="text-sm text-muted">Review before submitting to our lending partner.</p></div>
            <div className="card p-5 flex flex-col gap-4">
              <div className="flex items-center justify-between"><h3 className="text-base font-semibold">Micro-loan application</h3><span className="badge-amber">Pending review</span></div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Amount", value: `₦${amount.toLocaleString()}` },
                  { label: "Purpose", value: loanPurposes.find((p) => p.id === purpose)?.label ?? purpose },
                  { label: "Tenure", value: `${tenure} days` },
                  { label: "Interest", value: `₦${interest.toLocaleString()} (3.5%)` },
                  { label: "Total", value: `₦${totalRepay.toLocaleString()}` },
                  { label: "Weekly", value: `₦${weekly.toLocaleString()}` },
                ].map((r) => (
                  <div key={r.label} className="p-3 rounded-xl" style={{ background: "#F4F3EE" }}>
                    <p className="text-xs text-muted">{r.label}</p>
                    <p className="text-sm font-semibold mt-0.5">{r.value}</p>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-xs text-muted leading-relaxed">By submitting, you agree to the EcoLink Credit Terms. Late repayments will affect your trust score.</p>
            <div className="flex gap-3">
              <button onClick={() => setStep(2)} className="btn-ghost flex-1 py-3.5 text-sm">Back</button>
              <button onClick={handleSubmit} disabled={loading} className="btn-primary flex-1 py-3.5 text-sm">{loading ? "Submitting…" : "Submit application"}</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}