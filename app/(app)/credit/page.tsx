import Link from "next/link";

const factors = [
  { label: "Payment reliability", score: 92, weight: "30%", desc: "12 months of consistent Squad transactions", trend: "up" },
  { label: "Vocal reputation", score: 86, weight: "25%", desc: "4 AI-verified voice vouches from community", trend: "up" },
  { label: "Savings consistency", score: 88, weight: "20%", desc: "No missed Ajo contributions in 8 months", trend: "stable" },
  { label: "Gig completion rate", score: 78, weight: "15%", desc: "7 of 9 gigs completed, no defaults", trend: "up" },
  { label: "Identity verification", score: 60, weight: "10%", desc: "NIN linked · BVN pending", trend: "down" },
];

const offers = [
  {
    lender: "EcoMicro Finance",
    amount: "₦50,000",
    rate: "4% / month",
    term: "3 months",
    repayment: "₦17,680 / month",
    badge: "Best offer",
    badgeColor: "#0F6E56",
    badgeBg: "#E8F5F0",
  },
  {
    lender: "Kuda Business Loan",
    amount: "₦30,000",
    rate: "5% / month",
    term: "2 months",
    repayment: "₦15,750 / month",
    badge: "Quick approval",
    badgeColor: "#9A6A05",
    badgeBg: "#FEF6E4",
  },
  {
    lender: "Community Credit Fund",
    amount: "₦75,000",
    rate: "3.5% / month",
    term: "6 months",
    repayment: "₦13,500 / month",
    badge: "Requires Gold trust",
    badgeColor: "#5C5A54",
    badgeBg: "#F4F3EE",
  },
];

export default function CreditPage() {
  const overallScore = 74;
  const circumference = 2 * Math.PI * 54;
  const arc = (overallScore / 100) * circumference;

  return (
    <div style={{ background: "#FAFAF7", minHeight: "100vh" }}>

      {/* Header */}
      <header style={{ background: "#ffffff", borderBottom: "1px solid #E8E6DF", minHeight: "64px" }}>
        <div className="flex items-center justify-between px-6 h-16" style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div>
            <h1 className="text-lg font-semibold" style={{ letterSpacing: "-0.02em" }}>Credit</h1>
            <p className="text-xs text-muted">EcoLink credit score · Powered by Squad transaction data</p>
          </div>
          <Link href="/credit/apply" className="btn-primary px-4 py-2 text-sm gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Apply for loan
          </Link>
        </div>
      </header>

      <div className="px-6 py-6" style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left: score + factors */}
          <div className="flex flex-col gap-5">

            {/* Score hero */}
            <div className="card p-6 flex flex-col items-center text-center">
              <p className="text-xs font-semibold text-muted uppercase tracking-wide mb-4">Your credit score</p>
              <div className="relative mb-4">
                <svg width="140" height="140" viewBox="0 0 140 140">
                  <circle cx="70" cy="70" r="54" fill="none" stroke="#F4F3EE" strokeWidth={10}/>
                  <circle cx="70" cy="70" r="54" fill="none" stroke="#1D9E75" strokeWidth={10}
                    strokeDasharray={`${arc} ${circumference}`} strokeLinecap="round" transform="rotate(-90 70 70)"/>
                  <text x="70" y="65" textAnchor="middle" fontSize="32" fontWeight="700" fill="#1C1B18">{overallScore}</text>
                  <text x="70" y="82" textAnchor="middle" fontSize="12" fill="#9E9B92">/ 100</text>
                </svg>
              </div>
              <p className="text-base font-semibold" style={{ color: "#0F6E56" }}>Good</p>
              <p className="text-xs text-muted mt-1 mb-5">↑ Improved 6 points this month</p>
              <div className="flex gap-2 flex-wrap justify-center">
                <span className="badge-green">Gold trust level</span>
                <span className="badge-amber">Eligible for loans</span>
              </div>
            </div>

            {/* How to improve */}
            <div className="card p-5">
              <h2 className="text-sm font-semibold mb-3">Improve your score</h2>
              <div className="flex flex-col gap-3">
                {[
                  { action: "Complete BVN verification", impact: "+8 pts", done: false },
                  { action: "Get 2 more voice vouches", impact: "+5 pts", done: false },
                  { action: "Complete pending gig", impact: "+3 pts", done: false },
                  { action: "12-month payment streak", impact: "Achieved ✓", done: true },
                ].map((a) => (
                  <div key={a.action} className="flex items-center gap-3">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: a.done ? "#E8F5F0" : "#F4F3EE" }}
                    >
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

          {/* Right: factors + loan offers */}
          <div className="lg:col-span-2 flex flex-col gap-5">

            {/* Score factors */}
            <div className="card p-6">
              <h2 className="text-sm font-semibold mb-5">Score breakdown</h2>
              <div className="flex flex-col gap-5">
                {factors.map((f) => {
                  const trendIcon = f.trend === "up" ? "↑" : f.trend === "down" ? "↓" : "→";
                  const trendColor = f.trend === "up" ? "#0F6E56" : f.trend === "down" ? "#A33E22" : "#9E9B92";
                  return (
                    <div key={f.label}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium">{f.label}</p>
                          <span className="text-xs text-muted">({f.weight})</span>
                          <span className="text-xs font-semibold" style={{ color: trendColor }}>{trendIcon}</span>
                        </div>
                        <span className="text-sm font-bold" style={{ color: f.score >= 80 ? "#0F6E56" : f.score >= 65 ? "#9A6A05" : "#A33E22" }}>
                          {f.score}
                        </span>
                      </div>
                      <div className="h-2 rounded-full mb-1" style={{ background: "#F4F3EE" }}>
                        <div className="h-2 rounded-full" style={{
                          width: `${f.score}%`,
                          background: f.score >= 80 ? "#1D9E75" : f.score >= 65 ? "#E5A10A" : "#E05A34",
                        }}/>
                      </div>
                      <p className="text-xs text-muted">{f.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Loan offers */}
            <div className="card overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid #E8E6DF" }}>
                <h2 className="text-sm font-semibold">Loan offers available to you</h2>
                <span className="badge-green">{offers.length} offers</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 divide-x" style={{ borderColor: "#E8E6DF" }}>
                {offers.map((o, i) => (
                  <div
                    key={o.lender}
                    className="p-5 flex flex-col gap-3"
                    style={{ borderBottom: i < offers.length - 1 && "1px solid #E8E6DF" || undefined }}
                  >
                    <div className="flex items-start justify-between">
                      <p className="text-xs font-semibold text-muted">{o.lender}</p>
                      <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: o.badgeBg, color: o.badgeColor }}>
                        {o.badge}
                      </span>
                    </div>
                    <p className="text-2xl font-bold" style={{ color: "#1C1B18", letterSpacing: "-0.02em" }}>{o.amount}</p>
                    <div className="flex flex-col gap-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted">Rate</span>
                        <span className="font-medium">{o.rate}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-muted">Term</span>
                        <span className="font-medium">{o.term}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-muted">Monthly</span>
                        <span className="font-semibold" style={{ color: "#0F6E56" }}>{o.repayment}</span>
                      </div>
                    </div>
                    <Link href="/credit/apply" className="btn-primary w-full py-2 text-xs mt-1">Apply</Link>
                  </div>
                ))}
              </div>

              <div className="px-5 py-4" style={{ borderTop: "1px solid #E8E6DF", background: "#FAFAF7" }}>
                <p className="text-xs text-muted leading-relaxed">
                  Loan eligibility is determined by your EcoLink credit score, vocal reputation, and Squad transaction history. Rates are indicative.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
