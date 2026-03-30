"use client";

import { useState } from "react";
import { useIsOfficer } from "@/lib/auth-context";

const RESOURCES = [
  { title: "Drill Manual — Basic Movements", cat: "drill", size: "2.4 MB", date: "10 Jan 2026", wing: "all" },
  { title: "Rifle Handling & Safety Procedures", cat: "weapons", size: "5.1 MB", date: "12 Jan 2026", wing: "army" },
  { title: "Topographic Map Reading Guide", cat: "map", size: "8.7 MB", date: "15 Jan 2026", wing: "army" },
  { title: "First Aid & Field Medicine", cat: "firstaid", size: "3.2 MB", date: "20 Jan 2026", wing: "all" },
  { title: "Defence Current Affairs — Q4 2025", cat: "affairs", size: "1.1 MB", date: "5 Feb 2026", wing: "all" },
  { title: "Advanced Drill Formations", cat: "drill", size: "4.3 MB", date: "12 Feb 2026", wing: "all" },
  { title: "Navigation & Compass Use", cat: "map", size: "6.5 MB", date: "18 Feb 2026", wing: "army" },
  { title: "Weapon Stripping & Assembly", cat: "weapons", size: "9.2 MB", date: "22 Feb 2026", wing: "army" },
  { title: "CPR & Emergency Response", cat: "firstaid", size: "2.8 MB", date: "1 Mar 2026", wing: "all" },
  { title: "Naval Signals & Semaphore", cat: "naval", size: "3.6 MB", date: "5 Mar 2026", wing: "navy" },
  { title: "Aircraft Recognition Manual", cat: "airforce", size: "4.8 MB", date: "8 Mar 2026", wing: "airforce" },
];

// Cadet's allotted subjects — Army wing cadet gets drill, weapons, map reading, first aid
const CADET_ALLOTTED_CATS = ["drill", "weapons", "map", "firstaid"];

