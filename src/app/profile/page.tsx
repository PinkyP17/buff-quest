"use client";

import { useState } from "react";
import { NavItem } from "@/components/NavItem";
import { Home, Swords, User, Calendar } from "lucide-react";

// Import your new feature components
import { LicenseCard } from "@/components/profile/LicenseCard";
import { SystemSettings } from "@/components/profile/SystemSettings";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<"card" | "settings">("card");

  return (
    <main className="min-h-screen bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)] bg-[size:24px_24px] text-gray-900 p-4 pb-24 overflow-x-hidden">
      {/* Page Title */}
      <h1 className="text-3xl font-black uppercase tracking-wide text-gray-900 mb-6 flex items-center gap-3">
        <span className="text-4xl">📂</span> Dossier
      </h1>

      {/* TABS (Folder Look) */}
      <div className="flex gap-2 pl-2 relative z-10 -mb-[2px]">
        <button
          onClick={() => setActiveTab("card")}
          className={`px-6 py-2 rounded-t-xl font-bold border-2 border-b-0 border-gray-900 transition-all ${
            activeTab === "card"
              ? "bg-white text-gray-900 h-12 -translate-y-1"
              : "bg-gray-200 text-gray-500 h-10 mt-2 hover:bg-gray-100"
          }`}
        >
          License
        </button>
        <button
          onClick={() => setActiveTab("settings")}
          className={`px-6 py-2 rounded-t-xl font-bold border-2 border-b-0 border-gray-900 transition-all ${
            activeTab === "settings"
              ? "bg-white text-gray-900 h-12 -translate-y-1"
              : "bg-gray-200 text-gray-500 h-10 mt-2 hover:bg-gray-100"
          }`}
        >
          System
        </button>
      </div>

      {/* MAIN FOLDER CONTAINER */}
      <div className="bg-white border-4 border-gray-900 rounded-b-xl rounded-tr-xl shadow-hard-lg p-6 min-h-[500px] relative">
        {activeTab === "card" ? <LicenseCard /> : <SystemSettings />}
      </div>

      {/* Navigation */}
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
          />
          <NavItem
            href="/profile"
            icon={<User size={28} strokeWidth={2.5} />}
            label="Profile"
            active
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
