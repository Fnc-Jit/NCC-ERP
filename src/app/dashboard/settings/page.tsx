"use client";

import { useState } from "react";

export default function SettingsPage() {
  const [toast, setToast] = useState("");
  const showToast = (m: string) => { setToast(m); setTimeout(() => setToast(""), 2500); };

  return (
    <>
      <div className="db-section-hdr">
        <div>
          <div className="db-section-title">Account <em>Settings</em></div>
          <div className="db-section-sub">Profile · Security · Data &amp; Privacy</div>
        </div>
      </div>

      <div className="db-grid-2">
        <div>
          {/* Profile */}
          <div className="db-card" style={{ marginBottom: 12 }}>
            <div className="db-card-label" style={{ marginBottom: 16 }}>Profile</div>
            <div style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 20 }}>
              <div className="db-avatar" style={{ width: 56, height: 56, fontSize: 16 }}>JR</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 500 }}>Jitraj R.</div>
                <div style={{ fontFamily: "var(--font-ibm-mono), monospace", fontSize: 10, color: "var(--db-gray4)" }}>ANO · Kristu Jayanti University NCC</div>
              </div>
              <button className="db-btn db-btn-ghost" style={{ marginLeft: "auto" }} onClick={() => showToast("Upload triggered")}>Change Photo</button>
            </div>
            <div className="db-form-group"><label className="db-inp-label">Full Name</label><input className="db-inp" defaultValue="Jitraj R." /></div>
            <div className="db-form-group"><label className="db-inp-label">Email</label><input className="db-inp" defaultValue="jitraj@kjc.edu.in" readOnly style={{ opacity: 0.5 }} /></div>
            <div className="db-form-group"><label className="db-inp-label">Phone</label><input className="db-inp" defaultValue="+91 98765 43210" /></div>
            <button className="db-btn db-btn-white" onClick={() => showToast("Profile updated!")}>Save Changes</button>
          </div>

          {/* Security */}
          <div className="db-card">
            <div className="db-card-label" style={{ marginBottom: 16 }}>Security</div>
            <div className="db-form-group"><label className="db-inp-label">Current Password</label><input type="password" className="db-inp" placeholder="••••••••" /></div>
            <div className="db-form-group"><label className="db-inp-label">New Password</label><input type="password" className="db-inp" placeholder="min 8 characters" /></div>
            <button className="db-btn db-btn-ghost" onClick={() => showToast("Password updated!")}>Update Password</button>
          </div>
        </div>

        <div>
          {/* Notifications */}
          <div className="db-card" style={{ marginBottom: 12 }}>
            <div className="db-card-label" style={{ marginBottom: 16 }}>Notification Preferences</div>
            {[
              { label: "Attendance marked notifications", on: true },
              { label: "New event notifications", on: true },
              { label: "Blog approval updates", on: false },
              { label: "Dispute resolution alerts", on: true },
              { label: "Weekly attendance digest", on: false },
            ].map((t, i) => (
              <ToggleRow key={i} label={t.label} defaultOn={t.on} />
            ))}
          </div>

          {/* DPDP */}
          <div className="db-card">
            <div className="db-card-label" style={{ marginBottom: 16 }}>Data &amp; Privacy (DPDP Act 2023)</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <button className="db-btn db-btn-ghost" style={{ justifyContent: "flex-start" }} onClick={() => showToast("Downloading your data...")}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 2v7M4 7l3 3 3-3" stroke="currentColor" strokeWidth="1.2" /><path d="M2 11h10" stroke="currentColor" strokeWidth="1.2" /></svg>
                Download My Data (JSON)
              </button>
              <button className="db-btn db-btn-ghost" style={{ justifyContent: "flex-start" }} onClick={() => showToast("Request sent to Admin")}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 2a5 5 0 100 10A5 5 0 007 2zM7 5v3M7 9.5v.5" stroke="currentColor" strokeWidth="1.2" /></svg>
                Request Data Correction
              </button>
              <button className="db-btn db-btn-red" style={{ justifyContent: "flex-start", marginTop: 8 }} onClick={() => showToast("Deletion request submitted")}>
                Request Account Deletion
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={`db-toast${toast ? " show" : ""}`}>{toast}</div>
    </>
  );
}

function ToggleRow({ label, defaultOn }: { label: string; defaultOn: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="db-toggle" onClick={() => setOn(!on)} style={{ marginBottom: 12 }}>
      <div className={`db-toggle-track${on ? " on" : ""}`}><div className="db-toggle-thumb" /></div>
      <span className="db-toggle-lbl">{label}</span>
    </div>
  );
}
