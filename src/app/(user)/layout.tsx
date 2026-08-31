import BottomNav from "@/components/bottom-nav";
import { AIAssistant } from "@/components/ai-assistant";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {children}
      <BottomNav />
      <AIAssistant />
    </div>
  );
}
