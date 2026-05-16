"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { reputationAPI } from "@/lib/api";

const trustBadgeStyle: Record<string, { bg: string; color: string }> = {
  Trusted:   { bg: "#E8F5F0", color: "#0F6E56" },
  Verified:  { bg: "#FEF6E4", color: "#9A6A05" },
  Community: { bg: "#F4F3EE", color: "#5C5A54" },
};

const waveHeights = [4,8,14,10,18,12,20,16,10,14,8,18,12,6,16,10,20,14,8,12];

type ReputationSignal = {
  label: string;
  score: number;
  evidence?: string;
};

type RecentVouch = {
  voucherName?: string;
  language?: string;
  aiSummary?: string;
  createdAt?: string;
  trustLevel?: string;
};

type ReputationSummary = {
  overallScore?: number;
  tier?: string;
  vouchCount?: number;
  aiSignals?: ReputationSignal[];
  recentVouches?: RecentVouch[];
};

const accentPalette = ["#1D9E75", "#0F6E56", "#E5A10A", "#5C5A54", "#A33E22"];

function getInitials(name?: string) {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] || "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return `${first}${last}`.toUpperCase() || "?";
}

function formatAgo(value?: string) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hours ago`;
  const days = Math.floor(hours / 24);
  return days === 1 ? "1 day ago" : `${days} days ago`;
}

export default function ReputationPage() {
  const [summary, setSummary] = useState<ReputationSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    reputationAPI.me()
      .then((res) => {
        if (!mounted) return;
        setSummary(res.data ?? res);
      })
      .catch((err: unknown) => {
        if (!mounted) return;
        setError(err instanceof Error ? err.message : "Failed to load reputation.");
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const tier = summary?.tier || "Community";
  const overallScore = summary?.overallScore ?? 0;
  const vouchCount = summary?.vouchCount ?? 0;
  const aiSignals = summary?.aiSignals ?? [];
  const recentVouches = summary?.recentVouches ?? [];

  const tierLabel = useMemo(() => {
    if (tier === "Trusted") return "Gold trust level";
    if (tier === "Verified") return "Verified trust level";
    return "Community trust level";
  }, [tier]);

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
        {error && (
          <div className="mb-5 px-4 py-3 rounded-xl text-sm" style={{ background: "#FEF0EC", color: "#A33E22", border: "1px solid #E8775A" }}>
            {error}
          </div>
        )}
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
                  {overallScore}
                </div>
                <div>
                  <div className="flex gap-0.5 mb-1.5">
                    {[1,2,3,4,5].map((i) => (
                      <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i <= Math.max(1, Math.round(overallScore / 20)) ? "#F9DC8A" : "rgba(255,255,255,0.3)"} stroke="none">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm font-semibold">{tierLabel}</p>
                  <p className="text-xs mt-0.5" style={{ opacity: 0.7 }}>{vouchCount} vocal vouches</p>
                </div>
              </div>
              <p className="text-xs" style={{ opacity: 0.65 }}>
                Score combines Squad transaction data + community voice vouches processed by AI.
              </p>
            </div>

            {/* AI signal breakdown */}
            <div className="card p-5">
              <h2 className="text-sm font-semibold mb-4">AI-extracted signals</h2>
              {loading ? (
                <p className="text-sm text-muted">Loading signals…</p>
              ) : aiSignals.length === 0 ? (
                <p className="text-sm text-muted">No AI signals yet.</p>
              ) : (
                <div className="flex flex-col gap-4">
                  {aiSignals.map((s, i) => {
                    const color = s.score >= 80 ? "#1D9E75" : s.score >= 65 ? "#E5A10A" : "#A33E22";
                    return (
                      <div key={`${s.label}-${i}`}>
                        <div className="flex items-center justify-between mb-1.5">
                          <p className="text-xs font-medium">{s.label}</p>
                          <span className="text-xs font-bold" style={{ color }}>{Math.round(s.score)}</span>
                        </div>
                        <div className="h-2 rounded-full" style={{ background: "#F4F3EE" }}>
                          <div className="h-2 rounded-full" style={{ width: `${Math.min(100, Math.max(0, s.score))}%`, background: color }}/>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
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
            <h2 className="text-sm font-semibold mb-4">Voice vouches ({recentVouches.length})</h2>
            {loading ? (
              <div className="text-sm text-muted">Loading vouches…</div>
            ) : recentVouches.length === 0 ? (
              <div className="card p-6 text-sm text-muted">No vouches yet.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recentVouches.map((v, index) => {
                  const initials = getInitials(v.voucherName);
                  const accent = accentPalette[index % accentPalette.length];
                  const trust = v.trustLevel || tier;
                  const badge = trustBadgeStyle[trust] ?? trustBadgeStyle.Community;
                  const createdAgo = formatAgo(v.createdAt);
                  return (
                    <div key={`${v.voucherName}-${v.createdAt}-${index}`} className="card p-5 flex flex-col gap-3">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{ background: accent }}>
                          {initials}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-0.5">
                            <p className="text-sm font-semibold">{v.voucherName || "Community member"}</p>
                            <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: badge.bg, color: badge.color }}>
                              {trust}
                            </span>
                          </div>
                          <p className="text-xs text-muted">{v.language || "Unknown"}{createdAgo ? ` · ${createdAgo}` : ""}</p>
                        </div>
                      </div>

                      <p className="text-xs text-subtle leading-relaxed italic">"{v.aiSummary || "Vouch received. Awaiting summary."}"</p>

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
                            Play · 0:30
                          </button>
                          <span className="text-xs text-muted">{v.language || ""}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
