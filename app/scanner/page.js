import Link from "next/link";
import SiteNavbar from "@/components/site-navbar";
import { getOpportunities } from "@/lib/get-opportunities";
import { createClient } from "@/utils/supabase/server";
import WatchlistButton from "@/components/watchlist-button";

export default async function ScannerPage() {
  const opportunities = await getOpportunities();
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: savedItems } = user ? await supabase.from("watchlists").select("opportunity_id").eq("user_id", user.id) : { data: [] };
  const savedIds = new Set((savedItems || []).map((item) => item.opportunity_id));

  return (
    <>
      <SiteNavbar />
      <main className="min-h-screen bg-slate-950 p-8 text-white">
        <h1 className="text-3xl font-black">Investment Scanner</h1>
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {opportunities.map((item) => (
            <div key={item.id} className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-xl font-bold">{item.name}</h2>
                <span className="rounded-xl bg-cyan-400/10 px-3 py-1 text-sm font-semibold text-cyan-300">{item.score}/100</span>
              </div>
              <div className="mt-4 space-y-2 text-sm text-slate-300">
                <p><span className="text-slate-400">Category:</span> {item.category}</p>
                <p><span className="text-slate-400">Risk:</span> {item.risk}</p>
                <p><span className="text-slate-400">Liquidity:</span> {item.liquidity}</p>
                <p><span className="text-slate-400">Expected:</span> {item.expected_return}</p>
              </div>
              <p className="mt-4 text-sm text-slate-300">{item.description}</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link href={`/scanner/${item.id}`} className="rounded-2xl bg-cyan-400 px-4 py-3 font-semibold text-slate-950">View details</Link>
                <WatchlistButton opportunityId={item.id} userId={user?.id} isSaved={savedIds.has(item.id)} />
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
