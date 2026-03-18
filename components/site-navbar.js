import Link from "next/link";
import { createClient } from "@/utils/supabase/server";

export default async function SiteNavbar() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <header className="border-b border-white/10 bg-slate-950/90">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-2xl font-black tracking-tight text-white">Alpha Space</Link>
        <nav className="flex flex-wrap items-center gap-5 text-sm text-slate-300">
          <Link href="/scanner" className="hover:text-white">Scanner</Link>
          <Link href="/watchlist" className="hover:text-white">Watchlist</Link>
          <Link href="/insights" className="hover:text-white">Insights</Link>
          <Link href="/profile" className="hover:text-white">Profile</Link>
          {user ? <Link href="/admin" className="hover:text-white">Admin</Link> : <Link href="/login" className="hover:text-white">Login</Link>}
        </nav>
      </div>
    </header>
  );
}
