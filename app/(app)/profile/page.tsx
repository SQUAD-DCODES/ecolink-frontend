import Link from "next/link";

const trustSignals = [
  { label: "Payment reliability", score: 92, desc: "Consistently pays on time" },
  { label: "Community vouches", score: 85, desc: "5 verified voice notes" },
  { label: "Gig completion rate", score: 78, desc: "7 of 9 gigs completed" },
  { label: "Savings consistency", score: 88, desc: "No missed Ajo payments" },
];

const settingsLinks = [
  { label: "Edit profile", href: "/profile/edit", icon: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" },
  { label: "KYC verification", href: "/profile/kyc", icon: "M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z", badge: "Verified" },
  { label: "Linked bank account", href: "/profile/bank", icon: "M3 6h18M3 12h18M3 18h18" },
  { label: "PIN & security", href: "/profile/pin", icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" },
  { label: "Notification settings", href: "/profile/notifications", icon: "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0" },
  { label: "Language / dialect", href: "/profile/language", icon: "M5 8l6 6M4 14l6-6 2-3M2 5h12M7 2h1M22 22l-5-10-5 10M14 18h6" },
];

export default function ProfilePage() {
  return (
    <div style={{ background: "#FAFAF7", minHeight: "100vh" }}>

      {/* Top bar */}
      <header style={{ background: "#ffffff", borderBottom: "1px solid #E8E6DF", minHeight: "64px" }}>
        <div className="flex items-center justify-between px-6 h-16" style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div>
            <h1 className="text-lg font-semibold" style={{ letterSpacing: "-0.02em" }}>My Profile</h1>
            <p className="text-xs text-muted">Account settings &amp; reputation</p>
          </div>
          <Link href="/profile/edit" className="btn-primary px-4 py-2 text-sm gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
            Edit profile
          </Link>
        </div>
      </header>

      <div className="px-6 py-6" style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left col — identity + settings */}
          <div className="flex flex-col gap-5">

            {/* Identity card */}
            <div className="card p-6">
              <div className="flex items-start gap-4 mb-5">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold text-white flex-shrink-0"
                  style={{ background: "linear-gradient(135deg, #0F6E56, #1D9E75)" }}
                >
                  AO
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-semibold" style={{ color: "#1C1B18" }}>Amaka Obi</h2>
                  <p className="text-sm text-muted">Market trader · Bodija, Ibadan</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="badge-green">KYC verified</span>
                    <span className="badge-amber">Gold trust</span>
                  </div>
                </div>
              </div>

              {[
                { icon: "M3 5a2 2 0 0 1 2-2h3.28a1 1 0 0 1 .948.684l1.498 4.493a1 1 0 0 1-.502 1.21l-2.257 1.13a11.042 11.042 0 0 0 5.516 5.516l1.13-2.257a1 1 0 0 1 1.21-.502l4.493 1.498a1 1 0 0 1 .684.949V19a2 2 0 0 1-2 2h-1C9.716 21 3 14.284 3 6V5z", value: "+234 801 234 5678" },
                { icon: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6", value: "amaka.obi@ecolink.ng" },
              ].map((c) => (
                <div key={c.value} className="flex items-center gap-3 py-2.5" style={{ borderTop: "1px solid #F4F3EE" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9E9B92" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                    <path d={c.icon}/>
                  </svg>
                  <span className="text-sm" style={{ color: "#5C5A54" }}>{c.value}</span>
                </div>
              ))}
            </div>

            {/* Squad account */}
            <div className="card p-5 flex items-center gap-3" style={{ borderLeft: "3px solid #0F6E56" }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "#E8F5F0", color: "#0F6E56" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="20" height="14" rx="2"/><path d="M16 12h.01"/>
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold">Squad Virtual Account</p>
                <p className="text-xs text-muted">0123 456 789 · Wema Bank</p>
              </div>
              <Link href="/wallet" className="text-xs font-semibold" style={{ color: "#0F6E56" }}>Open →</Link>
            </div>

            {/* Settings */}
            <div className="card overflow-hidden">
              <div className="px-5 py-3.5" style={{ borderBottom: "1px solid #E8E6DF" }}>
                <p className="text-xs font-semibold text-muted uppercase tracking-wide">Settings</p>
              </div>
              {settingsLinks.map((s, i) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="flex items-center gap-3 px-5 py-3"
                  style={{ borderBottom: i < settingsLinks.length - 1 ? "1px solid #F4F3EE" : "none", color: "inherit", textDecoration: "none" }}
                >
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "#F4F3EE" }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#5C5A54" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                      <path d={s.icon}/>
                    </svg>
                  </div>
                  <span className="flex-1 text-sm">{s.label}</span>
                  {s.badge && <span className="badge-green">{s.badge}</span>}
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#D2CFC5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                </Link>
              ))}
            </div>

            <button
              className="w-full py-2.5 rounded-full text-sm font-medium"
              style={{ background: "#FEF0EC", color: "#A33E22", border: "1px solid #E8775A" }}
            >
              Sign out
            </button>
          </div>

          {/* Right col — credit score + trust signals */}
          <div className="lg:col-span-2 flex flex-col gap-5">

            {/* Credit score + reputation hero */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="card p-6 flex flex-col items-center text-center">
                <p className="text-xs font-semibold text-muted uppercase tracking-wide mb-4">Credit score</p>
                <div className="relative w-32 h-32 mb-3">
                  <svg className="w-full h-full" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="50" fill="none" stroke="#F4F3EE" strokeWidth={10}/>
                    <circle cx="60" cy="60" r="50" fill="none" stroke="#1D9E75" strokeWidth={10}
                      strokeDasharray={`${(74/100)*314} 314`} strokeLinecap="round" transform="rotate(-90 60 60)"/>
                    <text x="60" y="55" textAnchor="middle" fontSize="26" fontWeight="700" fill="#1C1B18">74</text>
                    <text x="60" y="72" textAnchor="middle" fontSize="11" fill="#9E9B92">/ 100</text>
                  </svg>
                </div>
                <p className="text-sm font-semibold" style={{ color: "#0F6E56" }}>Good standing</p>
                <p className="text-xs text-muted mt-1">Powered by Squad transaction data</p>
              </div>

              <div className="card p-6 flex flex-col items-center text-center" style={{ background: "linear-gradient(135deg, #0F6E56, #1D9E75)" }}>
                <p className="text-xs font-semibold uppercase tracking-wide mb-4" style={{ color: "rgba(255,255,255,0.7)" }}>Trust score</p>
                <div className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold text-white mb-3" style={{ background: "rgba(255,255,255,0.15)", border: "2px solid rgba(255,255,255,0.3)" }}>
                  86
                </div>
                <div className="flex gap-0.5 mb-2">
                  {[1,2,3,4,5].map((i) => (
                    <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i <= 4 ? "#F9DC8A" : "rgba(255,255,255,0.3)"} stroke="none">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>
                <span className="text-xs px-3 py-1 rounded-full font-semibold" style={{ background: "rgba(255,255,255,0.2)", color: "#fff" }}>Gold level</span>
                <p className="text-xs mt-2" style={{ color: "rgba(255,255,255,0.65)" }}>4 voice vouches · AI-verified</p>
                <Link href="/profile/reputation" className="mt-4 px-4 py-2 rounded-full text-xs font-semibold" style={{ background: "rgba(255,255,255,0.2)", color: "#fff", textDecoration: "none" }}>
                  View reputation →
                </Link>
              </div>
            </div>

            {/* Trust signals */}
            <div className="card p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-sm font-semibold">Trust signal breakdown</h2>
                <Link href="/profile/reputation" className="text-xs font-medium" style={{ color: "#0F6E56" }}>View vocal rep →</Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {trustSignals.map((s) => (
                  <div key={s.label}>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium">{s.label}</p>
                      <span className="text-sm font-bold" style={{ color: "#0F6E56" }}>{s.score}</span>
                    </div>
                    <div className="h-2 rounded-full mb-1.5" style={{ background: "#F4F3EE" }}>
                      <div className="h-2 rounded-full" style={{ width: `${s.score}%`, background: "linear-gradient(90deg, #1D9E75, #0F6E56)" }}/>
                    </div>
                    <p className="text-xs text-muted">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Activity summary */}
            <div className="card p-6">
              <h2 className="text-sm font-semibold mb-4">Activity summary</h2>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: "Gigs completed", value: "7", sub: "of 9 applied" },
                  { label: "Ajo groups", value: "3", sub: "all active" },
                  { label: "Voice vouches", value: "4", sub: "received" },
                ].map((a) => (
                  <div key={a.label} className="text-center p-4 rounded-xl" style={{ background: "#FAFAF7" }}>
                    <p className="text-2xl font-bold" style={{ color: "#0F6E56" }}>{a.value}</p>
                    <p className="text-xs font-medium mt-1">{a.label}</p>
                    <p className="text-xs text-muted mt-0.5">{a.sub}</p>
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
