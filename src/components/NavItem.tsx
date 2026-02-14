import React from "react";
import Link from "next/link";

export function NavItem({
  icon,
  label,
  href = "#", // Default to "#" so it doesn't break if you forget a link
  active = false,
}: {
  icon: React.ReactNode;
  label: string;
  href?: string; // New optional prop
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`relative p-2 transition-all flex flex-col items-center ${
        active
          ? "text-red-500 -translate-y-2 scale-110"
          : "text-gray-400 hover:text-gray-900 hover:-translate-y-1"
      }`}
    >
      {/* Active Indicator Dot */}
      {active && (
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-red-500 rounded-full"></div>
      )}
      {icon}
      {/* Optional: Show label on hover or always if you want */}
      <span className="sr-only">{label}</span>
    </Link>
  );
}
