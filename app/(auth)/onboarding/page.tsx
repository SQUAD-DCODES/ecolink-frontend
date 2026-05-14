"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { authAPI } from "@/lib/api";
import { useAuth } from "@/lib/auth";

const skills = ["Sales & trading", "Delivery / logistics", "Carpentry", "Tailoring / sewing", "Cooking / catering", "Electrical work", "Plumbing", "Phone repairs", "Farming", "Cleaning", "Security / watchman", "Teaching / tutoring"];

export default function OnboardingPage() {
  const router = useRouter();
  const { refresh } = useAuth();
  const [step, setStep] = useState(0);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [pinStep, setPinStep] = useState<"set" | "confirm">("set");
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [pinError, setPinError] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function toggleSkill(s: string) {
    setSelectedSkills((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : prev.length < 5 ? [...prev, s] : prev
    );
  }

  function handlePinKey(k: string) {
    if (pinStep === "set") {
      if (k === "⌫") setPin((p) => p.slice(0,-1));
      else if (pin.length < 4) {
        const next = pin + k;
        setPin(next);
        if (next.length === 4) setPinStep("confirm");
      }
    } else {
      if (k === "⌫") { setConfirmPin((p) => p.slice(0,-1)); setPinError(""); }
      else if (confirmPin.length < 4) {
        const next = confirmPin + k;
        setConfirmPin(next);
        if (next.length === 4) {
          if (next !== pin) {
            setPinError("PINs don't match. Try again.");
            setConfirmPin("");
          }
        }
      }
    }
  }

  async function handleSetPin() {
    setLoading(true);
    setError("");
    try {
      await authAPI.setupPin({ pin, skills: selectedSkills });
      await refresh();
      setStep(2);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to set PIN. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const currentPin = pinStep === "set" ? pin : confirmPin;

  const steps = [
    { title: "Pick your skills", subtitle: "Select up to 5. This powers your AI job matching." },
    { title: "Set your PIN", subtitle: "You'll use this to sign in. Don't share it with anyone." },
    { title: "You're all set!", subtitle: "Your EcoLink account and Squad virtual account are ready." },
  ];

  return (
    <div className="min-h-screen" style={{ background: "#FAFAF7" }}>
      <div className="max-w-lg mx-auto px-6 py-10">

        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "#E8F5F0" }}>
              <Image src="/Eco.png" alt="EcoLink" width={26} height={26} style={{ objectFit: "contain" }} />
            </div>
            <span className="font-semibold tracking-tight" style={{ color: "#1C1B18" }}>EcoLink</span>
          </div>
          <span className="text-xs text-muted">{step + 1} of 3</span>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 rounded-full mb-8" style={{ background: "#E8E6DF" }}>
          <div className="h-1.5 rounded-full" style={{ width: `${((step+1)/3)*100}%`, background: "#0F6E56", transition: "width 0.4s ease" }}/>
        </div>

        <h1 className="text-2xl font-semibold mb-1" style={{ letterSpacing: "-0.02em" }}>{steps[step].title}</h1>
        <p className="text-sm text-muted mb-8">{steps[step].subtitle}</p>

        {error && (
          <div className="mb-4 px-4 py-3 rounded-xl text-sm" style={{ background: "#FEF0EC", color: "#A33E22", border: "1px solid #E8775A" }}>
            {error}
          </div>
        )}

        {/* Step 0: Skills */}
        {step === 0 && (
          <>
            <div className="flex flex-wrap gap-2 mb-8">
              {skills.map((s) => {
                const active = selectedSkills.includes(s);
                return (
                  <button
                    key={s}
                    onClick={() => toggleSkill(s)}
                    className="px-4 py-2 rounded-full text-sm font-medium"
                    style={{
                      background: active ? "#0F6E56" : "#fff",
                      color: active ? "#fff" : "#5C5A54",
                      border: `1.5px solid ${active ? "#0F6E56" : "#E8E6DF"}`,
                    }}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
            <p className="text-xs text-muted mb-6">{selectedSkills.length}/5 selected</p>
            <button
              onClick={() => setStep(1)}
              disabled={selectedSkills.length === 0}
              className="btn-primary w-full py-3 text-sm"
              style={{ opacity: selectedSkills.length === 0 ? 0.5 : 1 }}
            >
              Continue
            </button>
          </>
        )}

        {/* Step 1: PIN */}
        {step === 1 && (
          <div className="flex flex-col items-center gap-6">
            <div className="text-center">
              <p className="text-sm font-medium mb-4" style={{ color: pinStep === "confirm" ? "#9A6A05" : "#1C1B18" }}>
                {pinStep === "set" ? "Choose a 4-digit PIN" : "Re-enter your PIN to confirm"}
              </p>
              <div className="flex gap-3 justify-center">
                {[0,1,2,3].map((i) => (
                  <div
                    key={i}
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl font-bold"
                    style={{
                      border: `2px solid ${i < currentPin.length ? "#0F6E56" : "#E8E6DF"}`,
                      background: i < currentPin.length ? "#E8F5F0" : "#fff",
                      color: "#0F6E56",
                    }}
                  >
                    {i < currentPin.length ? "•" : ""}
                  </div>
                ))}
              </div>
              {pinError && <p className="text-xs mt-3" style={{ color: "#A33E22" }}>{pinError}</p>}
            </div>

            <div className="grid grid-cols-3 gap-3 w-full max-w-xs">
              {["1","2","3","4","5","6","7","8","9","","0","⌫"].map((k) => (
                <button
                  key={k}
                  type="button"
                  disabled={k === ""}
                  onClick={() => handlePinKey(k)}
                  className="h-14 rounded-xl text-lg font-medium flex items-center justify-center"
                  style={{
                    background: k === "" ? "transparent" : "#fff",
                    border: k === "" ? "none" : "1px solid #E8E6DF",
                    color: "#1C1B18",
                    cursor: k === "" ? "default" : "pointer",
                  }}
                >
                  {k}
                </button>
              ))}
            </div>

            {confirmPin.length === 4 && confirmPin === pin && (
              <button
                onClick={handleSetPin}
                disabled={loading}
                className="btn-primary w-full max-w-xs py-3 text-sm"
              >
                {loading ? "Setting up…" : "Set PIN & continue"}
              </button>
            )}
          </div>
        )}

        {/* Step 2: Done */}
        {step === 2 && (
          <div className="flex flex-col gap-6">
            <div className="card p-5 flex items-start gap-4" style={{ borderLeft: "3px solid #0F6E56" }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "#E8F5F0" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0F6E56" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="20" height="14" rx="2"/><path d="M16 12h.01"/>
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold">Account created successfully</p>
                <p className="text-xs text-muted mt-0.5">Your EcoLink profile is ready</p>
                <p className="text-xs mt-1" style={{ color: "#0F6E56" }}>Complete KYC to unlock your Squad virtual account</p>
              </div>
            </div>

            <div className="card p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "#FEF6E4" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9A6A05" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a3 3 0 0 1 3 3v7a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3z"/>
                  <path d="M19 10a7 7 0 0 1-14 0"/>
                  <line x1="12" y1="19" x2="12" y2="22"/>
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold">Reputation profile ready</p>
                <p className="text-xs text-muted mt-0.5">Ask someone who knows you to leave a voice vouch</p>
              </div>
            </div>

            <div className="card p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "#F4F3EE" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5C5A54" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="2"/>
                  <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold">Job matches loading</p>
                <p className="text-xs text-muted mt-0.5">Based on your skills and location</p>
              </div>
            </div>

            <button onClick={() => router.push("/")} className="btn-primary w-full py-3 text-sm mt-2">
              Go to my dashboard →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}