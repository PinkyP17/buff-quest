"use client";

import { usePathname } from "next/navigation";
import { NavItem } from "@/components/NavItem";
import { Home, Swords, User, Calendar } from "lucide-react";

export function PlayerBottomNav() {
  const pathname = usePathname();

  // Helper to check if a link is active
  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed bottom-4 left-4 right-4 bg-white border-2 border-gray-900 rounded-full shadow-hard-lg px-6 py-3 z-50 max-w-md mx-auto">
      <div className="flex justify-around items-center">
        <NavItem
          href="/player"
          icon={<Home size={28} strokeWidth={2.5} />}
          label="Home"
          active={isActive("/player")}
        />
        <NavItem
          href="/player/roulette"
          icon={<Swords size={28} strokeWidth={2.5} />}
          label="Quests"
          active={isActive("/player/roulette")}
        />
        <NavItem
          href="/player/profile"
          icon={<User size={28} strokeWidth={2.5} />}
          label="Profile"
          active={isActive("/player/profile")}
        />
        <NavItem
          href="/player/schedule"
          icon={<Calendar size={28} strokeWidth={2.5} />}
          label="Schedule"
          active={isActive("/player/schedule")}
        />
      </div>
    </nav>
  );
}
