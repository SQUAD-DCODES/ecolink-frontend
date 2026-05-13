"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  {
    href: "/",
    label: "Home",
    exact: true,
    icon: (active: boolean) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.2 : 1.6} strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/>
        <path d="M9 21V12h6v9"/>
      </svg>
    ),
  },
  {
    href: "/jobs",
    label: "Jobs",
    exact: false,
    icon: (active: boolean) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.2 : 1.6} strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2"/>
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
      </svg>
    ),
  },
  {
    href: "/wallet",
    label: "Wallet",
    exact: false,
    icon: (_active: boolean) => (
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg -mt-5"
        style={{ background: "#0F6E56" }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="5" width="20" height="14" rx="2"/>
          <path d="M16 12h.01"/>
        </svg>
      </div>
    ),
  },
  {
    href: "/savings",
    label: "Savings",
    exact: false,
    icon: (active: boolean) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.2 : 1.6} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C9.243 2 7 3.343 7 5v2c0 1.657 2.243 3 5 3s5-1.343 5-3V5c0-1.657-2.243-3-5-3z"/>
        <path d="M7 7v5c0 1.657 2.243 3 5 3s5-1.343 5-3V7"/>
        <path d="M7 12v5c0 1.657 2.243 3 5 3s5-1.343 5-3v-5"/>
      </svg>
    ),
  },
  {
    href: "/profile",
    label: "Profile",
    exact: true,
    icon: (active: boolean) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2.2 : 1.6} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4"/>
        <path d="M4 20c0-4 3.58-7 8-7s8 3 8 7"/>
      </svg>
    ),
  },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50"
      style={{
        background: "#ffffff",
        borderTop: "1px solid #E8E6DF",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      <div className="flex items-end justify-around px-2 pt-2 pb-2">
        {tabs.map((tab) => {
          const isWallet = tab.href === "/wallet";
          const active = tab.exact ? pathname === tab.href : pathname.startsWith(tab.href);

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className="flex flex-col items-center gap-1 min-w-[44px] py-1"
              style={{ color: active && !isWallet ? "#0F6E56" : "#9E9B92" }}
            >
              {tab.icon(active)}
              {!isWallet && (
                <span style={{ fontSize: "10px", fontWeight: active ? 600 : 400 }}>
                  {tab.label}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
