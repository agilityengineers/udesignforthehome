import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { LoginForm } from "@/components/admin/login-form";

export default function AdminLoginPage() {
  const [, setLocation] = useLocation();
  const [checked, setChecked] = useState(false);

  // If already authenticated, redirect to admin dashboard
  useEffect(() => {
    fetch("/api/admin/leads", { method: "GET" })
      .then((r) => {
        if (r.ok) setLocation("/admin");
        else setChecked(true);
      })
      .catch(() => setChecked(true));
  }, [setLocation]);

  if (!checked) return null;
  return <LoginForm />;
}
