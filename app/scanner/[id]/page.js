import { notFound } from "next/navigation";
import Link from "next/link";
import SiteNavbar from "@/components/site-navbar";
import WatchlistButton from "@/components/watchlist-button";
import PartnerLinkButton from "@/components/partner-link-button";
import { createClient } from "@/utils/supabase/server";
import { getOpportunityById, getRelatedOpportunities } from "@/lib/get-opportunity-by-id";

export default async function OpportunityDetailPage({ params }) {
  const opportunity = await getOpportunityById(params.id);
  if (!opportunity) notFound();

  const related = await getRelatedOpportunities(opportunity.category, opportunity.id);
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: savedItem } = user
    ? await supabase.from("watchlists").select("id").eq("user_id", user.id).eq("opportunity_id", opportunity.id).maybeSingle()
    : { data: null };

  return (
    <>
      <SiteNavbar />
      <main className="min-h-screen bg-slate-950 px-6 py-10 text-white md:px-10">
        <div className="mx-auto max-w-5xl">
          <Link href="/scanner" className="mb-6 inline-block text-sm text-cyan-300">← Back to Scanner</Link>
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="text-sm uppercase tracking-[0.25em] text-cyan-300">{opportunity.category}</div>
                <h1 className="mt-3 text-4xl font-black">{opportunity.name}</h1>
                <p className="mt-4 max-w-3xl text-slate-300">{opportunity.description}</p>
              </div>
              <div className="rounded-2xl bg-cyan-400/10 px-4 py-2 text-cyan-300">Score {opportunity.score}/100</div>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-4"><div className="text-sm text-slate-400">Risk</div><div className="mt-1 font-semibold">{opportunity.risk}</div></div>
              <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-4"><div className="text-sm text-slate-400">Liquidity</div><div className="mt-1 font-semibold">{opportunity.liquidity}</div></div>
              <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-4"><div className="text-sm text-slate-400">Expected return</div><div className="mt-1 font-semibold">{opportunity.expected_return}</div></div>
              <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-4"><div className="text-sm text-slate-400">Best fit</div><div className="mt-1 font-semibold">{opportunity.fit}</div></div>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <WatchlistButton opportunityId={opportunity.id} userId={user?.id} isSaved={!!savedItem} />
              {opportunity.partner_url ? (
                <PartnerLinkButton userId={user?.id} partnerName={opportunity.partner_name || "Partner"} opportunityId={opportunity.id} href={opportunity.partner_url} />
              ) : null}
            </div>
          </div>

          <section className="mt-10">
            <h2 className="text-2xl font-black">Related opportunities</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {related.map((item) => (
                <div key={item.id} className="rounded-3xl border border-white/10 bg-white/5 p-6">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-xl font-bold">{item.name}</h3>
                    <span className="rounded-xl bg-cyan-400/10 px-3 py-1 text-sm font-semibold text-cyan-300">{item.score}/100</span>
                  </div>
                  <p className="mt-3 text-sm text-slate-300">{item.description}</p>
                  <Link href={`/scanner/${item.id}`} className="mt-5 inline-block rounded-2xl border border-white/10 px-4 py-3 font-semibold text-white">View details</Link>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
