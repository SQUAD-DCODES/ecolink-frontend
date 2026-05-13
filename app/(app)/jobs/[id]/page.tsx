import Link from "next/link";

const jobsData: Record<string, {
  id: number; title: string; trader: string; traderSince: string; traderRating: number;
  traderInitials: string; location: string; pay: string; payType: string; duration: string;
  skills: string[]; match: number; posted: string; escrow: boolean; description: string;
  requirements: string[]; perks: string[];
}> = {
  "1": {
    id: 1, title: "Market stall assistant", trader: "Mama Kemi Stores", traderSince: "2019",
    traderRating: 4.8, traderInitials: "MK", location: "Bodija Market, Ibadan", pay: "₦3,500",
    payType: "per day", duration: "3 days", skills: ["Sales", "Stacking", "Customer service"],
    match: 97, posted: "1h ago", escrow: true,
    description: "We need a reliable assistant to help manage our fabric stall at Bodija Market for 3 days while our regular help is away. You'll handle customer enquiries, restock shelves, and assist with sales. No experience required — just honesty and a good attitude.",
    requirements: ["Arrive by 7:30 AM daily", "Basic numeracy for giving change", "Friendly with customers", "Physically able to lift boxes"],
    perks: ["Lunch provided daily", "Transport allowance", "Bonus if targets met", "Potential for regular work"],
  },
  "2": {
    id: 2, title: "Delivery rider — fabrics", trader: "Fatima Fashion Hub", traderSince: "2021",
    traderRating: 4.6, traderInitials: "FF", location: "Dugbe, Ibadan", pay: "₦5,000",
    payType: "flat", duration: "One-off", skills: ["Bike riding", "Navigation", "Reliability"],
    match: 89, posted: "3h ago", escrow: true,
    description: "Need a trusted rider to deliver fabric bundles to 8 customers across Ibadan. All addresses provided. Must have own bike in good condition. Payment released via Squad escrow once all deliveries confirmed.",
    requirements: ["Own motorcycle with valid papers", "Smartphone for directions", "Careful with delicate fabrics"],
    perks: ["Full payment on completion", "Fuel covered", "Referral bonus"],
  },
};

