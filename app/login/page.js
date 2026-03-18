"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const supabase = createClient();
  const router = useRouter();

  const [mode, setMode] = useState("login");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");

    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName } },
      });
      if (error) return setMessage(error.message);
      setMessage("Signup successful. Check your email if confirmations are enabled.");
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return setMessage(error.message);
    router.push("/");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8">
        <h1 className="text-3xl font-black">Alpha Space</h1>
        <p className="mt-2 text-slate-300">{mode === "login" ? "Log into your account" : "Create your account"}</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {mode === "signup" ? (
            <input type="text" placeholder="Full name" className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3"
              value={fullName} onChange={(e) => setFullName(e.target.value)} />
          ) : null}
          <input type="email" placeholder="Email" className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3"
            value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" className="w-full rounded-2xl border border-white/10 bg-slate-900 px-4 py-3"
            value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit" className="w-full rounded-2xl bg-cyan-400 px-4 py-3 font-semibold text-slate-950">
            {mode === "login" ? "Log In" : "Sign Up"}
          </button>
        </form>

        {message ? <p className="mt-4 text-sm text-slate-300">{message}</p> : null}

        <button onClick={() => setMode(mode === "login" ? "signup" : "login")} className="mt-4 text-sm text-cyan-300">
          {mode === "login" ? "Need an account? Switch to sign up" : "Already have an account? Switch to login"}
        </button>
      </div>
    </main>
  );
}
