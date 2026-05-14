"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { walletAPI } from "@/lib/api";

type Step = "recipient" | "amount" | "confirm" | "done";

export default function SendMoneyPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("recipient");
  const [accountNumber, setAccountNumber] = useState("");
  const [bankCode, setBankCode] = useState("000013");
  const [recipient, setRecipient] = useState<{ name: string; accountNumber: string } | null>(null);
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [lookupLoading, setLookupLoading] = useState(false);
  const [error, setError] = useState("");
  const [txRef, setTxRef] = useState("");

  const quickAmounts = ["₦500", "₦1,000", "₦2,000", "₦5,000", "₦10,000"];

  async function handleLookup() {
    if (!accountNumber || accountNumber.length < 10) return;
    setLookupLoading(true);
    setError("");
    try {
      const res = await walletAPI.lookup({ bankCode, accountNumber });
      setRecipient({ name: res.data.account_name, accountNumber });
      setStep("amount");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Could not verify account. Check the number and try again.");
    } finally {
      setLookupLoading(false);
    }
  }

  async function handleSend() {
    if (!recipient) return;
    setLoading(true);
    setError("");
    try {
      const res = await walletAPI.send({
        bankCode,
        accountNumber: recipient.accountNumber,
        accountName: recipient.name,
        amount: parseInt(amount),
        note,
      });
      setTxRef(res.data.transactionReference || "");
      setStep("done");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Transfer failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const banks = [
    { code: "000013", name: "GTBank" },
    { code: "000014", name: "Access Bank" },
    { code: "000015", name: "Zenith Bank" },
    { code: "000016", name: "First Bank" },
    { code: "000004", name: "UBA" },
    { code: "000017", name: "Wema Bank" },
  ];

  if (step === "done") {
    return (
      <div style={{ background: "#FAFAF7", minHeight: "100vh" }}>
        <header style={{ background: "#ffffff", borderBottom: "1px solid #E8E6DF", minHeight: "64px" }}>
          <div className="px-6 py-4" style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <h1 className="text-base font-semibold">Send money</h1>
          </div>
        </header>
        <div className="flex items-center justify-center px-6 py-20">
          <div className="card p-10 text-center max-w-sm w-full">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: "#E8F5F0" }}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#0F6E56" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>
            <p className="text-3xl font-bold mb-2" style={{ color: "#0F6E56", letterSpacing: "-0.02em" }}>₦{parseInt(amount).toLocaleString()} sent</p>
            <p className="text-sm text-muted mb-1">to {recipient?.name}</p>
            <p className="text-xs text-muted mb-8">Ref: {txRef || "Processing…"}</p>
            <div className="flex gap-3">
              <button onClick={() => router.push("/wallet")} className="btn-ghost flex-1 py-3 text-sm">Back to wallet</button>
              <button onClick={() => { setStep("recipient"); setRecipient(null); setAmount(""); setNote(""); setAccountNumber(""); }} className="btn-primary flex-1 py-3 text-sm">Send again</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "#FAFAF7", minHeight: "100vh" }}>
      <header style={{ background: "#ffffff", borderBottom: "1px solid #E8E6DF", minHeight: "64px" }}>
        <div className="flex items-center gap-3 px-6 py-4" style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <Link href="/wallet" className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "#F4F3EE", color: "#5C5A54" }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          </Link>
          <div>
            <h1 className="text-base font-semibold">Send money</h1>
            <p className="text-xs text-muted">Powered by Squad API</p>
          </div>
        </div>
      </header>

      <div className="px-6 py-6" style={{ maxWidth: "720px", margin: "0 auto" }}>

        {/* Step indicator */}
        <div className="flex items-center gap-0 mb-8">
          {(["recipient", "amount", "confirm"] as const).map((s, i) => {
            const labels = ["Recipient", "Amount", "Confirm"];
            const stepIndex = ["recipient","amount","confirm"].indexOf(step);
            const done = i < stepIndex;
            const active = s === step;
            return (
              <div key={s} className="flex items-center flex-1">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: done || active ? "#0F6E56" : "#E8E6DF", color: done || active ? "#fff" : "#9E9B92" }}>
                    {done ? "✓" : i+1}
                  </div>
                  <span className="text-xs font-medium hidden sm:block" style={{ color: active ? "#0F6E56" : "#9E9B92" }}>{labels[i]}</span>
                </div>
                {i < 2 && <div className="flex-1 h-px mx-3" style={{ background: done ? "#0F6E56" : "#E8E6DF" }}/>}
              </div>
            );
          })}
        </div>

        {error && (
          <div className="mb-4 px-4 py-3 rounded-xl text-sm" style={{ background: "#FEF0EC", color: "#A33E22", border: "1px solid #E8775A" }}>
            {error}
          </div>
        )}

        {/* Step: Recipient */}
        {step === "recipient" && (
          <div className="flex flex-col gap-5">
            <div>
              <label className="block text-xs font-semibold text-subtle mb-2 uppercase tracking-wide">Bank</label>
              <select
                value={bankCode}
                onChange={(e) => setBankCode(e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none mb-3"
                style={{ border: "1px solid #E8E6DF", background: "#fff", color: "#1C1B18" }}
              >
                {banks.map((b) => <option key={b.code} value={b.code}>{b.name}</option>)}
              </select>

              <label className="block text-xs font-semibold text-subtle mb-2 uppercase tracking-wide">Account number</label>
              <input
                type="tel"
                placeholder="0123456789"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, "").slice(0, 10))}
                maxLength={10}
                className="w-full px-4 py-3 text-sm rounded-xl outline-none"
                style={{ border: "1px solid #E8E6DF", background: "#fff", color: "#1C1B18" }}
              />
            </div>
            <button
              onClick={handleLookup}
              disabled={accountNumber.length < 10 || lookupLoading}
              className="btn-primary w-full py-3 text-sm"
              style={{ opacity: accountNumber.length < 10 ? 0.5 : 1 }}
            >
              {lookupLoading ? "Verifying account…" : "Verify account"}
            </button>
          </div>
        )}

        {/* Step: Amount */}
        {step === "amount" && recipient && (
          <div className="flex flex-col gap-5">
            <div className="card p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0" style={{ background: "#0F6E56" }}>
                {recipient.name.slice(0,2).toUpperCase()}
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold">{recipient.name}</p>
                <p className="text-xs text-muted">{recipient.accountNumber}</p>
              </div>
              <button onClick={() => setStep("recipient")} className="text-xs font-medium" style={{ color: "#0F6E56" }}>Change</button>
            </div>

            <div className="card p-6 flex flex-col items-center gap-4">
              <p className="text-xs font-semibold text-muted uppercase tracking-wide">Enter amount</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-semibold text-muted">₦</span>
                <input
                  type="number"
                  placeholder="0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="text-4xl font-bold outline-none text-center w-48"
                  style={{ color: amount ? "#0F6E56" : "#D2CFC5", background: "transparent", letterSpacing: "-0.03em" }}
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {quickAmounts.map((q) => (
                <button key={q} onClick={() => setAmount(q.replace(/[^\d]/g, ""))} className="px-4 py-2 rounded-full text-sm font-medium" style={{ background: "#fff", border: "1px solid #E8E6DF", color: "#5C5A54" }}>
                  {q}
                </button>
              ))}
            </div>

            <div>
              <label className="block text-xs font-semibold text-subtle mb-2 uppercase tracking-wide">Note (optional)</label>
              <input type="text" placeholder="What's this for?" value={note} onChange={(e) => setNote(e.target.value)} className="w-full px-4 py-3 text-sm rounded-xl outline-none" style={{ border: "1px solid #E8E6DF", background: "#fff", color: "#1C1B18" }} />
            </div>

            <button onClick={() => setStep("confirm")} disabled={!amount || parseInt(amount) < 1} className="btn-primary w-full py-3 text-sm" style={{ opacity: !amount ? 0.5 : 1 }}>
              Continue
            </button>
          </div>
        )}

        {/* Step: Confirm */}
        {step === "confirm" && recipient && (
          <div className="flex flex-col gap-4">
            <div className="card overflow-hidden">
              <div className="px-5 py-3.5" style={{ borderBottom: "1px solid #E8E6DF", background: "#FAFAF7" }}>
                <p className="text-xs font-semibold text-muted uppercase tracking-wide">Review transfer</p>
              </div>
              {[
                { label: "To", value: `${recipient.name} · ${recipient.accountNumber}` },
                { label: "Amount", value: `₦${parseInt(amount).toLocaleString()}`, bold: true, green: true },
                { label: "Note", value: note || "—" },
                { label: "Fee", value: "₦0.00 (free)", muted: true },
              ].map((r, i) => (
                <div key={r.label} className="flex items-center justify-between px-5 py-3.5" style={{ borderBottom: i < 3 ? "1px solid #F4F3EE" : "none" }}>
                  <p className="text-sm text-muted">{r.label}</p>
                  <p className="text-sm font-medium" style={{ color: r.green ? "#0F6E56" : r.muted ? "#9E9B92" : "#1C1B18", fontWeight: r.bold ? 700 : 500 }}>{r.value}</p>
                </div>
              ))}
            </div>

            <div className="rounded-xl p-4 flex items-start gap-3" style={{ background: "#E8F5F0", border: "1px solid #C3E6D8" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0F6E56" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}>
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              <p className="text-xs leading-relaxed" style={{ color: "#0F6E56" }}>
                This transfer is instant and processed securely by Squad API.
              </p>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep("amount")} className="btn-ghost flex-1 py-3 text-sm">Edit</button>
              <button onClick={handleSend} disabled={loading} className="btn-primary flex-1 py-3 text-sm">
                {loading ? "Sending…" : `Send ₦${parseInt(amount).toLocaleString()}`}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}