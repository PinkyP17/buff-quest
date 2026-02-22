"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export interface Bounty {
  id: string;
  title: string;
  description: string;
  stat_category: string;
  xp_reward: number;
}

export interface QuestBoardProps {
  onAcceptQuest: (bounty: Bounty) => void;
  isCompleted?: boolean;
}

export function QuestBoard({
  onAcceptQuest,
  isCompleted = false,
}: QuestBoardProps) {
  const [dailyBounty, setDailyBounty] = useState<Bounty | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAccepted, setIsAccepted] = useState(false);

  useEffect(() => {
    async function fetchDailyBounty() {
      try {
        const supabase = createClient();

        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          setLoading(false);
          return;
        }

        // Fetch all bounties
        const { data, error } = await supabase.from("bounties").select("*");

        if (error) {
          console.error("Error fetching bounties:", error);
        } else if (data && data.length > 0) {
          // 1. Create a unique string using the user's ID and today's date
          const today = new Date().toISOString().split("T")[0];
          const seedString = user.id + today;

          // 2. Hash the string into a predictable number
          let hash = 0;
          for (let i = 0; i < seedString.length; i++) {
            hash = seedString.charCodeAt(i) + ((hash << 5) - hash);
          }

          // 3. Pick one bounty based on the hash
          const index = Math.abs(hash) % data.length;
          setDailyBounty(data[index]);
        }
      } catch (err) {
        console.error("Unexpected error fetching bounty:", err);
      } finally {
        // This guarantees the loading spinner stops no matter what happens
        setLoading(false);
      }
    }

    fetchDailyBounty();
  }, []);

  const handleAcceptChallenge = () => {
    if (!dailyBounty) return;
    setIsAccepted(true);
    onAcceptQuest(dailyBounty);
  };

  return (
    <section className="mb-8 px-2">
      <h2 className="text-xl font-black text-gray-900 mb-4 flex items-center gap-2">
        <span className="text-2xl">📜</span> DAILY QUEST
      </h2>

      <div className="flex flex-col gap-4">
        {loading ? (
          <div className="text-center font-bold text-gray-500 animate-pulse italic py-4">
            Checking the board...
          </div>
        ) : !dailyBounty ? (
          <div className="text-center font-bold text-gray-500 italic py-4">
            No bounties available today. Rest up!
          </div>
        ) : (
          <div className="relative group">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-red-500 border-2 border-gray-900 z-20 shadow-sm"></div>

            <div
              className={`bg-[#fff9c4] p-4 rounded-sm shadow-hard border-2 border-gray-900 transform rotate-1 transition-all ${isCompleted ? "opacity-70" : "group-hover:rotate-0 group-hover:scale-[1.02]"}`}
            >
              <div className="absolute inset-0 opacity-10 pointer-events-none bg-[linear-gradient(#000000_1px,transparent_1px)] bg-[size:100%_24px]"></div>

              {isCompleted && (
                <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
                  <div
                    className="border-4 border-red-600 text-red-600 font-black text-3xl uppercase tracking-widest px-4 py-2 transform -rotate-12 rounded-lg opacity-90 shadow-sm backdrop-blur-sm"
                    style={{ textShadow: "2px 2px 0px rgba(255,255,255,0.8)" }}
                  >
                    COMPLETED
                  </div>
                </div>
              )}

              <div className="relative z-10 flex justify-between items-start">
                <div>
                  <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-gray-900 uppercase">
                    DAILY QUEST
                  </span>
                  <h3
                    className={`font-bold text-lg text-gray-900 mt-1 leading-tight ${isCompleted ? "line-through text-gray-500" : ""}`}
                  >
                    {dailyBounty.title}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1 font-medium">
                    {dailyBounty.description}
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full border-2 border-gray-900 bg-white flex items-center justify-center shadow-sm">
                    <span className="font-black text-sm text-gray-900">
                      +{dailyBounty.xp_reward}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-gray-500 mt-1 uppercase">
                    {dailyBounty.stat_category} XP
                  </span>
                </div>
              </div>

              <button
                onClick={handleAcceptChallenge}
                disabled={isAccepted || isCompleted}
                className={`w-full mt-3 font-bold py-2 rounded border-2 transition-all shadow-sm text-sm uppercase tracking-wider relative z-10 ${
                  isCompleted
                    ? "bg-gray-300 border-gray-400 text-gray-500 cursor-not-allowed"
                    : isAccepted
                      ? "bg-orange-100 border-orange-500 text-orange-600 animate-pulse cursor-wait"
                      : "bg-gray-900 border-transparent text-white hover:bg-white hover:text-gray-900 hover:border-gray-900"
                }`}
              >
                {isCompleted
                  ? "Reward Claimed"
                  : isAccepted
                    ? "⚔️ Quest Active..."
                    : "Accept Challenge"}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
