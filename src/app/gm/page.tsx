"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Copy, Loader2, Sword, Scroll, Hourglass } from "lucide-react";
import { NavItem } from "@/components/NavItem"; // Assuming you have a GM nav or similar
import { Home } from "lucide-react";

export default function CreateCampaign() {
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);

  // Form State
  const [campaignName, setCampaignName] = useState("");
  const [prepDays, setPrepDays] = useState(7);

  const generateCode = () => {
    // Generate a random 6-character string (A-Z, 0-9)
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const newCode = generateCode();

    // 1. Get current user (The GM)
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("You must be logged in to create a campaign");
      setLoading(false);
      return;
    }

    // 2. Insert into the NEW 'campaigns' table
    const { error } = await supabase.from("campaigns").insert({
      gm_id: user.id,
      name: campaignName,
      join_code: newCode,
      prep_duration_days: prepDays,
      status: "prep",
    });

    if (error) {
      alert("Error creating campaign: " + error.message);
    } else {
      setGeneratedCode(newCode);
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)] bg-[size:24px_24px] text-gray-900 p-4 pb-24 flex items-center justify-center">
      <div className="w-full max-w-lg">
        {/* Header Visual */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black uppercase tracking-widest flex items-center justify-center gap-3">
            <Sword size={32} className="text-gray-900" />
            DM Control
          </h1>
          <p className="text-gray-500 font-bold mt-2">Forge a new adventure</p>
        </div>

        {/* The "Clipboard" Card */}
        <div className="bg-white border-4 border-gray-900 rounded-xl p-8 shadow-hard-lg relative transform rotate-1">
          {/* Metal Clip Visual */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-32 h-12 bg-gray-200 border-4 border-gray-900 rounded-t-lg z-10 flex items-center justify-center">
            <div className="w-20 h-4 bg-gray-900 rounded-full opacity-20"></div>
          </div>

          {!generatedCode ? (
            /* --- STEP 1: CREATE FORM --- */
            <form onSubmit={handleCreate} className="space-y-6 mt-4">
              {/* Campaign Name */}
              <div className="group">
                <label className="flex items-center gap-2 text-xs font-black text-gray-500 uppercase mb-2">
                  <Scroll size={14} /> Campaign Title
                </label>
                <input
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                  className="w-full bg-yellow-50 border-2 border-gray-900 rounded-lg px-4 py-3 font-bold text-lg focus:shadow-hard focus:-translate-y-1 focus:bg-white outline-none transition-all placeholder:text-yellow-200/50"
                  placeholder="The Lost Mines..."
                  required
                />
              </div>

              {/* Prep Duration Slider */}
              <div className="group">
                <div className="flex justify-between items-end mb-2">
                  <label className="flex items-center gap-2 text-xs font-black text-gray-500 uppercase">
                    <Hourglass size={14} /> Training Period
                  </label>
                  <span className="text-blue-600 font-black text-xl">
                    {prepDays} Days
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={prepDays}
                  onChange={(e) => setPrepDays(parseInt(e.target.value))}
                  className="w-full accent-blue-600 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer border-2 border-gray-900"
                />
                <p className="text-[10px] font-bold text-gray-400 mt-1 text-right">
                  Players have {prepDays} days to grind stats before the game
                  starts.
                </p>
              </div>

              <div className="border-t-2 border-dashed border-gray-200 my-4"></div>

              <button
                disabled={loading}
                className="w-full bg-gray-900 text-white font-black uppercase tracking-wider py-4 rounded-xl shadow-[4px_4px_0px_0px_#9ca3af] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none active:bg-black transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Generate Join Code"
                )}
              </button>
            </form>
          ) : (
            /* --- STEP 2: THE TICKET (RESULT) --- */
            <div className="mt-4 animate-in zoom-in duration-300">
              <div
                className="bg-yellow-400 border-4 border-dashed border-gray-900 p-6 rounded-lg text-center relative overflow-hidden group cursor-pointer"
                onClick={() => {
                  navigator.clipboard.writeText(generatedCode);
                  alert("Code Copied!");
                }}
              >
                {/* "Tear here" visuals */}
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full"></div>
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full"></div>

                <p className="text-xs font-black text-yellow-800 uppercase mb-2 tracking-widest">
                  Access Code
                </p>
                <div className="text-6xl font-black text-gray-900 font-mono tracking-wider mb-2 drop-shadow-sm">
                  {generatedCode}
                </div>

                <div className="flex items-center justify-center gap-2 text-gray-900 font-bold text-sm opacity-60 group-hover:opacity-100 transition-opacity">
                  <Copy size={16} /> Click to Copy
                </div>
              </div>

              <p className="text-center text-gray-500 font-bold text-sm mt-6 mb-4">
                Share this code with your players.
                <br />
                They will need it to join the lobby.
              </p>

              <button
                onClick={() => {
                  setGeneratedCode(null);
                  setCampaignName("");
                }}
                className="w-full bg-white text-gray-900 border-2 border-gray-900 font-bold uppercase py-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Create Another
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Optional: Simple Back Button */}
      <div className="fixed bottom-4 right-4">
        <NavItem href="/" icon={<Home size={24} />} label="Dashboard" />
      </div>
    </main>
  );
}
