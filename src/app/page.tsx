"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getProfile } from "@/lib/data";
import { Home, Swords, User, Settings } from "lucide-react";
import Image from "next/image";

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>(null);
  const [username, setUsername] = useState("Player");

  useEffect(() => {
    async function loadData() {
      const data = await getProfile();
      if (!data) {
        router.push("/login");
      } else {
        setStats(data);
        setUsername(data.username || "Player");
        setLoading(false);
      }
    }
    loadData();
  }, [router]);

  if (loading)
    return (
      <div className="min-h-screen bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)] bg-[size:20px_20px] bg-white flex items-center justify-center text-gray-500">
        Summoning Character...
      </div>
    );

  // Calculate total XP for the progress bar
  const totalXp =
    (stats?.strength_xp || 0) +
    (stats?.dexterity_xp || 0) +
    (stats?.constitution_xp || 0) +
    (stats?.intelligence_xp || 0) +
    (stats?.wisdom_xp || 0) +
    (stats?.charisma_xp || 0);
  const xpForNextLevel = 100;
  const xpProgress = Math.min((totalXp / xpForNextLevel) * 100, 100);

  return (
    <main className="min-h-screen bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)] bg-[size:20px_20px] bg-white text-gray-900 p-4 pb-24">
      {/* Character Card */}
      <section className="bg-white rounded-2xl border-2 border-gray-300 shadow-lg mb-6 p-4 flex gap-4">
        {/* Character Image */}
        <div className="w-28 h-36 bg-gray-100 rounded-xl border-2 border-gray-300 flex items-center justify-center overflow-hidden">
          <Image
            src="/character-placeholder.png"
            alt="Character"
            width={100}
            height={130}
            className="object-contain"
          />
        </div>

        {/* Player Info */}
        <div className="flex-1 flex flex-col justify-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">{username}</h1>
          <p className="text-gray-500 text-sm mb-3">Level 1</p>
          
          {/* XP Bar */}
          <div>
            <p className="text-xs text-gray-500 mb-1">Exp</p>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden border border-gray-300">
              <div
                className="h-full bg-green-500 rounded-full transition-all duration-500"
                style={{ width: `${xpProgress}%` }}
              />
            </div>
            <p className="text-xs text-gray-400 mt-1">{totalXp} / {xpForNextLevel}</p>
          </div>
        </div>
      </section>

      {/* Staggered Stat Cards */}
      <section className="space-y-[-8px]">
        <StatCard
          label="Strength"
          value={stats?.strength_xp || 0}
          offset="left"
          rotation={-2}
        />
        <StatCard
          label="Dexterity"
          value={stats?.dexterity_xp || 0}
          offset="right"
          rotation={1}
        />
        <StatCard
          label="Constitution"
          value={stats?.constitution_xp || 0}
          offset="left"
          rotation={-1}
        />
        <StatCard
          label="Intelligence"
          value={stats?.intelligence_xp || 0}
          offset="right"
          rotation={2}
        />
        <StatCard
          label="Wisdom"
          value={stats?.wisdom_xp || 0}
          offset="left"
          rotation={-1.5}
        />
        <StatCard
          label="Charisma"
          value={stats?.charisma_xp || 0}
          offset="right"
          rotation={1}
        />
      </section>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 px-6 py-3">
        <div className="flex justify-around items-center max-w-md mx-auto">
          <NavItem icon={<Home size={24} />} label="Home" active />
          <NavItem icon={<Swords size={24} />} label="Quests" />
          <NavItem icon={<User size={24} />} label="Profile" />
          <NavItem icon={<Settings size={24} />} label="Settings" />
        </div>
      </nav>
    </main>
  );
}

function StatCard({
  label,
  value,
  offset,
  rotation,
}: {
  label: string;
  value: number;
  offset: "left" | "right";
  rotation: number;
}) {
  return (
    <div
      className={`bg-white border-2 border-gray-300 rounded-xl p-4 shadow-md relative ${
        offset === "left" ? "mr-8" : "ml-8"
      }`}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <div className="flex justify-between items-center">
        <span className="font-bold text-gray-800 text-lg">{label}</span>
        <span className="font-mono text-gray-600 text-lg">{value}</span>
      </div>
    </div>
  );
}

function NavItem({
  icon,
  label,
  active = false,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <button
      className={`flex flex-col items-center gap-1 ${
        active ? "text-white" : "text-gray-500"
      }`}
    >
      {icon}
      <span className="text-xs">{label}</span>
    </button>
  );
}
