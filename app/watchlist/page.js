import Link from "next/link";
import { redirect } from "next/navigation";
import SiteNavbar from "@/components/site-navbar";
import { getWatchlist } from "@/lib/get-watchlist";
import { createClient } from "@/utils/supabase/server";

export default async function WatchlistPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const watchlist = await getWatchlist();

  return (
    <>
      <SiteNavbar />
      <main className="min-h-screen bg-slate-950 p-8 text-white">
        <h1 className="text-3xl font-black">My Watchlist</h1>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {watchlist.length === 0 ? (
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-slate-300">You have no saved items yet.</div>
          ) : (
            watchlist.map((item) => {
              const opp = item.investment_opportunities;
              return (
                <div key={item.id} className="rounded-3xl border border-white/10 bg-white/5 p-6">
                  <h2 className="text-xl font-bold">{opp.name}</h2>
                  <div className="mt-4 space-y-2 text-sm text-slate-300">
                    <p><span className="text-slate-400">Category:</span> {opp.category}</p>
                    <p><span className="text-slate-400">Risk:</span> {opp.risk}</p>
                    <p><span className="text-slate-400">Liquidity:</span> {opp.liquidity}</p>
                    <p><span className="text-slate-400">Expected:</span> {opp.expected_return}</p>
                  </div>
                  <Link href={`/scanner/${opp.id}`} className="mt-5 inline-block rounded-2xl bg-cyan-400 px-4 py-3 font-semibold text-slate-950">View details</Link>
                </div>
              );
            })
          )}
        </div>
      </main>
    </>
  );
}
