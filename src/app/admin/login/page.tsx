import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/admin/login-form";
import { isAdminAuthenticated } from "@/lib/session";

export const metadata: Metadata = {
  title: "Admin Sign-In",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  // Already signed in? Skip the login screen.
  if (await isAdminAuthenticated()) redirect("/admin");
  return <LoginForm />;
}
