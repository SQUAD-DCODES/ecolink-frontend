"use client";

import Link from "next/link";
import { useState } from "react";

type Step = 1 | 2 | 3;
type DocType = "nin" | "bvn" | "intl_passport" | "drivers";

const docTypes: { id: DocType; label: string; sub: string }[] = [
  { id: "nin",          label: "National ID (NIN)", sub: "National Identification Number" },
  { id: "bvn",          label: "BVN",               sub: "Bank Verification Number" },
  { id: "intl_passport", label: "Int'l Passport",    sub: "Valid passport" },
  { id: "drivers",      label: "Driver's License",  sub: "FRSC-issued license" },
];

export default function KYCPage() {
  const [step, setStep] = useState<Step>(1);
  const [docType, setDocType] = useState<DocType>("nin");
  const [docUploaded, setDocUploaded] = useState(false);
  const [selfieUploaded, setSelfieUploaded] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div style={{ background: "#FAFAF7", minHeight: "100vh" }} className="flex items-center justify-center px-6">
        <div className="flex flex-col items-center text-center gap-6 max-w-sm">
          <div className="w-20 h-20 rounded-full flex items-center justify-center" style={{ background: "#FEF6E4" }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#9A6A05" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-semibold" style={{ letterSpacing: "-0.02em" }}>KYC under review</h2>
            <p className="text-sm text-muted mt-2 leading-relaxed">Your documents have been submitted. Verification usually takes 1–2 business days. We'll notify you via SMS when approved.</p>
          </div>
          <div className="card p-4 w-full flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted">Document type</span>
              <span className="text-sm font-medium">National ID (NIN)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted">Status</span>
              <span className="badge-amber">Pending review</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted">Submitted</span>
              <span className="text-sm font-medium">May 13, 2025</span>
            </div>
          </div>
          <Link href="/profile" className="btn-primary px-8 py-3 text-sm w-full">Back to profile</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "#FAFAF7", minHeight: "100vh" }}>

      {/* Header */}
      <header style={{ background: "#ffffff", borderBottom: "1px solid #E8E6DF", minHeight: "64px" }}>
        <div className="flex items-center gap-3 px-6 h-16" style={{ maxWidth: "720px", margin: "0 auto" }}>
          <Link href="/profile" className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "#F4F3EE", color: "#5C5A54" }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          </Link>
          <div className="flex-1">
            <h1 className="text-lg font-semibold" style={{ letterSpacing: "-0.02em" }}>Identity verification</h1>
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

        {/* Why KYC */}
        {step === 1 && (
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-xl font-semibold mb-1" style={{ letterSpacing: "-0.02em" }}>Verify your identity</h2>
              <p className="text-sm text-muted">Required to unlock higher wallet limits, escrow, and credit.</p>
            </div>

            {/* Benefits */}
            <div className="flex flex-col gap-3">
              {[
                { icon: "💳", title: "Wallet limit ₦200,000+", sub: "Unverified accounts are capped at ₦50,000" },
                { icon: "🔒", title: "Escrow protection",       sub: "Lock and release payments for gigs" },
                { icon: "🏦", title: "Micro-loan access",       sub: "Apply for credit from EcoLink partners" },
                { icon: "⭐", title: "Boosted trust score",     sub: "Verified badge adds +80 points" },
              ].map((b) => (
                <div key={b.title} className="card p-4 flex items-center gap-3">
                  <span className="text-2xl">{b.icon}</span>
                  <div>
                    <p className="text-sm font-medium">{b.title}</p>
                    <p className="text-xs text-muted">{b.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-xl p-4 flex items-start gap-3" style={{ background: "#E8F5F0", border: "1px solid #C3E6D8" }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0F6E56" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}>
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              <p className="text-xs" style={{ color: "#0F6E56", lineHeight: 1.6 }}>
                Your documents are encrypted and processed securely. EcoLink only stores the verification result — never your raw ID images.
              </p>
            </div>

            <button onClick={() => setStep(2)} className="btn-primary py-3.5 text-sm">Start verification</button>
          </div>
        )}

        {/* Step 2: document upload */}
        {step === 2 && (
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-xl font-semibold mb-1" style={{ letterSpacing: "-0.02em" }}>Government ID</h2>
              <p className="text-sm text-muted">Upload a clear photo of your ID document.</p>
            </div>

            {/* Doc type selector */}
            <div>
              <label className="text-sm font-medium block mb-2">Document type</label>
              <div className="grid grid-cols-2 gap-2">
                {docTypes.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => setDocType(d.id)}
                    className="flex flex-col items-start px-4 py-3 rounded-xl text-left transition-all"
                    style={{
                      background: docType === d.id ? "#E8F5F0" : "#fff",
                      border: `1.5px solid ${docType === d.id ? "#0F6E56" : "#E8E6DF"}`,
                    }}
                  >
                    <span className="text-sm font-semibold" style={{ color: docType === d.id ? "#0F6E56" : "#1C1B18" }}>{d.label}</span>
                    <span className="text-xs text-muted">{d.sub}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Document number */}
            <div>
              <label className="text-sm font-medium block mb-1.5">
                {docType === "bvn" ? "BVN" : docType === "nin" ? "NIN" : "Document number"} <span style={{ color: "#E05A34" }}>*</span>
              </label>
              <input
                type="text"
                placeholder={docType === "bvn" ? "Enter 11-digit BVN" : docType === "nin" ? "Enter 11-digit NIN" : "Enter document number"}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none tracking-widest font-mono"
                style={{ border: "1.5px solid #E8E6DF", background: "#fff", color: "#1C1B18" }}
              />
            </div>

            {/* Upload area */}
            <div>
              <label className="text-sm font-medium block mb-2">Upload document photo</label>
              <button
                onClick={() => setDocUploaded(true)}
                className="w-full rounded-2xl flex flex-col items-center justify-center gap-3 py-10 transition-all"
                style={{
                  border: `2px dashed ${docUploaded ? "#0F6E56" : "#D2CFC5"}`,
                  background: docUploaded ? "#E8F5F0" : "#fff",
                }}
              >
                {docUploaded ? (
                  <>
                    <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "#0F6E56" }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </div>
                    <p className="text-sm font-medium" style={{ color: "#0F6E56" }}>Document uploaded</p>
                  </>
                ) : (
                  <>
                    <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "#F4F3EE" }}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#9E9B92" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
                      </svg>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium">Tap to upload</p>
                      <p className="text-xs text-muted">PNG, JPG up to 5MB · must be clear and not blurry</p>
                    </div>
                  </>
                )}
              </button>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="btn-ghost flex-1 py-3.5 text-sm">Back</button>
              <button
                onClick={() => docUploaded && setStep(3)}
                className="btn-primary flex-1 py-3.5 text-sm"
                style={{ opacity: docUploaded ? 1 : 0.5 }}
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Step 3: selfie */}
        {step === 3 && (
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-xl font-semibold mb-1" style={{ letterSpacing: "-0.02em" }}>Take a selfie</h2>
              <p className="text-sm text-muted">A photo of your face to match against your ID document.</p>
            </div>

            {/* Selfie tips */}
            <div className="card p-4 flex flex-col gap-3">
              <p className="text-xs text-muted uppercase tracking-wide font-medium">Tips for a good selfie</p>
              {[
                "Face the camera directly, don't angle away",
                "Good lighting — avoid harsh shadows",
                "No glasses, hats, or face coverings",
                "Neutral expression — don't smile too wide",
              ].map((tip) => (
                <div key={tip} className="flex items-center gap-2">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0F6E56" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <p className="text-xs" style={{ color: "#5C5A54" }}>{tip}</p>
                </div>
              ))}
            </div>

            {/* Camera placeholder */}
            <button
              onClick={() => setSelfieUploaded(true)}
              className="w-full rounded-2xl flex flex-col items-center justify-center gap-3 py-12 transition-all"
              style={{
                border: `2px dashed ${selfieUploaded ? "#0F6E56" : "#D2CFC5"}`,
                background: selfieUploaded ? "#E8F5F0" : "#fff",
              }}
            >
              {selfieUploaded ? (
                <>
                  <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: "#0F6E56" }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  <p className="text-sm font-medium" style={{ color: "#0F6E56" }}>Selfie captured</p>
                </>
              ) : (
                <>
                  {/* Face outline */}
                  <div className="relative w-24 h-24">
                    <div className="w-24 h-24 rounded-full" style={{ border: "2px dashed #9E9B92" }}/>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#9E9B92" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}>
                      <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.58-7 8-7s8 3 8 7"/>
                    </svg>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium">Tap to open camera</p>
                    <p className="text-xs text-muted">Or upload from gallery</p>
                  </div>
                </>
              )}
            </button>

            <div className="flex gap-3">
              <button onClick={() => setStep(2)} className="btn-ghost flex-1 py-3.5 text-sm">Back</button>
              <button
                onClick={() => selfieUploaded && setSubmitted(true)}
                className="btn-primary flex-1 py-3.5 text-sm"
                style={{ opacity: selfieUploaded ? 1 : 0.5 }}
              >
                Submit for review
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
