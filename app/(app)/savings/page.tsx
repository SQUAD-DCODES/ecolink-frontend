import Link from "next/link";

const groups = [
  { id: 1, name: "Ajo Group — Bodija", members: 12, contribution: "₦5,000", cycle: "Monthly", pool: "₦60,000", nextPayout: "May 17, 2026", position: 3, myTurn: false, paid: true },
  { id: 2, name: "Market Women Savings", members: 8, contribution: "₦10,000", cycle: "Monthly", pool: "₦80,000", nextPayout: "May 30, 2026", position: 1, myTurn: true, paid: true },
  { id: 3, name: "Youth Skill-Up Esusu", members: 20, contribution: "₦2,000", cycle: "Weekly", pool: "₦40,000", nextPayout: "May 20, 2026", position: 7, myTurn: false, paid: false },
];

export default function SavingsPage() {
  return (
    <div style={{ background: "#FAFAF7", minHeight: "100vh" }}>

      {/* Top bar */}
      <header style={{ background: "#ffffff", borderBottom: "1px solid #E8E6DF", minHeight: "64px" }}>
        <div className="flex items-center justify-between px-6 h-16" style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div>
            <h1 className="text-lg font-semibold" style={{ letterSpacing: "-0.02em" }}>Savings (Ajo / Esusu)</h1>
            <p className="text-xs text-muted">Your digital rotating savings groups</p>
          </div>
          <Link href="/savings/create" className="btn-primary px-4 py-2 text-sm gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            New group
          </Link>
        </div>
      </header>

      <div className="px-6 py-6" style={{ maxWidth: "1280px", margin: "0 auto" }}>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Total locked", value: "₦180,000", sub: "Across 3 groups", color: "#0F6E56", bg: "#E8F5F0" },
            { label: "Next payout", value: "₦80,000", sub: "May 30 · Mkt Women", color: "#9A6A05", bg: "#FEF6E4" },
            { label: "My contributions", value: "₦17,000", sub: "This month", color: "#5C5A54", bg: "#F4F3EE" },
            { label: "Active groups", value: "3", sub: "All in good standing", color: "#1D9E75", bg: "#E8F5F0" },
          ].map((s) => (
            <div key={s.label} className="card p-5">
              <p className="text-xs text-muted font-medium uppercase tracking-wide mb-2">{s.label}</p>
              <p className="text-2xl font-semibold" style={{ color: s.color, letterSpacing: "-0.02em" }}>{s.value}</p>
              <p className="text-xs text-muted mt-1">{s.sub}</p>
            </div>
          ))}
        </div>

        {/* Alert */}
        <div
          className="rounded-xl px-5 py-4 flex items-start gap-3 mb-6"
          style={{ background: "#FEF6E4", border: "1px solid #F9DC8A" }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9A6A05" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}>
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          <div>
            <p className="text-sm font-semibold" style={{ color: "#9A6A05" }}>Your turn is coming up!</p>
            <p className="text-xs mt-0.5" style={{ color: "#9A6A05", opacity: 0.85 }}>
              Market Women Savings — payout of <strong>₦80,000</strong> due May 30. You are first in the rotation this cycle.
            </p>
          </div>
          <Link href="/savings/2" className="btn-primary px-3 py-1.5 text-xs shrink-0">View group</Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Groups list */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h2 className="text-sm font-semibold">Your groups</h2>
            {groups.map((g) => {
              const r = 22;
              const circ = 2 * Math.PI * r;
              const arc = ((g.position - 1) / g.members) * circ;

              return (
                <Link key={g.id} href={`/savings/${g.id}`} className="card-hover p-5 flex flex-col gap-4">
                  <div className="flex items-start gap-4">
                    {/* Progress ring */}
                    <svg width="52" height="52" viewBox="0 0 52 52" className="shrink-0">
                      <circle cx="26" cy="26" r={r} fill="none" stroke="#F4F3EE" strokeWidth={3.5}/>
                      <circle cx="26" cy="26" r={r} fill="none" stroke="#1D9E75" strokeWidth={3.5}
                        strokeDasharray={`${arc} ${circ}`} strokeLinecap="round" transform="rotate(-90 26 26)"/>
                      <text x="26" y="30" textAnchor="middle" fontSize="13" fontWeight="700" fill="#1C1B18">#{g.position}</text>
                    </svg>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h3 className="text-sm font-semibold">{g.name}</h3>
                        {g.myTurn && <span className="badge-amber">My turn next</span>}
                      </div>
                      <p className="text-xs text-muted">{g.members} members · {g.contribution} {g.cycle}</p>
                    </div>

                    <div className="shrink-0 text-right">
                      {g.paid
                        ? <span className="badge-green">Paid ✓</span>
                        : <span className="badge-coral">Due</span>
                      }
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 pt-3" style={{ borderTop: "1px solid #F4F3EE" }}>
                    <div>
                      <p className="text-xs text-muted">Pool size</p>
                      <p className="text-sm font-semibold mt-0.5">{g.pool}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted">Next payout</p>
                      <p className="text-sm font-semibold mt-0.5">{g.nextPayout.split(",")[0]}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted">Position</p>
                      <p className="text-sm font-semibold mt-0.5">#{g.position} of {g.members}</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Right: how it works + create */}
          <div className="flex flex-col gap-4">
            <div className="card p-5">
              <h3 className="text-sm font-semibold mb-3">How Ajo works</h3>
              <div className="flex flex-col gap-4">
                {[
                  { step: "1", title: "Join a group", desc: "Find an existing Ajo group or create your own with friends." },
                  { step: "2", title: "Contribute each cycle", desc: "Everyone puts in the same amount. Squad handles all transfers automatically." },
                  { step: "3", title: "Get your payout", desc: "When it's your turn, the full pot lands in your Squad account instantly." },
                ].map((s) => (
                  <div key={s.step} className="flex gap-3">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ background: "#0F6E56" }}>
                      {s.step}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{s.title}</p>
                      <p className="text-xs text-muted mt-0.5 leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/savings/create" className="btn-primary w-full py-2.5 text-sm mt-5">
                Create a new group
              </Link>
            </div>

            <div className="card p-5">
              <h3 className="text-sm font-semibold mb-3">Contribution calendar</h3>
              {[
                { date: "May 14", group: "Youth Esusu", amount: "₦2,000", due: true },
                { date: "May 15", group: "Ajo Bodija", amount: "₦5,000", due: false },
                { date: "May 30", group: "Mkt Women", amount: "₦10,000", due: false },
              ].map((c) => (
                <div key={c.date} className="flex items-center gap-3 py-2" style={{ borderBottom: "1px solid #F4F3EE" }}>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold" style={{ background: c.due ? "#FEF0EC" : "#F4F3EE", color: c.due ? "#A33E22" : "#5C5A54" }}>
                    {c.date.split(" ")[1]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate">{c.group}</p>
                    <p className="text-xs text-muted">{c.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-semibold">{c.amount}</p>
                    {c.due && <p className="text-xs" style={{ color: "#A33E22" }}>Due</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
