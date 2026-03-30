"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

export default function ApplyPage() {
  const router = useRouter();
  const [form, setForm] = useState({ full_name: "", company: "Alpha", wing: "army", chest_number: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await api.post("/api/auth/apply", form);
      setSuccess(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Application failed");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div style={{ background: "var(--db-bg)", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-ibm-sans), sans-serif", color: "var(--db-gray1)" }}>
        <div style={{ width: "min(480px, 90vw)", textAlign: "center" }}>
          <div style={{ width: 56, height: 56, border: "2px solid #22c55e", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5"><path d="M5 13l4 4L19 7"/></svg>
          </div>
          <h1 style={{ fontSize: 24, fontWeight: 400, marginBottom: 12 }}>Application Submitted</h1>
          <p style={{ fontSize: 13, color: "var(--db-gray4)", marginBottom: 32, lineHeight: 1.6 }}>
            Your application has been submitted successfully. Please wait for your ANO or Captain to approve your account.
            You will be able to access the dashboard once approved.
          </p>
          <button className="db-btn db-btn-ghost" onClick={() => router.push("/login")}>
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "var(--db-bg)", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-ibm-sans), sans-serif", color: "var(--db-gray1)" }}>
      <div style={{ width: "min(480px, 90vw)" }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 40 }}>
          <div className="db-logo-mark"><span>N</span></div>
          <div style={{ fontFamily: "var(--font-ibm-mono), monospace", fontSize: 13, fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase" as const }}>
            NCC<span style={{ color: "var(--db-gray4)" }}>{"//"}</span>CMD
          </div>
        </div>

        <h1 style={{ fontSize: 24, fontWeight: 300, marginBottom: 8 }}>Complete Your Application</h1>
        <p style={{ fontSize: 12, color: "var(--db-gray4)", marginBottom: 32 }}>
          Fill in your details below. Your account will be activated once approved by your ANO.
        </p>

        {error && (
          <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", padding: "10px 14px", marginBottom: 20, fontSize: 12, color: "#ef4444" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="db-form-group">
            <label className="db-inp-label">Full Name</label>
            <input
              type="text"
              className="db-inp"
              placeholder="e.g. Arjun Kumar Singh"
              value={form.full_name}
              onChange={(e) => setForm({ ...form, full_name: e.target.value })}
              required
            />
          </div>

          <div className="db-form-row" style={{ display: "flex", gap: 12 }}>
            <div className="db-form-group" style={{ flex: 1 }}>
              <label className="db-inp-label">Company</label>
              <select className="db-inp" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })}>
                <option value="Alpha">Alpha</option>
                <option value="Bravo">Bravo</option>
                <option value="Charlie">Charlie</option>
                <option value="Delta">Delta</option>
              </select>
            </div>
            <div className="db-form-group" style={{ flex: 1 }}>
              <label className="db-inp-label">Wing</label>
              <select className="db-inp" value={form.wing} onChange={(e) => setForm({ ...form, wing: e.target.value })}>
                <option value="army">Army</option>
                <option value="navy">Navy</option>
                <option value="airforce">Air Force</option>
              </select>
            </div>
          </div>

          <div className="db-form-group">
            <label className="db-inp-label">Chest Number</label>
            <input
              type="text"
              className="db-inp"
              placeholder="e.g. CDT789"
              value={form.chest_number}
              onChange={(e) => setForm({ ...form, chest_number: e.target.value })}
              required
            />
          </div>

          <button
            type="submit"
            className="db-btn db-btn-white"
            style={{ width: "100%", justifyContent: "center", padding: "12px 20px", marginTop: 16 }}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Application"}
          </button>
        </form>
      </div>
    </div>
  );
}