export default async function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const job = jobsData[id] ?? jobsData["1"];
  const matchColor = job.match >= 90 ? "#0F6E56" : job.match >= 75 ? "#9A6A05" : "#5C5A54";

  return (
    <div style={{ background: "#FAFAF7", minHeight: "100vh" }}>

      {/* Header */}
      <header style={{ background: "#ffffff", borderBottom: "1px solid #E8E6DF", minHeight: "64px" }}>
        <div className="flex items-center justify-between px-6 h-16" style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div className="flex items-center gap-3">
            <Link href="/jobs" className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "#F4F3EE", color: "#5C5A54" }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            </Link>
            <div>
              <p className="text-xs text-muted">Jobs</p>
              <h1 className="text-base font-semibold leading-tight">{job.title}</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="btn-ghost px-3 py-2 text-sm gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
                <polyline points="16 6 12 2 8 6"/>
                <line x1="12" y1="2" x2="12" y2="15"/>
              </svg>
              Share
            </button>
          </div>
        </div>
      </header>

      <div className="px-6 py-6" style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Main content */}
          <div className="lg:col-span-2 flex flex-col gap-5">

            {/* Job hero */}
            <div className="card p-6">
              <div className="flex items-start justify-between gap-4 mb-5">
                <div>
                  <h2 className="text-xl font-semibold mb-1" style={{ letterSpacing: "-0.02em" }}>{job.title}</h2>
                  <p className="text-sm text-muted">{job.trader} · {job.location}</p>
                  <div className="flex flex-wrap items-center gap-2 mt-3">
                    {job.escrow && <span className="badge-green">Escrow protected</span>}
                    <span className="badge-sand">{job.duration}</span>
                    <span className="badge-sand">Posted {job.posted}</span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-3xl font-bold" style={{ color: "#0F6E56", letterSpacing: "-0.02em" }}>{job.pay}</p>
                  <p className="text-xs text-muted">{job.payType}</p>
                </div>
              </div>

              {/* AI match */}
              <div className="flex items-center gap-3 p-3 rounded-xl" style={{ background: "#F4F3EE" }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold" style={{ background: matchColor, color: "#fff" }}>
                  {job.match}%
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold" style={{ color: matchColor }}>AI match score</p>
                  <div className="h-1.5 rounded-full mt-1" style={{ background: "#E8E6DF" }}>
                    <div className="h-1.5 rounded-full" style={{ width: `${job.match}%`, background: matchColor }}/>
                  </div>
                </div>
                <p className="text-xs text-muted">Your skills align strongly with this role</p>
              </div>
            </div>

            {/* Description */}
            <div className="card p-6">
              <h3 className="text-sm font-semibold mb-3">About this gig</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#5C5A54" }}>{job.description}</p>
            </div>

            {/* Requirements + Perks */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="card p-5">
                <h3 className="text-sm font-semibold mb-3">Requirements</h3>
                <div className="flex flex-col gap-2">
                  {job.requirements.map((r) => (
                    <div key={r} className="flex items-start gap-2 text-sm" style={{ color: "#5C5A54" }}>
                      <span className="mt-0.5 flex-shrink-0" style={{ color: "#A33E22" }}>·</span>
                      {r}
                    </div>
                  ))}
                </div>
              </div>
              <div className="card p-5">
                <h3 className="text-sm font-semibold mb-3">What you get</h3>
                <div className="flex flex-col gap-2">
                  {job.perks.map((p) => (
                    <div key={p} className="flex items-start gap-2 text-sm" style={{ color: "#5C5A54" }}>
                      <span className="mt-0.5 flex-shrink-0" style={{ color: "#0F6E56" }}>✓</span>
                      {p}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Skills needed */}
            <div className="card p-5">
              <h3 className="text-sm font-semibold mb-3">Skills needed</h3>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((s) => (
                  <span key={s} className="px-3 py-1.5 rounded-full text-sm font-medium" style={{ background: "#E8F5F0", color: "#0F6E56" }}>
                    ✓ {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar: apply + trader info */}
          <div className="flex flex-col gap-5">

            {/* Apply card */}
            <div className="card p-5 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold" style={{ color: "#0F6E56", letterSpacing: "-0.02em" }}>{job.pay}</p>
                  <p className="text-xs text-muted">{job.payType} · {job.duration}</p>
                </div>
                {job.escrow && (
                  <div className="text-right">
                    <span className="badge-green">Escrow</span>
                    <p className="text-xs text-muted mt-1">Squad protected</p>
                  </div>
                )}
              </div>

              {job.escrow && (
                <div className="rounded-xl p-3" style={{ background: "#E8F5F0", border: "1px solid #C3E6D8" }}>
                  <p className="text-xs font-semibold mb-1" style={{ color: "#0F6E56" }}>How escrow works</p>
                  <p className="text-xs leading-relaxed" style={{ color: "#0F6E56", opacity: 0.85 }}>
                    The trader deposits payment upfront into Squad escrow. Funds release to you automatically when the job is marked complete.
                  </p>
                </div>
              )}

              <button className="btn-primary w-full py-3 text-sm">Apply for this gig</button>
              <button className="btn-ghost w-full py-2.5 text-sm gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
                Message trader
              </button>
            </div>

            {/* Trader profile */}
            <div className="card p-5">
              <h3 className="text-sm font-semibold mb-4">About the trader</h3>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0" style={{ background: "#0F6E56" }}>
                  {job.traderInitials}
                </div>
                <div>
                  <p className="text-sm font-semibold">{job.trader}</p>
                  <p className="text-xs text-muted">On EcoLink since {job.traderSince}</p>
                </div>
              </div>

              <div className="flex items-center gap-1 mb-3">
                {[1,2,3,4,5].map((i) => (
                  <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill={i <= Math.floor(job.traderRating) ? "#E5A10A" : "#E8E6DF"} stroke="none">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
                <span className="text-xs font-semibold ml-1" style={{ color: "#9A6A05" }}>{job.traderRating}</span>
                <span className="text-xs text-muted">· 24 gigs posted</span>
              </div>

              <div className="flex gap-2">
                <span className="badge-green">KYC verified</span>
                <span className="badge-amber">Trusted trader</span>
              </div>
            </div>

            {/* Similar jobs */}
            <div className="card p-5">
              <h3 className="text-sm font-semibold mb-3">Similar gigs</h3>
              <div className="flex flex-col gap-3">
                {[
                  { title: "Shop assistant — Dugbe", pay: "₦2,500/day", match: 84 },
                  { title: "Market porter — UI Market", pay: "₦3,000/day", match: 76 },
                ].map((s) => (
                  <div key={s.title} className="flex items-center justify-between py-2" style={{ borderBottom: "1px solid #F4F3EE" }}>
                    <div>
                      <p className="text-xs font-medium">{s.title}</p>
                      <p className="text-xs text-muted mt-0.5">{s.pay}</p>
                    </div>
                    <span className="text-xs font-semibold" style={{ color: "#0F6E56" }}>{s.match}%</span>
                  </div>
                ))}
              </div>
              <Link href="/jobs" className="text-xs font-medium mt-3 block" style={{ color: "#0F6E56" }}>
                View all gigs →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
