"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { getProfile } from "@/lib/data";
import Image from "next/image";

// Import Components
import { QuestBoard, Bounty } from "@/components/QuestBoard"; // 1. Imported Bounty type
import { StatCard } from "@/components/StatCard";
import { StampRally } from "@/components/StampRally";
import { WorkoutLogger } from "@/components/WorkoutLogger";

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>(null);
  const [isLoggerOpen, setIsLoggerOpen] = useState(false);

  // 2. Added state to hold the quest name when a player accepts a bounty
  const [prefilledQuest, setPrefilledQuest] = useState("");

  const loadData = useCallback(async () => {
    const data = await getProfile();

    if (!data) {
      router.push("/auth/login");
      return;
    }

    if (data.strength_xp === undefined || data.strength_xp === null) {
      router.push("/player/onboarding");
      return;
    }

    setStats(data);
    setLoading(false);
  }, [router]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // 3. Added a helper function to open the logger and set the quest name
  const handleOpenLogger = (activityName: string = "") => {
    setPrefilledQuest(activityName);
    setIsLoggerOpen(true);
  };

  if (loading)
    return (
      <div className="min-h-screen bg-[#fdfbf7] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-gray-900 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 font-bold text-xl uppercase tracking-widest animate-pulse">
            Summoning Hero...
          </p>
        </div>
      </div>
    );

  const totalXp =
    (stats?.strength_xp || 0) +
    (stats?.dexterity_xp || 0) +
    (stats?.wisdom_xp || 0) +
    (stats?.charisma_xp || 0) +
    (stats?.constitution_xp || 0) +
    (stats?.intelligence_xp || 0);

  const xpProgress = Math.min((totalXp / 100) * 100, 100);

  return (
    <main className="min-h-screen bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)] bg-[size:24px_24px] text-gray-900 p-4 pb-32 overflow-x-hidden">
      {/* 1. Character Card */}
      <section className="bg-white border-4 border-gray-900 rounded-xl shadow-hard-lg mb-8 p-4 flex gap-4 relative transform -rotate-1">
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-red-500 border-2 border-gray-900 shadow-sm z-10"></div>
        <div className="w-24 h-32 bg-sky-100 border-2 border-gray-900 rounded-lg flex items-center justify-center overflow-hidden shrink-0 shadow-hard">
          <Image
            src="/character-placeholder.png"
            alt="Character"
            width={80}
            height={100}
            className="object-contain drop-shadow-md w-auto h-auto"
          />
        </div>
        <div className="flex-1 flex flex-col justify-center">
          <div className="bg-yellow-300 border-2 border-gray-900 px-3 py-1 rounded-full w-fit mb-2 shadow-hard transform -rotate-2">
            <h1 className="text-xl font-black text-gray-900 uppercase tracking-wide">
              {stats?.username || "Player"}
            </h1>
          </div>
          <div className="relative mt-2">
            <div className="flex justify-between text-xs font-bold mb-1 pl-1">
              <span>LVL {stats?.level || 1}</span>
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

      {/* 2. STAMP RALLY */}
      <StampRally streak={stats?.current_streak || 0} />

      {/* 'en-CA' safely formats the date to YYYY-MM-DD in local time */}
      <QuestBoard
        onAcceptQuest={(bounty) => handleOpenLogger(bounty.title)}
        isCompleted={
          stats?.last_workout_date === new Date().toLocaleDateString("en-CA")
        }
      />

      {/* 4. Stats Section */}
      <section className="space-y-5 px-2 mb-8">
        <StatCard label="Strength" value={stats?.strength_xp || 0} />
        <StatCard label="Dexterity" value={stats?.dexterity_xp || 0} />
        <StatCard label="Constitution" value={stats?.constitution_xp || 0} />
        <StatCard label="Intelligence" value={stats?.intelligence_xp || 0} />
        <StatCard label="Wisdom" value={stats?.wisdom_xp || 0} />
        <StatCard label="Charisma" value={stats?.charisma_xp || 0} />
      </section>

      {/* 5. Floating Action Button (+) */}
      <button
        onClick={() => handleOpenLogger("")} // Pass an empty string if they click the normal '+' button
        className="fixed bottom-24 right-6 w-16 h-16 bg-orange-500 border-4 border-gray-900 rounded-full shadow-hard text-white text-4xl font-black flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50"
      >
        +
      </button>

      {/* 6. Modular Workout Logger */}
      {isLoggerOpen && (
        <WorkoutLogger
          initialActivity={prefilledQuest} // 5. Pass the pre-filled quest name down to the logger
          onClose={() => setIsLoggerOpen(false)}
          onSuccess={() => {
            setIsLoggerOpen(false);
            loadData(); // Re-fetch stats after logging
          }}
        />
      )}
    </main>
  );
}
