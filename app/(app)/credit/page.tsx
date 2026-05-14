"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { creditAPI } from "@/lib/api";

export default function CreditPage() {
  const [scoreData, setScoreData] = useState<any>(null);
  const [offers, setOffers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    creditAPI.score().then((r) => setScoreData(r.data)).catch(() => {});
    creditAPI.offers().then((r) => setOffers(r.data.offers || [])).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const overallScore = scoreData?.score || 0;
  const circumference = 2 * Math.PI * 54;
  const arc = (overallScore / 850) * circumference;

  const factors = scoreData?.factors ? Object.values(scoreData.factors) as any[] : [];

  return (
    <div style={{ background: "#FAFAF7", minHeight: "100vh" }}>
      <header style={{ background: "#ffffff", borderBottom: "1px solid #E8E6DF", minHeight: "64px" }}>
        <div className="flex items-center justify-between px-6 h-16" style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div>
            <h1 className="text-lg font-semibold" style={{ letterSpacing: "-0.02em" }}>Credit</h1>
            <p className="text-xs text-muted">EcoLink credit score · Powered by Squad transaction data</p>
          </div>
          <Link href="/credit/apply" className="btn-primary px-4 py-2 text-sm gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Apply for loan
          </Link>
        </div>
      </header>

      <div className="px-6 py-6" style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {loading ? (
          <div className="text-center py-12 text-sm text-muted">Loading your credit profile…</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Left: score */}
            <div className="flex flex-col gap-5">
              <div className="card p-6 flex flex-col items-center text-center">
                <p className="text-xs font-semibold text-muted uppercase tracking-wide mb-4">Your credit score</p>
                <div className="relative mb-4">
                  <svg width="140" height="140" viewBox="0 0 140 140">
                    <circle cx="70" cy="70" r="54" fill="none" stroke="#F4F3EE" strokeWidth={10}/>
                    <circle cx="70" cy="70" r="54" fill="none" stroke="#1D9E75" strokeWidth={10} strokeDasharray={`${arc} ${circumference}`} strokeLinecap="round" transform="rotate(-90 70 70)"/>
                    <text x="70" y="65" textAnchor="middle" fontSize="32" fontWeight="700" fill="#1C1B18">{overallScore}</text>
                    <text x="70" y="82" textAnchor="middle" fontSize="12" fill="#9E9B92">/ 850</text>
                  </svg>
                </div>
                <p className="text-base font-semibold" style={{ color: "#0F6E56" }}>{scoreData?.tier || "Unscored"}</p>
                <p className="text-xs text-muted mt-1 mb-5">Max loan: ₦{Number(scoreData?.maxLoanNaira || 0).toLocaleString()}</p>
                <div className="flex gap-2 flex-wrap justify-center">
                  <span className="badge-green">{scoreData?.tier || "unscored"}</span>
                  {scoreData?.totalTransactions > 0 && <span className="badge-amber">{scoreData.totalTransactions} transactions</span>}
                </div>
              </div>

              {/* How to improve */}
              <div className="card p-5">
                <h2 className="text-sm font-semibold mb-3">Improve your score</h2>
                <div className="flex flex-col gap-3">
                  {[
                    { action: "Complete BVN verification", impact: "+8 pts", done: false },
                    { action: "Get 2 more voice vouches", impact: "+5 pts", done: (scoreData?.factors?.vocalReputation?.score || 0) > 50 },
                    { action: "Complete a gig", impact: "+3 pts", done: (scoreData?.factors?.gigCompletion?.score || 0) > 0 },
                    { action: "Make your first transaction", impact: "+10 pts", done: (scoreData?.totalTransactions || 0) > 0 },
                  ].map((a) => (
                    <div key={a.action} className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: a.done ? "#E8F5F0" : "#F4F3EE" }}>
                        {a.done ? (
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0F6E56" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        ) : (
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9E9B92" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                        )}
                      </div>
                      <p className="flex-1 text-xs" style={{ color: a.done ? "#9E9B92" : "#1C1B18", textDecoration: a.done ? "line-through" : "none" }}>{a.action}</p>
                      <span className="text-xs font-semibold" style={{ color: a.done ? "#9E9B92" : "#0F6E56" }}>{a.impact}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: factors + offers */}
            <div className="lg:col-span-2 flex flex-col gap-5">

              {/* Score factors */}
              {factors.length > 0 && (
                <div className="card p-6">
                  <h2 className="text-sm font-semibold mb-5">Score breakdown</h2>
                  <div className="flex flex-col gap-5">
                    {factors.map((f: any) => (
                      <div key={f.label}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-medium">{f.label}</p>
                            <span className="text-xs text-muted">({f.weight}%)</span>
                          </div>
                          <span className="text-sm font-bold" style={{ color: f.score >= 80 ? "#0F6E56" : f.score >= 65 ? "#9A6A05" : "#A33E22" }}>{f.score}</span>
                        </div>
                        <div className="h-2 rounded-full mb-1" style={{ background: "#F4F3EE" }}>
                          <div className="h-2 rounded-full" style={{ width: `${f.score}%`, background: f.score >= 80 ? "#1D9E75" : f.score >= 65 ? "#E5A10A" : "#E05A34" }}/>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Loan offers */}
              <div className="card overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid #E8E6DF" }}>
                  <h2 className="text-sm font-semibold">Loan offers available to you</h2>
                  <span className="badge-green">{offers.length} offers</span>
                </div>
                {offers.length === 0 ? (
                  <div className="px-5 py-8 text-center">
                    <p className="text-sm text-muted">Build your credit score to unlock loan offers.</p>
                    <p className="text-xs text-muted mt-1">Make transactions and get vouches to improve your score.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 divide-x" style={{ borderColor: "#E8E6DF" }}>
                    {offers.map((o, i) => (
                      <div key={i} className="p-5 flex flex-col gap-3">
                        <div className="flex items-start justify-between">
                          <p className="text-xs font-semibold text-muted">{o.partner}</p>
                          <span className="badge-green">Available</span>
                        </div>
                        <p className="text-2xl font-bold" style={{ color: "#1C1B18", letterSpacing: "-0.02em" }}>₦{Number(o.amount).toLocaleString()}</p>
                        <div className="flex flex-col gap-1">
                          <div className="flex justify-between text-xs"><span className="text-muted">Rate</span><span className="font-medium">{o.interestRate}%</span></div>
                          <div className="flex justify-between text-xs"><span className="text-muted">Term</span><span className="font-medium">{o.durationDays} days</span></div>
                        </div>
                        <Link href="/credit/apply" className="btn-primary w-full py-2 text-xs mt-1">Apply</Link>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}