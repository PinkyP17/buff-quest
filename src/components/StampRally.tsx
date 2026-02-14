"use client";

import React from "react";
import { Star } from "lucide-react";

export function StampRally({ streak = 0 }: { streak?: number }) {
  const totalSlots = 7;

  return (
    <section className="mb-8 px-2">
      {/* The Card Container */}
      <div className="bg-orange-50 border-4 border-gray-900 rounded-xl p-5 shadow-hard transform rotate-1 relative">
        {/* Tape Visual (Holding it to the wall) */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-6 bg-white/40 border-l border-r border-white/60 -rotate-1 backdrop-blur-sm"></div>

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-black text-gray-900 uppercase italic tracking-tighter transform -rotate-1">
            <span className="text-2xl mr-2 not-italic">🔥</span>
            Streak Card
          </h2>
          <div className="bg-gray-900 text-white text-xs font-bold px-2 py-1 rounded shadow-sm">
            {streak} / 7 DAYS
          </div>
        </div>

        {/* The Stamp Grid */}
        <div className="grid grid-cols-7 gap-2 sm:gap-4">
          {Array.from({ length: totalSlots }).map((_, i) => {
            const isStamped = i < streak;

            // Deterministic rotation so it looks messy but doesn't flicker on re-render
            // (i * 33) % 20 - 10 gives a number between -10 and 10
            const rotation = ((i * 33) % 40) - 20;

            return (
              <div
                key={i}
                className="aspect-square relative flex items-center justify-center"
              >
                {/* Empty Circle Placeholder */}
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-dashed border-gray-300 bg-white flex items-center justify-center">
                  {!isStamped && (
                    <span className="text-gray-300 font-bold text-xs">
                      {i + 1}
                    </span>
                  )}
                </div>

                {/* THE INK STAMP */}
                {isStamped && (
                  <div
                    className="absolute text-red-600 opacity-90 z-10"
                    style={{
                      transform: `rotate(${rotation}deg) scale(1.2)`,
                      // mixBlendMode: 'multiply' // Optional: makes it look like real ink soaking in
                    }}
                  >
                    {/* Fill ensures it looks like a solid stamp mark */}
                    <Star
                      size={28}
                      strokeWidth={3}
                      fill="currentColor"
                      className="drop-shadow-sm"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Flavor Text at bottom */}
        <div className="mt-3 text-center">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            Keep the momentum going!
          </p>
        </div>
      </div>
    </section>
  );
}
