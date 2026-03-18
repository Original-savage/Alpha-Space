import { createClient } from "@/utils/supabase/server";

export async function getWatchlist() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from("watchlists")
    .select(`
      id,
      opportunity_id,
      investment_opportunities (
        id,
        name,
        category,
        risk,
        liquidity,
        expected_return,
        fit,
        score
      )
    `)
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) return [];
  return data || [];
}
