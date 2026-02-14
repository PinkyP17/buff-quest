"use client";

import { useState } from "react";
import Image from "next/image";
import { Shield, Zap, Heart } from "lucide-react";

// Move constant data here
const BADGES = [
  { id: 1, label: "Early Bird", icon: "☀️", color: "bg-yellow-200" },
  { id: 2, label: "Heavy Lifter", icon: "🏋️", color: "bg-red-200" },
  { id: 3, label: "Streak Master", icon: "🔥", color: "bg-orange-200" },
  { id: 4, label: "Hydrated", icon: "💧", color: "bg-blue-200" },
];

export function LicenseCard() {
  const [characterClass, setCharacterClass] = useState("Warrior");

  return (
    <div className="animate-in fade-in zoom-in duration-300">
      {/* Top Section: Photo & Basic Info */}
      <div className="flex flex-col md:flex-row gap-6 items-center md:items-start border-b-2 border-dashed border-gray-300 pb-6 mb-6">
        {/* Avatar Frame */}
        <div className="relative transform -rotate-2">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-blue-100/80 border-l border-r border-white/40 rotate-1 z-20"></div>
          <div className="w-32 h-32 bg-gray-100 border-4 border-gray-900 rounded-lg overflow-hidden shadow-hard">
            <Image
              src="/character-placeholder.png"
              alt="Avatar"
              width={128}
              height={128}
              className="object-cover"
            />
          </div>
        </div>

        {/* Info Text */}
        <div className="text-center md:text-left flex-1">
          <div className="inline-block bg-gray-900 text-white text-xs font-bold px-2 py-1 rounded mb-1 uppercase tracking-widest">
            ID: 8492-B
          </div>
          <h2 className="text-3xl font-black text-gray-900 uppercase">
            Sir Lifts-a-Lot
          </h2>
          <p className="text-gray-500 font-bold">Level 5 Adventurer</p>

          {/* Class Stamp */}
          <div className="mt-3 inline-flex items-center gap-2 border-2 border-red-500 text-red-500 px-3 py-1 rounded-lg font-black uppercase text-sm transform -rotate-6 opacity-80 border-dashed">
            {characterClass === "Warrior" && <Shield size={16} />}
            {characterClass === "Rogue" && <Zap size={16} />}
            {characterClass === "Scout" && <Heart size={16} />}
            Class: {characterClass}
          </div>
        </div>
      </div>

      {/* Middle Section: Class Selector */}
      <div className="mb-8">
        <h3 className="text-sm font-black text-gray-400 uppercase mb-3">
          Update Class
        </h3>
        <div className="grid grid-cols-3 gap-2">
          {["Warrior", "Rogue", "Scout"].map((c) => (
            <button
              key={c}
              onClick={() => setCharacterClass(c)}
              className={`py-2 rounded border-2 font-bold text-sm transition-all ${
                characterClass === c
                  ? "bg-gray-900 text-white border-gray-900 shadow-hard -translate-y-1"
                  : "bg-white text-gray-500 border-gray-300 hover:border-gray-900"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Section: Sticker Book */}
      <div>
        <h3 className="text-sm font-black text-gray-400 uppercase mb-3">
          Sticker Collection
        </h3>
        <div className="bg-gray-100 border-2 border-gray-900 rounded-lg p-4 min-h-[120px] grid grid-cols-2 md:grid-cols-4 gap-4 items-center justify-items-center relative overflow-hidden">
          {/* Background Texture */}
          <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:16px_16px]"></div>

          {BADGES.map((badge) => (
            <div
              key={badge.id}
              className="group relative w-16 h-16 flex items-center justify-center transform hover:scale-110 transition-transform cursor-help"
            >
              <div
                className={`absolute inset-0 rounded-full ${badge.color} border-2 border-gray-900 shadow-sm opacity-90`}
              ></div>
              <span className="relative text-2xl z-10">{badge.icon}</span>
              <span className="absolute -bottom-8 bg-gray-900 text-white text-[10px] font-bold py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
                {badge.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
