import Link from "next/link";

const jobs = [
  { id: 1, title: "Market stall assistant", trader: "Mama Kemi Stores", location: "Bodija Market, Ibadan", pay: "₦3,500/day", duration: "3 days", skills: ["Sales", "Stacking"], match: 97, posted: "1h ago", escrow: true },
  { id: 2, title: "Delivery rider — fabrics", trader: "Fatima Fashion Hub", location: "Dugbe, Ibadan", pay: "₦5,000", duration: "One-off", skills: ["Bike riding", "Navigation"], match: 89, posted: "3h ago", escrow: true },
  { id: 3, title: "Cashier / counter help", trader: "Alhaji Goods Store", location: "Challenge, Ibadan", pay: "₦2,000/day", duration: "1 week", skills: ["Numeracy", "Customer service"], match: 81, posted: "Yesterday", escrow: false },
  { id: 4, title: "Carpentry apprentice", trader: "Bro Chidi Workshop", location: "Ring Road, Ibadan", pay: "₦8,000", duration: "2 days", skills: ["Basic carpentry", "Measurement"], match: 74, posted: "Yesterday", escrow: true },
  { id: 5, title: "Seamstress assistant", trader: "Adunni Collections", location: "Agodi, Ibadan", pay: "₦4,000/day", duration: "5 days", skills: ["Sewing basics", "Cutting"], match: 68, posted: "2 days ago", escrow: true },
  { id: 6, title: "Warehouse sorter", trader: "Ladoja Wholesale", location: "Apata, Ibadan", pay: "₦2,500/day", duration: "2 weeks", skills: ["Physical fitness", "Organisation"], match: 61, posted: "2 days ago", escrow: false },
];

export default function JobsPage() {
  return (
    <div style={{ background: "#FAFAF7", minHeight: "100vh" }}>

      {/* Top bar */}
      <header style={{ background: "#ffffff", borderBottom: "1px solid #E8E6DF", minHeight: "64px" }}>
        <div className="flex items-center justify-between px-6 h-16" style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div>
            <h1 className="text-lg font-semibold" style={{ letterSpacing: "-0.02em" }}>Find a gig</h1>
            <p className="text-xs text-muted">AI-matched to your skills &amp; location</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="btn-ghost px-4 py-2 text-sm gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
              </svg>
              Filter
            </button>
            <Link href="/jobs/post" className="btn-primary px-4 py-2 text-sm gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              Post a job
            </Link>
          </div>
        </div>
      </header>

      <div className="px-6 py-6" style={{ maxWidth: "1280px", margin: "0 auto" }}>

        {/* Search + filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="flex-1 flex items-center gap-2 px-4 py-2.5 rounded-xl" style={{ background: "#fff", border: "1px solid #E8E6DF" }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" style={{ color: "#9E9B92", flexShrink: 0 }}>
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <span className="text-sm text-muted">Search gigs near you…</span>
          </div>
          <div className="flex gap-2 flex-wrap">
            {["All gigs", "Today", "Escrow only", "< 3 days", "Delivery"].map((f, i) => (
              <button
                key={f}
                className="px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap"
                style={{
                  background: i === 0 ? "#0F6E56" : "#fff",
                  color: i === 0 ? "#fff" : "#5C5A54",
                  border: i === 0 ? "none" : "1px solid #E8E6DF",
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* AI match banner */}
        <div
          className="rounded-xl px-5 py-3.5 flex items-center gap-3 mb-6"
          style={{ background: "#E8F5F0", border: "1px solid #C3E6D8" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0F6E56" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
            <circle cx="12" cy="12" r="3"/>
            <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/>
          </svg>
          <p className="text-sm" style={{ color: "#0F6E56" }}>
            <span className="font-semibold">6 gigs</span> matched to your skills profile. Sorted by AI relevance.
          </p>
        </div>

        {/* Jobs grid — 1 col mobile, 2 col md, 3 col xl */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {jobs.map((job) => {
            const matchColor = job.match >= 90 ? "#0F6E56" : job.match >= 75 ? "#9A6A05" : "#5C5A54";
            const matchBg    = job.match >= 90 ? "#E8F5F0" : job.match >= 75 ? "#FEF6E4" : "#F4F3EE";
            return (
              <div key={job.id} className="card-hover p-5 flex flex-col gap-4">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold leading-snug" style={{ color: "#1C1B18" }}>{job.title}</h3>
                    <p className="text-xs text-muted mt-1">{job.trader}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ color: "#9E9B92", flexShrink: 0 }}>
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                      </svg>
                      <p className="text-xs text-muted truncate">{job.location}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                    <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: matchBg, color: matchColor }}>
                      {job.match}% match
                    </span>
                    {job.escrow && <span className="badge-green">Escrow</span>}
                  </div>
                </div>

                {/* Match bar */}
                <div className="h-1 rounded-full" style={{ background: "#E8E6DF" }}>
                  <div className="h-1 rounded-full" style={{ width: `${job.match}%`, background: matchColor }}/>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-1.5">
                  {job.skills.map((s) => (
                    <span key={s} className="text-xs px-2 py-0.5 rounded-full" style={{ background: "#F4F3EE", color: "#5C5A54" }}>{s}</span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-3" style={{ borderTop: "1px solid #F4F3EE" }}>
                  <div>
                    <p className="text-base font-bold" style={{ color: "#0F6E56" }}>{job.pay}</p>
                    <p className="text-xs text-muted">{job.duration} · {job.posted}</p>
                  </div>
                  <Link href={`/jobs/${job.id}`} className="btn-primary px-4 py-2 text-xs">Apply now</Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
