"use client";

import { useIsOfficer } from "@/lib/role-context";

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

  return (
    <>
      <div className="db-section-hdr">
        <div>
          <div className="db-section-title">Rank <em>Hierarchy</em></div>
          <div className="db-section-sub">Official unit command structure</div>
        </div>
        {isOfficer && <button className="db-btn db-btn-ghost">Manage Ranks</button>}
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
    </>
  );
}
