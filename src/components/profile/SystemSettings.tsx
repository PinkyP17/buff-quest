"use client";

import { Save, LogOut } from "lucide-react";

export function SystemSettings() {
  return (
    <div className="animate-in fade-in zoom-in duration-300 space-y-6">
      {/* Edit Name */}
      <div className="group">
        <label className="block text-xs font-black text-gray-500 uppercase mb-1">
          Change Hero Name
        </label>
        <input
          type="text"
          placeholder="New Name..."
          className="w-full bg-gray-50 border-2 border-gray-900 rounded-lg px-4 py-2 font-bold focus:shadow-hard focus:-translate-y-1 focus:bg-white outline-none transition-all"
        />
      </div>

      {/* Edit Password */}
      <div className="group">
        <label className="block text-xs font-black text-gray-500 uppercase mb-1">
          Update Rune (Password)
        </label>
        <input
          type="password"
          placeholder="••••••••"
          className="w-full bg-gray-50 border-2 border-gray-900 rounded-lg px-4 py-2 font-bold focus:shadow-hard focus:-translate-y-1 focus:bg-white outline-none transition-all"
        />
      </div>

      <div className="h-px bg-gray-200 my-4 border-t border-dashed border-gray-300"></div>

      {/* Buttons */}
      <button className="w-full bg-green-500 text-white border-2 border-gray-900 py-3 rounded-lg font-black uppercase tracking-wider shadow-hard hover:-translate-y-1 hover:shadow-hard-lg transition-all flex items-center justify-center gap-2">
        <Save size={20} /> Save Data
      </button>

      <button className="w-full bg-red-100 text-red-600 border-2 border-red-500 py-3 rounded-lg font-black uppercase tracking-wider hover:bg-red-200 transition-all flex items-center justify-center gap-2">
        <LogOut size={20} /> Save & Quit
      </button>
    </div>
  );
}
