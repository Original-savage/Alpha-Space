"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function WatchlistButton({ opportunityId, userId, isSaved = false }) {
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(isSaved);
  const router = useRouter();

  async function handleClick() {
    if (!userId) {
      router.push("/login");
      return;
    }

    setLoading(true);
    const supabase = createClient();

    if (saved) {
      const { error } = await supabase.from("watchlists").delete().eq("user_id", userId).eq("opportunity_id", opportunityId);
      if (!error) {
        setSaved(false);
        router.refresh();
      }
    } else {
      const { error } = await supabase.from("watchlists").insert({ user_id: userId, opportunity_id: opportunityId });
      if (!error) {
        setSaved(true);
        router.refresh();
      }
    }

    setLoading(false);
  }

  return (
    <button onClick={handleClick} disabled={loading} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white">
      {loading ? "Please wait..." : saved ? "Remove from Watchlist" : "Save to Watchlist"}
    </button>
  );
}
