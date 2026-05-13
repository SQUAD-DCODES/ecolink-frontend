import Link from "next/link";

const transactions = [
  { id: 1, name: "Emeka Okafor", desc: "Gig payment — stall cover", amount: "+₦8,500", type: "credit", initials: "EO", time: "Today, 10:22 AM" },
  { id: 2, name: "Ajo Group — Bodija", desc: "Monthly contribution", amount: "−₦5,000", type: "debit", initials: "AG", time: "Yesterday" },
  { id: 3, name: "Fatima Aliyu", desc: "Fabric delivery fee", amount: "+₦2,200", type: "credit", initials: "FA", time: "Yesterday" },
  { id: 4, name: "Airtime top-up", desc: "MTN self-recharge", amount: "−₦1,000", type: "debit", initials: "MT", time: "Mon" },
  { id: 5, name: "Chidi Nwosu", desc: "Carpentry — shelf install", amount: "+₦15,000", type: "credit", initials: "CN", time: "Mon" },
];

const stats = [
  { label: "Total balance", value: "₦124,500", sub: "Squad virtual account", accent: "#0F6E56", bg: "#E8F5F0" },
  { label: "This month in", value: "₦25,700", sub: "↑ 12% vs last month", accent: "#1D9E75", bg: "#E8F5F0" },
  { label: "This month out", value: "₦6,500", sub: "3 transactions", accent: "#A33E22", bg: "#FEF0EC" },
  { label: "Credit score", value: "74/100", sub: "Good · improving", accent: "#9A6A05", bg: "#FEF6E4" },
];

const waveHeights = [4,8,14,10,18,12,20,16,10,14,8,18,12,6,16,10,20,14,8,12];

