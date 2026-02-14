import React from "react";

export function QuestBoard() {
  return (
    <section className="mb-8 px-2">
      <h2 className="text-xl font-black text-gray-900 mb-4 flex items-center gap-2">
        <span className="text-2xl">📜</span> BOUNTY BOARD
      </h2>

      <div className="flex flex-col gap-4">
        {/* Quest 1 */}
        <div className="relative group">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-red-500 border-2 border-gray-900 z-20 shadow-sm"></div>
          <div className="bg-[#fff9c4] p-4 rounded-sm shadow-hard border-2 border-gray-900 transform rotate-1 transition-transform group-hover:rotate-0 group-hover:scale-[1.02]">
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[linear-gradient(#000000_1px,transparent_1px)] bg-[size:100%_24px]"></div>
            <div className="relative z-10 flex justify-between items-start">
              <div>
                <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-gray-900">
                  DAILY QUEST
                </span>
                <h3 className="font-bold text-lg text-gray-900 mt-1 leading-tight">
                  Slay the Bench Press
                </h3>
                <p className="text-gray-600 text-sm mt-1 font-medium">
                  3 Sets x 10 Reps
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full border-2 border-gray-900 bg-white flex items-center justify-center shadow-sm">
                  <span className="font-black text-sm text-gray-900">+50</span>
                </div>
                <span className="text-[10px] font-bold text-gray-500 mt-1">
                  STR XP
                </span>
              </div>
            </div>
            <button className="w-full mt-3 bg-gray-900 text-white font-bold py-2 rounded border-2 border-transparent hover:bg-white hover:text-gray-900 hover:border-gray-900 transition-colors shadow-sm text-sm uppercase tracking-wider">
              Accept Challenge
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
