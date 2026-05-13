"use client";

import Link from "next/link";
import { useState } from "react";

const allSkills = [
  "Sales", "Customer service", "Numeracy", "Delivery", "Carpentry", "Sewing",
  "Cooking", "Cleaning", "Farming", "Tailoring", "Weaving", "Pottery",
  "Bike riding", "Driving", "Electrical work", "Plumbing", "Painting",
];

const businessTypes = [
  { id: "trader",    label: "Market trader",      icon: "🛍️" },
  { id: "artisan",   label: "Artisan / craftsman", icon: "🔨" },
  { id: "farmer",    label: "Farmer",              icon: "🌾" },
  { id: "transport", label: "Transport / delivery", icon: "🏍️" },
  { id: "food",      label: "Food vendor",         icon: "🍲" },
  { id: "service",   label: "Service provider",    icon: "💼" },
];

export default function EditProfilePage() {
  const [selectedSkills, setSelectedSkills] = useState<string[]>(["Sales", "Customer service", "Numeracy"]);
  const [businessType, setBusinessType] = useState("trader");
  const [saved, setSaved] = useState(false);

  function toggleSkill(s: string) {
    setSelectedSkills((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : prev.length < 8 ? [...prev, s] : prev
    );
  }

  if (saved) {
    return (
      <div style={{ background: "#FAFAF7", minHeight: "100vh" }} className="flex items-center justify-center px-6">
        <div className="flex flex-col items-center text-center gap-5 max-w-sm">
          <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: "#E8F5F0" }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0F6E56" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-semibold" style={{ letterSpacing: "-0.02em" }}>Profile updated</h2>
            <p className="text-sm text-muted mt-1">Your changes have been saved.</p>
          </div>
          <Link href="/profile" className="btn-primary px-8 py-3 text-sm">Back to profile</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "#FAFAF7", minHeight: "100vh" }}>

      {/* Header */}
      <header style={{ background: "#ffffff", borderBottom: "1px solid #E8E6DF", minHeight: "64px" }}>
        <div className="flex items-center justify-between px-6 py-4" style={{ maxWidth: "860px", margin: "0 auto" }}>
          <div className="flex items-center gap-3">
            <Link href="/profile" className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "#F4F3EE", color: "#5C5A54" }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
            </Link>
            <div>
              <h1 className="text-lg font-semibold" style={{ letterSpacing: "-0.02em" }}>Edit profile</h1>
              <p className="text-xs text-muted">Public profile · visible to traders and employers</p>
            </div>
          </div>
          <button onClick={() => setSaved(true)} className="btn-primary px-5 py-2 text-sm">Save changes</button>
        </div>
      </header>

      <div className="px-6 py-8" style={{ maxWidth: "860px", margin: "0 auto" }}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left: avatar */}
          <div className="flex flex-col gap-4">
            <div className="card p-5 flex flex-col items-center gap-4">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold text-white"
                style={{ background: "#0F6E56" }}
              >
                AO
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold">Amaka Obi</p>
                <p className="text-xs text-muted">Market trader · Bodija, Ibadan</p>
              </div>
              <button className="btn-ghost px-4 py-2 text-xs w-full gap-2">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Upload photo
              </button>
            </div>

            {/* Trust score preview */}
            <div className="card p-4 flex flex-col gap-2">
              <p className="text-xs text-muted uppercase tracking-wide font-medium">Trust score</p>
              <p className="text-3xl font-bold" style={{ color: "#0F6E56" }}>847</p>
              <div className="h-2 rounded-full overflow-hidden" style={{ background: "#E8E6DF" }}>
                <div className="h-2 rounded-full" style={{ width: "84.7%", background: "#0F6E56" }}/>
              </div>
              <p className="text-xs text-muted">Top 12% in Ibadan</p>
            </div>
          </div>

          {/* Right: form */}
          <div className="lg:col-span-2 flex flex-col gap-5">

            {/* Personal info */}
            <div className="card p-5 flex flex-col gap-4">
              <p className="text-xs text-muted uppercase tracking-wide font-medium">Personal information</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-muted block mb-1.5">First name</label>
                  <input
                    type="text"
                    defaultValue="Amaka"
                    className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                    style={{ border: "1.5px solid #E8E6DF", background: "#fff", color: "#1C1B18" }}
                  />
                </div>
                <div>
                  <label className="text-xs text-muted block mb-1.5">Last name</label>
                  <input
                    type="text"
                    defaultValue="Obi"
                    className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                    style={{ border: "1.5px solid #E8E6DF", background: "#fff", color: "#1C1B18" }}
                  />
                </div>
                <div>
                  <label className="text-xs text-muted block mb-1.5">Phone number</label>
                  <input
                    type="tel"
                    defaultValue="+234 812 345 6789"
                    className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                    style={{ border: "1.5px solid #E8E6DF", background: "#F4F3EE", color: "#5C5A54" }}
                    readOnly
                  />
                </div>
                <div>
                  <label className="text-xs text-muted block mb-1.5">Date of birth</label>
                  <input
                    type="date"
                    defaultValue="1990-03-15"
                    className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                    style={{ border: "1.5px solid #E8E6DF", background: "#fff", color: "#1C1B18" }}
                  />
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="card p-5 flex flex-col gap-3">
              <p className="text-xs text-muted uppercase tracking-wide font-medium">Bio</p>
              <textarea
                rows={3}
                defaultValue="Fabric trader at Bodija Market with 8 years of experience. I specialise in Ankara and lace materials. Reliable, fast service, and bulk orders welcome."
                className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                style={{ border: "1.5px solid #E8E6DF", background: "#fff", color: "#1C1B18" }}
              />
              <p className="text-xs text-muted text-right">Helps AI match you to better jobs</p>
            </div>

            {/* Business type */}
            <div className="card p-5 flex flex-col gap-3">
              <p className="text-xs text-muted uppercase tracking-wide font-medium">Business type</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {businessTypes.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => setBusinessType(b.id)}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-left text-sm transition-all"
                    style={{
                      background: businessType === b.id ? "#E8F5F0" : "#F4F3EE",
                      border: `1.5px solid ${businessType === b.id ? "#0F6E56" : "transparent"}`,
                      color: businessType === b.id ? "#0F6E56" : "#5C5A54",
                      fontWeight: businessType === b.id ? 600 : 400,
                    }}
                  >
                    <span>{b.icon}</span>
                    <span className="text-xs">{b.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div className="card p-5 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted uppercase tracking-wide font-medium">Skills</p>
                <span className="text-xs text-muted">{selectedSkills.length}/8 selected</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {allSkills.map((s) => (
                  <button
                    key={s}
                    onClick={() => toggleSkill(s)}
                    className="px-3 py-1.5 rounded-full text-xs font-medium transition-all"
                    style={{
                      background: selectedSkills.includes(s) ? "#0F6E56" : "#F4F3EE",
                      color: selectedSkills.includes(s) ? "#fff" : "#5C5A54",
                      border: `1px solid ${selectedSkills.includes(s) ? "#0F6E56" : "transparent"}`,
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="card p-5 flex flex-col gap-3">
              <p className="text-xs text-muted uppercase tracking-wide font-medium">Location</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-muted block mb-1.5">Market / area</label>
                  <input
                    type="text"
                    defaultValue="Bodija Market"
                    className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                    style={{ border: "1.5px solid #E8E6DF", background: "#fff", color: "#1C1B18" }}
                  />
                </div>
                <div>
                  <label className="text-xs text-muted block mb-1.5">City</label>
                  <input
                    type="text"
                    defaultValue="Ibadan"
                    className="w-full px-4 py-2.5 rounded-xl text-sm outline-none"
                    style={{ border: "1.5px solid #E8E6DF", background: "#fff", color: "#1C1B18" }}
                  />
                </div>
                <div>
                  <label className="text-xs text-muted block mb-1.5">State</label>
                  <select
                    className="w-full px-4 py-2.5 rounded-xl text-sm outline-none appearance-none"
                    style={{ border: "1.5px solid #E8E6DF", background: "#fff", color: "#1C1B18" }}
                    defaultValue="oyo"
                  >
                    {["Oyo", "Lagos", "Kano", "Kaduna", "Rivers", "Anambra", "Enugu", "Borno"].map((s) => (
                      <option key={s} value={s.toLowerCase()}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <button onClick={() => setSaved(true)} className="btn-primary py-3.5 text-sm">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  );
}
