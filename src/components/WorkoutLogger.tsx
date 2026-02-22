"use client";

import { use, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { init } from "next/dist/compiled/webpack/webpack";

interface WorkoutLoggerProps {
  onSuccess: () => void;
  onClose: () => void;
  initialActivity?: string;
}

export function WorkoutLogger({
  onSuccess,
  onClose,
  initialActivity,
}: WorkoutLoggerProps) {
  const [activity, setActivity] = useState(initialActivity || "");
  const [duration, setDuration] = useState<number | "">("");
  const [intensity, setIntensity] = useState(3);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const intensityMap: Record<
    number,
    { label: string; dbValue: string; multiplier: number }
  > = {
    1: { label: "Very Light", dbValue: "very low", multiplier: 0.8 },
    2: { label: "Light", dbValue: "low", multiplier: 1.0 },
    3: { label: "Moderate", dbValue: "medium", multiplier: 1.2 },
    4: { label: "Hard", dbValue: "high", multiplier: 1.5 },
    5: { label: "Heroic", dbValue: "very high", multiplier: 2.0 },
  };

  const handleLogWorkout = async () => {
    if (!activity || !duration || duration <= 0) return;
    setIsSubmitting(true);

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      setIsSubmitting(false);
      return;
    }

    const baseXP = Math.floor(Number(duration) * 0.5);
    const finalXP = Math.floor(baseXP * intensityMap[intensity].multiplier);

    const { error: logError } = await supabase.from("workout_logs").insert([
      {
        user_id: user.id,
        activity_type: activity,
        duration_minutes: Number(duration),
        intensity: intensityMap[intensity].dbValue, // Send the lowercase string to DB!
        xp_earned: finalXP,
      },
    ]);

    if (!logError) {
      onSuccess();
      onClose();
    } else {
      console.error("Failed to log workout:", logError);
    }
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md border-4 border-black p-6 rounded-3xl animate-in zoom-in duration-200 shadow-hard-lg">
        <h2 className="text-2xl font-black uppercase mb-4 italic">
          Log New Activity
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-black uppercase mb-1">
              Activity Name
            </label>
            <input
              className="w-full border-4 border-black p-3 rounded-xl font-bold outline-none focus:ring-2 ring-orange-400"
              placeholder="e.g. Squats"
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-black uppercase mb-1">
              Duration (Min)
            </label>
            <input
              type="number"
              className="w-full border-4 border-black p-3 rounded-xl font-bold outline-none focus:ring-2 ring-orange-400"
              placeholder="30"
              value={duration}
              onChange={(e) =>
                setDuration(e.target.value === "" ? "" : Number(e.target.value))
              }
            />
          </div>

          {/* --- INTENSITY SECTION WITH PAPER TEXTURE --- */}
          <div
            className="border-4 border-black rounded-xl p-4 flex flex-col items-center mb-6 shadow-sm relative overflow-hidden"
            style={{
              // Paper background color
              backgroundColor: "#fdfbf7",
              // Subtle lined paper pattern
              backgroundImage: "linear-gradient(#e5e5e5 1px, transparent 1px)",
              backgroundSize: "100% 24px",
            }}
          >
            {/* "Tape" visual for extra flair */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-[#f0e6d2] border-2 border-black/20 rotate-3 shadow-sm opacity-80"></div>

            <label className="block text-xs font-black uppercase mb-2 w-full text-center z-10 relative">
              Intensity:{" "}
              <span className="text-orange-600">
                {intensityMap[intensity].label}
              </span>
            </label>

            {/* The Dynamic Flame */}
            <div className="h-16 flex items-end justify-center mb-2 z-10 relative">
              <span
                className="transition-all duration-300 origin-bottom"
                style={{
                  transform: `scale(${0.8 + intensity * 0.4})`,
                  filter: `drop-shadow(0px ${intensity}px ${intensity * 2}px rgba(255, 165, 0, 0.6))`,
                }}
              >
                🔥
              </span>
            </div>

            <input
              type="range"
              min="1"
              max="5"
              step="1"
              value={intensity}
              onChange={(e) => setIntensity(Number(e.target.value))}
              className="w-full h-3 bg-black/10 rounded-lg appearance-none cursor-pointer accent-orange-500 border-2 border-black/30 z-10 relative"
            />
            <div className="w-full flex justify-between text-[10px] font-bold text-gray-500 mt-2 uppercase z-10 relative">
              <span>Easy</span>
              <span>Max</span>
            </div>
          </div>
          {/* --- END INTENSITY SECTION --- */}
        </div>

        <div className="flex gap-4 mt-6">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-200 border-4 border-black p-3 rounded-xl font-black uppercase hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleLogWorkout}
            disabled={isSubmitting}
            className="flex-1 bg-orange-500 border-4 border-black p-3 rounded-xl font-black uppercase text-white shadow-hard active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
          >
            {isSubmitting ? "Saving..." : "Log Quest"}
          </button>
        </div>
      </div>
    </div>
  );
}
