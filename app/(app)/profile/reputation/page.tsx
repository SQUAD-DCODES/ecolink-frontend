import Link from "next/link";

const vouches = [
  {
    id: 1, voucher: "Bola Taiwo", initials: "BT", relation: "Market neighbour", language: "Yoruba",
    duration: "0:28", excerpt: "Amaka is very reliable — she has been selling in this market for 8 years and always pays on time. I have never seen her default on anything.",
    signals: ["Reliable", "Pays on time"], trust: "Trusted", ago: "2 days ago", color: "#1D9E75",
  },
  {
    id: 2, voucher: "Alhaji Musa Dankwa", initials: "AM", relation: "Supplier", language: "Hausa",
    duration: "0:24", excerpt: "Na san ta tsawon shekaru biyar. Koyaushe tana biyan kuɗi ba tare da jinkiri ba. Mai mutunci sosai.",
    signals: ["Honest", "Long-term"], trust: "Verified", ago: "5 days ago", color: "#9A6A05",
  },
  {
    id: 3, voucher: "Ngozi Eze", initials: "NE", relation: "Former employer", language: "Igbo",
    duration: "0:30", excerpt: "Amaka jiọrọ m ọrụ n'ụlọ ahịa m kemgbe 2019. Ọ bụ onye kwesịrị ntụkwasị obi nke ukwuu.",
    signals: ["Hardworking", "Trustworthy"], trust: "Trusted", ago: "1 week ago", color: "#0F6E56",
  },
  {
    id: 4, voucher: "Emeka Okafor", initials: "EO", relation: "Gig client", language: "Pidgin",
    duration: "0:22", excerpt: "E be like say this woman no know how to fail. She do gig for me three times and every time she deliver on point.",
    signals: ["Delivers on time", "Recommended"], trust: "Community", ago: "2 weeks ago", color: "#E5A10A",
  },
];

const aiBreakdown = [
  { label: "Payment reliability", value: 92, color: "#1D9E75" },
  { label: "Honesty & integrity", value: 88, color: "#1D9E75" },
  { label: "Work ethic", value: 84, color: "#E5A10A" },
  { label: "Community standing", value: 79, color: "#E5A10A" },
];

const trustBadgeStyle: Record<string, { bg: string; color: string }> = {
  Trusted:   { bg: "#E8F5F0", color: "#0F6E56" },
  Verified:  { bg: "#FEF6E4", color: "#9A6A05" },
  Community: { bg: "#F4F3EE", color: "#5C5A54" },
};

const waveHeights = [4,8,14,10,18,12,20,16,10,14,8,18,12,6,16,10,20,14,8,12];

