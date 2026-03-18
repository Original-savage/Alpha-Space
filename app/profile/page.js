import { redirect } from "next/navigation";
import SiteNavbar from "@/components/site-navbar";
import { getUserProfile } from "@/lib/get-user-profile";

export default async function ProfilePage() {
  const { user, profile } = await getUserProfile();
  if (!user) redirect("/login");

  return (
    <>
      <SiteNavbar />
      <main className="min-h-screen bg-slate-950 p-8 text-white">
        <h1 className="text-3xl font-black">My Profile</h1>
        <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm text-slate-300">Email: <span className="font-semibold text-white">{profile?.email}</span></p>
          <p className="mt-2 text-sm text-slate-300">Full name: <span className="font-semibold text-white">{profile?.full_name || "Not set"}</span></p>
          <p className="mt-2 text-sm text-slate-300">Role: <span className="font-semibold text-cyan-300">{profile?.role}</span></p>
        </div>
      </main>
    </>
  );
}
