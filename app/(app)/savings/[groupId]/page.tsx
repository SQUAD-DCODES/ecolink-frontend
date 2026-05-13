import Link from "next/link";

const groupsData: Record<string, {
  name: string; members: { name: string; initials: string; position: number; paid: boolean; trust: string }[];
  contribution: string; cycle: string; pool: string; nextPayout: string; myPosition: number; myPaid: boolean;
  history: { date: string; member: string; amount: string; type: "contribution" | "payout" }[];
}> = {
  "1": {
    name: "Ajo Group — Bodija",
    members: [
      { name: "Mama Kemi", initials: "MK", position: 1, paid: true, trust: "Trusted" },
      { name: "Bola Taiwo", initials: "BT", position: 2, paid: true, trust: "Trusted" },
      { name: "Amaka Obi", initials: "AO", position: 3, paid: true, trust: "Verified" },
      { name: "Alhaji Dankwa", initials: "AD", position: 4, paid: false, trust: "Community" },
      { name: "Ngozi Eze", initials: "NE", position: 5, paid: true, trust: "Trusted" },
    ],
    contribution: "₦5,000", cycle: "Monthly", pool: "₦60,000", nextPayout: "May 17, 2026", myPosition: 3, myPaid: true,
    history: [
      { date: "Apr 1", member: "All members", amount: "₦5,000 each", type: "contribution" },
      { date: "Apr 17", member: "Mama Kemi", amount: "₦60,000", type: "payout" },
      { date: "Mar 1", member: "All members", amount: "₦5,000 each", type: "contribution" },
      { date: "Mar 17", member: "Bola Taiwo", amount: "₦60,000", type: "payout" },
    ],
  },
  "2": {
    name: "Market Women Savings",
    members: [
      { name: "Amaka Obi", initials: "AO", position: 1, paid: true, trust: "Verified" },
      { name: "Fatima Aliyu", initials: "FA", position: 2, paid: true, trust: "Trusted" },
      { name: "Ngozi Eze", initials: "NE", position: 3, paid: true, trust: "Trusted" },
      { name: "Adunni Bello", initials: "AB", position: 4, paid: false, trust: "Community" },
    ],
    contribution: "₦10,000", cycle: "Monthly", pool: "₦80,000", nextPayout: "May 30, 2026", myPosition: 1, myPaid: true,
    history: [
      { date: "May 1", member: "All members", amount: "₦10,000 each", type: "contribution" },
      { date: "Apr 30", member: "Fatima Aliyu", amount: "₦80,000", type: "payout" },
    ],
  },
};

