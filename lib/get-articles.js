import { createClient } from "@/utils/supabase/server";

export async function getArticles() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("articles").select("*").eq("is_published", true).order("created_at", { ascending: false });
  if (error) return [];
  return data || [];
}

export async function getArticleBySlug(slug) {
  const supabase = await createClient();
  const { data, error } = await supabase.from("articles").select("*").eq("slug", slug).eq("is_published", true).single();
  if (error) return null;
  return data;
}
