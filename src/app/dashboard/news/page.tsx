"use client";

import { useState } from "react";
import { useIsOfficer } from "@/lib/auth-context";

const NEWS = [
  { headline: "NCC Directorate Karnataka Announces RDC 2027 Quota", summary: "6 seats allocated to Bengaluru district for Republic Day Camp 2027.", date: "27 Mar 2026", published: true },
  { headline: "New Weapon Training Regulations — Circular 2026/04", summary: "Updated safety protocols for .22 Rifle and 9mm Pistol training, effective April 2026.", date: "22 Mar 2026", published: true },
  { headline: "Defence Budget 2026 — NCC Allocation Increased by 12%", summary: "Finance Ministry increases NCC budget to ₹2,100 crore for FY 2026-27, enabling new equipment.", date: "15 Mar 2026", published: true },
  { headline: "C Certificate Pass Rate Hits All-Time High", summary: "Karnataka NCC units report 94% pass rate in C Certificate examinations for 2025-26 batch.", date: "8 Mar 2026", published: false },
];

export default function NewsPage() {
  const isOfficer = useIsOfficer();
  const [modalOpen, setModalOpen] = useState(false);
  const [viewingNews, setViewingNews] = useState<typeof NEWS[0] | null>(null);
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
            <button className="db-btn db-btn-ghost" style={{ flexShrink: 0 }} onClick={() => setViewingNews(n)}>View</button>
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

      {/* Article Modal */}
      {viewingNews && (
        <div className="db-modal-overlay open" onClick={() => setViewingNews(null)}>
          <div className="db-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 640 }}>
            <div className="db-modal-header">
              <div className="db-modal-title">News Article</div>
              <button className="db-modal-close" onClick={() => setViewingNews(null)}>×</button>
            </div>
            <div className="db-modal-body">
              <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 16 }}>
                {isOfficer && (
                  <span className={`db-badge ${viewingNews.published ? "db-badge-green" : "db-badge-gray"}`}>{viewingNews.published ? "Published" : "Draft"}</span>
                )}
                <span style={{ fontFamily: "var(--font-ibm-mono), monospace", fontSize: 10, color: "var(--db-gray5)" }}>{viewingNews.date}</span>
              </div>
              <div style={{ fontSize: 24, fontWeight: 600, color: "var(--db-gray1)", marginBottom: 16, lineHeight: 1.3 }}>{viewingNews.headline}</div>
              <div style={{ fontSize: 14, color: "var(--db-gray2)", fontWeight: 500, marginBottom: 24, borderLeft: "3px solid var(--db-blue)", background: "rgba(59,130,246,0.05)", padding: "12px 16px" }}>{viewingNews.summary}</div>
              <div style={{ fontSize: 14, color: "var(--db-gray3)", lineHeight: 1.7, whiteSpace: "pre-wrap" }}>
                {"[Full article text mock]\nOfficial communication regarding recent Directorate updates. All cadet companies are to take note of the new schedules and training camp requirements as detailed in the attached appendix.\n\nCommanding Officers are requested to disseminate this information during the next parade fall-in.\n\nIssued by Directorate Command."}
              </div>
            </div>
            <div className="db-modal-footer">
              <button className="db-btn db-btn-ghost" onClick={() => setViewingNews(null)}>Close</button>
            </div>
          </div>
        </div>
      )}

      <div className={`db-toast${toast ? " show" : ""}`}>{toast}</div>
    </>
  );
}
