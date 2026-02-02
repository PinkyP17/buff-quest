"use client"; // This is a Client Component because it uses state (useState)

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Loader2, ShieldCheck } from "lucide-react";

export default function AuthForm() {
  const supabase = createClient();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSignUp, setIsSignUp] = useState(false); // Toggle between Login and Sign Up

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (isSignUp) {
      // 1. Handle Sign Up
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          // This saves the username to the 'profiles' table via our trigger
          data: { username: email.split("@")[0] },
        },
      });
      if (error) setError(error.message);
      else setError("Check your email for the confirmation link!");
    } else {
      // 2. Handle Login
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) setError(error.message);
      else router.push("/"); // Redirect to home on success
    }
    setLoading(false);
  };

  return (
    <div className="w-full max-w-md bg-slate-900 border border-slate-800 p-8 rounded-xl shadow-2xl">
      <div className="text-center mb-8">
        <ShieldCheck className="w-12 h-12 text-indigo-500 mx-auto mb-2" />
        <h2 className="text-2xl font-bold text-white">
          {isSignUp ? "Join the Guild" : "Welcome Back"}
        </h2>
        <p className="text-slate-400 text-sm">
          {isSignUp
            ? "Start your fitness journey today."
            : "Login to track your stats."}
        </p>
      </div>

      <form onSubmit={handleAuth} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1 uppercase tracking-wider">
            Email
          </label>
          <input
            type="email"
            required
            className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1 uppercase tracking-wider">
            Password
          </label>
          <input
            type="password"
            required
            className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-lg">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg transition-all flex items-center justify-center disabled:opacity-50"
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

      <div className="mt-6 text-center">
        <button
          onClick={() => setIsSignUp(!isSignUp)}
          className="text-slate-400 hover:text-indigo-400 text-sm transition-colors"
        >
          {isSignUp
            ? "Already have an account? Login"
            : "Don't have an account? Sign Up"}
        </button>
      </div>
    </div>
  );
}
