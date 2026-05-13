export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: "#FAFAF7", minHeight: "100vh" }}>
      {children}
    </div>
  );
}
