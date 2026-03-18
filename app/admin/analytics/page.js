import Link from "next/link";
import SiteNavbar from "@/components/site-navbar";
import { getAdminAnalytics } from "@/lib/get-admin-analytics";
import AdminAnalyticsCharts from "@/components/admin-analytics-charts";
import AdminAnalyticsRangeNav from "@/components/admin-analytics-range-nav";

function StatCard({ title, value, sub }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <div className="text-sm text-slate-400">{title}</div>
      <div className="mt-2 text-3xl font-black">{value}</div>
      {sub ? <div className="mt-2 text-sm text-slate-300">{sub}</div> : null}
    </div>
  );
}

function getRangeLabel(range) {
  if (range === "7d") return "Last 7 days";
  if (range === "30d") return "Last 30 days";
  if (range === "90d") return "Last 90 days";
  return "All time";
}

export default async function AdminAnalyticsPage({ searchParams }) {
  const range = searchParams?.range || "30d";
  const { totals, topWatched, topClicked, partnerBreakdown } = await getAdminAnalytics(range);

  return (
    <>
      <SiteNavbar />
      <main className="min-h-screen bg-slate-950 p-8 text-white">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black">Admin Analytics</h1>
            <p className="mt-2 text-slate-300">See what users are saving, clicking, and paying attention to.</p>
          </div>
          <Link href="/admin" className="rounded-2xl border border-white/10 px-4 py-3 text-white">Back to Admin</Link>
        </div>

        <div className="mt-6">
          <AdminAnalyticsRangeNav currentRange={range} />
          <p className="mt-3 text-sm text-slate-400">Showing analytics for: {getRangeLabel(range)}</p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard title="Total opportunities" value={totals.totalOpportunities} sub="Investment listings in the database" />
          <StatCard title="Published content" value={totals.totalArticles} sub="Articles created in Alpha Space" />
          <StatCard title="Watchlist saves" value={totals.totalWatchlists} sub={`Filtered by ${getRangeLabel(range).toLowerCase()}`} />
          <StatCard title="Partner clicks" value={totals.totalPartnerClicks} sub={`Filtered by ${getRangeLabel(range).toLowerCase()}`} />
        </div>

        <div className="mt-10">
          <AdminAnalyticsCharts topWatched={topWatched} topClicked={topClicked} partnerBreakdown={partnerBreakdown} />
        </div>
      </main>
    </>
  );
}
