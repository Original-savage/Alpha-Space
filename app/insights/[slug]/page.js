import { notFound } from "next/navigation";
import Link from "next/link";
import SiteNavbar from "@/components/site-navbar";
import { getArticleBySlug } from "@/lib/get-articles";

export default async function ArticleDetailPage({ params }) {
  const article = await getArticleBySlug(params.slug);
  if (!article) notFound();

  return (
    <>
      <SiteNavbar />
      <main className="min-h-screen bg-slate-950 px-6 py-10 text-white md:px-10">
        <div className="mx-auto max-w-4xl">
          <Link href="/insights" className="mb-6 inline-block text-sm text-cyan-300">← Back to Insights</Link>
          {article.cover_image_url ? (
            <img src={article.cover_image_url} alt={article.title} className="mb-8 h-72 w-full rounded-3xl object-cover" />
          ) : null}
          <h1 className="text-4xl font-black">{article.title}</h1>
          <p className="mt-4 text-lg text-slate-300">{article.excerpt}</p>
          <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="whitespace-pre-wrap text-slate-200">{article.content}</div>
          </div>
        </div>
      </main>
    </>
  );
}
