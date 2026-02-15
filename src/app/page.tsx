import Link from "next/link";
import { Sword, Scroll, Shield, Dices } from "lucide-react";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)] bg-[size:24px_24px] bg-[#fdfbf7] flex flex-col items-center justify-center p-4">
      {/* 1. Title Section */}
      <div className="text-center mb-12 animate-in zoom-in duration-500">
        <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-gray-900 drop-shadow-[4px_4px_0px_rgba(0,0,0,0.2)]">
          Buff Quest
        </h1>
        <p className="text-xl md:text-2xl font-bold text-gray-500 mt-4 tracking-wide uppercase">
          Choose Your Path
        </p>
      </div>

      {/* 2. The Selection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
        {/* -- OPTION A: THE ADVENTURER (Player) -- */}
        <Link href="/player" className="group relative">
          {/* Card Container */}
          <div className="bg-white border-4 border-gray-900 rounded-2xl p-8 h-64 flex flex-col items-center justify-center shadow-hard-lg transition-all transform group-hover:-translate-y-2 group-hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,0.2)]">
            {/* Tape Visual */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-blue-200/80 -rotate-2 border-l-2 border-r-2 border-white/50 backdrop-blur-sm"></div>

            {/* Icon */}
            <div className="mb-6 text-gray-900 group-hover:scale-110 transition-transform duration-300">
              <div className="relative">
                <Shield size={64} strokeWidth={2.5} />
                <Sword
                  size={48}
                  className="absolute -right-4 -bottom-2 text-blue-500 transform rotate-12"
                  strokeWidth={3}
                />
              </div>
            </div>

            {/* Text */}
            <h2 className="text-3xl font-black uppercase text-gray-900 tracking-wide">
              Adventurer
            </h2>
            <p className="text-gray-500 font-bold mt-2 text-center text-sm">
              Track stats, complete quests,
              <br />
              and level up IRL.
            </p>

            {/* "Mobile Recommended" Badge */}
            <div className="absolute top-4 right-4 bg-gray-100 border-2 border-gray-300 px-2 py-1 rounded text-[10px] font-bold uppercase text-gray-400">
              Mobile App
            </div>
          </div>
        </Link>

        {/* -- OPTION B: THE GAME MASTER (GM) -- */}
        <Link href="/gm" className="group relative">
          {/* Card Container */}
          <div className="bg-gray-900 border-4 border-gray-900 rounded-2xl p-8 h-64 flex flex-col items-center justify-center shadow-hard-lg transition-all transform group-hover:-translate-y-2 group-hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,0.5)]">
            {/* Tape Visual */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-yellow-500 -rotate-1 border-l-2 border-r-2 border-white/20"></div>

            {/* Icon */}
            <div className="mb-6 text-yellow-400 group-hover:scale-110 transition-transform duration-300">
              <div className="relative">
                <Scroll size={64} strokeWidth={2.5} />
                <Dices
                  size={32}
                  className="absolute -right-2 -bottom-2 text-white transform -rotate-12"
                />
              </div>
            </div>

            {/* Text */}
            <h2 className="text-3xl font-black uppercase text-white tracking-wide">
              Game Master
            </h2>
            <p className="text-gray-400 font-bold mt-2 text-center text-sm">
              Create worlds, manage players,
              <br />
              and run campaigns.
            </p>

            {/* "Desktop Recommended" Badge */}
            <div className="absolute top-4 right-4 bg-gray-800 border-2 border-gray-700 px-2 py-1 rounded text-[10px] font-bold uppercase text-gray-500">
              Desktop
            </div>
          </div>
        </Link>
      </div>

      {/* 3. Footer / Login Link */}
      <div className="mt-16 text-center">
        <Link
          href="/auth/login"
          className="text-gray-500 font-bold uppercase tracking-widest text-sm hover:text-gray-900 underline decoration-2 underline-offset-4 transition-colors"
        >
          Already have an account? Login here
        </Link>
      </div>
    </main>
  );
}
