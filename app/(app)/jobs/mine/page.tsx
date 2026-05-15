"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { jobsAPI } from "@/lib/api";

interface Job {
  _id: string;
  title: string;
  description: string;
  payAmount: number; // in kobo
  payFrequency: string;
  status: "open" | "in_progress" | "completed" | "cancelled";
  escrowEnabled: boolean;
  hiredApplicant?: { firstName?: string; lastName?: string; phone: string };
  createdAt: string;
  updatedAt: string;
}

const statusConfig: Record<string, { label: string; bg: string; color: string }> = {
  in_progress: { label: "In progress", bg: "#E8F5F0", color: "#0F6E56" },
  open: { label: "Open", bg: "#FEF6E4", color: "#9A6A05" },
  completed: { label: "Completed", bg: "#F4F3EE", color: "#5C5A54" },
  cancelled: { label: "Cancelled", bg: "#FEF0EC", color: "#A33E22" },
};

const formatNaira = (kobo: number) => `₦${(kobo / 100).toLocaleString()}`;

export default function MyJobsPage() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await jobsAPI.myPosted();
        setJobs(res.data.jobs);
      } catch (err: any) {
        setError(err.message || "Failed to load your jobs");
      } finally {
        setLoading(false);
      }
    };
    if (user) fetchJobs();
  }, [user]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  const activeJobs = jobs.filter((j) => j.status === "open" || j.status === "in_progress");
  const pastJobs = jobs.filter((j) => j.status === "completed" || j.status === "cancelled");

  // Stats
  const activeCount = activeJobs.length;
  const escrowLocked = activeJobs
    .filter((j) => j.escrowEnabled && j.status === "in_progress")
    .reduce((sum, j) => sum + j.payAmount, 0);
  const totalPaid = pastJobs
    .filter((j) => j.status === "completed")
    .reduce((sum, j) => sum + j.payAmount, 0);
  const completedCount = pastJobs.filter((j) => j.status === "completed").length;

  return (
    <div style={{ background: "#FAFAF7", minHeight: "100vh" }}>
      <header style={{ background: "#ffffff", borderBottom: "1px solid #E8E6DF", minHeight: "64px" }}>
        <div className="flex items-center justify-between px-6 h-16" style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div className="flex items-center gap-3">
            <Link href="/jobs" className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "#F4F3EE", color: "#5C5A54" }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            </Link>
            <div>
              <h1 className="text-lg font-semibold">My jobs</h1>
              <p className="text-xs text-muted">As employer · manage your gigs</p>
            </div>
          </div>
          <Link href="/jobs/post" className="btn-primary px-4 py-2 text-sm gap-2">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Post new job
          </Link>
        </div>
      </header>

      <div className="px-6 py-6" style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Stats cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard label="Active gigs" value={activeCount.toString()} sub="currently running" color="#0F6E56" bg="#E8F5F0" />
          <StatCard label="Escrow locked" value={formatNaira(escrowLocked)} sub="Squad holds on jobs" color="#9A6A05" bg="#FEF6E4" />
          <StatCard label="Total paid out" value={formatNaira(totalPaid)} sub="across all gigs" color="#1C1B18" bg="#F4F3EE" />
          <StatCard label="Gigs completed" value={completedCount.toString()} sub="since joining" color="#1C1B18" bg="#F4F3EE" />
        </div>

        {/* Active jobs */}
        <section className="mb-8">
          <h2 className="text-sm font-semibold mb-4 flex items-center gap-2">
            Active gigs
            <span className="w-5 h-5 rounded-full text-xs flex items-center justify-center font-bold" style={{ background: "#E8F5F0", color: "#0F6E56" }}>{activeCount}</span>
          </h2>
          {activeJobs.length === 0 ? (
            <div className="card p-8 text-center text-muted">No active gigs</div>
          ) : (
            <div className="flex flex-col gap-3">
              {activeJobs.map((job) => {
                const st = statusConfig[job.status];
                const worker = job.hiredApplicant;
                const workerInitials = worker ? ((worker.firstName?.[0] || '') + (worker.lastName?.[0] || '')).toUpperCase() : '?';
                const totalPay = formatNaira(job.payAmount);
                const duration = "N/A"; // could be derived from job.createdAt if needed
                return (
                  <div key={job._id} className="card p-5">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start gap-3">
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="text-sm font-semibold">{job.title}</h3>
                              <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: st.bg, color: st.color }}>{st.label}</span>
                              {job.escrowEnabled && <span className="badge-green">Escrow</span>}
                            </div>
                            <p className="text-xs text-muted mt-1">Posted {new Date(job.createdAt).toLocaleDateString()}</p>
                          </div>
                        </div>
                        {worker && (
                          <div className="flex items-center gap-2 mt-3 p-3 rounded-xl" style={{ background: "#F4F3EE" }}>
                            <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0" style={{ background: "#0F6E56", color: "#fff" }}>
                              {workerInitials}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium">{worker.firstName} {worker.lastName}</p>
                              <p className="text-xs text-muted">{worker.phone}</p>
                            </div>
                            <span className="text-sm font-bold" style={{ color: "#0F6E56" }}>{totalPay}</span>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-row md:flex-col gap-2 md:w-40 flex-shrink-0">
                        {job.status === "in_progress" && (
                          <button
                            onClick={() => completeJob(job._id)}
                            className="btn-primary flex-1 md:flex-none py-2.5 text-xs"
                          >
                            Release payment
                          </button>
                        )}
                        <Link href={`/jobs/${job._id}`} className="btn-ghost flex-1 md:flex-none py-2.5 text-xs text-center">
                          View details
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Past jobs */}
        <section>
          <h2 className="text-sm font-semibold mb-4">Past gigs</h2>
          {pastJobs.length === 0 ? (
            <div className="card p-8 text-center text-muted">No past gigs</div>
          ) : (
            <div className="card overflow-hidden">
              <div className="hidden md:grid grid-cols-5 px-5 py-2 text-xs text-muted font-medium uppercase tracking-wide" style={{ background: "#FAFAF7", borderBottom: "1px solid #E8E6DF" }}>
                <span className="col-span-2">Job</span>
                <span>Worker</span>
                <span>Amount</span>
                <span>Status</span>
              </div>
              {pastJobs.map((job, idx) => {
                const st = statusConfig[job.status];
                const worker = job.hiredApplicant;
                const workerInitials = worker ? ((worker.firstName?.[0] || '') + (worker.lastName?.[0] || '')).toUpperCase() : '?';
                return (
                  <div
                    key={job._id}
                    className="grid grid-cols-1 md:grid-cols-5 items-center px-5 py-3.5 gap-2 md:gap-0"
                    style={{ borderBottom: idx < pastJobs.length - 1 ? "1px solid #F4F3EE" : "none" }}
                  >
                    <div className="md:col-span-2">
                      <p className="text-sm font-medium">{job.title}</p>
                      <p className="text-xs text-muted">{new Date(job.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0" style={{ background: "#F4F3EE", color: "#5C5A54" }}>
                        {workerInitials}
                      </div>
                      <span className="text-sm">{worker?.firstName} {worker?.lastName || worker?.phone}</span>
                    </div>
                    <p className="text-sm font-semibold">{formatNaira(job.payAmount)}</p>
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium w-fit" style={{ background: st.bg, color: st.color }}>{st.label}</span>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

// Helper components
function LoadingSpinner() {
  return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
}
function ErrorMessage({ message }: { message: string }) {
  return <div className="min-h-screen flex items-center justify-center text-red-600">{message}</div>;
}
function StatCard({ label, value, sub, color, bg }: any) {
  return (
    <div className="card p-4">
      <p className="text-xs text-muted">{label}</p>
      <p className="text-2xl font-bold mt-1" style={{ color }}>{value}</p>
      <p className="text-xs text-muted mt-0.5">{sub}</p>
    </div>
  );
}

async function completeJob(jobId: string) {
  if (!confirm("Release payment to worker? This cannot be undone.")) return;
  try {
    await jobsAPI.complete(jobId);
    window.location.reload();
  } catch (err) {
    alert("Failed to release payment. Try again.");
  }
}