"use client";

import { useState } from "react";
import { useIsOfficer } from "@/lib/role-context";

const NEWS = [
  { headline: "NCC Directorate Karnataka Announces RDC 2027 Quota", summary: "6 seats allocated to Bengaluru district for Republic Day Camp 2027.", date: "27 Mar 2026", published: true },
  { headline: "New Weapon Training Regulations — Circular 2026/04", summary: "Updated safety protocols for .22 Rifle and 9mm Pistol training, effective April 2026.", date: "22 Mar 2026", published: true },
  { headline: "Defence Budget 2026 — NCC Allocation Increased by 12%", summary: "Finance Ministry increases NCC budget to ₹2,100 crore for FY 2026-27, enabling new equipment.", date: "15 Mar 2026", published: true },
  { headline: "C Certificate Pass Rate Hits All-Time High", summary: "Karnataka NCC units report 94% pass rate in C Certificate examinations for 2025-26 batch.", date: "8 Mar 2026", published: false },
];

export default function NewsPage() {
  const isOfficer = useIsOfficer();
  const [modalOpen, setModalOpen] = useState(false);
  const [toast, setToast] = useState("");
  const showToast = (m: string) => { setToast(m); setTimeout(() => setToast(""), 2500); };

  // Cadets only see published news
  const visibleNews = isOfficer ? NEWS : NEWS.filter((n) => n.published);

  return (
    <>
      <div className="db-section-hdr">
        <div>
          <div className="db-section-title">Defence <em>News</em></div>
          <div className="db-section-sub">Current affairs &amp; NCC notifications</div>
        </div>
        {isOfficer && (
          <button className="db-btn db-btn-white" onClick={() => setModalOpen(true)}>+ Publish Article</button>
        )}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {visibleNews.map((n, i) => (
          <div className="db-card" key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                {isOfficer && (
                  <span className={`db-badge ${n.published ? "db-badge-green" : "db-badge-gray"}`}>{n.published ? "Published" : "Draft"}</span>
                )}
                <span style={{ fontFamily: "var(--font-ibm-mono), monospace", fontSize: 10, color: "var(--db-gray5)" }}>{n.date}</span>
              </div>
              <div className="db-card-title" style={{ fontSize: 15 }}>{n.headline}</div>
              <div className="db-card-desc">{n.summary}</div>
            </div>
            <button className="db-btn db-btn-ghost" style={{ flexShrink: 0 }} onClick={() => showToast("Opening article...")}>View</button>
          </div>
        ))}
      </div>

      {/* Publish Modal — officer only */}
      {isOfficer && (
        <div className={`db-modal-overlay${modalOpen ? " open" : ""}`} onClick={() => setModalOpen(false)}>
          <div className="db-modal" onClick={(e) => e.stopPropagation()}>
            <div className="db-modal-header"><div className="db-modal-title">Publish News Article</div><button className="db-modal-close" onClick={() => setModalOpen(false)}>×</button></div>
            <div className="db-modal-body">
              <div className="db-form-group"><label className="db-inp-label">Headline</label><input className="db-inp" placeholder="Article headline..." /></div>
              <div className="db-form-group"><label className="db-inp-label">Summary</label><input className="db-inp" placeholder="One-line summary..." /></div>
              <div className="db-form-group"><label className="db-inp-label">Body</label><textarea className="db-inp" rows={6} placeholder="Full article body (supports Markdown)..." /></div>
            </div>
            <div className="db-modal-footer">
              <button className="db-btn db-btn-ghost" onClick={() => setModalOpen(false)}>Cancel</button>
              <button className="db-btn db-btn-white" onClick={() => { setModalOpen(false); showToast("Article published!"); }}>Publish Now</button>
            </div>
          </div>
        </div>
      )}
      <div className={`db-toast${toast ? " show" : ""}`}>{toast}</div>
    </>
  );
}
