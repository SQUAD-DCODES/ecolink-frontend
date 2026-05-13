import Link from "next/link";

const activeGigs = [
  {
    id: "m1",
    title: "Market stall assistant",
    worker: "Emeka Okafor",
    workerInitials: "EO",
    workerScore: 4.8,
    pay: "₦3,500/day",
    totalPay: "₦10,500",
    duration: "3 days",
    status: "in_progress",
    startDate: "May 12",
    endDate: "May 14",
    escrow: true,
    escrowAmount: "₦10,500",
  },
  {
    id: "m2",
    title: "Cashier cover — weekend",
    worker: "Ngozi Eze",
    workerInitials: "NE",
    workerScore: 4.5,
    pay: "₦2,000/day",
    totalPay: "₦4,000",
    duration: "2 days",
    status: "pending",
    startDate: "May 15",
    endDate: "May 16",
    escrow: true,
    escrowAmount: "₦4,000",
  },
];

const pastGigs = [
  {
    id: "p1",
    title: "Delivery — fabric to Agodi",
    worker: "Adebayo Jimoh",
    workerInitials: "AJ",
    pay: "₦5,000",
    status: "completed",
    date: "May 8, 2025",
    escrowReleased: true,
  },
  {
    id: "p2",
    title: "Warehouse sorting — 2 days",
    worker: "Chidi Nwosu",
    workerInitials: "CN",
    pay: "₦5,000",
    status: "completed",
    date: "Apr 30, 2025",
    escrowReleased: true,
  },
  {
    id: "p3",
    title: "Stall setup — Bodija market day",
    worker: "Fatima Aliyu",
    workerInitials: "FA",
    pay: "₦2,500",
    status: "cancelled",
    date: "Apr 22, 2025",
    escrowReleased: false,
  },
];

const statusConfig: Record<string, { label: string; bg: string; color: string }> = {
  in_progress: { label: "In progress",  bg: "#E8F5F0", color: "#0F6E56" },
  pending:     { label: "Starting soon", bg: "#FEF6E4", color: "#9A6A05" },
  completed:   { label: "Completed",    bg: "#F4F3EE", color: "#5C5A54" },
  cancelled:   { label: "Cancelled",    bg: "#FEF0EC", color: "#A33E22" },
};

export default function MyJobsPage() {
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
              <h1 className="text-lg font-semibold" style={{ letterSpacing: "-0.02em" }}>My jobs</h1>
              <p className="text-xs text-muted">As employer · manage your gigs</p>
            </div>
          </div>
          <Link href="/jobs/post" className="btn-primary px-4 py-2 text-sm gap-2">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Post new job
          </Link>
        </div>
      </header>

      <div className="px-6 py-6" style={{ maxWidth: "1280px", margin: "0 auto" }}>

        {/* Summary stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Active gigs",       value: "2",      sub: "currently running",    color: "#0F6E56", bg: "#E8F5F0" },
            { label: "Escrow locked",     value: "₦14,500", sub: "Squad holds on jobs",  color: "#9A6A05", bg: "#FEF6E4" },
            { label: "Total paid out",    value: "₦42,500", sub: "across all gigs",      color: "#1C1B18", bg: "#F4F3EE" },
            { label: "Gigs completed",    value: "11",     sub: "since joining",         color: "#1C1B18", bg: "#F4F3EE" },
          ].map((s) => (
            <div key={s.label} className="card p-4">
              <p className="text-xs text-muted">{s.label}</p>
              <p className="text-2xl font-bold mt-1" style={{ color: s.color }}>{s.value}</p>
              <p className="text-xs text-muted mt-0.5">{s.sub}</p>
            </div>
          ))}
        </div>

        {/* Active gigs */}
        <section className="mb-8">
          <h2 className="text-sm font-semibold mb-4 flex items-center gap-2">
            Active gigs
            <span className="w-5 h-5 rounded-full text-xs flex items-center justify-center font-bold" style={{ background: "#E8F5F0", color: "#0F6E56" }}>2</span>
          </h2>
          <div className="flex flex-col gap-3">
            {activeGigs.map((g) => {
              const st = statusConfig[g.status];
              return (
                <div key={g.id} className="card p-5">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-3">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-sm font-semibold" style={{ color: "#1C1B18" }}>{g.title}</h3>
                            <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: st.bg, color: st.color }}>{st.label}</span>
                            {g.escrow && <span className="badge-green">Escrow</span>}
                          </div>
                          <p className="text-xs text-muted mt-1">{g.startDate} → {g.endDate} · {g.duration}</p>
                        </div>
                      </div>

                      {/* Worker */}
                      <div className="flex items-center gap-2 mt-3 p-3 rounded-xl" style={{ background: "#F4F3EE" }}>
                        <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0" style={{ background: "#0F6E56", color: "#fff" }}>
                          {g.workerInitials}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium">{g.worker}</p>
                          <div className="flex items-center gap-1">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="#9A6A05" stroke="#9A6A05" strokeWidth={1}>
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                            </svg>
                            <span className="text-xs text-muted">{g.workerScore} trust score</span>
                          </div>
                        </div>
                        <span className="text-sm font-bold" style={{ color: "#0F6E56" }}>{g.totalPay}</span>
                      </div>
                    </div>

                    <div className="flex flex-row md:flex-col gap-2 md:w-40 flex-shrink-0">
                      {g.status === "in_progress" && (
                        <button className="btn-primary flex-1 md:flex-none py-2.5 text-xs">Release payment</button>
                      )}
                      <button className="btn-ghost flex-1 md:flex-none py-2.5 text-xs">View details</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Past gigs */}
        <section>
          <h2 className="text-sm font-semibold mb-4">Past gigs</h2>
          <div className="card overflow-hidden">
            <div className="hidden md:grid grid-cols-5 px-5 py-2 text-xs text-muted font-medium uppercase tracking-wide" style={{ background: "#FAFAF7", borderBottom: "1px solid #E8E6DF" }}>
              <span className="col-span-2">Job</span>
              <span>Worker</span>
              <span>Amount</span>
              <span>Status</span>
            </div>
            {pastGigs.map((g, i) => {
              const st = statusConfig[g.status];
              return (
                <div
                  key={g.id}
                  className="grid grid-cols-1 md:grid-cols-5 items-center px-5 py-3.5 gap-2 md:gap-0"
                  style={{ borderBottom: i < pastGigs.length - 1 ? "1px solid #F4F3EE" : "none" }}
                >
                  <div className="md:col-span-2">
                    <p className="text-sm font-medium" style={{ color: "#1C1B18" }}>{g.title}</p>
                    <p className="text-xs text-muted">{g.date}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0" style={{ background: "#F4F3EE", color: "#5C5A54" }}>
                      {g.workerInitials}
                    </div>
                    <span className="text-sm">{g.worker}</span>
                  </div>
                  <p className="text-sm font-semibold" style={{ color: "#1C1B18" }}>{g.pay}</p>
                  <span className="text-xs px-2 py-0.5 rounded-full font-medium w-fit" style={{ background: st.bg, color: st.color }}>{st.label}</span>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
