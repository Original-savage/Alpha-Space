import Link from "next/link";
import SiteNavbar from "@/components/site-navbar";

export default function AdminPage() {
  return (
    <>
      <SiteNavbar />
      <main className="min-h-screen bg-slate-950 p-8 text-white">
        <h1 className="text-3xl font-black">Admin Dashboard</h1>
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <Link href="/admin/opportunities" className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-xl font-bold">Manage Opportunities</h2>
          </Link>
          <Link href="/admin/articles" className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-xl font-bold">Manage Articles</h2>
          </Link>
          <Link href="/admin/analytics" className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-xl font-bold">Analytics</h2>
          </Link>
        </div>
      </main>
    </>
  );
}
