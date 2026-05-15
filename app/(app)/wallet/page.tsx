"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { walletAPI } from "@/lib/api";
import { useAuth } from "@/lib/auth";

const catBadge: Record<string, { bg: string; color: string; label: string }> = {
  ajo_contribution: { bg: "#FEF6E4", color: "#9A6A05", label: "Savings" },
  loan_repayment:   { bg: "#E8F5F0", color: "#0F6E56", label: "Loan" },
  gig_payment:      { bg: "#E8F5F0", color: "#0F6E56", label: "Gig" },
  marketplace:      { bg: "#F4F3EE", color: "#5C5A54", label: "Market" },
  deposit:          { bg: "#E8F5F0", color: "#1D9E75", label: "Deposit" },
  other:            { bg: "#F4F3EE", color: "#5C5A54", label: "Transfer" },
};

export default function WalletPage() {
  const { user, loading: authLoading } = useAuth();
  const [transactions, setTransactions] = useState<any[]>([]);
  const [balance, setBalance] = useState("0.00");
  const [loading, setLoading] = useState(true);


  useEffect(() => {
  if (authLoading || !user) return;
  walletAPI.balance().then((r) => setBalance(r.data.balance_naira || "0.00")).catch(() => {});
  walletAPI.transactions({ limit: 50 }).then((r) => {
    setTransactions(r.data.transactions || []);
  }).catch(() => {}).finally(() => setLoading(false));
  }, [user, authLoading]);

  return (
    <div style={{ background: "#FAFAF7", minHeight: "100vh" }}>

      <header style={{ background: "#ffffff", borderBottom: "1px solid #E8E6DF", minHeight: "64px" }}>
        <div className="flex items-center justify-between px-6 h-16" style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div className="flex items-center gap-3">
            <Link href="/" className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "#F4F3EE", color: "#5C5A54" }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            </Link>
            <div>
              <h1 className="text-lg font-semibold" style={{ letterSpacing: "-0.02em" }}>Wallet</h1>
              <p className="text-xs text-muted">Squad virtual account</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/wallet/send" className="btn-primary px-4 py-2 text-sm gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
              Send money
            </Link>
          </div>
        </div>
      </header>

      <div className="px-6 py-6" style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left: balance + actions */}
          <div className="flex flex-col gap-4">
            <div className="rounded-2xl p-6 text-white" style={{ background: "linear-gradient(135deg, #0F6E56 0%, #1D9E75 100%)" }}>
              <p className="text-xs mb-1 tracking-widest uppercase" style={{ opacity: 0.7 }}>Available balance</p>
              <p className="text-4xl font-semibold tracking-tight mb-1">₦{Number(balance).toLocaleString()}</p>
              <p className="text-sm mb-6" style={{ opacity: 0.55 }}>
                {user?.virtualAccountNumber ? `NUBAN: ${user.virtualAccountNumber}` : "No NUBAN yet — complete KYC"}
              </p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "Send", href: "/wallet/send", d: "M12 19V5M5 12l7-7 7 7" },
                  { label: "Receive", href: "/wallet/receive", d: "M12 5v14M5 12l7 7 7-7" },
                  { label: "QR code", href: "/wallet/receive", isQr: true },
                  { label: "Pay link", href: "/wallet/receive", isLink: true },
                ].map((a) => (
                  <Link key={a.label} href={a.href} className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm" style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                      {a.isQr ? (<><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="3" height="3"/></>) : a.isLink ? (<><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></>) : (<path d={a.d}/>)}
                    </svg>
                    {a.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="card p-4 flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-base font-black" style={{ background: "#FEF6E4", color: "#9A6A05" }}>#</div>
              <div>
                <p className="text-sm font-semibold">No internet? Use USSD</p>
                <p className="text-xs text-muted mt-0.5 leading-relaxed">Dial *1234# to check balance, send money, and pay bills without data.</p>
              </div>
            </div>
          </div>

          {/* Right: transactions */}
          <div className="lg:col-span-2 card overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid #E8E6DF" }}>
              <h2 className="text-sm font-semibold">All transactions</h2>
              <span className="badge-green">Squad API</span>
            </div>

            <div className="hidden md:grid grid-cols-4 px-5 py-2 text-xs text-muted font-medium uppercase tracking-wide" style={{ background: "#FAFAF7", borderBottom: "1px solid #E8E6DF" }}>
              <span>Name</span><span>Category</span><span>Time</span><span className="text-right">Amount</span>
            </div>

            {loading ? (
              <div className="px-5 py-8 text-center text-sm text-muted">Loading transactions…</div>
            ) : transactions.length === 0 ? (
              <div className="px-5 py-8 text-center">
                <p className="text-sm text-muted">No transactions yet.</p>
              </div>
            ) : (
              transactions.map((txn, i) => {
                const isCredit = txn.transactionType !== "Transfer";
                const badge = catBadge[txn.purpose] ?? catBadge.other;
                const amountNaira = (((isCredit ? txn.merchantAmount : txn.amount) || 0) / 100).toLocaleString();
                const name = txn.senderName || txn.remarks || "Transaction";
                const initials = name.slice(0, 2).toUpperCase();
                return (
                  <div key={txn._id || i} className="grid grid-cols-1 md:grid-cols-4 items-center px-5 py-3 gap-2 md:gap-0" style={{ borderBottom: i < transactions.length - 1 ? "1px solid #F4F3EE" : "none" }}>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold shrink-0" style={{ background: isCredit ? "#E8F5F0" : "#F4F3EE", color: isCredit ? "#0F6E56" : "#5C5A54" }}>
                        {initials}
                      </div>
                      <div>
                        <p className="text-sm font-medium" style={{ color: "#1C1B18" }}>{name}</p>
                        <p className="text-xs text-muted">{txn.transactionType}</p>
                      </div>
                    </div>
                    <div><span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: badge.bg, color: badge.color }}>{badge.label}</span></div>
                    <p className="text-xs text-muted">{new Date(txn.createdAt).toLocaleString()}</p>
                    <p className="text-sm font-semibold md:text-right" style={{ color: isCredit ? "#0F6E56" : "#A33E22" }}>
                      {isCredit ? "+" : "−"}₦{amountNaira}
                    </p>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}