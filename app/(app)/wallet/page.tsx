import Link from "next/link";

const transactions = [
  { id: 1, name: "Emeka Okafor", desc: "Gig payment — stall cover", amount: "+₦8,500", type: "credit", initials: "EO", time: "Today, 10:22 AM", cat: "Gig" },
  { id: 2, name: "Ajo Group — Bodija", desc: "Monthly contribution", amount: "−₦5,000", type: "debit", initials: "AG", time: "Yesterday, 8:00 AM", cat: "Savings" },
  { id: 3, name: "Fatima Aliyu", desc: "Fabric delivery fee", amount: "+₦2,200", type: "credit", initials: "FA", time: "Yesterday, 2:15 PM", cat: "Transfer" },
  { id: 4, name: "Airtime top-up", desc: "MTN self-recharge", amount: "−₦1,000", type: "debit", initials: "MT", time: "Mon, 9:00 AM", cat: "Utility" },
  { id: 5, name: "Chidi Nwosu", desc: "Carpentry — shelf install", amount: "+₦15,000", type: "credit", initials: "CN", time: "Mon, 4:30 PM", cat: "Gig" },
  { id: 6, name: "Market levy", desc: "Bodija market weekly", amount: "−₦500", type: "debit", initials: "ML", time: "Sun, 7:00 AM", cat: "Utility" },
  { id: 7, name: "Ngozi Eze", desc: "Fabric wholesale", amount: "+₦32,000", type: "credit", initials: "NE", time: "Sat, 1:00 PM", cat: "Transfer" },
  { id: 8, name: "Data subscription", desc: "MTN 10GB data", amount: "−₦3,000", type: "debit", initials: "DT", time: "Fri, 11:00 AM", cat: "Utility" },
];

const catBadge: Record<string, { bg: string; color: string; label: string }> = {
  Gig:      { bg: "#E8F5F0", color: "#0F6E56", label: "Gig" },
  Savings:  { bg: "#FEF6E4", color: "#9A6A05", label: "Savings" },
  Transfer: { bg: "#F4F3EE", color: "#5C5A54", label: "Transfer" },
  Utility:  { bg: "#FEF0EC", color: "#A33E22", label: "Utility" },
};

