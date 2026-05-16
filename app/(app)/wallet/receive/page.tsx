"use client";

import Link from "next/link";
import { useState } from "react";
import { walletAPI } from "@/lib/api";
import { useAuth } from "@/lib/auth";

export default function ReceivePage() {
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [requestAmount, setRequestAmount] = useState("");
  const [requestNote, setRequestNote] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");

  const nuban = user?.virtualAccountNumber || "—";
  const accountName = user ? `${user.firstName || ""} ${user.lastName || ""}`.trim().toUpperCase() : "—";

  function copyNuban() {
    navigator.clipboard.writeText(nuban.replace(/\s/g, "")).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function copyLink() {
    navigator.clipboard.writeText(generatedLink).catch(() => {});
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  }

  async function handleGenerateLink() {
    if (!requestAmount) return;
    setGenerating(true);
    setError("");
    try {
      const res = await walletAPI.paymentLink({ amount: Number(requestAmount), description: requestNote });
      const link = res.data?.paymentLink;

      if (!link) {
        throw new Error("Payment link was not returned");
      }

      setGeneratedLink(link);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Could not generate link. Try again.");
    } finally {
      setGenerating(false);
    }
  }

  return (
    <div style={{ background: "#FAFAF7", minHeight: "100vh" }}>

      <header style={{ background: "#ffffff", borderBottom: "1px solid #E8E6DF", minHeight: "64px" }}>
        <div className="flex items-center gap-3 px-6 h-16" style={{ maxWidth: "860px", margin: "0 auto" }}>
          <Link href="/wallet" className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "#F4F3EE", color: "#5C5A54" }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          </Link>
          <div>
            <h1 className="text-lg font-semibold" style={{ letterSpacing: "-0.02em" }}>Receive money</h1>
            <p className="text-xs text-muted">Share your account details</p>
          </div>
        </div>
      </header>

      <div className="px-6 py-8" style={{ maxWidth: "860px", margin: "0 auto" }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Left: QR + account details */}
          <div className="flex flex-col gap-5">

            {/* QR card */}
            <div className="card p-6 flex flex-col items-center text-center gap-4">
              <p className="text-sm font-semibold" style={{ color: "#1C1B18" }}>Scan to pay</p>
              <div className="rounded-2xl flex items-center justify-center" style={{ width: 200, height: 200, background: "#F4F3EE", border: "2px dashed #D2CFC5" }}>
                <svg width="80" height="80" viewBox="0 0 100 100" fill="none">
                  <rect x="10" y="10" width="28" height="28" rx="3" stroke="#0F6E56" strokeWidth="5" fill="none"/>
                  <rect x="17" y="17" width="14" height="14" rx="1.5" fill="#0F6E56"/>
                  <rect x="62" y="10" width="28" height="28" rx="3" stroke="#0F6E56" strokeWidth="5" fill="none"/>
                  <rect x="69" y="17" width="14" height="14" rx="1.5" fill="#0F6E56"/>
                  <rect x="10" y="62" width="28" height="28" rx="3" stroke="#0F6E56" strokeWidth="5" fill="none"/>
                  <rect x="17" y="69" width="14" height="14" rx="1.5" fill="#0F6E56"/>
                  {[48,55,62,48,62,55,48,62].map((x, i) => (
                    <rect key={i} x={x} y={[48,48,48,55,55,62,62,62][i]} width="5" height="5" rx="1" fill="#1C1B18"/>
                  ))}
                </svg>
              </div>
              <p className="text-xs text-muted">QR powered by Squad</p>
            </div>

            {/* Account details */}
            <div className="card p-5 flex flex-col gap-4">
              <p className="text-xs text-muted uppercase tracking-wide font-medium">Bank transfer details</p>
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between p-3 rounded-xl" style={{ background: "#F4F3EE" }}>
                  <div>
                    <p className="text-xs text-muted">Account number</p>
                    <p className="text-xl font-bold tracking-widest mt-0.5" style={{ color: "#1C1B18", letterSpacing: "0.1em" }}>{nuban}</p>
                  </div>
                  <button onClick={copyNuban} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium" style={{ background: copied ? "#E8F5F0" : "#ffffff", color: copied ? "#0F6E56" : "#5C5A54", border: "1px solid #E8E6DF" }}>
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl" style={{ background: "#F4F3EE" }}>
                    <p className="text-xs text-muted">Bank</p>
                    <p className="text-sm font-medium mt-0.5" style={{ color: "#1C1B18" }}>Wema Bank (Squad)</p>
                  </div>
                  <div className="p-3 rounded-xl" style={{ background: "#F4F3EE" }}>
                    <p className="text-xs text-muted">Account name</p>
                    <p className="text-sm font-medium mt-0.5" style={{ color: "#1C1B18" }}>{accountName}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: payment link */}
          <div className="flex flex-col gap-5">
            <div className="card p-5 flex flex-col gap-4">
              <div>
                <p className="text-sm font-semibold">Request a specific amount</p>
                <p className="text-xs text-muted mt-0.5">Generate a payment link pre-filled with amount</p>
              </div>

              {error && <div className="px-4 py-3 rounded-xl text-sm" style={{ background: "#FEF0EC", color: "#A33E22" }}>{error}</div>}

              <div>
                <label className="text-xs text-muted block mb-1.5">Amount (₦)</label>
                <div className="flex items-center gap-2 px-4 py-3 rounded-xl" style={{ border: "1.5px solid #E8E6DF", background: "#fff" }}>
                  <span className="text-lg font-semibold" style={{ color: "#9E9B92" }}>₦</span>
                  <input type="number" placeholder="0.00" value={requestAmount} onChange={(e) => setRequestAmount(e.target.value)} className="flex-1 outline-none text-xl font-semibold bg-transparent" style={{ color: "#1C1B18" }} />
                </div>
              </div>
              <div>
                <label className="text-xs text-muted block mb-1.5">Note (optional)</label>
                <input type="text" placeholder="e.g. For fabric order #22" value={requestNote} onChange={(e) => setRequestNote(e.target.value)} className="w-full px-4 py-2.5 rounded-xl text-sm outline-none" style={{ border: "1.5px solid #E8E6DF", background: "#fff", color: "#1C1B18" }} />
              </div>

              {generatedLink ? (
                <div className="flex flex-col gap-3">
                  <a
                    href={generatedLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary py-3 text-sm text-center"
                  >
                    Open payment page
                  </a>

                  <div
                    className="flex items-center gap-2 px-3 py-2.5 rounded-xl"
                    style={{
                      background: "#F4F3EE",
                      border: "1px solid #E8E6DF",
                    }}
                  >
                    <span className="text-xs text-muted flex-1 truncate">
                      {generatedLink}
                    </span>

                    <button
                      onClick={copyLink}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium flex-shrink-0"
                      style={{
                        background: linkCopied ? "#E8F5F0" : "#ffffff",
                        color: linkCopied ? "#0F6E56" : "#5C5A54",
                        border: "1px solid #E8E6DF",
                      }}
                    >
                      {linkCopied ? "Copied!" : "Copy"}
                    </button>
                  </div>

                  <button
                    onClick={() => setGeneratedLink("")}
                    className="btn-ghost w-full py-2 text-xs"
                  >
                    Generate new link
                  </button>
                </div>
              ) : (
                <button onClick={handleGenerateLink} disabled={!requestAmount || generating} className="btn-primary py-3 text-sm" style={{ opacity: !requestAmount ? 0.5 : 1 }}>
                  {generating ? "Generating…" : "Generate payment link"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}