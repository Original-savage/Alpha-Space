import { redirect } from "next/navigation";
import { getUserProfile } from "@/lib/get-user-profile";

export default async function AdminLayout({ children }) {
  const { user, profile } = await getUserProfile();
  if (!user) redirect("/login");
  if (!profile || profile.role !== "admin") redirect("/");
  return <>{children}</>;
}
