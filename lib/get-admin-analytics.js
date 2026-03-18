import { createClient } from "@/utils/supabase/server";

function getStartDateFromRange(range) {
  const date = new Date();
  if (range === "7d") { date.setDate(date.getDate() - 7); return date.toISOString(); }
  if (range === "30d") { date.setDate(date.getDate() - 30); return date.toISOString(); }
  if (range === "90d") { date.setDate(date.getDate() - 90); return date.toISOString(); }
  return null;
}

export async function getAdminAnalytics(range = "30d") {
  const supabase = await createClient();
  const startDate = getStartDateFromRange(range);

  const watchlistsCountQuery = startDate
    ? supabase.from("watchlists").select("*", { count: "exact", head: true }).gte("created_at", startDate)
    : supabase.from("watchlists").select("*", { count: "exact", head: true });

  const partnerClicksCountQuery = startDate
    ? supabase.from("partner_clicks").select("*", { count: "exact", head: true }).gte("clicked_at", startDate)
    : supabase.from("partner_clicks").select("*", { count: "exact", head: true });

  const watchlistsRowsQuery = startDate
    ? supabase.from("watchlists").select("id, opportunity_id").gte("created_at", startDate)
    : supabase.from("watchlists").select("id, opportunity_id");

  const partnerRowsQuery = startDate
    ? supabase.from("partner_clicks").select("id, partner_name, opportunity_id").gte("clicked_at", startDate)
    : supabase.from("partner_clicks").select("id, partner_name, opportunity_id");

  const [
    { count: totalOpportunities },
    { count: totalArticles },
    { count: totalWatchlists },
    { count: totalPartnerClicks },
    { data: opportunityRows },
    { data: watchlistRows },
    { data: partnerRows },
  ] = await Promise.all([
    supabase.from("investment_opportunities").select("*", { count: "exact", head: true }),
    supabase.from("articles").select("*", { count: "exact", head: true }),
    watchlistsCountQuery,
    partnerClicksCountQuery,
    supabase.from("investment_opportunities").select("id, name, category, score"),
    watchlistsRowsQuery,
    partnerRowsQuery,
  ]);

  const watchlistMap = {};
  for (const row of watchlistRows || []) watchlistMap[row.opportunity_id] = (watchlistMap[row.opportunity_id] || 0) + 1;

  const clickMap = {};
  for (const row of partnerRows || []) clickMap[row.opportunity_id] = (clickMap[row.opportunity_id] || 0) + 1;

  const opportunities = (opportunityRows || []).map((item) => ({
    id: item.id,
    name: item.name,
    category: item.category,
    score: item.score,
    watchlistCount: watchlistMap[item.id] || 0,
    clickCount: clickMap[item.id] || 0,
  }));

  const topWatched = [...opportunities].sort((a, b) => b.watchlistCount - a.watchlistCount).slice(0, 5);
  const topClicked = [...opportunities].sort((a, b) => b.clickCount - a.clickCount).slice(0, 5);

  const partnerMap = {};
  for (const row of partnerRows || []) partnerMap[row.partner_name] = (partnerMap[row.partner_name] || 0) + 1;

  const partnerBreakdown = Object.entries(partnerMap).map(([partnerName, clicks]) => ({ partnerName, clicks })).sort((a, b) => b.clicks - a.clicks);

  return {
    totals: {
      totalOpportunities: totalOpportunities || 0,
      totalArticles: totalArticles || 0,
      totalWatchlists: totalWatchlists || 0,
      totalPartnerClicks: totalPartnerClicks || 0,
    },
    topWatched,
    topClicked,
    partnerBreakdown,
    range,
  };
}
