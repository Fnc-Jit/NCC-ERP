"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { api, setToken } from "@/lib/api";

export default function AuthCallbackPage() {
  const router = useRouter();
  const [status, setStatus] = useState("Completing sign-in...");

  useEffect(() => {
    async function handleCallback() {
      try {
        // Supabase client automatically picks up the hash fragment from Google OAuth redirect
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error || !session) {
          setStatus("Authentication failed. Redirecting to login...");
          setTimeout(() => router.replace("/login"), 2000);
          return;
        }

        // Store the access token
        setToken(session.access_token);
        localStorage.setItem("ncc-refresh-token", session.refresh_token);

        // Try to get the user's profile from the backend
        try {
          const meData = await api.get<{ user: { role: string; full_name: string } }>("/api/auth/me");
          localStorage.setItem("ncc-user", JSON.stringify(meData.user));
          localStorage.setItem("ncc-role", meData.user.role);
          router.replace("/dashboard");
        } catch (meError: unknown) {
          const msg = meError instanceof Error ? meError.message : "";
          if (msg.includes("not found") || msg.includes("apply")) {
            // New user → redirect to application form
            router.replace("/apply");
          } else if (msg.includes("pending") || msg.includes("deactivated")) {
            setStatus("Your account is pending approval. Please wait for your ANO to approve your application.");
          } else {
            setStatus("Unable to load profile. Redirecting...");
            setTimeout(() => router.replace("/login"), 2000);
          }
        }
      } catch {
        setStatus("Something went wrong. Redirecting...");
        setTimeout(() => router.replace("/login"), 2000);
      }
    }

    handleCallback();
  }, [router]);

  return (
    <div style={{ background: "var(--db-bg)", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-ibm-mono), monospace", color: "var(--db-gray3)", fontSize: 13, letterSpacing: ".08em" }}>
      <div style={{ textAlign: "center" }}>
        <svg className="animate-spin" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ display: "block", margin: "0 auto 20px" }}><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
        <div>{status}</div>
      </div>
    </div>
  );
}
