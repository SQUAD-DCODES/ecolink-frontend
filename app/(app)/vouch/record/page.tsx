"use client";

import { useState } from "react";
import Link from "next/link";

const languages = [
  { code: "pidgin", label: "Pidgin", flag: "🇳🇬" },
  { code: "yoruba", label: "Yoruba", flag: "🇳🇬" },
  { code: "igbo",   label: "Igbo",   flag: "🇳🇬" },
  { code: "hausa",  label: "Hausa",  flag: "🇳🇬" },
  { code: "en",     label: "English", flag: "🌐" },
];

const prompts = [
  "How long have you known this person?",
  "Have they ever paid you on time?",
  "Would you trust them with a large sum?",
  "What skill or quality stands out most?",
];

const staticWave = [4,8,14,10,18,12,20,16,10,14,8,18,12,6,16,10,20,14,8,12,16,12,9,15,11,18,7,13];

type RecordState = "idle" | "recording" | "done";

export default function RecordVouchPage() {
  const [lang, setLang] = useState("pidgin");
  const [state, setState] = useState<RecordState>("idle");
  const [seconds, setSeconds] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  function handleRecord() {
    if (state === "idle") {
      setState("recording");
      const start = Date.now();
      const timer = setInterval(() => {
        const elapsed = Math.floor((Date.now() - start) / 1000);
        setSeconds(elapsed);
        if (elapsed >= 30) {
          clearInterval(timer);
          setState("done");
          setSeconds(30);
        }
      }, 250);
    } else if (state === "recording") {
      setState("done");
    }
  }

  if (submitted) {
    return (
      <div style={{ background: "#FAFAF7", minHeight: "100vh" }}>
        <header style={{ background: "#ffffff", borderBottom: "1px solid #E8E6DF", minHeight: "64px" }}>
          <div className="flex items-center gap-3 px-6 py-4" style={{ maxWidth: "1280px", margin: "0 auto" }}>
            <Link href="/profile/reputation" className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "#F4F3EE", color: "#5C5A54" }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            </Link>
            <h1 className="text-lg font-semibold">Record a vouch</h1>
          </div>
        </header>
        <div className="flex items-center justify-center px-6 py-20" style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div className="card p-12 text-center max-w-md w-full">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: "#E8F5F0" }}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#0F6E56" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>
            <h2 className="text-2xl font-semibold mb-2">Vouch submitted!</h2>
            <p className="text-sm text-muted leading-relaxed mb-8">
              Your voice note is being processed. AI will extract trust signals and update Amaka's reputation score within a few minutes.
            </p>
            <Link href="/profile/reputation" className="btn-primary w-full py-3">
              View reputation page
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const progressPct = (seconds / 30) * 100;

  return (
    <div style={{ background: "#FAFAF7", minHeight: "100vh" }}>

      {/* Top bar */}
      <header style={{ background: "#ffffff", borderBottom: "1px solid #E8E6DF", minHeight: "64px" }}>
        <div className="flex items-center justify-between px-6 h-16" style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div className="flex items-center gap-3">
            <Link href="/profile/reputation" className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "#F4F3EE", color: "#5C5A54" }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            </Link>
            <div>
              <h1 className="text-lg font-semibold" style={{ letterSpacing: "-0.02em" }}>Record a vouch</h1>
              <p className="text-xs text-muted">Vouching for Amaka Obi</p>
            </div>
          </div>
        </div>
      </header>

      <div className="px-6 py-6" style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

          {/* Left: context + prompts */}
          <div className="flex flex-col gap-5">

            {/* Subject */}
            <div className="card p-5 flex items-center gap-4">
              <div className="w-14 h-14 rounded-full flex items-center justify-center text-base font-bold text-white flex-shrink-0" style={{ background: "#0F6E56" }}>
                AO
              </div>
              <div>
                <p className="text-base font-semibold">Amaka Obi</p>
                <p className="text-sm text-muted">Market trader · Bodija, Ibadan</p>
                <p className="text-xs mt-1" style={{ color: "#0F6E56" }}>4 existing vouches · Trust score: 86</p>
              </div>
            </div>

            {/* Language selector */}
            <div className="card p-5">
              <p className="text-xs font-semibold text-muted uppercase tracking-wide mb-3">Record in</p>
              <div className="flex flex-wrap gap-2">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => setLang(l.code)}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium"
                    style={{
                      background: lang === l.code ? "#0F6E56" : "#F4F3EE",
                      color: lang === l.code ? "#fff" : "#5C5A54",
                      border: lang === l.code ? "none" : "1px solid #E8E6DF",
                    }}
                  >
                    <span>{l.flag}</span>
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Prompts */}
            <div className="card p-5">
              <p className="text-xs font-semibold text-muted uppercase tracking-wide mb-3">Suggested talking points</p>
              <div className="flex flex-col gap-2">
                {prompts.map((p) => (
                  <div key={p} className="flex items-start gap-2 p-3 rounded-xl" style={{ background: "#F4F3EE" }}>
                    <span className="text-sm font-bold mt-0.5" style={{ color: "#1D9E75" }}>·</span>
                    <p className="text-sm text-subtle">{p}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: recorder */}
          <div className="card p-8 flex flex-col items-center gap-6">
            <div className="text-center">
              <h2 className="text-base font-semibold mb-1">
                {state === "idle" && "Ready to record"}
                {state === "recording" && "Recording…"}
                {state === "done" && "Voice note captured"}
              </h2>
              <p className="text-sm text-muted">
                {state === "idle" && "Tap the mic to start. Up to 30 seconds."}
                {state === "recording" && "Tap again to stop recording early."}
                {state === "done" && "Review and submit your vouch below."}
              </p>
            </div>

            {/* Progress */}
            <div className="w-full">
              <div className="flex justify-between text-xs text-muted mb-2">
                <span>{seconds}s recorded</span>
                <span>30s max</span>
              </div>
              <div className="h-2 rounded-full w-full" style={{ background: "#F4F3EE" }}>
                <div
                  className="h-2 rounded-full"
                  style={{
                    width: `${progressPct}%`,
                    background: state === "recording" ? "#E05A34" : "#1D9E75",
                    transition: "width 0.25s linear",
                  }}
                />
              </div>
            </div>

            {/* Waveform */}
            {state !== "idle" && (
              <div className="flex items-end gap-1 w-full" style={{ height: "48px" }}>
                {staticWave.map((h, i) => {
                  const pct = (i / staticWave.length) * 100;
                  return (
                    <div key={i} className="flex-1 rounded-full" style={{
                      height: `${h * 1.5}px`,
                      background: pct <= progressPct
                        ? (state === "recording" ? "#E05A34" : "#1D9E75")
                        : "#E8E6DF",
                    }}/>
                  );
                })}
              </div>
            )}

            {/* Mic button */}
            <button
              onClick={handleRecord}
              className="w-24 h-24 rounded-full flex items-center justify-center"
              style={{
                background: state === "recording" ? "#E05A34" : "#0F6E56",
                boxShadow: state === "recording"
                  ? "0 0 0 16px rgba(224,90,52,0.1), 0 4px 20px rgba(224,90,52,0.3)"
                  : "0 4px 24px rgba(15,110,86,0.3)",
                transition: "all 0.2s ease",
              }}
            >
              {state === "done" ? (
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              ) : state === "recording" ? (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="white" stroke="none">
                  <rect x="6" y="4" width="4" height="16" rx="1"/>
                  <rect x="14" y="4" width="4" height="16" rx="1"/>
                </svg>
              ) : (
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a3 3 0 0 1 3 3v7a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3z"/>
                  <path d="M19 10a7 7 0 0 1-14 0"/>
                  <line x1="12" y1="19" x2="12" y2="22"/>
                </svg>
              )}
            </button>

            {/* Actions */}
            {state === "done" && (
              <div className="flex gap-3 w-full">
                <button
                  onClick={() => { setState("idle"); setSeconds(0); }}
                  className="btn-ghost flex-1 py-3"
                >
                  Retake
                </button>
                <button onClick={() => setSubmitted(true)} className="btn-primary flex-1 py-3">
                  Submit vouch
                </button>
              </div>
            )}

            <p className="text-xs text-muted text-center max-w-xs leading-relaxed">
              Your voice note will be transcribed and analysed by AI. Signals are extracted to build an honest, verifiable trust profile.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
