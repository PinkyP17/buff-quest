"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import Image from "next/image";

export default function AuthForm() {
  const supabase = createClient();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (isSignUp) {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { username: email.split("@")[0] },
        },
      });
      if (error) setError(error.message);
      else setError("Check your email for the confirmation link!");
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

  return (
    <div className="w-full max-w-sm flex flex-col items-center">
      {/* Logo */}
      <div className="mb-2">
        <Image
          src="/buff-quest-logo.png"
          alt="Buff Quest Logo"
          width={180}
          height={120}
          className="object-contain"
          priority
        />
      </div>

      {/* Title */}
      <h1 className="text-4xl font-black mb-8 tracking-wide">
        <span className="text-slate-800 drop-shadow-[2px_2px_0px_rgba(255,255,255,1)] [-webkit-text-stroke:2px_black]">
          Buff
        </span>
        <span className="mx-4"></span>
        <span className="text-slate-800 drop-shadow-[2px_2px_0px_rgba(255,255,255,1)] [-webkit-text-stroke:2px_black]">
          Quest
        </span>
      </h1>

      {/* Form */}
      <form onSubmit={handleAuth} className="w-full space-y-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Email
          </label>
          <input
            type="email"
            required
            className="w-full bg-white border-2 border-slate-300 text-slate-900 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-red-400 focus:border-red-400 outline-none transition-all"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Password
          </label>
          <input
            type="password"
            required
            className="w-full bg-white border-2 border-slate-300 text-slate-900 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-red-400 focus:border-red-400 outline-none transition-all"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && (
          <div className="bg-red-100 border border-red-300 text-red-600 text-sm p-3 rounded-lg">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold py-2.5 px-4 rounded-lg transition-all flex items-center justify-center disabled:opacity-50 border-2 border-slate-300"
        >
          {loading ? (
            <Loader2 className="animate-spin w-5 h-5" />
          ) : isSignUp ? (
            "Sign Up"
          ) : (
            "Login"
          )}
        </button>
      </form>

      {/* Sign Up Toggle */}
      <div className="mb-8 text-center">
        <button
          onClick={() => setIsSignUp(!isSignUp)}
          className="text-red-500 hover:text-red-600 font-semibold transition-colors"
        >
          {isSignUp ? "Login" : "Sign up"}
        </button>
        <span className="text-slate-600 ml-1">
          {isSignUp ? " Already have an account!" : " Shadow Wizard Money Gang!"}
        </span>
      </div>

      {/* Animated Icons */}
      <div className="flex items-end justify-center gap-6 overflow-visible">
        {/* D20 Dice */}
        <div className="animate-rabbit-hop-1">
          <Image
            src="/dice-icon.png"
            alt="D20 Dice"
            width={56}
            height={56}
            className="object-contain"
          />
        </div>

        {/* Dumbbell */}
        <div className="animate-rabbit-hop-2" style={{ animationDelay: "0.2s" }}>
          <Image
            src="/dumbbell-icon.png"
            alt="Dumbbell"
            width={64}
            height={64}
            className="object-contain"
          />
        </div>

        {/* Flame */}
        <div className="animate-rabbit-hop-3" style={{ animationDelay: "0.4s" }}>
          <Image
            src="/flame-icon.png"
            alt="Flame"
            width={56}
            height={56}
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}
