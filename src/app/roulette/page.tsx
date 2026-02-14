"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { SpinWheel, WHEEL_ITEMS } from "@/components/roulette/SpinWheel";
import { NavItem } from "@/components/NavItem"; // Reuse your bottom nav
import { Home, Swords, User, Calendar } from "lucide-react";

// --- Data: Activities per Stat ---
const QUEST_DATA: Record<string, string[]> = {
  STR: [
    "50 Pushups",
    "10 Pullups",
    "Hit the Gym (Chest Day)",
    "Plank for 2 mins",
  ],
  DEX: [
    "Run 3km",
    "Yoga Session (20m)",
    "Jump Rope (500 skips)",
    "Stretching Routine",
  ],
  CON: [
    "Drink 3L Water",
    "Cold Shower",
    "Eat a Healthy Meal",
    "No Sugar for 24h",
  ],
  INT: [
    "Read 10 Pages",
    "Solve a Coding Problem",
    "Learn a New Word",
    "Chess Puzzle",
  ],
  WIS: [
    "Meditate 10 mins",
    "Journal Entry",
    "No Social Media (1h)",
    "Walk in Nature",
  ],
  CHA: [
    "Call a Friend",
    "Compliment a Stranger",
    "Practice a Pitch",
    "Post a Photo",
  ],
};

export default function RoulettePage() {
  const router = useRouter();
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<{
    stat: string;
    activity: string;
  } | null>(null);

  const handleSpinComplete = (item: (typeof WHEEL_ITEMS)[0]) => {
    // 1. Pick a random activity for the stats
    const possibleActivities = QUEST_DATA[item.id];
    const randomActivity =
      possibleActivities[Math.floor(Math.random() * possibleActivities.length)];

    // 2. Set Result
    setResult({ stat: item.label, activity: randomActivity });
    setIsSpinning(false);
  };

  const spin = () => {
    setIsSpinning(true);
    setResult(null); // Clear previous result
    // The wheel component handles the animation logic,
    // we just need to pass the trigger state or let it handle click
    // In this implementation, clicking the wheel triggers it inside the component
  };

  return (
    <main className="min-h-screen bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)] bg-[size:24px_24px] text-gray-900 p-4 pb-24 flex flex-col">
      {/* Header */}
      <header className="flex items-center gap-4 mb-8">
        <button
          onClick={() => router.back()}
          className="p-2 bg-white border-2 border-gray-900 rounded-full shadow-hard hover:scale-105 transition-transform"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-3xl font-black uppercase tracking-wide text-gray-900">
          Quest Roulette
        </h1>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center gap-8">
        {/* Instructions */}
        {!result && !isSpinning && (
          <div className="bg-white px-4 py-2 border-2 border-gray-900 rounded-lg shadow-hard -rotate-2 mb-4">
            <p className="font-bold text-gray-600">
              Spin to determine your fate!
            </p>
          </div>
        )}

        {/* The Wheel */}
        <SpinWheel
          isSpinning={isSpinning}
          onSpinComplete={handleSpinComplete}
        />

        {/* Spin Button */}
        <button
          onClick={() =>
            document
              .querySelector<HTMLElement>("button[aria-label='Spin the wheel']")
              ?.click()
          } // Trigger the wheel's internal click
          disabled={isSpinning}
          className={`px-8 py-3 rounded-full font-black text-xl uppercase tracking-widest border-4 border-gray-900 shadow-hard-lg transition-all 
            ${
              isSpinning
                ? "bg-gray-300 text-gray-500 cursor-not-allowed translate-y-1 shadow-none"
                : "bg-red-500 text-white hover:bg-red-400 hover:-translate-y-1 active:translate-y-0"
            }`}
        >
          {isSpinning ? "Spinning..." : "SPIN!"}
        </button>

        {/* Result Card (Pops up when done) */}
        {result && (
          <div className="animate-in zoom-in slide-in-from-bottom-4 duration-500 w-full max-w-sm">
            <div className="bg-[#fff9c4] border-4 border-gray-900 p-6 rounded-xl shadow-hard-lg relative transform rotate-1">
              {/* Tape visual */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-20 h-8 bg-white/50 border-l border-r border-white/80 rotate-2"></div>

              <div className="text-center">
                <span className="inline-block bg-gray-900 text-white text-xs font-bold px-2 py-1 rounded mb-2 uppercase">
                  New Quest Acquired
                </span>
                <h2 className="text-3xl font-black text-gray-900 mb-1">
                  {result.stat}
                </h2>
                <div className="w-full h-1 bg-gray-900 my-3 opacity-20 rounded-full"></div>
                <p className="text-xl font-bold text-gray-800 leading-tight">
                  {result.activity}
                </p>

                <button className="mt-6 w-full bg-blue-500 text-white border-2 border-gray-900 font-bold py-3 rounded shadow-hard hover:scale-[1.02] transition-transform">
                  ACCEPT QUEST (+100 XP)
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation for Roulette Page */}
      <nav className="fixed bottom-4 left-4 right-4 bg-white border-2 border-gray-900 rounded-full shadow-hard-lg px-6 py-3 z-50">
        <div className="flex justify-around items-center">
          <NavItem
            href="/"
            icon={<Home size={28} strokeWidth={2.5} />}
            label="Home"
          />

          <NavItem
            href="/roulette"
            icon={<Swords size={28} strokeWidth={2.5} />}
            label="Quests"
            active
          />

          <NavItem
            href="/profile"
            icon={<User size={28} strokeWidth={2.5} />}
            label="Profile"
          />
          <NavItem
            href="/schedule"
            icon={<Calendar size={28} strokeWidth={2.5} />}
            label="Schedule"
          />
        </div>
      </nav>
    </main>
  );
}
