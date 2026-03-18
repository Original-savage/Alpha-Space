"use client";

import { createClient } from "@/utils/supabase/client";

export default function PartnerLinkButton({ userId, partnerName, opportunityId, href = "#" }) {
  async function handleClick() {
    if (userId) {
      const supabase = createClient();
      await supabase.from("partner_clicks").insert({
        user_id: userId,
        partner_name: partnerName,
        opportunity_id: opportunityId,
      });
    }
    window.open(href, "_blank", "noopener,noreferrer");
  }

  return (
    <button onClick={handleClick} className="inline-block rounded-2xl bg-cyan-400 px-4 py-3 font-semibold text-slate-950">
      Visit Partner
    </button>
  );
}
