"use client";

import { useState } from "react";
import { NavItem } from "@/components/NavItem";
import { Home, Swords, User, Calendar, Plus } from "lucide-react"; // Import Calendar icon
import { RoutineItem } from "@/components/schedule/RoutineItem";

const INITIAL_ROUTINES = [
  { id: 1, time: "07:00 AM", label: "Morning Stretch", completed: true },
  { id: 2, time: "08:30 AM", label: "Protein Breakfast", completed: false },
  { id: 3, time: "05:00 PM", label: "Guild Training", completed: false },
  { id: 4, time: "10:00 PM", label: "Meditation", completed: false },
];

export default function SchedulePage() {
  const [routines, setRoutines] = useState(INITIAL_ROUTINES);

  const toggleRoutine = (id: number) => {
    setRoutines((prev) =>
      prev.map((r) => (r.id === id ? { ...r, completed: !r.completed } : r)),
    );
  };

  return (
    <main className="min-h-screen bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)] bg-[size:24px_24px] text-gray-900 p-4 pb-24 overflow-x-hidden">
      {/* Header with Date */}
      <header className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-wide text-gray-900 flex items-center gap-3">
            <span className="text-4xl">📅</span> Schedule
          </h1>
          <p className="text-gray-500 font-bold ml-1">
            Today, {new Date().toLocaleDateString("en-US", { weekday: "long" })}
          </p>
        </div>

        {/* "Enable Notifications" Switch (Visual) */}
        <button className="bg-white border-2 border-gray-900 px-3 py-1 rounded-full shadow-hard text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:scale-105 transition-transform">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          Alerts On
        </button>
      </header>

      {/* THE TIMELINE CONTAINER */}
      <div className="relative pl-4 border-l-4 border-gray-300 ml-4 space-y-6">
        {routines.map((routine) => (
          <RoutineItem
            key={routine.id}
            time={routine.time}
            label={routine.label}
            isCompleted={routine.completed}
            onToggle={() => toggleRoutine(routine.id)}
          />
        ))}

        {/* "Add New" Button - Looks like a ghost item */}
        <div className="flex items-center gap-4 pt-4 opacity-50 hover:opacity-100 transition-opacity cursor-pointer group">
          <div className="w-20 text-right font-bold text-gray-400 text-sm">
            --:--
          </div>
          <div className="flex-1 border-2 border-dashed border-gray-400 rounded-lg p-3 flex items-center justify-center gap-2 text-gray-500 font-bold uppercase group-hover:border-gray-900 group-hover:text-gray-900 transition-colors">
            <Plus size={20} /> Add Routine
          </div>
        </div>
      </div>

      {/* Decorative: "All Done" Stamp */}
      {routines.every((r) => r.completed) && (
        <div className="mt-12 flex justify-center animate-in zoom-in duration-500">
          <div className="border-4 border-red-500 text-red-500 rounded-xl px-8 py-2 font-black text-4xl uppercase tracking-widest transform -rotate-12 opacity-80 border-double">
            COMPLETED
          </div>
        </div>
      )}
    </main>
  );
}
