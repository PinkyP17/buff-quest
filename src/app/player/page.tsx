"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getProfile } from "@/lib/data";
import { Home, Swords, User, Calendar } from "lucide-react";
import Image from "next/image";

// Import Components
import { QuestBoard } from "@/components/QuestBoard";
import { StatCard } from "@/components/StatCard";
import { NavItem } from "@/components/NavItem";
import { StampRally } from "@/components/StampRally";

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>(null);
  const [username, setUsername] = useState("Player");

  useEffect(() => {
    async function loadData() {
      const mockData = {
        strength_xp: 45,
        dexterity_xp: 70,
        wisdom_xp: 20,
        username: "Hero123",
        streak: 4, // Mock streak data
      };

      const data = await getProfile().catch(() => mockData);

      if (!data && !mockData) {
        router.push("/login");
      } else {
        setStats(data || mockData);
        setUsername(data?.username || mockData.username || "Player");
        setLoading(false);
      }
    }
    loadData();
  }, [router]);

  if (loading)
    return (
      <div className="min-h-screen bg-[#fdfbf7] flex items-center justify-center text-gray-500 font-bold text-xl tracking-wider">
        Loading World...
      </div>
    );

  const totalXp =
    (stats?.strength_xp || 0) +
    (stats?.dexterity_xp || 0) +
    (stats?.wisdom_xp || 0) +
    (stats?.charisma_xp || 0);
  const xpProgress = Math.min((totalXp / 100) * 100, 100);

  return (
    <main className="min-h-screen bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)] bg-[size:24px_24px] text-gray-900 p-4 pb-24 overflow-x-hidden">
      {/* 1. Character Card */}
      <section className="bg-white border-4 border-gray-900 rounded-xl shadow-hard-lg mb-8 p-4 flex gap-4 relative transform -rotate-1">
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-red-500 border-2 border-gray-900 shadow-sm z-10"></div>
        <div className="w-24 h-32 bg-sky-100 border-2 border-gray-900 rounded-lg flex items-center justify-center overflow-hidden shrink-0 shadow-hard">
          <Image
            src="/character-placeholder.png"
            alt="Character"
            width={80}
            height={100}
            className="object-contain drop-shadow-md"
          />
        </div>
        <div className="flex-1 flex flex-col justify-center z-0">
          <div className="bg-yellow-300 border-2 border-gray-900 px-3 py-1 rounded-full w-fit mb-2 shadow-hard transform -rotate-2">
            <h1 className="text-xl font-black text-gray-900 uppercase tracking-wide">
              {username}
            </h1>
          </div>
          <div className="relative mt-2">
            <div className="flex justify-between text-xs font-bold mb-1 pl-1">
              <span>LVL 1</span>
              <span>EXP</span>
            </div>
            <div className="h-6 bg-gray-900 rounded-full p-1 shadow-hard">
              <div
                className="h-full bg-gradient-to-r from-green-400 to-green-300 rounded-full border border-black relative overflow-hidden transition-all duration-500"
                style={{ width: `${Math.max(xpProgress, 10)}%` }}
              >
                <div className="absolute top-0 left-0 w-full h-1/2 bg-white opacity-30 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STAMP RALLY (New!) */}
      <StampRally streak={stats?.streak || 0} />

      {/* 3. Quest Board */}
      <QuestBoard />

      {/* 4. Stats Section */}
      <section className="space-y-5 px-2">
        <StatCard label="Strength" value={stats?.strength_xp || 0} />
        <StatCard label="Dexterity" value={stats?.dexterity_xp || 0} />
        <StatCard label="Constitution" value={stats?.constitution_xp || 0} />
        <StatCard label="Intelligence" value={stats?.intelligence_xp || 0} />
        <StatCard label="Wisdom" value={stats?.wisdom_xp || 0} />
        <StatCard label="Charisma" value={stats?.charisma_xp || 0} />
      </section>
    </main>
  );
}
