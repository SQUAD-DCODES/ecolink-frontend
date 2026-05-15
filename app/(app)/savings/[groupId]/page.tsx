"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { savingsAPI } from "@/lib/api";

interface Member {
  user: {
    _id: string;
    firstName?: string;
    lastName?: string;
    phone: string;
    creditTier?: string;
  };
  position: number;
  hasReceivedPot: boolean;
  joinedAt: string;
}

interface Contribution {
  user: { _id: string };
  cycleNumber: number;
  amountPaid: number;
  transactionRef: string;
  paidAt?: string;
  status: string;
}

interface Group {
  _id: string;
  name: string;
  contributionAmount: number; // in kobo
  frequency: "daily" | "weekly" | "monthly";
  maxMembers: number;
  members: Member[];
  contributions: Contribution[];
  status: "open" | "active" | "completed" | "cancelled";
  currentCycle: number;
  currentBeneficiary?: { _id: string; firstName?: string; lastName?: string; phone: string };
  createdBy: { firstName?: string; lastName?: string };
  createdAt: string;
}

const formatNaira = (kobo: number) => `₦${(kobo / 100).toLocaleString()}`;

export default function SavingsGroupPage({ params }: { params: Promise<{ groupId: string }> }) {
  const [groupId, setGroupId] = useState<string | null>(null);
  const [group, setGroup] = useState<Group | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    params.then((p) => setGroupId(p.groupId));
  }, [params]);

  useEffect(() => {
    if (!groupId) return;
    savingsAPI.get(groupId)
      .then((res) => setGroup(res.data))
      .catch((err) => setError(err.message || "Failed to load group"))
      .finally(() => setLoading(false));
  }, [groupId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#FAFAF7" }}>
        <div className="text-center">Loading group...</div>
      </div>
    );
  }

  if (error || !group) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#FAFAF7" }}>
        <div className="text-center text-red-600">{error || "Group not found"}</div>
      </div>
    );
  }

  const memberCount = group.members.length;
  const contributionKobo = group.contributionAmount;
  const poolKobo = contributionKobo * memberCount;
  const paidCount = group.contributions.filter(
    (c) => c.status === "paid" && c.cycleNumber === group.currentCycle
  ).length;

  // Find current user's member entry
  const myMember = group.members.find((m) => m.user._id === user?._id);
  const myPosition = myMember?.position ?? 0;
  const myPaid = group.contributions.some(
    (c) => c.user._id === user?._id && c.cycleNumber === group.currentCycle && c.status === "paid"
  );

  // Determine next payout date (mock calculation if backend doesn't provide)
  const nextPayoutDate = "Not scheduled"; // you can compute from group.createdAt + frequency

  // Build member list for display
  const membersList = group.members.map((m) => ({
    name: m.user.firstName ? `${m.user.firstName} ${m.user.lastName || ""}`.trim() : m.user.phone,
    initials: ((m.user.firstName?.[0] || '') + (m.user.lastName?.[0] || '')).toUpperCase() || m.user.phone.slice(0,2),
    position: m.position,
    paid: group.contributions.some(
      (c) => c.user._id === m.user._id && c.cycleNumber === group.currentCycle && c.status === "paid"
    ),
    trust: m.user.creditTier === "gold" || m.user.creditTier === "platinum" ? "Trusted" : "Verified",
    isYou: m.user._id === user?._id,
  })).sort((a,b) => a.position - b.position);

  // Build history (combine contributions and payouts)
  const history = [];
  // Contributions (from group.contributions)
  for (const c of group.contributions) {
    if (c.status === "paid" && c.paidAt) {
      const member = group.members.find(m => m.user._id === c.user._id);
      const memberName = member ? (member.user.firstName ? `${member.user.firstName} ${member.user.lastName || ''}`.trim() : member.user.phone) : "Someone";
      history.push({
        date: new Date(c.paidAt).toLocaleDateString(),
        member: memberName,
        amount: formatNaira(c.amountPaid),
        type: "contribution" as const,
      });
    }
  }
  // Payouts (we don't have a separate payout log, but you could add if model stores)
  // For now, we'll not show fake payouts.

  history.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const isNextPayout = myPosition === 1 && group.status === "active" && !myMember?.hasReceivedPot;

  return (
    <div style={{ background: "#FAFAF7", minHeight: "100vh" }}>
      <header style={{ background: "#ffffff", borderBottom: "1px solid #E8E6DF", minHeight: "64px" }}>
        <div className="flex items-center justify-between px-6 h-16" style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div className="flex items-center gap-3">
            <Link href="/savings" className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "#F4F3EE", color: "#5C5A54" }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            </Link>
            <div>
              <p className="text-xs text-muted">Savings</p>
              <h1 className="text-base font-semibold leading-tight">{group.name}</h1>
            </div>
          </div>
          <button className="btn-primary px-4 py-2 text-sm gap-2" onClick={() => window.location.href = `/savings/${group._id}/contribute`}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2}><path d="M12 19V5M5 12l7-7 7 7"/></svg>
            Contribute now
          </button>
        </div>
      </header>

      <div className="px-6 py-6" style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {isNextPayout && (
          <div className="rounded-xl px-5 py-4 flex items-center gap-3 mb-6" style={{ background: "#FEF6E4", border: "1px solid #F9DC8A" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9A6A05" strokeWidth={1.8}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <div className="flex-1">
              <p className="text-sm font-semibold" style={{ color: "#9A6A05" }}>You receive the next payout!</p>
              <p className="text-xs mt-0.5" style={{ color: "#9A6A05", opacity: 0.85 }}>
                {formatNaira(poolKobo)} will be transferred to your Squad account on payout day.
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 flex flex-col gap-5">
            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: "Pool size", value: formatNaira(poolKobo), color: "#0F6E56" },
                { label: "Contribution", value: `${formatNaira(contributionKobo)} / ${group.frequency}`, color: "#1C1B18" },
                { label: "Members", value: `${memberCount}/${group.maxMembers}`, color: "#1C1B18" },
                { label: "Next payout", value: nextPayoutDate === "Not scheduled" ? "Soon" : nextPayoutDate, color: "#9A6A05" },
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
                <span className="text-xs text-muted">{paidCount}/{memberCount} paid</span>
              </div>
              <div className="h-2.5 rounded-full mb-4" style={{ background: "#F4F3EE" }}>
                <div className="h-2.5 rounded-full" style={{ width: `${(paidCount/memberCount)*100}%`, background: "#1D9E75" }}/>
              </div>

              <div className="flex flex-col gap-2">
                {membersList.map((m) => (
                  <div key={m.name} className="flex items-center gap-3 py-2.5 px-1" style={{ borderBottom: "1px solid #F4F3EE" }}>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{ background: m.isYou ? "#0F6E56" : "#9E9B92" }}>
                      {m.initials}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium">{m.name}</p>
                        {m.isYou && <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: "#E8F5F0", color: "#0F6E56", fontSize: "10px" }}>You</span>}
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
              {history.length === 0 ? (
              <div className="px-5 py-8 text-center text-muted text-sm">No transactions yet.</div>
              ) : (
              history.slice(0, 10).map((h, i) => (
                <div key={i} className="flex items-center gap-3 px-5 py-3.5" style={{ borderBottom: i < history.length-1 ? "1px solid #F4F3EE" : "none" }}>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "#F4F3EE", color: "#5C5A54" }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path d="M12 19V5M5 12l7-7 7 7"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{h.member}</p>
                    <p className="text-xs text-muted">Contribution · {h.date}</p>
                  </div>
                  <p className="text-sm font-semibold" style={{ color: "#1C1B18" }}>{h.amount}</p>
                </div>
              ))
              )}
            </div>
          </div>

          {/* Right sidebar */}
          <div className="flex flex-col gap-5">
            <div className="card p-5">
              <h2 className="text-sm font-semibold mb-4">Payout rotation</h2>
              <div className="flex flex-col gap-3">
                {membersList.map((m) => {
                  const isNext = m.position === myPosition && !myMember?.hasReceivedPot && group.status === "active";
                  const hasReceived = m.position < myPosition && myMember?.hasReceivedPot === false;
                  return (
                    <div key={m.name} className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{
                        background: hasReceived ? "#E8F5F0" : isNext ? "#0F6E56" : "#F4F3EE",
                        color: hasReceived ? "#0F6E56" : isNext ? "#fff" : "#9E9B92",
                      }}>
                        {hasReceived ? "✓" : m.position}
                      </div>
                      <p className="text-sm flex-1" style={{ color: isNext ? "#0F6E56" : "#1C1B18", fontWeight: isNext ? 600 : 400 }}>
                        {m.name} {m.isYou ? "(You)" : ""}
                      </p>
                      {isNext && <span className="badge-amber">Next</span>}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="card p-5">
              <h2 className="text-sm font-semibold mb-3">Group rules</h2>
              <div className="flex flex-col gap-2.5">
                {[
                  `Contributions due by the ${group.frequency === "monthly" ? "1st" : group.frequency === "weekly" ? "Monday" : "end of day"} of each cycle`,
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

            <div className="card p-5">
              <h2 className="text-sm font-semibold mb-2">Invite a member</h2>
              <p className="text-xs text-muted mb-4 leading-relaxed">Share a link so trusted contacts can join the group. Admin approval required.</p>
              <button
                onClick={() => {
                  const inviteUrl = `${window.location.origin}/join/group/${group._id}`;
                  navigator.clipboard.writeText(inviteUrl);
                  alert("Invite link copied to clipboard!");
                }}
                className="btn-ghost w-full py-2.5 text-sm gap-2"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                  <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
                  <polyline points="16 6 12 2 8 6"/>
                  <line x1="12" y1="2" x2="12" y2="15"/>
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