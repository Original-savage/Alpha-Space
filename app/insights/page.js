import Link from "next/link";
import SiteNavbar from "@/components/site-navbar";
import { getArticles } from "@/lib/get-articles";

export default async function InsightsPage() {
  const articles = await getArticles();

  return (
    <>
      <SiteNavbar />
      <main className="min-h-screen bg-slate-950 p-8 text-white">
        <h1 className="text-3xl font-black">Insights</h1>
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {articles.map((article) => (
            <article key={article.id} className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
              {article.cover_image_url ? (
                <img src={article.cover_image_url} alt={article.title} className="h-48 w-full object-cover" />
              ) : (
                <div className="h-48 w-full bg-slate-800" />
              )}
              <div className="p-6">
                <div className="text-xs uppercase tracking-[0.25em] text-cyan-300">Article</div>
                <h2 className="mt-3 text-xl font-black">{article.title}</h2>
                <p className="mt-3 text-sm text-slate-300">{article.excerpt}</p>
                <Link href={`/insights/${article.slug}`} className="mt-5 inline-block rounded-2xl bg-cyan-400 px-4 py-3 font-semibold text-slate-950">Read article</Link>
              </div>
            </article>
          ))}
        </div>
      </main>
    </>
  );
}