export default function HomePage() {
  return (
    <div style={{ background: "#FAFAF7", minHeight: "100vh" }}>

      {/* Top bar */}
      <header style={{ background: "#ffffff", borderBottom: "1px solid #E8E6DF", minHeight: "64px" }}>
        <div className="flex items-center justify-between px-6 h-16" style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div>
            <p className="text-sm text-muted">Good morning</p>
            <h1 className="text-xl font-semibold" style={{ letterSpacing: "-0.02em", color: "#1C1B18" }}>
              Amaka Obi 👋
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
            <button
              aria-label="Notifications"
              className="relative w-9 h-9 rounded-full flex items-center justify-center"
              style={{ background: "#F4F3EE", color: "#5C5A54" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ background: "#E05A34" }}/>
            </button>
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white"
              style={{ background: "#0F6E56" }}
            >
              AO
            </div>
          </div>
        </div>
      </header>

      <div className="px-6 py-6" style={{ maxWidth: "1280px", margin: "0 auto" }}>

        {/* Stats grid — 2 cols mobile, 4 cols desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((s) => (
            <div key={s.label} className="card p-5">
              <div className="flex items-start justify-between mb-3">
                <p className="text-xs text-muted font-medium uppercase tracking-wide">{s.label}</p>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: s.bg }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={s.accent} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="20" x2="18" y2="10"/>
                    <line x1="12" y1="20" x2="12" y2="4"/>
                    <line x1="6" y1="20" x2="6" y2="14"/>
                  </svg>
                </div>
              </div>
              <p className="text-2xl font-semibold" style={{ color: s.accent, letterSpacing: "-0.02em" }}>{s.value}</p>
              <p className="text-xs text-muted mt-1">{s.sub}</p>
            </div>
          ))}
        </div>

        {/* Main two-column layout on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left — wallet + transactions (2/3) */}
          <div className="lg:col-span-2 flex flex-col gap-6">

            {/* Wallet card */}
            <div className="rounded-2xl p-6 text-white" style={{ background: "linear-gradient(135deg, #0F6E56 0%, #1D9E75 100%)" }}>
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className="text-xs mb-1 tracking-widest uppercase" style={{ opacity: 0.7 }}>Available balance</p>
                  <p className="text-4xl font-semibold tracking-tight">₦124,500.00</p>
                  <p className="text-sm mt-1" style={{ opacity: 0.6 }}>NUBAN: 0123 456 789 · Squad Virtual · Wema Bank</p>
                </div>
                <div className="text-right">
                  <span className="text-xs px-2.5 py-1 rounded-full font-medium" style={{ background: "rgba(255,255,255,0.2)" }}>
                    Active
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                {[
                  { label: "Send money", href: "/wallet/send",    d: "M12 19V5M5 12l7-7 7 7" },
                  { label: "Receive",    href: "/wallet/receive", d: "M12 5v14M5 12l7 7 7-7" },
                  { label: "Pay link",   href: "/wallet/receive", isLink: true },
                  { label: "QR code",    href: "/wallet/receive", isQr: true },
                ].map((a) => (
                  <Link
                    key={a.label}
                    href={a.href}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium"
                    style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff" }}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                      {a.isLink ? (
                        <>
                          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                        </>
                      ) : a.isQr ? (
                        <>
                          <rect x="3" y="3" width="7" height="7" rx="1"/>
                          <rect x="14" y="3" width="7" height="7" rx="1"/>
                          <rect x="3" y="14" width="7" height="7" rx="1"/>
                          <rect x="14" y="14" width="3" height="3"/>
                        </>
                      ) : (
                        <path d={a.d}/>
                      )}
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
                <Link href="/wallet" className="text-xs font-medium" style={{ color: "#0F6E56" }}>
                  View all →
                </Link>
              </div>
              <table className="w-full">
                <tbody>
                  {transactions.map((txn, i) => (
                    <tr
                      key={txn.id}
                      style={{ borderBottom: i < transactions.length - 1 ? "1px solid #F4F3EE" : "none" }}
                    >
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0"
                            style={{
                              background: txn.type === "credit" ? "#E8F5F0" : "#F4F3EE",
                              color: txn.type === "credit" ? "#0F6E56" : "#5C5A54",
                            }}
                          >
                            {txn.initials}
                          </div>
                          <div>
                            <p className="text-sm font-medium" style={{ color: "#1C1B18" }}>{txn.name}</p>
                            <p className="text-xs text-muted">{txn.desc}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3 text-right">
                        <p className="text-sm font-semibold" style={{ color: txn.type === "credit" ? "#0F6E56" : "#A33E22" }}>
                          {txn.amount}
                        </p>
                        <p className="text-xs text-muted">{txn.time}</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Quick actions row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { href: "/jobs", label: "Find a gig", sub: "3 matches near you", bg: "#E8F5F0", color: "#0F6E56" },
                { href: "/savings", label: "Ajo group", sub: "Next payout in 4 days", bg: "#FEF6E4", color: "#9A6A05" },
                { href: "/profile/reputation", label: "Vocal rep", sub: "5 vouches", bg: "#E8F5F0", color: "#1D9E75" },
                { href: "/wallet", label: "Pay link", sub: "Share & get paid", bg: "#F4F3EE", color: "#5C5A54" },
              ].map((q) => (
                <Link
                  key={q.href}
                  href={q.href}
                  className="card-hover p-4 flex flex-col gap-2"
                >
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

          {/* Right column — 1/3 */}
          <div className="flex flex-col gap-6">

            {/* Vocal rep preview */}
            <div className="card overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid #E8E6DF" }}>
                <h2 className="text-sm font-semibold">Latest vouch</h2>
                <Link href="/profile/reputation" className="text-xs font-medium" style={{ color: "#0F6E56" }}>
                  All vouches →
                </Link>
              </div>
              <div className="p-5">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{ background: "#1D9E75" }}>
                    BT
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-sm font-semibold">Bola Taiwo</p>
                      <span className="badge-green">Trusted</span>
                    </div>
                    <p className="text-xs text-muted">Yoruba · 2 days ago</p>
                  </div>
                </div>
                <p className="text-xs text-subtle leading-relaxed italic mb-3">
                  "Amaka is very reliable — she has been selling in this market for 8 years and always pays on time..."
                </p>
                <div className="flex items-end gap-0.5 mb-3" style={{ height: "20px" }}>
                  {waveHeights.map((h, i) => (
                    <div key={i} className="flex-1 rounded-full" style={{ height: `${h}px`, background: i < 10 ? "#1D9E75" : "#E8E6DF" }}/>
                  ))}
                </div>
                <button
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
                  style={{ background: "#E8F5F0", color: "#0F6E56" }}
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M5 3l14 9-14 9V3z"/></svg>
                  Play vouch · 0:30
                </button>
              </div>
            </div>

            {/* Trust score card */}
            <div className="card p-5">
              <h2 className="text-sm font-semibold mb-4">Trust score</h2>
              <div className="flex items-center gap-4 mb-4">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white flex-shrink-0"
                  style={{ background: "linear-gradient(135deg, #0F6E56, #1D9E75)" }}
                >
                  86
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: "#0F6E56" }}>Gold level</p>
                  <p className="text-xs text-muted">4 vocal vouches</p>
                  <p className="text-xs text-muted">Squad tx history</p>
                </div>
              </div>
              {[
                { label: "Payment reliability", v: 92 },
                { label: "Community standing", v: 79 },
              ].map((s) => (
                <div key={s.label} className="mb-2">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted">{s.label}</span>
                    <span className="font-medium" style={{ color: "#0F6E56" }}>{s.v}</span>
                  </div>
                  <div className="h-1.5 rounded-full" style={{ background: "#F4F3EE" }}>
                    <div className="h-1.5 rounded-full" style={{ width: `${s.v}%`, background: "#1D9E75" }}/>
                  </div>
                </div>
              ))}
              <Link
                href="/profile/reputation"
                className="btn-primary w-full py-2.5 mt-3 text-xs"
              >
                View full reputation
              </Link>
            </div>

            {/* Upcoming */}
            <div className="card p-5">
              <h2 className="text-sm font-semibold mb-3">Upcoming</h2>
              <div className="flex flex-col gap-3">
                {[
                  { label: "Ajo payout — Bodija", date: "May 17", type: "savings", color: "#9A6A05", bg: "#FEF6E4" },
                  { label: "Market Women payout", date: "May 30", type: "savings", color: "#9A6A05", bg: "#FEF6E4" },
                  { label: "Gig: Stall cover", date: "May 14", type: "job", color: "#0F6E56", bg: "#E8F5F0" },
                ].map((u) => (
                  <div key={u.label} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: u.bg }}>
                      <span className="text-xs font-bold" style={{ color: u.color }}>{u.date.split(" ")[1]}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium truncate" style={{ color: "#1C1B18" }}>{u.label}</p>
                      <p className="text-xs text-muted">{u.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
