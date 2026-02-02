"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getProfile } from "@/lib/data";
import { Shield, Zap, Brain, Activity } from "lucide-react";

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    async function loadData() {
      const data = await getProfile();
      if (!data) {
        // If not logged in, kick them to login page
        router.push("/login");
      } else {
        setStats(data);
        setLoading(false);
      }
    }
    loadData();
  }, [router]);

  if (loading)
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">
        Summoning Character...
      </div>
    );

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-4 pb-20">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Your Hero</h1>
          <p className="text-slate-400 text-sm">Level 1 Novice</p>
        </div>
        <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center font-bold">
          {/* Initials placeholder */}H
        </div>
      </header>

      {/* THE VISUAL STAGE (Placeholder for your Art) */}
      <section className="bg-slate-900 rounded-2xl aspect-[4/5] border border-slate-800 mb-6 flex items-center justify-center relative overflow-hidden shadow-2xl">
        {/* This is where your layered SVGs will go later */}
        <p className="text-slate-500 text-xs uppercase tracking-widest">
          Character Visualizer
        </p>

        {/* Debugging: Show that data is real */}
        <div className="absolute bottom-4 left-4 bg-black/50 p-2 rounded text-xs">
          Streak: {stats.current_streak} Days
        </div>
      </section>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        <StatCard
          icon={<Shield className="text-red-400" />}
          label="STR"
          value={stats.strength_xp}
        />
        <StatCard
          icon={<Zap className="text-yellow-400" />}
          label="DEX"
          value={stats.dexterity_xp}
        />
        <StatCard
          icon={<Brain className="text-blue-400" />}
          label="WIS"
          value={stats.wisdom_xp}
        />
        <StatCard
          icon={<Activity className="text-green-400" />}
          label="CHA"
          value={stats.charisma_xp}
        />
      </div>
    </main>
  );
}

// Simple Helper Component for the grid
function StatCard({
  icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: number;
}) {
  return (
    <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex items-center gap-3">
      <div className="p-2 bg-slate-950 rounded-lg">{icon}</div>
      <div>
        <div className="text-slate-500 text-xs font-bold">{label}</div>
        <div className="text-xl font-mono text-white">{value}</div>
      </div>
    </div>
  );
}
