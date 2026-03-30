"use client";

import { useState } from "react";

const CADETS = [
  { name: "Arjun Kumar Singh", chest: "KT-SW-01-2024", rank: "Sergeant", company: "Alpha", wing: "Army", year: 2, att: 94, active: true },
  { name: "Priya Nair", chest: "KT-NW-03-2024", rank: "Corporal", company: "Bravo", wing: "Navy", year: 1, att: 87, active: true },
  { name: "Vikram Reddy", chest: "KT-SW-07-2024", rank: "L/Corporal", company: "Alpha", wing: "Army", year: 3, att: 70, active: true },
  { name: "Sneha Patel", chest: "KT-AF-02-2024", rank: "Cadet", company: "Charlie", wing: "Air Force", year: 1, att: 60, active: true },
  { name: "Kiran Verma", chest: "KT-SW-11-2024", rank: "Corporal", company: "Delta", wing: "Army", year: 2, att: 83, active: true },
  { name: "Rahul Sharma", chest: "KT-SW-00-2023", rank: "SUO", company: "Alpha", wing: "Army", year: 3, att: 98, active: true },
  { name: "Anjali Menon", chest: "KT-NW-05-2024", rank: "UO", company: "Bravo", wing: "Navy", year: 3, att: 92, active: true },
  { name: "Dev Krishnan", chest: "KT-AF-04-2024", rank: "Sergeant", company: "Charlie", wing: "Air Force", year: 2, att: 78, active: false },
];

