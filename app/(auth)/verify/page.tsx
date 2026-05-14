"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authAPI, setToken } from "@/lib/api";

export default function VerifyPage() {
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resent, setResent] = useState(false);
  const [error, setError] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const p = localStorage.getItem("ecolink_pending_phone") || "";
    setPhone(p);
  }, []);

  function handleChange(i: number, val: string) {
    if (!/^\d*$/.test(val)) return;
    const next = [...otp];
    next[i] = val.slice(-1);
    setOtp(next);
    if (val && i < 5) {
      document.getElementById(`otp-${i+1}`)?.focus();
    }
  }

  function handleKeyDown(i: number, e: React.KeyboardEvent) {
    if (e.key === "Backspace" && !otp[i] && i > 0) {
      document.getElementById(`otp-${i-1}`)?.focus();
    }
  }

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    if (otp.join("").length < 6) return;
    setLoading(true);
    setError("");
    try {
      const res = await authAPI.verifyOtp({ phone, otp: otp.join("") });
      setToken(res.data.token);
      router.push("/onboarding");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Invalid code. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleResend() {
    try {
      await authAPI.resendOtp({ phone });
      setResent(true);
    } catch {
      setError("Could not resend. Please try again.");
    }
  }

  const filled = otp.join("").length;
  const displayPhone = phone ? phone.replace("234", "+234 ") : "+234 …";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6" style={{ background: "#FAFAF7" }}>
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-2 mb-12">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "#E8F5F0" }}>
            <Image src="/Eco.png" alt="EcoLink" width={26} height={26} style={{ objectFit: "contain" }} />
          </div>
          <span className="font-semibold tracking-tight" style={{ color: "#1C1B18" }}>EcoLink</span>
        </div>

        <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ background: "#E8F5F0" }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0F6E56" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        </div>

        <h1 className="text-2xl font-semibold mb-1" style={{ letterSpacing: "-0.02em" }}>Check your messages</h1>
        <p className="text-sm text-muted mb-8">
          We sent a 6-digit code to <span className="font-medium" style={{ color: "#1C1B18" }}>{displayPhone}</span>. It expires in 10 minutes.
        </p>

        {error && (
          <div className="mb-4 px-4 py-3 rounded-xl text-sm" style={{ background: "#FEF0EC", color: "#A33E22", border: "1px solid #E8775A" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleVerify} className="flex flex-col gap-6">
          <div className="flex gap-2 justify-between">
            {otp.map((digit, i) => (
              <input
                key={i}
                id={`otp-${i}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                className="w-12 h-14 text-center text-xl font-bold rounded-xl outline-none"
                style={{
                  border: `2px solid ${digit ? "#0F6E56" : "#E8E6DF"}`,
                  background: digit ? "#E8F5F0" : "#fff",
                  color: "#0F6E56",
                  caretColor: "#0F6E56",
                }}
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={filled < 6 || loading}
            className="btn-primary w-full py-3 text-sm"
            style={{ opacity: filled < 6 ? 0.5 : 1 }}
          >
            {loading ? "Verifying…" : "Verify code"}
          </button>
        </form>

        <div className="mt-5 text-center">
          {resent ? (
            <p className="text-sm" style={{ color: "#0F6E56" }}>✓ New code sent!</p>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              className="text-sm font-medium"
              style={{ color: "#0F6E56" }}
            >
              Didn&apos;t receive it? Resend code
            </button>
          )}
        </div>
      </div>
    </div>
  );
}