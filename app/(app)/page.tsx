"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { walletAPI, creditAPI, vouchAPI } from "@/lib/api";
import { useAuth } from "@/lib/auth";

const waveHeights = [4,8,14,10,18,12,20,16,10,14,8,18,12,6,16,10,20,14,8,12];

export default function HomePage() {
  const { user, loading } = useAuth();
  const [balance, setBalance] = useState("0.00");
  const [transactions, setTransactions] = useState<any[]>([]);
  const [creditScore, setCreditScore] = useState(0);
  const [latestVouch, setLatestVouch] = useState<any>(null);
  const [monthIn, setMonthIn] = useState("0");
  const [monthOut, setMonthOut] = useState("0");

  const displayName = user ? `${user.firstName || ""} ${user.lastName || ""}`.trim() || "there" : "there";
  const initials = user ? `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`.toUpperCase() : "?";

  useEffect(() => {
    if (loading || !user) return; // wait until auth is resolved

    walletAPI.balance().then((r) => setBalance(r.data.balance_naira || "0.00")).catch(() => {});
    walletAPI.transactions({ limit: 5 }).then((r) => {
      const txns = r.data.transactions || [];
      setTransactions(txns);
      const inTotal = txns.filter((t: any) => t.transactionType !== "Transfer").reduce((s: number, t: any) => s + (t.merchantAmount || 0), 0);
      const outTotal = txns.filter((t: any) => t.transactionType === "Transfer").reduce((s: number, t: any) => s + (t.amount || 0), 0);
      setMonthIn((inTotal / 100).toFixed(2));
      setMonthOut((outTotal / 100).toFixed(2));
    }).catch(() => {});
    creditAPI.score().then((r) => setCreditScore(r.data.score || 0)).catch(() => {});
    vouchAPI.received().then((r) => {
      const v = r.data.vouches || [];
      if (v.length > 0) setLatestVouch(v[0]);
    }).catch(() => {});
  }, [user, loading]); // ← key change

  const stats = [
    { label: "Total balance", value: `₦${Number(balance).toLocaleString()}`, sub: "Squad virtual account", accent: "#0F6E56", bg: "#E8F5F0" },
    { label: "This month in", value: `₦${Number(monthIn).toLocaleString()}`, sub: "Received", accent: "#1D9E75", bg: "#E8F5F0" },
    { label: "This month out", value: `₦${Number(monthOut).toLocaleString()}`, sub: "Sent", accent: "#A33E22", bg: "#FEF0EC" },
    { label: "Credit score", value: `${creditScore}/850`, sub: user?.creditTier || "unscored", accent: "#9A6A05", bg: "#FEF6E4" },
  ];

  return (
    <div style={{ background: "#FAFAF7", minHeight: "100vh" }}>

      {/* Top bar */}
      <header style={{ background: "#ffffff", borderBottom: "1px solid #E8E6DF", minHeight: "64px" }}>
        <div className="flex items-center justify-between px-6 h-16" style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div>
            <p className="text-sm text-muted">Good morning</p>
            <h1 className="text-xl font-semibold" style={{ letterSpacing: "-0.02em", color: "#1C1B18" }}>
              {displayName} 👋
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
              style={{ background: "#F4F3EE", color: "#5C5A54", border: "1px solid #E8E6DF" }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              Search…
            </button>
            <button aria-label="Notifications" className="relative w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "#F4F3EE", color: "#5C5A54" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ background: "#E05A34" }}/>
            </button>
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: "#0F6E56" }}>
              {initials}
            </div>
          </div>
        </div>
      </header>

      <div className="px-6 py-6" style={{ maxWidth: "1280px", margin: "0 auto" }}>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((s) => (
            <div key={s.label} className="card p-5">
              <div className="flex items-start justify-between mb-3">
                <p className="text-xs text-muted font-medium uppercase tracking-wide">{s.label}</p>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: s.bg }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={s.accent} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
                  </svg>
                </div>
              </div>
              <p className="text-2xl font-semibold" style={{ color: s.accent, letterSpacing: "-0.02em" }}>{s.value}</p>
              <p className="text-xs text-muted mt-1">{s.sub}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left — wallet + transactions */}
          <div className="lg:col-span-2 flex flex-col gap-6">

            {/* Wallet card */}
            <div className="rounded-2xl p-6 text-white" style={{ background: "linear-gradient(135deg, #0F6E56 0%, #1D9E75 100%)" }}>
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className="text-xs mb-1 tracking-widest uppercase" style={{ opacity: 0.7 }}>Available balance</p>
                  <p className="text-4xl font-semibold tracking-tight">₦{Number(balance).toLocaleString()}</p>
                  <p className="text-sm mt-1" style={{ opacity: 0.6 }}>
                    {user?.virtualAccountNumber ? `NUBAN: ${user.virtualAccountNumber} · Squad Virtual` : "Complete KYC to get your NUBAN"}
                  </p>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full font-medium" style={{ background: "rgba(255,255,255,0.2)" }}>Active</span>
              </div>

              <div className="flex flex-wrap gap-3">
                {[
                  { label: "Send money", href: "/wallet/send", d: "M12 19V5M5 12l7-7 7 7" },
                  { label: "Receive", href: "/wallet/receive", d: "M12 5v14M5 12l7 7 7-7" },
                  { label: "Pay link", href: "/wallet/receive", isLink: true },
                  { label: "QR code", href: "/wallet/receive", isQr: true },
                ].map((a) => (
                  <Link key={a.label} href={a.href} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium" style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff" }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                      {a.isLink ? (<><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></>) : a.isQr ? (<><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="3" height="3"/></>) : (<path d={a.d}/>)}
                    </svg>
                    {a.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Recent transactions */}
            <div className="card overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid #E8E6DF" }}>
                <h2 className="text-sm font-semibold">Recent transactions</h2>
                <Link href="/wallet" className="text-xs font-medium" style={{ color: "#0F6E56" }}>View all →</Link>
              </div>
              {transactions.length === 0 ? (
                <div className="px-5 py-8 text-center">
                  <p className="text-sm text-muted">No transactions yet.</p>
                  <p className="text-xs text-muted mt-1">Share your NUBAN to receive your first payment.</p>
                </div>
              ) : (
                <table className="w-full">
                  <tbody>
                    {transactions.map((txn, i) => {
                      const isCredit = txn.transactionType !== "Transfer";
                      const amountNaira = ((txn.merchantAmount || txn.amount) / 100).toLocaleString();
                      const initials2 = (txn.senderName || txn.remarks || "TX").slice(0, 2).toUpperCase();
                      return (
                        <tr key={txn._id || i} style={{ borderBottom: i < transactions.length - 1 ? "1px solid #F4F3EE" : "none" }}>
                          <td className="px-5 py-3">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0" style={{ background: isCredit ? "#E8F5F0" : "#F4F3EE", color: isCredit ? "#0F6E56" : "#5C5A54" }}>
                                {initials2}
                              </div>
                              <div>
                                <p className="text-sm font-medium" style={{ color: "#1C1B18" }}>{txn.senderName || txn.remarks || "Transaction"}</p>
                                <p className="text-xs text-muted">{txn.purpose || txn.transactionType}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-3 text-right">
                            <p className="text-sm font-semibold" style={{ color: isCredit ? "#0F6E56" : "#A33E22" }}>
                              {isCredit ? "+" : "−"}₦{amountNaira}
                            </p>
                            <p className="text-xs text-muted">{new Date(txn.createdAt).toLocaleDateString()}</p>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>

            {/* Quick actions */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { href: "/jobs", label: "Find a gig", sub: "AI-matched jobs", bg: "#E8F5F0", color: "#0F6E56" },
                { href: "/savings", label: "Ajo group", sub: "Rotating savings", bg: "#FEF6E4", color: "#9A6A05" },
                { href: "/profile/reputation", label: "Vocal rep", sub: "Your trust score", bg: "#E8F5F0", color: "#1D9E75" },
                { href: "/wallet/receive", label: "Pay link", sub: "Share & get paid", bg: "#F4F3EE", color: "#5C5A54" },
              ].map((q) => (
                <Link key={q.href} href={q.href} className="card-hover p-4 flex flex-col gap-2">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: q.bg }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={q.color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 18l6-6-6-6"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium" style={{ color: "#1C1B18" }}>{q.label}</p>
                    <p className="text-xs text-muted mt-0.5">{q.sub}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-6">

            {/* Vocal rep preview */}
            <div className="card overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid #E8E6DF" }}>
                <h2 className="text-sm font-semibold">Latest vouch</h2>
                <Link href="/profile/reputation" className="text-xs font-medium" style={{ color: "#0F6E56" }}>All vouches →</Link>
              </div>
              <div className="p-5">
                {latestVouch ? (
                  <>
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{ background: "#1D9E75" }}>
                        {(latestVouch.voucher?.firstName?.[0] || "V")}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-0.5">
                          <p className="text-sm font-semibold">{latestVouch.voucher?.firstName} {latestVouch.voucher?.lastName}</p>
                          <span className="badge-green">Trusted</span>
                        </div>
                        <p className="text-xs text-muted">{latestVouch.language} · {new Date(latestVouch.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    {latestVouch.aiSummary && (
                      <p className="text-xs text-subtle leading-relaxed italic mb-3">&quot;{latestVouch.aiSummary}&quot;</p>
                    )}
                    <div className="flex items-end gap-0.5 mb-3" style={{ height: "20px" }}>
                      {waveHeights.map((h, i) => (
                        <div key={i} className="flex-1 rounded-full" style={{ height: `${h}px`, background: i < 10 ? "#1D9E75" : "#E8E6DF" }}/>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="py-4 text-center">
                    <p className="text-sm text-muted">No vouches yet.</p>
                    <Link href="/vouch/record" className="text-xs font-medium mt-2 block" style={{ color: "#0F6E56" }}>Ask for a vouch →</Link>
                  </div>
                )}
              </div>
            </div>

            {/* Trust score card */}
            <div className="card p-5">
              <h2 className="text-sm font-semibold mb-4">Credit score</h2>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white flex-shrink-0" style={{ background: "linear-gradient(135deg, #0F6E56, #1D9E75)" }}>
                  {creditScore}
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: "#0F6E56" }}>{user?.creditTier || "Unscored"}</p>
                  <p className="text-xs text-muted">out of 850</p>
                </div>
              </div>
              <Link href="/credit" className="btn-primary w-full py-2.5 mt-3 text-xs">View full credit profile</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}