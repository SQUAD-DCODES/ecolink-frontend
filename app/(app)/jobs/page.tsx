"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { jobsAPI } from "@/lib/api";

export default function JobsPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All gigs");

  useEffect(() => {
    jobsAPI.list().then((r) => setJobs(r.data.jobs || [])).catch(() => {}).finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ background: "#FAFAF7", minHeight: "100vh" }}>
      <header style={{ background: "#ffffff", borderBottom: "1px solid #E8E6DF", minHeight: "64px" }}>
        <div className="flex items-center justify-between px-6 h-16" style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div>
            <h1 className="text-lg font-semibold" style={{ letterSpacing: "-0.02em" }}>Find a gig</h1>
            <p className="text-xs text-muted">AI-matched to your skills &amp; location</p>
          </div>
          <Link href="/jobs/post" className="btn-primary px-4 py-2 text-sm gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Post a job
          </Link>
        </div>
      </header>

      <div className="px-6 py-6" style={{ maxWidth: "1280px", margin: "0 auto" }}>

        {/* Filter chips */}
        <div className="flex gap-2 flex-wrap mb-6">
          {["All gigs", "Escrow only", "Delivery", "Artisan", "Trade"].map((f) => (
            <button key={f} onClick={() => setFilter(f)} className="px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap" style={{ background: filter === f ? "#0F6E56" : "#fff", color: filter === f ? "#fff" : "#5C5A54", border: filter === f ? "none" : "1px solid #E8E6DF" }}>
              {f}
            </button>
          ))}
        </div>

        {/* AI match banner */}
        <div className="rounded-xl px-5 py-3.5 flex items-center gap-3 mb-6" style={{ background: "#E8F5F0", border: "1px solid #C3E6D8" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0F6E56" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
            <circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/>
          </svg>
          <p className="text-sm" style={{ color: "#0F6E56" }}>
            <span className="font-semibold">{jobs.length} gigs</span> matched to your skills profile. Sorted by AI relevance.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12 text-sm text-muted">Loading gigs…</div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-sm text-muted">No gigs available right now.</p>
            <Link href="/jobs/post" className="btn-primary px-5 py-2.5 text-sm mt-4 inline-block">Post the first job</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {jobs.map((job) => {
              const match = job.matchScore || 0;
              const matchColor = match >= 90 ? "#0F6E56" : match >= 75 ? "#9A6A05" : "#5C5A54";
              const matchBg = match >= 90 ? "#E8F5F0" : match >= 75 ? "#FEF6E4" : "#F4F3EE";
              return (
                <div key={job._id} className="card-hover p-5 flex flex-col gap-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold leading-snug" style={{ color: "#1C1B18" }}>{job.title}</h3>
                      <p className="text-xs text-muted mt-1">{job.postedBy?.businessName || `${job.postedBy?.firstName} ${job.postedBy?.lastName}`}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ color: "#9E9B92" }}>
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                        </svg>
                        <p className="text-xs text-muted truncate">{job.state}{job.lga ? `, ${job.lga}` : ""}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                      <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: matchBg, color: matchColor }}>{match}% match</span>
                      {job.escrowEnabled && <span className="badge-green">Escrow</span>}
                    </div>
                  </div>

                  <div className="h-1 rounded-full" style={{ background: "#E8E6DF" }}>
                    <div className="h-1 rounded-full" style={{ width: `${match}%`, background: matchColor }}/>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {(job.skills || []).map((s: string) => (
                      <span key={s} className="text-xs px-2 py-0.5 rounded-full" style={{ background: "#F4F3EE", color: "#5C5A54" }}>{s}</span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-3" style={{ borderTop: "1px solid #F4F3EE" }}>
                    <div>
                      <p className="text-base font-bold" style={{ color: "#0F6E56" }}>₦{((job.payAmount || 0) / 100).toLocaleString()}</p>
                      <p className="text-xs text-muted">{job.jobType}</p>
                    </div>
                    <Link href={`/jobs/${job._id}`} className="btn-primary px-4 py-2 text-xs">Apply now</Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}