export default function WalletPage() {
  return (
    <div style={{ background: "#FAFAF7", minHeight: "100vh" }}>

      {/* Top bar */}
      <header style={{ background: "#ffffff", borderBottom: "1px solid #E8E6DF", minHeight: "64px" }}>
        <div className="flex items-center justify-between px-6 h-16" style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div className="flex items-center gap-3">
            <Link href="/" className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "#F4F3EE", color: "#5C5A54" }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            </Link>
            <div>
              <h1 className="text-lg font-semibold" style={{ letterSpacing: "-0.02em" }}>Wallet</h1>
              <p className="text-xs text-muted">Squad virtual account</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="btn-ghost px-4 py-2 text-sm gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Export
            </button>
            <Link href="/wallet/send" className="btn-primary px-4 py-2 text-sm gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 19V5M5 12l7-7 7 7"/>
              </svg>
              Send money
            </Link>
          </div>
        </div>
      </header>

      <div className="px-6 py-6" style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left: balance + actions + USSD */}
          <div className="flex flex-col gap-4">

            {/* Balance card */}
            <div className="rounded-2xl p-6 text-white" style={{ background: "linear-gradient(135deg, #0F6E56 0%, #1D9E75 100%)" }}>
              <p className="text-xs mb-1 tracking-widest uppercase" style={{ opacity: 0.7 }}>Available balance</p>
              <p className="text-4xl font-semibold tracking-tight mb-1">₦124,500.00</p>
              <p className="text-sm mb-6" style={{ opacity: 0.55 }}>NUBAN: 0123 456 789 · Wema Bank</p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "Send",     href: "/wallet/send",    d: "M12 19V5M5 12l7-7 7 7" },
                  { label: "Receive",  href: "/wallet/receive", d: "M12 5v14M5 12l7 7 7-7" },
                  { label: "QR code",  href: "/wallet/receive", isQr: true },
                  { label: "Pay link", href: "/wallet/receive", isLink: true },
                ].map((a) => (
                  <Link
                    key={a.label}
                    href={a.href}
                    className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm"
                    style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff" }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                      {a.isQr ? (
                        <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="3" height="3"/></>
                      ) : a.isLink ? (
                        <><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></>
                      ) : (
                        <path d={a.d}/>
                      )}
                    </svg>
                    {a.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Monthly stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="card p-4">
                <p className="text-xs text-muted mb-1">Money in · May</p>
                <p className="text-xl font-semibold" style={{ color: "#0F6E56" }}>₦25,700</p>
              </div>
              <div className="card p-4">
                <p className="text-xs text-muted mb-1">Money out · May</p>
                <p className="text-xl font-semibold" style={{ color: "#A33E22" }}>₦6,500</p>
              </div>
            </div>

            {/* USSD */}
            <div className="card p-4 flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-base font-black" style={{ background: "#FEF6E4", color: "#9A6A05" }}>
                #
              </div>
              <div>
                <p className="text-sm font-semibold">No internet? Use USSD</p>
                <p className="text-xs text-muted mt-0.5 leading-relaxed">Dial *1234# to check balance, send money, and pay bills without data.</p>
              </div>
            </div>

            {/* Payment link */}
            <div className="card p-4 flex items-center gap-3" style={{ borderLeft: "3px solid #0F6E56" }}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: "#E8F5F0", color: "#0F6E56" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Share payment link</p>
                <p className="text-xs text-muted">No app needed · instant</p>
              </div>
              <button className="btn-primary px-3 py-1.5 text-xs">Generate</button>
            </div>
          </div>

          {/* Right: transaction table */}
          <div className="lg:col-span-2 card overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid #E8E6DF" }}>
              <h2 className="text-sm font-semibold">All transactions</h2>
              <div className="flex items-center gap-2">
                <span className="badge-green">Squad API</span>
                <button className="btn-ghost px-3 py-1.5 text-xs gap-1.5">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
                  </svg>
                  Filter
                </button>
              </div>
            </div>

            {/* Table header */}
            <div className="hidden md:grid grid-cols-4 px-5 py-2 text-xs text-muted font-medium uppercase tracking-wide" style={{ background: "#FAFAF7", borderBottom: "1px solid #E8E6DF" }}>
              <span>Name</span>
              <span>Category</span>
              <span>Time</span>
              <span className="text-right">Amount</span>
            </div>

            {transactions.map((txn, i) => {
              const badge = catBadge[txn.cat] ?? catBadge.Transfer;
              return (
                <div
                  key={txn.id}
                  className="grid grid-cols-1 md:grid-cols-4 items-center px-5 py-3 gap-2 md:gap-0"
                  style={{ borderBottom: i < transactions.length - 1 ? "1px solid #F4F3EE" : "none" }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold shrink-0"
                      style={{ background: txn.type === "credit" ? "#E8F5F0" : "#F4F3EE", color: txn.type === "credit" ? "#0F6E56" : "#5C5A54" }}
                    >
                      {txn.initials}
                    </div>
                    <div>
                      <p className="text-sm font-medium" style={{ color: "#1C1B18" }}>{txn.name}</p>
                      <p className="text-xs text-muted">{txn.desc}</p>
                    </div>
                  </div>
                  <div>
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: badge.bg, color: badge.color }}>
                      {badge.label}
                    </span>
                  </div>
                  <p className="text-xs text-muted">{txn.time}</p>
                  <p className="text-sm font-semibold md:text-right" style={{ color: txn.type === "credit" ? "#0F6E56" : "#A33E22" }}>
                    {txn.amount}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
