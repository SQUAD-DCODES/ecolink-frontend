"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth";

const navItems = [
  // ... same as before (no changes)
  {
    href: "/",
    label: "Dashboard",
    exact: true,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1"/>
        <rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/>
        <rect x="14" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
  },
  {
    href: "/wallet",
    label: "Wallet",
    exact: false,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2"/>
        <path d="M16 12h.01"/>
      </svg>
    ),
  },
  {
    href: "/jobs",
    label: "Jobs",
    exact: false,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2"/>
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
      </svg>
    ),
  },
  {
    href: "/savings",
    label: "Savings",
    exact: false,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C9.243 2 7 3.343 7 5v2c0 1.657 2.243 3 5 3s5-1.343 5-3V5c0-1.657-2.243-3-5-3z"/>
        <path d="M7 7v5c0 1.657 2.243 3 5 3s5-1.343 5-3V7"/>
        <path d="M7 12v5c0 1.657 2.243 3 5 3s5-1.343 5-3v-5"/>
      </svg>
    ),
  },
  {
    href: "/credit",
    label: "Credit",
    exact: false,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 1 0 10 10"/>
        <path d="M12 6v6l4 2"/>
        <path d="M22 6l-3 3-3-3"/>
      </svg>
    ),
  },
  {
    href: "/profile/reputation",
    label: "Reputation",
    exact: false,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a3 3 0 0 1 3 3v7a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3z"/>
        <path d="M19 10a7 7 0 0 1-14 0"/>
        <line x1="12" y1="19" x2="12" y2="22"/>
      </svg>
    ),
  },
  {
    href: "/profile",
    label: "Profile",
    exact: true,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4"/>
        <path d="M4 20c0-4 3.58-7 8-7s8 3 8 7"/>
      </svg>
    ),
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user, loading } = useAuth();

  function isActive(href: string, exact: boolean) {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  }

  // Get user's display name
  const displayName = user
    ? user.firstName && user.lastName
      ? `${user.firstName} ${user.lastName}`
      : user.businessName || user.phone || "User"
    : "Loading...";

  // Get user's role/type
  const userRole = user?.businessType
    ? user.businessType === "trader"
      ? "Market trader"
      : user.businessType === "artisan"
      ? "Artisan"
      : user.businessType === "gig_worker"
      ? "Gig worker"
      : user.businessType === "farmer"
      ? "Smallholder farmer"
      : user.businessType
    : "Member";

  // Get initials for avatar
  const initials = user
    ? (user.firstName?.[0] || "") + (user.lastName?.[0] || "") || (user.businessName?.[0] || user.phone?.[0] || "U")
    : "U";

  return (
    <aside
      className="hidden md:flex fixed left-0 top-0 h-screen flex-col z-40"
      style={{
        width: "var(--sidebar-w, 240px)",
        background: "#ffffff",
        borderRight: "1px solid #E8E6DF",
      }}
    >
      {/* Brand */}
      <div className="flex items-center gap-3 px-4 py-4" style={{ borderBottom: "1px solid #E8E6DF", minHeight: "64px" }}>
        <Image
          src="/eco.png"
          alt="EcoLink"
          width={32}
          height={32}
          className="shrink-0"
          style={{ objectFit: "contain" }}
          priority
        />
        <span
          className="font-semibold text-base lg:block hidden"
          style={{ color: "#1C1B18", letterSpacing: "-0.02em" }}
        >
          EcoLink
        </span>
        <span
          className="text-xs font-medium px-1.5 py-0.5 rounded-md lg:flex hidden"
          style={{ background: "#E8F5F0", color: "#0F6E56" }}
        >
          Beta
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1 overflow-y-auto">
        {navItems.map((item) => {
          const active = isActive(item.href, item.exact);
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150"
              style={{
                background: active ? "#E8F5F0" : "transparent",
                color: active ? "#0F6E56" : "#5C5A54",
                fontWeight: active ? 600 : 400,
                fontSize: "0.875rem",
              }}
            >
              <span
                className="shrink-0"
                style={{ color: active ? "#0F6E56" : "#9E9B92" }}
              >
                {item.icon}
              </span>
              <span className="lg:block hidden">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="px-3 py-4" style={{ borderTop: "1px solid #E8E6DF" }}>
        {/* Squad powered badge */}
        <div
          className="rounded-xl px-3 py-3 mb-3 lg:flex hidden flex-col gap-1"
          style={{ background: "#F4F3EE" }}
        >
          <p className="text-xs text-muted">Powered by</p>
          <p className="text-sm font-semibold" style={{ color: "#0F6E56" }}>Squad API</p>
          <p className="text-xs text-muted">Virtual accounts · Payments</p>
        </div>

        {/* User info from auth */}
        <div className="flex items-center gap-3 px-3 py-2 rounded-xl" style={{ background: "#F4F3EE" }}>
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
            style={{ background: "#0F6E56" }}
          >
            {loading ? "..." : initials.toUpperCase()}
          </div>
          <div className="lg:block hidden min-w-0">
            <p className="text-sm font-medium truncate" style={{ color: "#1C1B18" }}>
              {loading ? "Loading..." : displayName}
            </p>
            <p className="text-xs text-muted truncate">
              {loading ? "Please wait" : userRole}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}