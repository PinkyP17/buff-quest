"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import Image from "next/image";

export default function AuthForm() {
  const supabase = createClient();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isSignUp, setIsSignUp] = useState(false);

  // Check for error in URL params
  useEffect(() => {
    const errorParam = searchParams.get("error");
    if (errorParam) {
      setError(errorParam);
    }
  }, [searchParams]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    if (isSignUp) {
      if (password !== confirmPassword) {
        setError("Passwords do not match!");
        setLoading(false);
        return;
      }

      if (password.length < 6) {
        setError("Password must be at least 6 characters!");
        setLoading(false);
        return;
      }

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { username: username || email.split("@")[0] },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) {
        setError(error.message);
      } else {
        setMessage("Check your email for the confirmation link!");
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) setError(error.message);
      else router.push("/");
    }
    setLoading(false);
  };

  // --- PAPER MARIO STYLES ---

  const inputClasses =
    "w-full bg-white border-2 border-gray-900 rounded-lg px-4 py-3 text-gray-900 font-bold placeholder:text-gray-400 placeholder:font-normal outline-none transition-all focus:shadow-hard focus:-translate-y-1 focus:bg-yellow-50";

  const buttonClasses =
    "w-full text-lg font-black uppercase tracking-wider py-3 px-4 rounded-lg transition-all flex items-center justify-center border-2 border-gray-900 shadow-hard hover:-translate-y-1 hover:shadow-hard-lg active:translate-y-0 active:shadow-none bg-blue-500 text-white hover:bg-blue-400";

  return (
    <div className="w-full max-w-sm relative mt-10">
      {/* 1. The Hanging Sign */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 z-20 pointer-events-none">
        <div className="absolute top-0 left-8 w-1 h-12 bg-gray-800"></div>
        <div className="absolute top-0 right-8 w-1 h-12 bg-gray-800"></div>

        <div
          className="mt-10 bg-amber-600 border-4 border-gray-900 rounded-lg p-2 shadow-hard transform origin-top"
          style={{ animation: "swing 3s ease-in-out infinite" }}
        >
          <div className="border-2 border-amber-800 border-dashed rounded px-4 py-2 bg-amber-500">
            <p className="text-white font-black text-center text-lg uppercase tracking-tight drop-shadow-md">
              {isSignUp ? "New Recruits" : "Guild Login"}
            </p>
          </div>
        </div>
      </div>

      {/* 2. The Form Card */}
      <div className="bg-white border-4 border-gray-900 rounded-2xl shadow-hard-lg p-8 pt-12 relative transform rotate-1">
        {/* Tape Strips */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-8 bg-yellow-200/90 border-l border-r border-white/40 rotate-1 z-10"></div>

        <div className="text-center mb-6">
          <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tighter">
            Buff Quest
          </h1>
          <p className="text-gray-500 font-bold text-sm">
            {isSignUp ? "Create your character" : "Resume your adventure"}
          </p>
        </div>

        <form onSubmit={handleAuth} className="space-y-4">
          {isSignUp && (
            <div className="group">
              <label className="block text-xs font-black text-gray-500 uppercase mb-1 ml-1 group-focus-within:text-blue-500">
                Hero Name
              </label>
              <input
                type="text"
                required
                placeholder="Sir Lifts-a-Lot"
                className={inputClasses}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          )}

          <div className="group">
            <label className="block text-xs font-black text-gray-500 uppercase mb-1 ml-1 group-focus-within:text-blue-500">
              Scroll of Identity (Email)
            </label>
            <input
              type="email"
              required
              placeholder="hero@example.com"
              className={inputClasses}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="group">
            <label className="block text-xs font-black text-gray-500 uppercase mb-1 ml-1 group-focus-within:text-blue-500">
              Secret Rune (Password)
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              className={inputClasses}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {isSignUp && (
            <div className="group">
              <label className="block text-xs font-black text-gray-500 uppercase mb-1 ml-1 group-focus-within:text-blue-500">
                Confirm Rune
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                className={inputClasses}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          )}

          {error && (
            <div className="bg-red-100 border-2 border-red-500 text-red-600 font-bold text-sm p-3 rounded-lg transform -rotate-1">
              ⚠️ {error}
            </div>
          )}
          {message && (
            <div className="bg-green-100 border-2 border-green-500 text-green-700 font-bold text-sm p-3 rounded-lg transform rotate-1">
              📬 {message}
            </div>
          )}

          <div className="pt-2">
            <button type="submit" disabled={loading} className={buttonClasses}>
              {loading ? (
                <Loader2 className="animate-spin w-6 h-6" />
              ) : isSignUp ? (
                "Start Adventure!"
              ) : (
                "Continue"
              )}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center border-t-2 border-gray-100 pt-4 border-dashed">
          <button
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError(null);
              setMessage(null);
              setConfirmPassword("");
            }}
            className="text-sm font-bold text-gray-500 hover:text-gray-900 underline decoration-2 decoration-gray-300 hover:decoration-gray-900 transition-all"
          >
            {isSignUp
              ? "Already a member? Login here"
              : "New to the guild? Sign Up"}
          </button>
        </div>
      </div>

      {/* 3. YOUR ORIGINAL ICONS (Hopping Animation) */}
      <div className="flex justify-center gap-6 mt-8 overflow-visible">
        {/* D20 Dice */}
        <div className="animate-[rabbit-hop-1_4s_ease-in-out_infinite]">
          <Image
            src="/dice-icon.png"
            alt="D20 Dice"
            width={56}
            height={56}
            className="object-contain drop-shadow-md"
          />
        </div>

        {/* Dumbbell */}
        <div className="animate-[rabbit-hop-2_4s_ease-in-out_infinite] animation-delay-300">
          <Image
            src="/dumbbell-icon.png"
            alt="Dumbbell"
            width={64}
            height={64}
            className="object-contain drop-shadow-md"
          />
        </div>

        {/* Flame */}
        <div className="animate-[rabbit-hop-3_4s_ease-in-out_infinite] animation-delay-600">
          <Image
            src="/flame-icon.png"
            alt="Flame"
            width={56}
            height={56}
            className="object-contain drop-shadow-md"
          />
        </div>
      </div>
    </div>
  );
}
