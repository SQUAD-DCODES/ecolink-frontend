"use client";

import Link from "next/link";
import { useState } from "react";

const categories = [
  { id: "sales", label: "Sales & Retail", icon: "🛍️" },
  { id: "delivery", label: "Delivery & Logistics", icon: "🏍️" },
  { id: "craft", label: "Craft & Artisan", icon: "🔨" },
  { id: "domestic", label: "Domestic Help", icon: "🏠" },
  { id: "food", label: "Food & Catering", icon: "🍲" },
  { id: "admin", label: "Admin & Counting", icon: "📋" },
];

const skillOptions = ["Sales", "Customer service", "Numeracy", "Delivery", "Carpentry", "Sewing", "Cooking", "Cleaning", "Loading", "Cashier", "Stacking", "Bike riding"];

export default function PostJobPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [category, setCategory] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [escrow, setEscrow] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  function toggleSkill(s: string) {
    setSelectedSkills((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : prev.length < 6 ? [...prev, s] : prev
    );
  }

  if (submitted) {
    return (
      <div style={{ background: "#FAFAF7", minHeight: "100vh" }} className="flex items-center justify-center px-6">
        <div className="flex flex-col items-center text-center gap-6 max-w-sm">
          <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ background: "#E8F5F0" }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#0F6E56" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-semibold" style={{ letterSpacing: "-0.02em" }}>Job posted!</h2>
            <p className="text-sm text-muted mt-2 leading-relaxed">Your gig is live. Workers in your area will be notified. Escrow funds are locked until you confirm completion.</p>
          </div>
          <div className="card p-4 w-full text-left flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted">Status</span>
              <span className="badge-green">Live · accepting applicants</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted">Escrow</span>
              <span className="text-sm font-medium" style={{ color: "#0F6E56" }}>Locked · ₦5,000</span>
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <Link href="/jobs/mine" className="btn-primary py-3 text-sm w-full">View my jobs</Link>
            <Link href="/jobs" className="btn-ghost py-3 text-sm w-full">Browse gigs</Link>
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
          <Link href="/jobs" className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "#F4F3EE", color: "#5C5A54" }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          </Link>
          <div className="flex-1">
            <h1 className="text-lg font-semibold" style={{ letterSpacing: "-0.02em" }}>Post a job</h1>
            <p className="text-xs text-muted">Step {step} of 3</p>
          </div>
          {/* progress */}
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

        {/* Step 1 — Job basics */}
        {step === 1 && (
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-xl font-semibold mb-1" style={{ letterSpacing: "-0.02em" }}>Job basics</h2>
              <p className="text-sm text-muted">Tell workers what you need help with.</p>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <label className="text-sm font-medium block mb-1.5">Job title <span style={{ color: "#E05A34" }}>*</span></label>
                <input
                  type="text"
                  placeholder="e.g. Market stall assistant for 3 days"
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={{ border: "1.5px solid #E8E6DF", background: "#fff", color: "#1C1B18" }}
                />
              </div>

              <div>
                <label className="text-sm font-medium block mb-2">Category <span style={{ color: "#E05A34" }}>*</span></label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {categories.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setCategory(c.id)}
                      className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm text-left transition-all"
                      style={{
                        background: category === c.id ? "#E8F5F0" : "#fff",
                        border: `1.5px solid ${category === c.id ? "#0F6E56" : "#E8E6DF"}`,
                        color: category === c.id ? "#0F6E56" : "#1C1B18",
                        fontWeight: category === c.id ? 600 : 400,
                      }}
                    >
                      <span>{c.icon}</span>
                      <span>{c.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium block mb-1.5">Job description</label>
                <textarea
                  rows={4}
                  placeholder="Describe what the person will be doing, any requirements, working hours…"
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                  style={{ border: "1.5px solid #E8E6DF", background: "#fff", color: "#1C1B18" }}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium block mb-1.5">Location <span style={{ color: "#E05A34" }}>*</span></label>
                  <input
                    type="text"
                    placeholder="e.g. Bodija Market"
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                    style={{ border: "1.5px solid #E8E6DF", background: "#fff", color: "#1C1B18" }}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-1.5">Duration <span style={{ color: "#E05A34" }}>*</span></label>
                  <select
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none appearance-none"
                    style={{ border: "1.5px solid #E8E6DF", background: "#fff", color: "#1C1B18" }}
                  >
                    <option>One-off</option>
                    <option>1 day</option>
                    <option>2–3 days</option>
                    <option>1 week</option>
                    <option>2 weeks</option>
                    <option>1 month+</option>
                  </select>
                </div>
              </div>
            </div>

            <button onClick={() => setStep(2)} className="btn-primary py-3.5 text-sm">Continue</button>
          </div>
        )}

        {/* Step 2 — Pay + skills */}
        {step === 2 && (
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-xl font-semibold mb-1" style={{ letterSpacing: "-0.02em" }}>Pay &amp; skills</h2>
              <p className="text-sm text-muted">Set what you'll pay and who you're looking for.</p>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <label className="text-sm font-medium block mb-1.5">Pay amount <span style={{ color: "#E05A34" }}>*</span></label>
                <div className="flex items-center gap-2 px-4 py-3 rounded-xl" style={{ border: "1.5px solid #E8E6DF", background: "#fff" }}>
                  <span className="text-lg font-semibold" style={{ color: "#9E9B92" }}>₦</span>
                  <input
                    type="number"
                    placeholder="0.00"
                    className="flex-1 outline-none text-xl font-semibold bg-transparent"
                    style={{ color: "#1C1B18" }}
                  />
                  <select
                    className="text-xs outline-none border-0 bg-transparent"
                    style={{ color: "#5C5A54" }}
                  >
                    <option>total</option>
                    <option>/day</option>
                    <option>/hour</option>
                  </select>
                </div>
              </div>

              {/* Escrow toggle */}
              <div className="card p-4 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "#E8F5F0" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0F6E56" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Squad Escrow protection</p>
                  <p className="text-xs text-muted">Payment locked until you confirm job done</p>
                </div>
                <button
                  onClick={() => setEscrow((e) => !e)}
                  className="relative w-11 h-6 rounded-full flex-shrink-0 transition-colors"
                  style={{ background: escrow ? "#0F6E56" : "#D2CFC5" }}
                >
                  <span
                    className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform"
                    style={{ transform: escrow ? "translateX(22px)" : "translateX(2px)" }}
                  />
                </button>
              </div>

              <div>
                <label className="text-sm font-medium block mb-2">Required skills <span className="text-muted font-normal">(up to 6)</span></label>
                <div className="flex flex-wrap gap-2">
                  {skillOptions.map((s) => (
                    <button
                      key={s}
                      onClick={() => toggleSkill(s)}
                      className="px-3 py-1.5 rounded-full text-xs font-medium transition-all"
                      style={{
                        background: selectedSkills.includes(s) ? "#0F6E56" : "#fff",
                        color: selectedSkills.includes(s) ? "#fff" : "#5C5A54",
                        border: `1px solid ${selectedSkills.includes(s) ? "#0F6E56" : "#E8E6DF"}`,
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium block mb-1.5">Number of workers needed</label>
                <div className="flex items-center gap-3">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      className="w-10 h-10 rounded-xl text-sm font-semibold transition-all"
                      style={{ background: n === 1 ? "#0F6E56" : "#fff", color: n === 1 ? "#fff" : "#1C1B18", border: n === 1 ? "none" : "1px solid #E8E6DF" }}
                    >
                      {n}
                    </button>
                  ))}
                  <span className="text-sm text-muted">or more</span>
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
              <h2 className="text-xl font-semibold mb-1" style={{ letterSpacing: "-0.02em" }}>Review &amp; post</h2>
              <p className="text-sm text-muted">Confirm before your gig goes live.</p>
            </div>

            <div className="card p-5 flex flex-col gap-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-base font-semibold" style={{ color: "#1C1B18" }}>Market stall assistant</h3>
                  <p className="text-xs text-muted mt-0.5">Bodija Market · 3 days</p>
                </div>
                <span className="badge-green">Escrow</span>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {selectedSkills.slice(0, 4).map((s) => (
                  <span key={s} className="text-xs px-2 py-0.5 rounded-full" style={{ background: "#F4F3EE", color: "#5C5A54" }}>{s}</span>
                ))}
              </div>
              <div style={{ borderTop: "1px solid #F4F3EE" }} className="pt-3 grid grid-cols-3 gap-3">
                <div>
                  <p className="text-xs text-muted">Pay</p>
                  <p className="text-sm font-semibold mt-0.5" style={{ color: "#0F6E56" }}>₦3,500/day</p>
                </div>
                <div>
                  <p className="text-xs text-muted">Workers</p>
                  <p className="text-sm font-semibold mt-0.5">1 person</p>
                </div>
                <div>
                  <p className="text-xs text-muted">Escrow hold</p>
                  <p className="text-sm font-semibold mt-0.5">₦10,500</p>
                </div>
              </div>
            </div>

            <div className="rounded-xl p-4 flex items-start gap-3" style={{ background: "#FEF6E4", border: "1px solid #F9DC8A" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9A6A05" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}>
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <p className="text-xs" style={{ color: "#9A6A05", lineHeight: 1.6 }}>
                Posting locks <strong>₦10,500</strong> in Squad Escrow. Funds are released to the worker only after you mark the job complete.
              </p>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(2)} className="btn-ghost flex-1 py-3.5 text-sm">Back</button>
              <button onClick={() => setSubmitted(true)} className="btn-primary flex-1 py-3.5 text-sm">Post job · lock escrow</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
