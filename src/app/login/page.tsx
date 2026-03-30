"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { api, setToken } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await api.post<{
        session: { access_token: string; refresh_token: string };
        user: { role: string; full_name: string };
      }>("/api/auth/login", { email, password });

      setToken(data.session.access_token);
      localStorage.setItem("ncc-refresh-token", data.session.refresh_token);
      localStorage.setItem("ncc-user", JSON.stringify(data.user));
      localStorage.setItem("ncc-role", data.user.role);
      router.push("/dashboard");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (oauthError) {
      setError(oauthError.message);
    }
  };

  return (
    <div style={{ background: "var(--db-bg)", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-ibm-sans), sans-serif", color: "var(--db-gray1)" }}>
      <div style={{ width: "min(440px, 90vw)" }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 40 }}>
          <div className="db-logo-mark"><span>N</span></div>
          <div style={{ fontFamily: "var(--font-ibm-mono), monospace", fontSize: 13, fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase" as const }}>
            NCC<span style={{ color: "var(--db-gray4)" }}>{"//"}</span>CMD
          </div>
        </div>

        <h1 style={{ fontSize: 28, fontWeight: 300, marginBottom: 8 }}>Sign In</h1>
        <p style={{ fontSize: 12, color: "var(--db-gray4)", marginBottom: 32 }}>
          Access the NCC Digital Command &amp; Management Platform
        </p>

        {error && (
          <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", padding: "10px 14px", marginBottom: 20, fontSize: 12, color: "#ef4444" }}>
            {error}
          </div>
        )}

        {/* Google Sign In */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="db-btn db-btn-ghost"
          style={{ width: "100%", justifyContent: "center", padding: "14px 20px", marginBottom: 24, gap: 10, display: "flex", alignItems: "center" }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
            <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
            <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.997 8.997 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
            <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
          </svg>
          Sign in with Google
        </button>

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
          <div style={{ flex: 1, height: 1, background: "var(--db-border2)" }} />
          <span style={{ fontSize: 10, color: "var(--db-gray5)", fontFamily: "var(--font-ibm-mono), monospace", letterSpacing: ".1em" }}>OR</span>
          <div style={{ flex: 1, height: 1, background: "var(--db-border2)" }} />
        </div>

        {/* Email / Password */}
        <form onSubmit={handleEmailLogin}>
          <div className="db-form-group">
            <label className="db-inp-label">Email</label>
            <input
              type="email"
              className="db-inp"
              placeholder="you@ncc.unit"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="db-form-group">
            <label className="db-inp-label">Password</label>
            <input
              type="password"
              className="db-inp"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div style={{ display: "flex", gap: 8, marginTop: 24 }}>
            <button
              type="submit"
              className="db-btn db-btn-white"
              style={{ flex: 1, justifyContent: "center", padding: "12px 20px" }}
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
            <a href="/" className="db-btn db-btn-ghost" style={{ textDecoration: "none" }}>
              Back to Site
            </a>
          </div>
        </form>

        <p style={{ fontSize: 11, color: "var(--db-gray5)", marginTop: 24, fontFamily: "var(--font-ibm-mono), monospace", letterSpacing: ".05em" }}>
          Contact your ANO to reset your password or create an account.
        </p>
      </div>
    </div>
  );
}
