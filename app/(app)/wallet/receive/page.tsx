"use client";

import Link from "next/link";
import { useState } from "react";

export default function ReceivePage() {
  const [copied, setCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  const nuban = "0123 456 789";
  const bankName = "Wema Bank (Squad)";
  const accountName = "ECOLINK / AMAKA OBI";
  const paymentLink = "pay.ecolink.ng/amaka-obi";

  function copyNuban() {
    navigator.clipboard.writeText(nuban.replace(/\s/g, "")).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function copyLink() {
    navigator.clipboard.writeText(`https://${paymentLink}`).catch(() => {});
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  }

  return (
    <div style={{ background: "#FAFAF7", minHeight: "100vh" }}>

      {/* Header */}
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

              {/* QR placeholder */}
              <div
                className="rounded-2xl flex items-center justify-center"
                style={{ width: 200, height: 200, background: "#F4F3EE", border: "2px dashed #D2CFC5" }}
              >
                <svg width="80" height="80" viewBox="0 0 100 100" fill="none">
                  {/* Top-left finder */}
                  <rect x="10" y="10" width="28" height="28" rx="3" stroke="#0F6E56" strokeWidth="5" fill="none"/>
                  <rect x="17" y="17" width="14" height="14" rx="1.5" fill="#0F6E56"/>
                  {/* Top-right finder */}
                  <rect x="62" y="10" width="28" height="28" rx="3" stroke="#0F6E56" strokeWidth="5" fill="none"/>
                  <rect x="69" y="17" width="14" height="14" rx="1.5" fill="#0F6E56"/>
                  {/* Bottom-left finder */}
                  <rect x="10" y="62" width="28" height="28" rx="3" stroke="#0F6E56" strokeWidth="5" fill="none"/>
                  <rect x="17" y="69" width="14" height="14" rx="1.5" fill="#0F6E56"/>
                  {/* Data dots */}
                  {[48,55,62,48,62,55,48,62].map((x, i) => (
                    <rect key={i} x={x} y={[48,48,48,55,55,62,62,62][i]} width="5" height="5" rx="1" fill="#1C1B18"/>
                  ))}
                </svg>
              </div>

              <div>
                <p className="text-xs text-muted">QR valid for this session · powered by Squad</p>
              </div>

              <button className="btn-ghost px-5 py-2 text-sm gap-2 w-full">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Save QR image
              </button>
            </div>

            {/* Account number card */}
            <div className="card p-5 flex flex-col gap-4">
              <p className="text-xs text-muted uppercase tracking-wide font-medium">Bank transfer details</p>
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between p-3 rounded-xl" style={{ background: "#F4F3EE" }}>
                  <div>
                    <p className="text-xs text-muted">Account number</p>
                    <p className="text-xl font-bold tracking-widest mt-0.5" style={{ color: "#1C1B18", letterSpacing: "0.1em" }}>{nuban}</p>
                  </div>
                  <button
                    onClick={copyNuban}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                    style={{
                      background: copied ? "#E8F5F0" : "#ffffff",
                      color: copied ? "#0F6E56" : "#5C5A54",
                      border: "1px solid #E8E6DF",
                    }}
                  >
                    {copied ? (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    ) : (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                    )}
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl" style={{ background: "#F4F3EE" }}>
                    <p className="text-xs text-muted">Bank</p>
                    <p className="text-sm font-medium mt-0.5" style={{ color: "#1C1B18" }}>{bankName}</p>
                  </div>
                  <div className="p-3 rounded-xl" style={{ background: "#F4F3EE" }}>
                    <p className="text-xs text-muted">Account name</p>
                    <p className="text-sm font-medium mt-0.5" style={{ color: "#1C1B18" }}>{accountName}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: payment link + request amount */}
          <div className="flex flex-col gap-5">

            {/* Payment link */}
            <div className="card p-5 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#E8F5F0" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0F6E56" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold">Payment link</p>
                  <p className="text-xs text-muted">No app required · works on WhatsApp</p>
                </div>
              </div>

              <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl" style={{ background: "#F4F3EE", border: "1px solid #E8E6DF" }}>
                <span className="text-xs text-muted flex-1 truncate">{paymentLink}</span>
                <button
                  onClick={copyLink}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium flex-shrink-0 transition-all"
                  style={{
                    background: linkCopied ? "#E8F5F0" : "#ffffff",
                    color: linkCopied ? "#0F6E56" : "#5C5A54",
                    border: "1px solid #E8E6DF",
                  }}
                >
                  {linkCopied ? "Copied!" : "Copy link"}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button className="btn-ghost py-2.5 text-sm gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/>
                  </svg>
                  Share
                </button>
                <button className="btn-ghost py-2.5 text-sm gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="3" height="3"/>
                  </svg>
                  QR
                </button>
              </div>
            </div>

            {/* Request specific amount */}
            <div className="card p-5 flex flex-col gap-4">
              <div>
                <p className="text-sm font-semibold">Request a specific amount</p>
                <p className="text-xs text-muted mt-0.5">Generate a link pre-filled with amount</p>
              </div>
              <div>
                <label className="text-xs text-muted block mb-1.5">Amount (₦)</label>
                <div className="flex items-center gap-2 px-4 py-3 rounded-xl" style={{ border: "1.5px solid #E8E6DF", background: "#fff" }}>
                  <span className="text-lg font-semibold" style={{ color: "#9E9B92" }}>₦</span>
                  <input
                    type="number"
                    placeholder="0.00"
                    className="flex-1 outline-none text-xl font-semibold bg-transparent"
                    style={{ color: "#1C1B18" }}
                  />
                </div>
              </div>
              <div>
                <label className="text-xs text-muted block mb-1.5">Note (optional)</label>
                <input
                  type="text"
                  placeholder="e.g. For fabric order #22"
                  className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                  style={{ border: "1.5px solid #E8E6DF", background: "#fff", color: "#1C1B18" }}
                />
              </div>
              <button className="btn-primary py-3 text-sm">Generate payment request</button>
            </div>

            {/* Recent received */}
            <div className="card p-5 flex flex-col gap-3">
              <p className="text-xs text-muted uppercase tracking-wide font-medium">Recently received</p>
              {[
                { name: "Emeka Okafor", amount: "+₦8,500", time: "Today, 10:22 AM", initials: "EO" },
                { name: "Ngozi Eze", amount: "+₦32,000", time: "Sat, 1:00 PM", initials: "NE" },
                { name: "Fatima Aliyu", amount: "+₦2,200", time: "Yesterday, 2:15 PM", initials: "FA" },
              ].map((r) => (
                <div key={r.name} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0" style={{ background: "#E8F5F0", color: "#0F6E56" }}>
                    {r.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate" style={{ color: "#1C1B18" }}>{r.name}</p>
                    <p className="text-xs text-muted">{r.time}</p>
                  </div>
                  <p className="text-sm font-semibold" style={{ color: "#0F6E56" }}>{r.amount}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
