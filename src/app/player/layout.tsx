import { PlayerBottomNav } from "@/components/PlayerBottomNav";

export default function PlayerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#fdfbf7]">
      {/* This renders the page content (Dashboard, Profile, etc.) */}
      {children}

      {/* This renders the Nav once for everyone */}
      <PlayerBottomNav />
    </div>
  );
}
