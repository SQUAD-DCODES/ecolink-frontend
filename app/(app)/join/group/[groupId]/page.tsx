"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { savingsAPI } from "@/lib/api";

export default function JoinGroupPage() {
  const params = useParams();
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [joining, setJoining] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const groupId = params.groupId as string;

  // If user is not logged in, redirect to login, but store the return URL
  useEffect(() => {
    if (!authLoading && !user) {
      const returnUrl = `/join/group/${groupId}`;
      router.push(`/login?returnUrl=${encodeURIComponent(returnUrl)}`);
    }
  }, [authLoading, user, router, groupId]);

  // Auto-join when user is logged in and component mounts
  useEffect(() => {
    if (!user || joining || error) return;

    const joinGroup = async () => {
      setJoining(true);
      try {
        await savingsAPI.join(groupId);
        router.push(`/savings/${groupId}`);
      } catch (err: any) {
        setError(err.message || "Failed to join group. It might be full or you're already a member.");
      } finally {
        setJoining(false);
      }
    };

    joinGroup();
  }, [user, groupId, router, joining, error]);

  if (authLoading) {
    return <div className="min-h-screen flex items-center justify-center">Checking login...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "#FAFAF7" }}>
      <div className="card p-8 max-w-md w-full text-center">
        {joining && <p className="text-muted">Joining the savings group...</p>}
        {error && (
          <>
            <p className="text-red-600 mb-4">{error}</p>
            <button onClick={() => router.push("/savings")} className="btn-primary">
              View my groups
            </button>
          </>
        )}
      </div>
    </div>
  );
}