export default function CadetsPage() {
  const [search, setSearch] = useState("");
  const [company, setCompany] = useState("All");
  const [wing, setWing] = useState("All");
  const [year, setYear] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCadet, setSelectedCadet] = useState<typeof CADETS[0] | null>(null);
  const [toast, setToast] = useState("");
  const showToast = (m: string) => { setToast(m); setTimeout(() => setToast(""), 2500); };

  const filtered = CADETS.filter((c) => {
    if (company !== "All" && c.company !== company) return false;
    if (wing !== "All" && c.wing !== wing) return false;
    if (year !== "All" && c.year.toString() !== year) return false;
    if (search && !c.name.toLowerCase().includes(search.toLowerCase()) && !c.chest.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <>
      <div className="db-section-hdr">
        <div>
          <div className="db-section-title">Cadet <em>Registry</em></div>
          <div className="db-section-sub">{CADETS.length} active cadets · 3 wings · 4 companies</div>
        </div>
        <button className="db-btn db-btn-white" onClick={() => setModalOpen(true)}>+ Invite Cadet</button>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        <select className="db-inp" style={{ width: "auto", padding: "6px 12px", fontSize: 11 }} value={company} onChange={(e) => setCompany(e.target.value)}>
          <option>All</option><option>Alpha</option><option>Bravo</option><option>Charlie</option><option>Delta</option>
        </select>
        <select className="db-inp" style={{ width: "auto", padding: "6px 12px", fontSize: 11 }} value={wing} onChange={(e) => setWing(e.target.value)}>
          <option>All</option><option>Army</option><option>Navy</option><option>Air Force</option>
        </select>
        <select className="db-inp" style={{ width: "auto", padding: "6px 12px", fontSize: 11 }} value={year} onChange={(e) => setYear(e.target.value)}>
          <option>All</option><option>1</option><option>2</option><option>3</option>
        </select>
        <input className="db-inp" placeholder="Search name or chest no..." style={{ flex: 1, minWidth: 200, fontSize: 12 }} value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      {/* Table */}
      <div className="db-card">
        <table className="db-tbl">
          <thead>
            <tr><th>Name</th><th>Chest No.</th><th>Rank</th><th>Company</th><th>Wing</th><th>Year</th><th>Attendance</th><th>Status</th><th></th></tr>
          </thead>
          <tbody>
            {filtered.map((c, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 500 }}>{c.name}</td>
                <td style={{ fontFamily: "var(--font-ibm-mono), monospace", fontSize: 11 }}>{c.chest}</td>
                <td>{c.rank}</td>
                <td>{c.company}</td>
                <td>{c.wing}</td>
                <td style={{ fontFamily: "var(--font-ibm-mono), monospace" }}>{c.year}</td>
                <td style={{ fontFamily: "var(--font-ibm-mono), monospace", color: c.att >= 80 ? "var(--db-green)" : c.att >= 65 ? "var(--db-amber)" : "var(--db-red)" }}>{c.att}%</td>
                <td><span className={`db-badge ${c.active ? "db-badge-green" : "db-badge-red"}`}>{c.active ? "Active" : "Inactive"}</span></td>
                <td><button className="db-btn db-btn-ghost" style={{ padding: "3px 8px", fontSize: 9 }} onClick={() => setSelectedCadet(c)}>View</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Invite Modal */}
      <div className={`db-modal-overlay${modalOpen ? " open" : ""}`} onClick={() => setModalOpen(false)}>
        <div className="db-modal" onClick={(e) => e.stopPropagation()}>
          <div className="db-modal-header"><div className="db-modal-title">Invite Cadet</div><button className="db-modal-close" onClick={() => setModalOpen(false)}>×</button></div>
          <div className="db-modal-body">
            <div className="db-form-group"><label className="db-inp-label">Email Address</label><input className="db-inp" placeholder="cadet@college.edu.in" /></div>
            <div className="db-form-row">
              <div className="db-form-group"><label className="db-inp-label">Role</label><select className="db-inp"><option>Cadet</option><option>SUO</option><option>ANO</option><option>Admin</option></select></div>
              <div className="db-form-group"><label className="db-inp-label">Company</label><select className="db-inp"><option>Alpha</option><option>Bravo</option><option>Charlie</option><option>Delta</option></select></div>
            </div>
            <div className="db-form-row">
              <div className="db-form-group"><label className="db-inp-label">Wing</label><select className="db-inp"><option>Army</option><option>Navy</option><option>Air Force</option></select></div>
              <div className="db-form-group"><label className="db-inp-label">Year of Study</label><select className="db-inp"><option>1</option><option>2</option><option>3</option><option>4</option></select></div>
            </div>
          </div>
          <div className="db-modal-footer">
            <button className="db-btn db-btn-ghost" onClick={() => setModalOpen(false)}>Cancel</button>
            <button className="db-btn db-btn-white" onClick={() => { setModalOpen(false); showToast("Invite sent via Resend!"); }}>Send Invite</button>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedCadet && (
        <div className="db-modal-overlay open" onClick={() => setSelectedCadet(null)}>
          <div className="db-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 500 }}>
            <div className="db-modal-header">
              <div className="db-modal-title">Cadet Profile</div>
              <button className="db-modal-close" onClick={() => setSelectedCadet(null)}>×</button>
            </div>
            <div className="db-modal-body">
              <div style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 24 }}>
                <div style={{ width: 64, height: 64, borderRadius: 32, background: "var(--db-fill)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 600, color: "var(--db-gray2)" }}>
                  {selectedCadet.name.split(" ").map(n => n[0]).join("").substring(0, 2)}
                </div>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 500 }}>{selectedCadet.name}</div>
                  <div style={{ fontSize: 13, color: "var(--db-gray4)", fontFamily: "var(--font-ibm-mono), monospace", marginTop: 4 }}>{selectedCadet.chest}</div>
                </div>
              </div>

              <div className="db-grid-2" style={{ gap: 16, marginBottom: 24 }}>
                <div>
                  <div style={{ fontSize: 11, color: "var(--db-gray5)", textTransform: "uppercase", letterSpacing: ".05em" }}>Rank</div>
                  <div style={{ fontSize: 14, marginTop: 4 }}>{selectedCadet.rank}</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: "var(--db-gray5)", textTransform: "uppercase", letterSpacing: ".05em" }}>Company / Wing</div>
                  <div style={{ fontSize: 14, marginTop: 4 }}>{selectedCadet.company} · {selectedCadet.wing}</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: "var(--db-gray5)", textTransform: "uppercase", letterSpacing: ".05em" }}>Year of Study</div>
                  <div style={{ fontSize: 14, marginTop: 4 }}>Year {selectedCadet.year}</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: "var(--db-gray5)", textTransform: "uppercase", letterSpacing: ".05em" }}>Status</div>
                  <div style={{ marginTop: 4 }}><span className={`db-badge ${selectedCadet.active ? "db-badge-green" : "db-badge-red"}`}>{selectedCadet.active ? "Active" : "Inactive"}</span></div>
                </div>
              </div>

              <div className="db-card" style={{ padding: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontSize: 12, fontWeight: 500 }}>Attendance</span>
                  <span style={{ fontFamily: "var(--font-ibm-mono), monospace", fontSize: 12, color: selectedCadet.att >= 80 ? "var(--db-green)" : selectedCadet.att >= 65 ? "var(--db-amber)" : "var(--db-red)" }}>{selectedCadet.att}%</span>
                </div>
                <div className="db-progress-track">
                  <div
                    className={`db-progress-fill ${selectedCadet.att >= 80 ? "db-bar-green" : selectedCadet.att >= 65 ? "db-bar-amber" : "db-bar-red"}`}
                    style={{ width: `${selectedCadet.att}%` }}
                  />
                </div>
              </div>

            </div>
            <div className="db-modal-footer">
              <button className="db-btn db-btn-ghost" onClick={() => setSelectedCadet(null)}>Close</button>
            </div>
          </div>
        </div>
      )}

      <div className={`db-toast${toast ? " show" : ""}`}>{toast}</div>
    </>
  );
}