export default function StudyPage() {
  const isOfficer = useIsOfficer();
  const [filter, setFilter] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [downloading, setDownloading] = useState<string | null>(null);
  const [toast, setToast] = useState("");
  const showToast = (m: string) => { setToast(m); setTimeout(() => setToast(""), 2500); };

  const startDownload = (title: string) => {
    setDownloading(title);
    setTimeout(() => {
      setDownloading(null);
      showToast(`Downloaded: ${title}`);
    }, 1500);
  };

  // Officers see all resources, cadets only see their allotted subjects
  const availableResources = isOfficer
    ? RESOURCES
    : RESOURCES.filter((r) => CADET_ALLOTTED_CATS.includes(r.cat));

  const availableCategories = isOfficer
    ? ["all", "drill", "weapons", "map", "firstaid", "affairs", "naval", "airforce"]
    : ["all", ...CADET_ALLOTTED_CATS];

  const filtered = filter === "all" ? availableResources : availableResources.filter((r) => r.cat === filter);

  const catLabel = (c: string) => {
    const labels: Record<string, string> = { all: "All", drill: "Drill", weapons: "Weapons", map: "Map Reading", firstaid: "First Aid", affairs: "Current Affairs", naval: "Naval", airforce: "Air Force" };
    return labels[c] ?? c;
  };

  return (
    <>
      <div className="db-section-hdr">
        <div>
          <div className="db-section-title">Study <em>Repository</em></div>
          <div className="db-section-sub">
            {isOfficer ? "All wings · B & C Certificate materials" : "Your allotted subjects · B & C Certificate materials"}
          </div>
        </div>
        {isOfficer && (
          <button className="db-btn db-btn-white" onClick={() => setModalOpen(true)}>+ Upload Resource</button>
        )}
      </div>

      {/* Allotted subjects banner for cadets */}
      {!isOfficer && (
        <div className="db-card" style={{ marginBottom: 16, borderColor: "rgba(59,130,246,.15)", background: "rgba(59,130,246,.04)" }}>
          <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginTop: 2, flexShrink: 0 }}><path d="M8 2a6 6 0 100 12A6 6 0 008 2zM8 5v4M8 10.5v.5" stroke="var(--db-blue)" strokeWidth="1.3" /></svg>
            <div style={{ fontSize: 12, color: "var(--db-gray3)", lineHeight: 1.6 }}>
              Showing resources for your allotted subjects: <strong style={{ color: "var(--db-gray1)" }}>Drill & Commands, Weapon Training, Map Reading, First Aid</strong>. Contact your ANO for access to additional resources.
            </div>
          </div>
        </div>
      )}

      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        {availableCategories.map((c) => (
          <button key={c} className={`db-btn ${filter === c ? "db-btn-white" : "db-btn-ghost"}`} onClick={() => setFilter(c)}>
            {catLabel(c)}
          </button>
        ))}
      </div>

      <div className="db-grid-3">
        {filtered.map((r, i) => (
          <div className="db-resource-card" key={i} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <div className="db-resource-icon">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="3" y="2" width="12" height="14" rx="1" stroke="currentColor" strokeWidth="1.2" /><path d="M6 6h6M6 9h4" stroke="currentColor" strokeWidth="1" /></svg>
              </div>
              <div style={{ flex: 1 }}>
                <div className="db-resource-title">{r.title}</div>
                <div className="db-resource-meta" style={{ marginTop: 8 }}>
                  <span className="db-badge db-badge-gray">{catLabel(r.cat)}</span>
                  <span className="db-resource-size">{r.size}</span>
                  <span className="db-resource-size">{r.date}</span>
                </div>
              </div>
            </div>
            <div style={{ marginTop: "auto" }}>
              <button 
                className="db-btn db-btn-ghost" 
                style={{ width: "100%", justifyContent: "center" }}
                onClick={() => startDownload(r.title)}
                disabled={downloading === r.title}
              >
                {downloading === r.title ? "Downloading..." : "Download"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Modal — only rendered for officers */}
      {isOfficer && (
        <div className={`db-modal-overlay${modalOpen ? " open" : ""}`} onClick={() => setModalOpen(false)}>
          <div className="db-modal" onClick={(e) => e.stopPropagation()}>
            <div className="db-modal-header"><div className="db-modal-title">Upload Study Resource</div><button className="db-modal-close" onClick={() => setModalOpen(false)}>×</button></div>
            <div className="db-modal-body">
              <div className="db-form-group"><label className="db-inp-label">Title</label><input className="db-inp" placeholder="e.g. Rifle Handling Manual 2024" /></div>
              <div className="db-form-row">
                <div className="db-form-group"><label className="db-inp-label">Category</label><select className="db-inp"><option>Drill</option><option>Weapons</option><option>Map Reading</option><option>First Aid</option><option>Current Affairs</option><option>Naval</option><option>Air Force</option></select></div>
                <div className="db-form-group"><label className="db-inp-label">Certificate Target</label><select className="db-inp"><option>Both</option><option>B Certificate</option><option>C Certificate</option></select></div>
              </div>
              <div className="db-form-group">
                <label className="db-inp-label">File (PDF, JPG, MP4)</label>
                <div style={{ border: "2px dashed var(--db-border2)", padding: 24, textAlign: "center", cursor: "pointer" }}>
                  <div style={{ fontSize: 12, color: "var(--db-gray3)" }}>Click to select file · max 50MB</div>
                </div>
              </div>
            </div>
            <div className="db-modal-footer">
              <button className="db-btn db-btn-ghost" onClick={() => setModalOpen(false)}>Cancel</button>
              <button className="db-btn db-btn-white" onClick={() => { setModalOpen(false); showToast("Resource uploaded!"); }}>Upload</button>
            </div>
          </div>
        </div>
      )}
      <div className={`db-toast${toast ? " show" : ""}`}>{toast}</div>
    </>
  );
}
