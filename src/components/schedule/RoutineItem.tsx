"use client";

import { useState } from "react";
import { Check, Bell } from "lucide-react";

interface RoutineProps {
  time: string;
  label: string;
  isCompleted: boolean;
  onToggle: () => void;
}

export function RoutineItem({
  time,
  label,
  isCompleted,
  onToggle,
}: RoutineProps) {
  return (
    <div
      className={`group relative flex items-center gap-4 transition-all duration-300 ${
        isCompleted ? "opacity-60" : "opacity-100"
      }`}
    >
      {/* 1. The Time Slot (Left) */}
      <div className="w-20 shrink-0 text-right">
        <span
          className={`font-black text-sm tracking-wider ${isCompleted ? "text-gray-400" : "text-gray-900"}`}
        >
          {time}
        </span>
      </div>

      {/* 2. The Task Strip (Right) */}
      <div
        onClick={onToggle}
        className={`flex-1 cursor-pointer border-2 border-gray-900 rounded-lg p-3 shadow-hard transition-all relative overflow-hidden
          ${
            isCompleted
              ? "bg-gray-200 translate-y-1 shadow-none border-gray-400"
              : "bg-white hover:-translate-y-1 hover:bg-yellow-50"
          }
        `}
      >
        {/* The "Sword Slash" Line (Visible when completed) */}
        <div
          className={`absolute top-1/2 left-0 w-full h-1 bg-red-500 transform -rotate-1 transition-transform duration-300 origin-left z-20 ${
            isCompleted ? "scale-x-100" : "scale-x-0"
          }`}
        ></div>

        <div className="flex justify-between items-center relative z-10">
          <span
            className={`font-bold text-lg uppercase ${isCompleted ? "text-gray-500" : "text-gray-900"}`}
          >
            {label}
          </span>

          {/* Checkbox Visual */}
          <div
            className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
              isCompleted ? "bg-gray-900 border-gray-900" : "border-gray-300"
            }`}
          >
            {isCompleted && (
              <Check size={16} className="text-white" strokeWidth={4} />
            )}
          </div>
        </div>
      </div>

      {/* 3. Notification Indicator (Optional visual) */}
      <div className="absolute -right-2 top-1/2 -translate-y-1/2 translate-x-full pl-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="bg-blue-100 p-1.5 rounded-full border-2 border-gray-900 text-blue-600">
          <Bell size={12} fill="currentColor" />
        </div>
      </div>
    </div>
  );
}
