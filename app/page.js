import Link from "next/link";
import SiteNavbar from "@/components/site-navbar";

export default function HomePage() {
  return (
    <>
      <SiteNavbar />
      <main className="min-h-screen bg-slate-950 text-white">
        <section className="mx-auto max-w-7xl px-6 py-20">
          <div className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1 text-sm text-cyan-200">
            Kenya-focused legal investment research
          </div>
          <h1 className="mt-6 text-5xl font-black md:text-7xl">Alpha Space</h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-300">
            A clean product shell for legal investment discovery, research publishing,
            watchlists, and partner tracking.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/scanner" className="rounded-2xl bg-cyan-400 px-5 py-3 font-semibold text-slate-950">Open Scanner</Link>
            <Link href="/insights" className="rounded-2xl border border-white/15 px-5 py-3 font-semibold text-white">Read Insights</Link>
          </div>
        </section>
      </main>
    </>
  );
}
