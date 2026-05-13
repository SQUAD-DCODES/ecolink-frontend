import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EcoLink — Informal Economy OS",
  description: "Payments, jobs, savings and credit for the informal sector.",
};

export const viewport: Viewport = {
  themeColor: "#0F6E56",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" style={{ colorScheme: "light" }}>
      <body style={{ background: "#FAFAF7", color: "#1C1B18", minHeight: "100vh" }}>
        {children}
      </body>
    </html>
  );
}
