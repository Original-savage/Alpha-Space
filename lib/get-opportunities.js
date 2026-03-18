import { createClient } from "@/utils/supabase/server";

export async function getOpportunities() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("investment_opportunities").select("*").order("score", { ascending: false });
  if (error) return [];
  return data || [];
}
