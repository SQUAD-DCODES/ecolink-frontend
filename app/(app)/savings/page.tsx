"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { savingsAPI } from "@/lib/api";

export default function SavingsPage() {
  const [groups, setGroups] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    savingsAPI.list().then((r) => setGroups(r.data.groups || [])).catch(() => {}).finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ background: "#FAFAF7", minHeight: "100vh" }}>
      <header style={{ background: "#ffffff", borderBottom: "1px solid #E8E6DF", minHeight: "64px" }}>
        <div className="flex items-center justify-between px-6 h-16" style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div>
            <h1 className="text-lg font-semibold" style={{ letterSpacing: "-0.02em" }}>Savings (Ajo / Esusu)</h1>
            <p className="text-xs text-muted">Your digital rotating savings groups</p>
          </div>
          <Link href="/savings/create" className="btn-primary px-4 py-2 text-sm gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            New group
          </Link>
        </div>
      </header>

      <div className="px-6 py-6" style={{ maxWidth: "1280px", margin: "0 auto" }}>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Active groups", value: String(groups.length), sub: "Your groups", color: "#1D9E75", bg: "#E8F5F0" },
            { label: "Total members", value: String(groups.reduce((s, g) => s + (g.members?.length || 0), 0)), sub: "Across all groups", color: "#0F6E56", bg: "#E8F5F0" },
            { label: "Contributions", value: String(groups.reduce((s, g) => s + (g.contributions?.length || 0), 0)), sub: "This cycle", color: "#5C5A54", bg: "#F4F3EE" },
            { label: "Status", value: groups.length > 0 ? "Active" : "None", sub: "All groups", color: "#9A6A05", bg: "#FEF6E4" },
          ].map((s) => (
            <div key={s.label} className="card p-5">
              <p className="text-xs text-muted font-medium uppercase tracking-wide mb-2">{s.label}</p>
              <p className="text-2xl font-semibold" style={{ color: s.color, letterSpacing: "-0.02em" }}>{s.value}</p>
              <p className="text-xs text-muted mt-1">{s.sub}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h2 className="text-sm font-semibold">Your groups</h2>

            {loading ? (
              <div className="text-center py-8 text-sm text-muted">Loading your groups…</div>
            ) : groups.length === 0 ? (
              <div className="card p-8 text-center">
                <p className="text-sm text-muted mb-4">You haven&apos;t joined any Ajo groups yet.</p>
                <Link href="/savings/create" className="btn-primary px-5 py-2.5 text-sm">Create your first group</Link>
              </div>
            ) : (
              groups.map((g) => {
                const memberCount = g.members?.length || 0;
                const position = g.members?.findIndex((m: any) => m.hasReceivedPot === false) + 1 || 1;
                const r = 22;
                const circ = 2 * Math.PI * r;
                const arc = ((position - 1) / Math.max(memberCount, 1)) * circ;
                const potNaira = ((g.contributionAmount || 0) * memberCount / 100).toLocaleString();

                return (
                  <Link key={g._id} href={`/savings/${g._id}`} className="card-hover p-5 flex flex-col gap-4">
                    <div className="flex items-start gap-4">
                      <svg width="52" height="52" viewBox="0 0 52 52" className="shrink-0">
                        <circle cx="26" cy="26" r={r} fill="none" stroke="#F4F3EE" strokeWidth={3.5}/>
                        <circle cx="26" cy="26" r={r} fill="none" stroke="#1D9E75" strokeWidth={3.5} strokeDasharray={`${arc} ${circ}`} strokeLinecap="round" transform="rotate(-90 26 26)"/>
                        <text x="26" y="30" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1C1B18">#{position}</text>
                      </svg>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold mb-1">{g.name}</h3>
                        <p className="text-xs text-muted">{memberCount} members · ₦{((g.contributionAmount || 0) / 100).toLocaleString()} {g.frequency}</p>
                      </div>
                      <span className={g.status === "active" ? "badge-green" : "badge-sand"}>{g.status}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 pt-3" style={{ borderTop: "1px solid #F4F3EE" }}>
                      <div><p className="text-xs text-muted">Pool size</p><p className="text-sm font-semibold mt-0.5">₦{potNaira}</p></div>
                      <div><p className="text-xs text-muted">Members</p><p className="text-sm font-semibold mt-0.5">{memberCount}/{g.maxMembers}</p></div>
                      <div><p className="text-xs text-muted">Cycle</p><p className="text-sm font-semibold mt-0.5">#{g.currentCycle}</p></div>
                    </div>
                  </Link>
                );
              })
            )}
          </div>

          {/* Right: how it works */}
          <div className="flex flex-col gap-4">
            <div className="card p-5">
              <h3 className="text-sm font-semibold mb-3">How Ajo works</h3>
              <div className="flex flex-col gap-4">
                {[
                  { step: "1", title: "Join a group", desc: "Find an existing Ajo group or create your own." },
                  { step: "2", title: "Contribute each cycle", desc: "Everyone puts in the same amount. Squad handles all transfers." },
                  { step: "3", title: "Get your payout", desc: "When it's your turn, the full pot lands in your Squad account." },
                ].map((s) => (
                  <div key={s.step} className="flex gap-3">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ background: "#0F6E56" }}>{s.step}</div>
                    <div><p className="text-sm font-medium">{s.title}</p><p className="text-xs text-muted mt-0.5 leading-relaxed">{s.desc}</p></div>
                  </div>
                ))}
              </div>
              <Link href="/savings/create" className="btn-primary w-full py-2.5 text-sm mt-5">Create a new group</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}