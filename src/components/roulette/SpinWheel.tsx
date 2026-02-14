"use client";

import React, { useState, useRef } from "react";

// The 6 Stats and their corresponding colors
export const WHEEL_ITEMS = [
  { id: "STR", label: "Strength", color: "#f87171", textColor: "white" }, // Red
  { id: "DEX", label: "Dexterity", color: "#34d399", textColor: "white" }, // Green
  { id: "CON", label: "Constitution", color: "#facc15", textColor: "white" }, // Yellow
  { id: "INT", label: "Intelligence", color: "#60a5fa", textColor: "white" }, // Blue
  { id: "WIS", label: "Wisdom", color: "#c084fc", textColor: "white" }, // Purple
  { id: "CHA", label: "Charisma", color: "#f472b6", textColor: "white" }, // Pink
];

interface SpinWheelProps {
  onSpinComplete: (result: (typeof WHEEL_ITEMS)[0]) => void;
  isSpinning: boolean;
}

export function SpinWheel({ onSpinComplete, isSpinning }: SpinWheelProps) {
  const [rotation, setRotation] = useState(0);
  const wheelRef = useRef<HTMLDivElement>(null);

  const handleSpin = () => {
    if (isSpinning) return;

    // 1. Calculate a new random rotation
    // Min 5 spins (1800 deg) + Random segment (0-360)
    const newRotation = rotation + 1800 + Math.floor(Math.random() * 360);
    setRotation(newRotation);

    // 2. Wait for animation to finish (3s) to calculate result
    setTimeout(() => {
      // Math to find which segment is at the TOP (0deg)
      // Because we rotate clockwise, the value at the top "decreases"
      const degrees = newRotation % 360;
      const effectiveAngle = (360 - degrees) % 360;

      // Each segment is 60 degrees (360 / 6)
      const index = Math.floor(effectiveAngle / 60);

      onSpinComplete(WHEEL_ITEMS[index]);
    }, 3000); // Must match CSS transition duration
  };

  return (
    <div className="relative w-72 h-72 sm:w-80 sm:h-80 mx-auto">
      {/* The Pointer (Taped to the top) */}
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
        <div className="w-4 h-4 rounded-full bg-gray-300 border-2 border-gray-900 shadow-sm mb-[-10px] z-10"></div>{" "}
        {/* Pin */}
        <div className="w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[30px] border-t-red-600 drop-shadow-md"></div>
      </div>

      {/* The Wheel Board (Behind the wheel, darker shadow) */}
      <div className="absolute inset-0 rounded-full bg-gray-900 translate-y-2 translate-x-2 rounded-full"></div>

      {/* The Rotating Wheel */}
      <div
        ref={wheelRef}
        className="w-full h-full rounded-full border-4 border-gray-900 shadow-hard overflow-hidden relative transition-transform duration-[3000ms] cubic-bezier(0.15, 0.25, 0, 1)"
        style={{
          transform: `rotate(${rotation}deg)`,
          background: `conic-gradient(
            ${WHEEL_ITEMS[0].color} 0deg 60deg,
            ${WHEEL_ITEMS[1].color} 60deg 120deg,
            ${WHEEL_ITEMS[2].color} 120deg 180deg,
            ${WHEEL_ITEMS[3].color} 180deg 240deg,
            ${WHEEL_ITEMS[4].color} 240deg 300deg,
            ${WHEEL_ITEMS[5].color} 300deg 360deg
          )`,
        }}
      >
        {/* Render Letters inside the wheel */}
        {WHEEL_ITEMS.map((item, index) => {
          // 30deg puts us in the middle of the first 60deg slice
          const rotationAngle = index * 60 + 30;

          return (
            <div
              key={item.id}
              // This container acts like a clock hand pointing UP from the center
              className="absolute top-0 left-1/2 w-12 h-1/2 -ml-6 origin-bottom pointer-events-none flex justify-center pt-6"
              style={{
                transform: `rotate(${rotationAngle}deg)`,
              }}
            >
              {/* The Letter */}
              <span
                className="font-black text-4xl drop-shadow-md"
                style={{
                  color: item.textColor,
                  // Optional: Rotate text to be upright or keep radial?
                  // Radial (default) usually looks best on wheels.
                }}
              >
                {item.label[0]} {/* Shows S, D, C, I, W, C */}
              </span>
            </div>
          );
        })}

        {/* Center Cap */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white border-4 border-gray-900 rounded-full flex items-center justify-center z-10 shadow-sm">
          <span className="text-2xl">🎲</span>
        </div>
      </div>

      {/* Trigger Button (Invisible, covers wheel if you want tap-to-spin, or keep separate) */}
      <button
        onClick={handleSpin}
        disabled={isSpinning}
        className="absolute inset-0 w-full h-full rounded-full cursor-pointer disabled:cursor-not-allowed z-30"
        aria-label="Spin the wheel"
      />
    </div>
  );
}
