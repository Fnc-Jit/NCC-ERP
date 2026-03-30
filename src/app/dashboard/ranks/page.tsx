"use client";

import { useState } from "react";
import { useIsOfficer } from "@/lib/auth-context";

const RANKS_DATA = [
  { initials: "RS", name: "Rahul Sharma", rank: "SUO", company: "Alpha · Army" },
  { initials: "AM", name: "Anjali Menon", rank: "UO", company: "Bravo · Navy" },
  { initials: "AS", name: "Arjun Kumar Singh", rank: "Sergeant", company: "Alpha · Army" },
  { initials: "PN", name: "Priya Nair", rank: "Corporal", company: "Bravo · Navy" },
];

const CHAIN = [
  { level: "TOP", badge: "db-badge-amber", label: "SUO", name: "Rahul Sharma" },
  { level: "COMPANY", badge: "db-badge-white", label: "UO ×4", name: "One per company" },
  { level: "NCO", badge: "db-badge-gray", label: "SGT ×8", name: "Platoon level" },
  { level: "NCO", badge: "db-badge-gray", label: "CPL ×16", name: "Section level" },
  { level: "JUNIOR", badge: "db-badge-gray", label: "L/CPL ×32", name: "Squad level" },
];

export default function RanksPage() {
  const isOfficer = useIsOfficer();
  const [modalOpen, setModalOpen] = useState(false);
  const [toast, setToast] = useState("");
  const showToast = (m: string) => { setToast(m); setTimeout(() => setToast(""), 2500); };

  return (
    <>
      <div className="db-section-hdr">
        <div>
          <div className="db-section-title">Rank <em>Hierarchy</em></div>
          <div className="db-section-sub">Official unit command structure</div>
        </div>
        {isOfficer && <button className="db-btn db-btn-ghost" onClick={() => setModalOpen(true)}>Manage Ranks</button>}
      </div>

      {/* Command Chain */}
      <div className="db-card" style={{ marginBottom: 16 }}>
        <div className="db-card-label" style={{ marginBottom: 16 }}>Command Chain — Army Wing</div>
        <div style={{ display: "flex", gap: 0, flexWrap: "wrap" }}>
          {CHAIN.map((c, i) => (
            <div key={i} style={{ flex: 1, minWidth: 140, padding: "12px 16px", borderRight: i < CHAIN.length - 1 ? "1px solid var(--db-border)" : "none", textAlign: "center" }}>
              <div style={{ fontFamily: "var(--font-ibm-mono), monospace", fontSize: 8, letterSpacing: ".15em", color: "var(--db-gray5)", marginBottom: 4, textTransform: "uppercase" as const }}>{c.level}</div>
              <span className={`db-badge ${c.badge}`} style={{ fontSize: 10 }}>{c.label}</span>
              <div style={{ fontSize: 11, marginTop: 6, color: c.name.includes("per") || c.name.includes("level") ? "var(--db-gray3)" : "var(--db-gray1)" }}>{c.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Rank Holders */}
      <div className="db-card-label" style={{ marginBottom: 12 }}>Rank Holders — Featured Cadets</div>
      <div className="db-grid-4">
        {RANKS_DATA.map((r, i) => (
          <div className="db-rank-card" key={i}>
            <div className="db-rank-avatar">{r.initials}</div>
            <div className="db-rank-name">{r.name}</div>
            <div className="db-rank-title">{r.rank}</div>
            <div className="db-rank-company">{r.company}</div>
          </div>
        ))}
      </div>

      {/* Manage Ranks Modal */}
      {isOfficer && (
        <div className={`db-modal-overlay${modalOpen ? " open" : ""}`} onClick={() => setModalOpen(false)}>
          <div className="db-modal" onClick={(e) => e.stopPropagation()}>
            <div className="db-modal-header">
              <div className="db-modal-title">Manage Ranks</div>
              <button className="db-modal-close" onClick={() => setModalOpen(false)}>×</button>
            </div>
            <div className="db-modal-body">
              <div className="db-form-group">
                <label className="db-inp-label">Select Cadet</label>
                <select className="db-inp">
                  <option>Select Cadet...</option>
                  <option>Rahul Sharma (001)</option>
                  <option>Anjali Menon (002)</option>
                  <option>Priya Nair (003)</option>
                </select>
              </div>
              <div className="db-form-row">
                <div className="db-form-group">
                  <label className="db-inp-label">Assign Rank</label>
                  <select className="db-inp">
                    <option>SUO (Senior Under Officer)</option>
                    <option>UO (Under Officer)</option>
                    <option>CQMS</option>
                    <option>Sergeant</option>
                    <option>Corporal</option>
                    <option>L/Corporal</option>
                    <option>Cadet</option>
                  </select>
                </div>
                <div className="db-form-group">
                  <label className="db-inp-label">Effective Date</label>
                  <input type="date" className="db-inp" />
                </div>
              </div>
            </div>
            <div className="db-modal-footer">
              <button className="db-btn db-btn-ghost" onClick={() => setModalOpen(false)}>Cancel</button>
              <button className="db-btn db-btn-white" onClick={() => { setModalOpen(false); showToast("Rank updated successfully."); }}>Assign Rank</button>
            </div>
          </div>
        </div>
      )}
      <div className={`db-toast${toast ? " show" : ""}`}>{toast}</div>
    </>
  );
}
