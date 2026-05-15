"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { jobsAPI } from "@/lib/api";

export default function ApplyButton({ jobId }: { jobId: string }) {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [applied, setApplied] = useState(false);

  const handleApply = async () => {
    if (!user) {
      router.push("/login");
      return;
    }
    setLoading(true);
    try {
      await jobsAPI.apply(jobId, { coverNote: "" });
      setApplied(true);
    } catch (err: any) {
      alert(err.message || "Application failed");
    } finally {
      setLoading(false);
    }
  };

  if (applied) {
    return <div className="text-center text-sm text-green-600">✓ Applied! Trader will review.</div>;
  }

  return (
    <button onClick={handleApply} disabled={loading} className="btn-primary w-full py-3 text-sm">
      {loading ? "Applying..." : "Apply for this gig"}
    </button>
  );
}