"use client";

import Link from "next/link";
import { useState } from "react";

const frequencies = [
  { id: "daily",    label: "Daily",   sub: "Every day" },
  { id: "weekly",   label: "Weekly",  sub: "Every week" },
  { id: "biweekly", label: "Bi-weekly", sub: "Every 2 weeks" },
  { id: "monthly",  label: "Monthly", sub: "Once a month" },
];

const payoutOrders = [
  { id: "rotation", label: "Round-robin rotation", sub: "Each member gets a turn in order" },
  { id: "random",   label: "Random ballot", sub: "Lucky draw each cycle" },
  { id: "need",     label: "Need-based vote", sub: "Group votes on who needs it most" },
];

export default function CreateGroupPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [frequency, setFrequency] = useState("monthly");
  const [payoutOrder, setPayoutOrder] = useState("rotation");
  const [created, setCreated] = useState(false);

  if (created) {
    return (
      <div style={{ background: "#FAFAF7", minHeight: "100vh" }} className="flex items-center justify-center px-6">
        <div className="flex flex-col items-center text-center gap-6 max-w-sm">
          <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ background: "#E8F5F0" }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#0F6E56" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-semibold" style={{ letterSpacing: "-0.02em" }}>Ajo group created!</h2>
            <p className="text-sm text-muted mt-2 leading-relaxed">Your savings circle is live. Share the invite link with members to get started.</p>
          </div>
          <div className="card p-4 w-full flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted">Group name</span>
              <span className="text-sm font-medium">Bodija Traders Circle</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted">Contribution</span>
              <span className="text-sm font-medium">₦5,000 / monthly</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted">Invite code</span>
              <span className="text-sm font-semibold" style={{ color: "#0F6E56" }}>AJO-B7K2</span>
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <Link href="/savings" className="btn-primary py-3 text-sm w-full">Go to savings</Link>
            <button className="btn-ghost py-3 text-sm w-full gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/>
              </svg>
              Share invite link
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "#FAFAF7", minHeight: "100vh" }}>

      {/* Header */}
      <header style={{ background: "#ffffff", borderBottom: "1px solid #E8E6DF", minHeight: "64px" }}>
        <div className="flex items-center gap-3 px-6 h-16" style={{ maxWidth: "720px", margin: "0 auto" }}>
          <Link href="/savings" className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "#F4F3EE", color: "#5C5A54" }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          </Link>
          <div className="flex-1">
            <h1 className="text-lg font-semibold" style={{ letterSpacing: "-0.02em" }}>Create Ajo group</h1>
            <p className="text-xs text-muted">Step {step} of 3</p>
          </div>
          <div className="flex items-center gap-1.5">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className="rounded-full transition-all"
                style={{
                  width: s === step ? 24 : 8,
                  height: 8,
                  background: s <= step ? "#0F6E56" : "#E8E6DF",
                }}
              />
            ))}
          </div>
        </div>
      </header>

      <div className="px-6 py-8" style={{ maxWidth: "720px", margin: "0 auto" }}>

        {/* Step 1 — Group basics */}
        {step === 1 && (
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-xl font-semibold mb-1" style={{ letterSpacing: "-0.02em" }}>Group basics</h2>
              <p className="text-sm text-muted">Name your circle and set a group description.</p>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <label className="text-sm font-medium block mb-1.5">Group name <span style={{ color: "#E05A34" }}>*</span></label>
                <input
                  type="text"
                  placeholder="e.g. Bodija Traders Circle"
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={{ border: "1.5px solid #E8E6DF", background: "#fff", color: "#1C1B18" }}
                />
              </div>

              <div>
                <label className="text-sm font-medium block mb-1.5">Description</label>
                <textarea
                  rows={3}
                  placeholder="What is this group saving for?"
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                  style={{ border: "1.5px solid #E8E6DF", background: "#fff", color: "#1C1B18" }}
                />
              </div>

              <div>
                <label className="text-sm font-medium block mb-1.5">Maximum members</label>
                <div className="flex items-center gap-3">
                  {[4, 6, 8, 10, 12].map((n) => (
                    <button
                      key={n}
                      className="w-12 h-12 rounded-xl text-sm font-semibold transition-all"
                      style={{
                        background: n === 6 ? "#0F6E56" : "#fff",
                        color: n === 6 ? "#fff" : "#1C1B18",
                        border: n === 6 ? "none" : "1px solid #E8E6DF",
                      }}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium block mb-2">Contribution frequency</label>
                <div className="grid grid-cols-2 gap-2">
                  {frequencies.map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setFrequency(f.id)}
                      className="flex flex-col items-start px-4 py-3 rounded-xl text-left transition-all"
                      style={{
                        background: frequency === f.id ? "#E8F5F0" : "#fff",
                        border: `1.5px solid ${frequency === f.id ? "#0F6E56" : "#E8E6DF"}`,
                      }}
                    >
                      <span className="text-sm font-semibold" style={{ color: frequency === f.id ? "#0F6E56" : "#1C1B18" }}>{f.label}</span>
                      <span className="text-xs text-muted">{f.sub}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button onClick={() => setStep(2)} className="btn-primary py-3.5 text-sm">Continue</button>
          </div>
        )}

        {/* Step 2 — Contribution amount + rules */}
        {step === 2 && (
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-xl font-semibold mb-1" style={{ letterSpacing: "-0.02em" }}>Contribution &amp; rules</h2>
              <p className="text-sm text-muted">How much each member contributes and how the pot is paid out.</p>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <label className="text-sm font-medium block mb-1.5">Contribution amount per {frequency === "daily" ? "day" : frequency === "weekly" ? "week" : frequency === "biweekly" ? "2 weeks" : "month"} <span style={{ color: "#E05A34" }}>*</span></label>
                <div className="flex items-center gap-2 px-4 py-3 rounded-xl" style={{ border: "1.5px solid #E8E6DF", background: "#fff" }}>
                  <span className="text-lg font-semibold" style={{ color: "#9E9B92" }}>₦</span>
                  <input
                    type="number"
                    placeholder="0.00"
                    className="flex-1 outline-none text-xl font-semibold bg-transparent"
                    style={{ color: "#1C1B18" }}
                  />
                </div>
                <p className="text-xs text-muted mt-1.5">With 6 members — pot will be <strong>₦30,000</strong> per cycle</p>
              </div>

              <div>
                <label className="text-sm font-medium block mb-2">Payout order</label>
                <div className="flex flex-col gap-2">
                  {payoutOrders.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setPayoutOrder(p.id)}
                      className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-left transition-all"
                      style={{
                        background: payoutOrder === p.id ? "#E8F5F0" : "#fff",
                        border: `1.5px solid ${payoutOrder === p.id ? "#0F6E56" : "#E8E6DF"}`,
                      }}
                    >
                      <div
                        className="w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center"
                        style={{ border: `2px solid ${payoutOrder === p.id ? "#0F6E56" : "#D2CFC5"}` }}
                      >
                        {payoutOrder === p.id && <div className="w-2 h-2 rounded-full" style={{ background: "#0F6E56" }}/>}
                      </div>
                      <div>
                        <p className="text-sm font-medium" style={{ color: payoutOrder === p.id ? "#0F6E56" : "#1C1B18" }}>{p.label}</p>
                        <p className="text-xs text-muted">{p.sub}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Late payment rule */}
              <div className="card p-4 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "#FEF0EC" }}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#A33E22" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium">Late payment rule</p>
                  <p className="text-xs text-muted mt-0.5 leading-relaxed">Members who miss a contribution are skipped in the payout rotation that cycle. EcoLink will send automated reminders 2 days before due date.</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="btn-ghost flex-1 py-3.5 text-sm">Back</button>
              <button onClick={() => setStep(3)} className="btn-primary flex-1 py-3.5 text-sm">Continue</button>
            </div>
          </div>
        )}

        {/* Step 3 — Review */}
        {step === 3 && (
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-xl font-semibold mb-1" style={{ letterSpacing: "-0.02em" }}>Review &amp; create</h2>
              <p className="text-sm text-muted">Confirm your group settings before inviting members.</p>
            </div>

            <div className="card p-5 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold">Bodija Traders Circle</h3>
                <span className="badge-green">Ajo group</span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                {[
                  { label: "Max members",   value: "6 people" },
                  { label: "Frequency",     value: "Monthly" },
                  { label: "Contribution",  value: "₦5,000 / cycle" },
                  { label: "Pot value",     value: "₦30,000" },
                  { label: "Payout order",  value: "Round-robin" },
                  { label: "First payout",  value: "Jun 13, 2025" },
                ].map((r) => (
                  <div key={r.label} className="p-3 rounded-xl" style={{ background: "#F4F3EE" }}>
                    <p className="text-xs text-muted">{r.label}</p>
                    <p className="text-sm font-semibold mt-0.5">{r.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl p-4 flex items-start gap-3" style={{ background: "#E8F5F0", border: "1px solid #C3E6D8" }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0F6E56" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}>
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              <p className="text-xs" style={{ color: "#0F6E56", lineHeight: 1.6 }}>
                All contributions are held in <strong>Squad virtual accounts</strong>. Funds are only disbursed on the confirmed payout date and cannot be withdrawn by the organiser.
              </p>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(2)} className="btn-ghost flex-1 py-3.5 text-sm">Back</button>
              <button onClick={() => setCreated(true)} className="btn-primary flex-1 py-3.5 text-sm">Create group</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
