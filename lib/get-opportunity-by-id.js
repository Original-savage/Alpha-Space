import { createClient } from "@/utils/supabase/server";

export async function getOpportunityById(id) {
  const supabase = await createClient();
  const { data, error } = await supabase.from("investment_opportunities").select("*").eq("id", id).single();
  if (error) return null;
  return data;
}

export async function getRelatedOpportunities(category, excludeId) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("investment_opportunities")
    .select("*")
    .eq("category", category)
    .neq("id", excludeId)
    .order("score", { ascending: false })
    .limit(3);
  if (error) return [];
  return data || [];
}
