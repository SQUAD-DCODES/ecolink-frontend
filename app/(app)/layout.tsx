import Sidebar from "@/components/Sidebar";
import BottomNav from "@/components/BottomNav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen" style={{ background: "#FAFAF7" }}>
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <style>{`
          @media (min-width: 768px)  { .content-area { margin-left: 64px;  } }
          @media (min-width: 1024px) { .content-area { margin-left: 240px; } }
        `}</style>
        <main className="content-area flex-1 pb-nav md:pb-0" style={{ background: "#FAFAF7" }}>
          {children}
        </main>
        <BottomNav />
      </div>
    </div>
  );
}