export default async function SavingsGroupPage({ params }: { params: Promise<{ groupId: string }> }) {
  const { groupId } = await params;
  const group = groupsData[groupId] ?? groupsData["1"];
  const paidCount = group.members.filter((m) => m.paid).length;

  return (
    <div style={{ background: "#FAFAF7", minHeight: "100vh" }}>
      {/* Header */}
      <header style={{ background: "#ffffff", borderBottom: "1px solid #E8E6DF", minHeight: "64px" }}>
        <div className="flex items-center justify-between px-6 h-16" style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div className="flex items-center gap-3">
            <Link href="/savings" className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "#F4F3EE", color: "#5C5A54" }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            </Link>
            <div>
              <p className="text-xs text-muted">Savings</p>
              <h1 className="text-base font-semibold leading-tight">{group.name}</h1>
            </div>
          </div>
          <button className="btn-primary px-4 py-2 text-sm gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 19V5M5 12l7-7 7 7"/>
            </svg>
            Contribute now
          </button>
        </div>
      </header>

      <div className="px-6 py-6" style={{ maxWidth: "1280px", margin: "0 auto" }}>

        {/* My turn alert */}
        {group.myPosition === 1 && (
          <div className="rounded-xl px-5 py-4 flex items-center gap-3 mb-6" style={{ background: "#FEF6E4", border: "1px solid #F9DC8A" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9A6A05" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <div className="flex-1">
              <p className="text-sm font-semibold" style={{ color: "#9A6A05" }}>You receive the next payout!</p>
              <p className="text-xs mt-0.5" style={{ color: "#9A6A05", opacity: 0.85 }}>
                {group.pool} will be transferred to your Squad account on {group.nextPayout}.
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left: stats + members */}
          <div className="lg:col-span-2 flex flex-col gap-5">

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: "Pool size", value: group.pool, color: "#0F6E56" },
                { label: "Contribution", value: `${group.contribution} / ${group.cycle.toLowerCase()}`, color: "#1C1B18" },
                { label: "Members", value: `${group.members.length}`, color: "#1C1B18" },
                { label: "Next payout", value: group.nextPayout.split(",")[0], color: "#9A6A05" },
              ].map((s) => (
                <div key={s.label} className="card p-4">
                  <p className="text-xs text-muted mb-1">{s.label}</p>
                  <p className="text-base font-semibold" style={{ color: s.color }}>{s.value}</p>
                </div>
              ))}
            </div>

            {/* Contribution progress */}
            <div className="card p-5">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold">This cycle contributions</h2>
                <span className="text-xs text-muted">{paidCount}/{group.members.length} paid</span>
              </div>
              <div className="h-2.5 rounded-full mb-4" style={{ background: "#F4F3EE" }}>
                <div className="h-2.5 rounded-full" style={{ width: `${(paidCount/group.members.length)*100}%`, background: "#1D9E75" }}/>
              </div>

              <div className="flex flex-col gap-2">
                {group.members.map((m) => (
                  <div key={m.name} className="flex items-center gap-3 py-2.5 px-1" style={{ borderBottom: "1px solid #F4F3EE" }}>
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                      style={{ background: m.initials === "AO" ? "#0F6E56" : "#9E9B92" }}
                    >
                      {m.initials}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium">{m.name}</p>
                        {m.initials === "AO" && <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: "#E8F5F0", color: "#0F6E56", fontSize: "10px" }}>You</span>}
                      </div>
                      <p className="text-xs text-muted">Position #{m.position}</p>
                    </div>
                    {m.paid ? (
                      <span className="badge-green">Paid ✓</span>
                    ) : (
                      <span className="badge-coral">Pending</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* History */}
            <div className="card overflow-hidden">
              <div className="px-5 py-4" style={{ borderBottom: "1px solid #E8E6DF" }}>
                <h2 className="text-sm font-semibold">Transaction history</h2>
              </div>
              {group.history.map((h, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 px-5 py-3.5"
                  style={{ borderBottom: i < group.history.length - 1 ? "1px solid #F4F3EE" : "none" }}
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      background: h.type === "payout" ? "#E8F5F0" : "#F4F3EE",
                      color: h.type === "payout" ? "#0F6E56" : "#5C5A54",
                    }}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      {h.type === "payout" ? <path d="M12 5v14M5 12l7 7 7-7"/> : <path d="M12 19V5M5 12l7-7 7 7"/>}
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{h.member}</p>
                    <p className="text-xs text-muted">{h.type === "payout" ? "Payout received" : "Contributions collected"} · {h.date}</p>
                  </div>
                  <p className="text-sm font-semibold" style={{ color: h.type === "payout" ? "#0F6E56" : "#1C1B18" }}>
                    {h.amount}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: payout schedule + rules */}
          <div className="flex flex-col gap-5">

            {/* Payout order */}
            <div className="card p-5">
              <h2 className="text-sm font-semibold mb-4">Payout rotation</h2>
              <div className="flex flex-col gap-3">
                {group.members.map((m, i) => {
                  const isNext = m.position === group.myPosition;
                  return (
                    <div key={m.name} className="flex items-center gap-3">
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                        style={{
                          background: m.position < group.myPosition ? "#E8F5F0" : isNext ? "#0F6E56" : "#F4F3EE",
                          color: m.position < group.myPosition ? "#0F6E56" : isNext ? "#fff" : "#9E9B92",
                        }}
                      >
                        {m.position < group.myPosition ? "✓" : m.position}
                      </div>
                      <p className="text-sm flex-1" style={{ color: isNext ? "#0F6E56" : "#1C1B18", fontWeight: isNext ? 600 : 400 }}>
                        {m.name} {m.initials === "AO" ? "(You)" : ""}
                      </p>
                      {isNext && <span className="badge-amber">Next</span>}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Group rules */}
            <div className="card p-5">
              <h2 className="text-sm font-semibold mb-3">Group rules</h2>
              <div className="flex flex-col gap-2.5">
                {[
                  "Contributions due by the 1st of each month",
                  "Late payment incurs ₦500 fine",
                  "Missing 2 cycles = removal from group",
                  "Payouts auto-transferred via Squad",
                  "New members need group approval",
                ].map((r) => (
                  <div key={r} className="flex items-start gap-2 text-xs" style={{ color: "#5C5A54" }}>
                    <span className="mt-0.5 flex-shrink-0" style={{ color: "#9E9B92" }}>·</span>
                    {r}
                  </div>
                ))}
              </div>
            </div>

            {/* Invite */}
            <div className="card p-5">
              <h2 className="text-sm font-semibold mb-2">Invite a member</h2>
              <p className="text-xs text-muted mb-4 leading-relaxed">
                Share a link so trusted contacts can join the group. Admin approval required.
              </p>
              <button className="btn-ghost w-full py-2.5 text-sm gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/>
                </svg>
                Copy invite link
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