export default function ReputationPage() {
  return (
    <div style={{ background: "#FAFAF7", minHeight: "100vh" }}>

      {/* Top bar */}
      <header style={{ background: "#ffffff", borderBottom: "1px solid #E8E6DF", minHeight: "64px" }}>
        <div className="flex items-center justify-between px-6 h-16" style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div className="flex items-center gap-3">
            <Link href="/profile" className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "#F4F3EE", color: "#5C5A54" }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            </Link>
            <div>
              <h1 className="text-lg font-semibold" style={{ letterSpacing: "-0.02em" }}>Vocal Reputation</h1>
              <p className="text-xs text-muted">Community voice vouches · AI-extracted trust signals</p>
            </div>
          </div>
          <Link href="/vouch/record" className="btn-primary px-4 py-2 text-sm gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a3 3 0 0 1 3 3v7a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3z"/>
              <path d="M19 10a7 7 0 0 1-14 0"/>
              <line x1="12" y1="19" x2="12" y2="22"/>
            </svg>
            Record a vouch
          </Link>
        </div>
      </header>

      <div className="px-6 py-6" style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left: overall score + AI breakdown */}
          <div className="flex flex-col gap-5">

            {/* Hero score */}
            <div className="rounded-2xl p-6 text-white" style={{ background: "linear-gradient(135deg, #0F6E56 0%, #1D9E75 100%)" }}>
              <p className="text-xs mb-3 uppercase tracking-widest" style={{ opacity: 0.7 }}>Overall trust score</p>
              <div className="flex items-center gap-5 mb-4">
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center text-4xl font-bold flex-shrink-0"
                  style={{ background: "rgba(255,255,255,0.15)", border: "2px solid rgba(255,255,255,0.3)" }}
                >
                  86
                </div>
                <div>
                  <div className="flex gap-0.5 mb-1.5">
                    {[1,2,3,4,5].map((i) => (
                      <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i <= 4 ? "#F9DC8A" : "rgba(255,255,255,0.3)"} stroke="none">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm font-semibold">Gold trust level</p>
                  <p className="text-xs mt-0.5" style={{ opacity: 0.7 }}>4 vocal vouches</p>
                </div>
              </div>
              <p className="text-xs" style={{ opacity: 0.65 }}>
                Score combines Squad transaction data + community voice vouches processed by AI.
              </p>
            </div>

            {/* AI signal breakdown */}
            <div className="card p-5">
              <h2 className="text-sm font-semibold mb-4">AI-extracted signals</h2>
              <div className="flex flex-col gap-4">
                {aiBreakdown.map((s) => (
                  <div key={s.label}>
                    <div className="flex items-center justify-between mb-1.5">
                      <p className="text-xs font-medium">{s.label}</p>
                      <span className="text-xs font-bold" style={{ color: s.color }}>{s.value}</span>
                    </div>
                    <div className="h-2 rounded-full" style={{ background: "#F4F3EE" }}>
                      <div className="h-2 rounded-full" style={{ width: `${s.value}%`, background: s.color }}/>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Add vouch CTA */}
            <Link
              href="/vouch/record"
              className="rounded-2xl p-5 flex items-center gap-4"
              style={{ background: "#073D30", textDecoration: "none" }}
            >
              <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(255,255,255,0.1)" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a3 3 0 0 1 3 3v7a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3z"/>
                  <path d="M19 10a7 7 0 0 1-14 0"/>
                  <line x1="12" y1="19" x2="12" y2="22"/>
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Vouch for someone</p>
                <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.65)" }}>Record in Pidgin, Yoruba, Igbo, or Hausa</p>
              </div>
            </Link>
          </div>

          {/* Right: vouch cards */}
          <div className="lg:col-span-2">
            <h2 className="text-sm font-semibold mb-4">Voice vouches ({vouches.length})</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {vouches.map((v) => {
                const badge = trustBadgeStyle[v.trust] ?? trustBadgeStyle.Community;
                return (
                  <div key={v.id} className="card p-5 flex flex-col gap-3">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{ background: v.color }}>
                        {v.initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-0.5">
                          <p className="text-sm font-semibold">{v.voucher}</p>
                          <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: badge.bg, color: badge.color }}>
                            {v.trust}
                          </span>
                        </div>
                        <p className="text-xs text-muted">{v.relation} · {v.language} · {v.ago}</p>
                      </div>
                    </div>

                    <p className="text-xs text-subtle leading-relaxed italic">"{v.excerpt}"</p>

                    <div className="flex flex-wrap gap-1.5">
                      {v.signals.map((sig) => (
                        <span key={sig} className="text-xs px-2 py-0.5 rounded-full" style={{ background: "#E8F5F0", color: "#0F6E56" }}>
                          ✓ {sig}
                        </span>
                      ))}
                    </div>

                    <div className="pt-3" style={{ borderTop: "1px solid #F4F3EE" }}>
                      <div className="flex items-end gap-0.5 mb-2" style={{ height: "18px" }}>
                        {waveHeights.map((h, i) => (
                          <div key={i} className="flex-1 rounded-full" style={{ height: `${h}px`, background: i < 10 ? "#1D9E75" : "#E8E6DF" }}/>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <button
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
                          style={{ background: "#E8F5F0", color: "#0F6E56" }}
                        >
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M5 3l14 9-14 9V3z"/></svg>
                          Play · {v.duration}
                        </button>
                        <span className="text-xs text-muted">{v.language}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
