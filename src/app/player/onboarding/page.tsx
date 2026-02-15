"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import {
  Loader2,
  ArrowRight,
  Dices,
  Search,
  Shield,
  Zap,
  Heart,
  User,
  Crown,
} from "lucide-react";

// --- MOCK DATA ---
const RACES = [
  {
    id: "Human",
    label: "Human",
    desc: "Balanced stats. The versatile adaptable hero.",
    icon: <User size={32} />,
  },
  {
    id: "Elf",
    label: "Elf",
    desc: "High Dexterity. Master of agility and speed.",
    icon: <Zap size={32} />,
  },
  {
    id: "Orc",
    label: "Orc",
    desc: "High Strength. Brute force and power.",
    icon: <Shield size={32} />,
  },
  {
    id: "Dwarf",
    label: "Dwarf",
    desc: "High Constitution. Tough and unyielding.",
    icon: <Heart size={32} />,
  },
];

const STAT_NAMES = [
  "Strength",
  "Dexterity",
  "Constitution",
  "Intelligence",
  "Wisdom",
  "Charisma",
];

export default function OnboardingWizard() {
  const supabase = createClient();
  const router = useRouter();

  const [step, setStep] = useState<1 | 2 | 3>(1); // 1=Campaign, 2=Race, 3=Stats
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  // STEP 1 DATA: Campaign
  const [joinCode, setJoinCode] = useState("");
  const [publicCampaigns, setPublicCampaigns] = useState<any[]>([]);
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(
    null,
  );

  // STEP 2 DATA: Race
  const [selectedRace, setSelectedRace] = useState("Human");

  // STEP 3 DATA: Stats
  const [rolledStats, setRolledStats] = useState<Record<string, number>>({});
  const [rolling, setRolling] = useState<string | null>(null); // Which stat is currently rolling?

  // Init: Get User & Public Campaigns
  useEffect(() => {
    async function init() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) setUserId(user.id);

      // Fetch public campaigns (Limit 5 for now)
      const { data } = await supabase
        .from("campaigns")
        .select("id, name, gm_id, prep_duration_days")
        .eq("is_public", true)
        .limit(5);

      if (data) setPublicCampaigns(data);
    }
    init();
  }, []);

  // --- HANDLERS ---

  const handleJoinCampaign = async () => {
    if (!userId) return;
    setLoading(true);

    let campaignIdToJoin = selectedCampaignId;

    // If using code, find the ID first
    if (!campaignIdToJoin && joinCode) {
      const { data } = await supabase
        .from("campaigns")
        .select("id")
        .eq("join_code", joinCode.toUpperCase())
        .single();
      if (data) campaignIdToJoin = data.id;
      else {
        alert("Invalid Code!");
        setLoading(false);
        return;
      }
    }

    if (!campaignIdToJoin) {
      alert("Please enter a code or select a campaign.");
      setLoading(false);
      return;
    }

    if (!campaignIdToJoin) {
      alert("Please enter a code or select a campaign.");
      setLoading(false);
      return;
    }

    // Join DB
    const { error } = await supabase
      .from("campaign_members")
      .insert({ user_id: userId, campaign_id: campaignIdToJoin });

    if (error) {
      console.error(error);
      // Optional: alert("Failed to join: " + error.message);
    }

    // Move to next step
    setLoading(false);

    // Move to next step
    setLoading(false);
    setStep(2);
  };

  const handleRollStat = (stat: string) => {
    if (rolledStats[stat]) return; // Already rolled
    setRolling(stat);

    // Animation effect
    setTimeout(() => {
      // Roll d20 (bounded 8-20 for fun gameplay, nobody likes starting with 1 stat)
      const val = Math.floor(Math.random() * 13) + 8;
      setRolledStats((prev) => ({ ...prev, [stat]: val }));
      setRolling(null);
    }, 800);
  };

  const handleFinish = async () => {
    if (!userId) return;
    setLoading(true);

    // 1. Update Profile (Race)
    await supabase
      .from("profiles")
      .update({ race: selectedRace })
      .eq("id", userId);

    // 2. Update Stats (Initial Rolls)
    await supabase.from("character_stats").upsert({
      user_id: userId,
      strength_xp: rolledStats["Strength"] * 10, // Convert roll to initial XP or base stat? Let's say base XP.
      dexterity_xp: rolledStats["Dexterity"] * 10,
      constitution_xp: rolledStats["Constitution"] * 10,
      intelligence_xp: rolledStats["Intelligence"] * 10,
      wisdom_xp: rolledStats["Wisdom"] * 10,
      charisma_xp: rolledStats["Charisma"] * 10,
    });

    router.push("/player"); // Go to dashboard
  };

  return (
    <main className="min-h-screen bg-[#fdfbf7] p-4 flex items-center justify-center">
      <div className="w-full max-w-lg bg-white border-4 border-gray-900 rounded-xl shadow-hard-lg p-6 relative">
        {/* Progress Bar */}
        <div className="flex gap-2 mb-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`h-2 flex-1 rounded-full transition-colors ${step >= i ? "bg-gray-900" : "bg-gray-200"}`}
            />
          ))}
        </div>

        {/* --- STEP 1: JOIN CAMPAIGN --- */}
        {step === 1 && (
          <div className="animate-in slide-in-from-right duration-300">
            <h1 className="text-3xl font-black uppercase mb-2">Find a Party</h1>
            <p className="text-gray-500 font-bold text-sm mb-6">
              Enter a code from your GM or join a public guild.
            </p>

            {/* Code Input */}
            <div className="mb-6">
              <label className="text-xs font-black text-gray-400 uppercase">
                Secret Code
              </label>
              <div className="flex gap-2 mt-1">
                <input
                  value={joinCode}
                  onChange={(e) => {
                    setJoinCode(e.target.value.toUpperCase());
                    setSelectedCampaignId(null);
                  }}
                  className="flex-1 border-2 border-gray-900 rounded-lg px-4 py-3 font-black text-xl tracking-widest uppercase focus:shadow-hard outline-none transition-all"
                  placeholder="XY92B1"
                  maxLength={6}
                />
              </div>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="h-px bg-gray-200 flex-1"></div>
              <span className="text-xs font-bold text-gray-400 uppercase">
                OR
              </span>
              <div className="h-px bg-gray-200 flex-1"></div>
            </div>

            {/* Public List */}
            <div className="space-y-3 mb-8">
              <label className="text-xs font-black text-gray-400 uppercase">
                Public Guilds
              </label>
              {publicCampaigns.length === 0 ? (
                <div className="text-center py-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-400 font-bold text-sm">
                  No public guilds found.
                </div>
              ) : (
                publicCampaigns.map((camp) => (
                  <div
                    key={camp.id}
                    onClick={() => {
                      setSelectedCampaignId(camp.id);
                      setJoinCode("");
                    }}
                    className={`p-3 border-2 rounded-lg cursor-pointer flex justify-between items-center transition-all ${
                      selectedCampaignId === camp.id
                        ? "border-blue-500 bg-blue-50 shadow-hard"
                        : "border-gray-200 hover:border-gray-900"
                    }`}
                  >
                    <div>
                      <div className="font-bold text-gray-900">{camp.name}</div>
                      <div className="text-xs text-gray-500 font-bold">
                        {camp.prep_duration_days} Days Prep
                      </div>
                    </div>
                    {selectedCampaignId === camp.id && (
                      <div className="text-blue-500">
                        <Crown size={20} />
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>

            <button
              onClick={handleJoinCampaign}
              disabled={(!joinCode && !selectedCampaignId) || loading}
              className="w-full bg-gray-900 text-white font-black uppercase py-4 rounded-xl shadow-hard hover:-translate-y-1 transition-all disabled:opacity-50 disabled:translate-y-0 disabled:shadow-none"
            >
              {loading ? (
                <Loader2 className="animate-spin mx-auto" />
              ) : (
                "Next: Create Character"
              )}
            </button>
          </div>
        )}

        {/* --- STEP 2: CHOOSE RACE --- */}
        {step === 2 && (
          <div className="animate-in slide-in-from-right duration-300">
            <h1 className="text-3xl font-black uppercase mb-2">Who are you?</h1>
            <p className="text-gray-500 font-bold text-sm mb-6">
              Select your lineage. This defines your starting path.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {RACES.map((race) => (
                <div
                  key={race.id}
                  onClick={() => setSelectedRace(race.id)}
                  className={`cursor-pointer border-2 rounded-xl p-4 flex flex-col items-center text-center transition-all relative ${
                    selectedRace === race.id
                      ? "border-gray-900 bg-yellow-100 shadow-hard -translate-y-1"
                      : "border-gray-200 bg-white hover:border-gray-400"
                  }`}
                >
                  <div className="mb-2 text-gray-800">{race.icon}</div>
                  <div className="font-black text-gray-900 uppercase">
                    {race.label}
                  </div>
                  <div className="text-[10px] text-gray-500 font-bold mt-1 leading-tight">
                    {race.desc}
                  </div>

                  {selectedRace === race.id && (
                    <div className="absolute top-2 right-2 text-green-500">
                      <Crown size={16} fill="currentColor" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <button
              onClick={() => setStep(3)}
              className="w-full bg-gray-900 text-white font-black uppercase py-4 rounded-xl shadow-hard hover:-translate-y-1 transition-all"
            >
              Next: Roll Stats
            </button>
          </div>
        )}

        {/* --- STEP 3: ROLL STATS --- */}
        {step === 3 && (
          <div className="animate-in slide-in-from-right duration-300">
            <h1 className="text-3xl font-black uppercase mb-2">
              Roll for Stats
            </h1>
            <p className="text-gray-500 font-bold text-sm mb-6">
              Let the D20 decide your fate.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-8">
              {STAT_NAMES.map((stat) => (
                <div
                  key={stat}
                  className="border-2 border-gray-900 rounded-lg p-3 flex items-center justify-between bg-white shadow-sm"
                >
                  <div>
                    <div className="text-[10px] font-black text-gray-400 uppercase tracking-wider">
                      {stat.substring(0, 3)}
                    </div>
                    <div className="font-bold text-gray-900">{stat}</div>
                  </div>

                  {rolledStats[stat] ? (
                    <div className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center font-black text-lg animate-in zoom-in">
                      {rolledStats[stat]}
                    </div>
                  ) : (
                    <button
                      onClick={() => handleRollStat(stat)}
                      disabled={!!rolling}
                      className="w-10 h-10 rounded-full border-2 border-dashed border-gray-300 hover:border-gray-900 hover:bg-gray-50 flex items-center justify-center transition-colors"
                    >
                      {rolling === stat ? (
                        <Loader2 className="animate-spin" size={16} />
                      ) : (
                        <Dices size={20} />
                      )}
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 mb-6 text-xs font-bold text-yellow-800">
              TIP: These base stats determine your starting XP boost!
            </div>

            <button
              onClick={handleFinish}
              disabled={Object.keys(rolledStats).length < 6 || loading}
              className="w-full bg-green-500 text-white font-black uppercase py-4 rounded-xl shadow-hard hover:-translate-y-1 transition-all disabled:opacity-50 disabled:bg-gray-300 disabled:shadow-none disabled:translate-y-0"
            >
              {loading ? (
                <Loader2 className="animate-spin mx-auto" />
              ) : (
                "Enter the World"
              )}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
