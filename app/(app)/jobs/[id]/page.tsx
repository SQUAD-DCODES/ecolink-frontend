import Link from "next/link";
import { notFound } from "next/navigation";
import { jobsAPI, authAPI } from "@/lib/api";
import ApplyButton from "./ApplyButton"; // client component

async function getJob(id: string) {
  try {
    const res = await jobsAPI.get(id);
    return res.data;
  } catch {
    return null;
  }
}

export default async function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const job = await getJob(id);
  if (!job) notFound();

  const postedBy = job.postedBy;
  const traderInitials = (postedBy.firstName?.[0] || '') + (postedBy.lastName?.[0] || '');
  const matchScore = job.matchScore ?? 0;
  const matchColor = matchScore >= 90 ? "#0F6E56" : matchScore >= 75 ? "#9A6A05" : "#5C5A54";

  return (
    <div style={{ background: "#FAFAF7", minHeight: "100vh" }}>
      <header style={{ background: "#ffffff", borderBottom: "1px solid #E8E6DF", minHeight: "64px" }}>
        <div className="flex items-center justify-between px-6 h-16" style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div className="flex items-center gap-3">
            <Link href="/jobs" className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "#F4F3EE", color: "#5C5A54" }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            </Link>
            <div>
              <p className="text-xs text-muted">Jobs</p>
              <h1 className="text-base font-semibold leading-tight">{job.title}</h1>
            </div>
          </div>
          <button className="btn-ghost px-3 py-2 text-sm gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
            Share
          </button>
        </div>
      </header>

      <div className="px-6 py-6" style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <div className="card p-6">
              <div className="flex items-start justify-between gap-4 mb-5">
                <div>
                  <h2 className="text-xl font-semibold mb-1">{job.title}</h2>
                  <p className="text-sm text-muted">{postedBy.firstName} {postedBy.lastName} · {job.state}, {job.lga}</p>
                  <div className="flex flex-wrap items-center gap-2 mt-3">
                    {job.escrowEnabled && <span className="badge-green">Escrow protected</span>}
                    <span className="badge-sand">{job.jobType}</span>
                    <span className="badge-sand">Posted {new Date(job.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-3xl font-bold" style={{ color: "#0F6E56" }}>₦{(job.payAmount / 100).toLocaleString()}</p>
                  <p className="text-xs text-muted">{job.payFrequency}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl" style={{ background: "#F4F3EE" }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold" style={{ background: matchColor, color: "#fff" }}>
                  {matchScore}%
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold" style={{ color: matchColor }}>AI match score</p>
                  <div className="h-1.5 rounded-full mt-1" style={{ background: "#E8E6DF" }}>
                    <div className="h-1.5 rounded-full" style={{ width: `${matchScore}%`, background: matchColor }}/>
                  </div>
                </div>
                <p className="text-xs text-muted">Your skills align strongly with this role</p>
              </div>
            </div>

            <div className="card p-6">
              <h3 className="text-sm font-semibold mb-3">About this gig</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#5C5A54" }}>{job.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="card p-5">
                <h3 className="text-sm font-semibold mb-3">Requirements</h3>
                <div className="flex flex-col gap-2">
                  {job.skills?.map((s: string) => (
                    <div key={s} className="flex items-start gap-2 text-sm" style={{ color: "#5C5A54" }}>
                      <span className="mt-0.5" style={{ color: "#A33E22" }}>·</span> {s}
                    </div>
                  ))}
                </div>
              </div>
              <div className="card p-5">
                <h3 className="text-sm font-semibold mb-3">What you get</h3>
                <div className="flex flex-col gap-2">
                  <div className="flex items-start gap-2 text-sm" style={{ color: "#5C5A54" }}>
                    <span style={{ color: "#0F6E56" }}>✓</span> Guaranteed payment via Squad
                  </div>
                  <div className="flex items-start gap-2 text-sm" style={{ color: "#5C5A54" }}>
                    <span style={{ color: "#0F6E56" }}>✓</span> Build credit history
                  </div>
                </div>
              </div>
            </div>

            <div className="card p-5">
              <h3 className="text-sm font-semibold mb-3">Skills needed</h3>
              <div className="flex flex-wrap gap-2">
                {job.skills?.map((s: string) => (
                  <span key={s} className="px-3 py-1.5 rounded-full text-sm font-medium" style={{ background: "#E8F5F0", color: "#0F6E56" }}>
                    ✓ {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-5">
            <div className="card p-5 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold" style={{ color: "#0F6E56" }}>₦{(job.payAmount / 100).toLocaleString()}</p>
                  <p className="text-xs text-muted">{job.payFrequency} · {job.jobType}</p>
                </div>
                {job.escrowEnabled && (
                  <div className="text-right">
                    <span className="badge-green">Escrow</span>
                    <p className="text-xs text-muted mt-1">Squad protected</p>
                  </div>
                )}
              </div>
              <ApplyButton jobId={job._id} />
              <button className="btn-ghost w-full py-2.5 text-sm gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                Message trader
              </button>
            </div>

            <div className="card p-5">
              <h3 className="text-sm font-semibold mb-4">About the trader</h3>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0" style={{ background: "#0F6E56" }}>
                  {traderInitials}
                </div>
                <div>
                  <p className="text-sm font-semibold">{postedBy.firstName} {postedBy.lastName}</p>
                  <p className="text-xs text-muted">On EcoLink since {new Date(postedBy.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <span className="badge-green">KYC {postedBy.kycStatus}</span>
                <span className="badge-amber">Trusted trader</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}