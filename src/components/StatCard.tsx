import React from "react";

const statColors: Record<string, string> = {
  Strength: "bg-red-400",
  Dexterity: "bg-emerald-400",
  Constitution: "bg-yellow-400",
  Intelligence: "bg-blue-400",
  Wisdom: "bg-purple-400",
  Charisma: "bg-pink-400",
};

export function StatCard({ label, value }: { label: string; value: number }) {
  // Random rotation logic
  const rotation = label.length % 2 === 0 ? "rotate-1" : "-rotate-1";
  const colorClass = statColors[label] || "bg-gray-300";

  return (
    <div
      className={`relative w-full ${rotation} transition-transform hover:scale-[1.02] active:scale-95`}
    >
      {/* The Tape */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-yellow-100 opacity-80 rotate-1 z-10 shadow-sm border-l border-r border-white/40"></div>

      {/* The Card */}
      <div
        className={`${colorClass} border-2 border-gray-900 p-3 rounded-lg shadow-hard flex items-center justify-between relative overflow-hidden`}
      >
        {/* Texture */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cardboard-flat.png')]"></div>

        <div className="z-10 flex items-center gap-3">
          <div className="w-10 h-10 bg-white border-2 border-gray-900 rounded-full flex items-center justify-center font-bold text-lg shadow-sm">
            {label[0]}
          </div>
          <span className="font-bold text-gray-900 text-xl uppercase tracking-tight">
            {label}
          </span>
        </div>

        <div className="z-10 bg-black/10 px-3 py-1 rounded-md border border-black/5">
          <span className="font-black text-gray-900 text-lg">{value} XP</span>
        </div>
      </div>
    </div>
  );
}
