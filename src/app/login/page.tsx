"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"cadet" | "ano" | "captain">("cadet");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("ncc-role", role);
    router.push("/dashboard");
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

        {/* Role selector */}
        <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
          {(["cadet", "ano", "captain"] as const).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r)}
              className={role === r ? "db-btn db-btn-white" : "db-btn db-btn-ghost"}
            >
              {r === "ano" ? "ANO" : r.charAt(0).toUpperCase() + r.slice(1)}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="db-form-group">
            <label className="db-inp-label">Email</label>
            <input
              type="email"
              className="db-inp"
              placeholder={`${role}@ncc.unit`}
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
            <button type="submit" className="db-btn db-btn-white" style={{ flex: 1, justifyContent: "center", padding: "12px 20px" }}>
              Sign In
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
