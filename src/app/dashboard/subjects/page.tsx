"use client";

import { useState } from "react";

const SUBJECTS = [
  { id: 1, name: "Drill & Commands", code: "NCC-DR", cadets: 120, wing: "All" },
  { id: 2, name: "Weapon Training", code: "NCC-WT", cadets: 85, wing: "Army" },
  { id: 3, name: "Map Reading", code: "NCC-MR", cadets: 95, wing: "Army" },
  { id: 4, name: "First Aid", code: "NCC-FA", cadets: 120, wing: "All" },
  { id: 5, name: "Naval Studies", code: "NCC-NS", cadets: 40, wing: "Navy" },
  { id: 6, name: "Air Force Studies", code: "NCC-AF", cadets: 35, wing: "Air Force" },
  { id: 7, name: "National Integration", code: "NCC-NI", cadets: 120, wing: "All" },
  { id: 8, name: "Leadership & Personality Dev.", code: "NCC-LP", cadets: 60, wing: "All" },
];

export default function SubjectsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [managingSubject, setManagingSubject] = useState<typeof SUBJECTS[0] | null>(null);
  const [toast, setToast] = useState("");
  const showToast = (m: string) => { setToast(m); setTimeout(() => setToast(""), 2500); };

  return (
    <>
      <div className="db-section-hdr">
        <div>
          <div className="db-section-title">Subject <em>Management</em></div>
          <div className="db-section-sub">Create subjects · Assign cadets</div>
        </div>
        <button className="db-btn db-btn-white" onClick={() => setModalOpen(true)}>+ Add Subject</button>
      </div>

      <div className="db-grid-4" style={{ marginBottom: 16 }}>
        <div className="db-card"><div className="db-card-label">Total Subjects</div><div className="db-card-value">{SUBJECTS.length}</div></div>
        <div className="db-card"><div className="db-card-label">All Wings</div><div className="db-card-value">{SUBJECTS.filter(s => s.wing === "All").length}</div></div>
        <div className="db-card"><div className="db-card-label">Wing-Specific</div><div className="db-card-value">{SUBJECTS.filter(s => s.wing !== "All").length}</div></div>
        <div className="db-card"><div className="db-card-label">Avg Enrollment</div><div className="db-card-value">{Math.round(SUBJECTS.reduce((a, s) => a + s.cadets, 0) / SUBJECTS.length)}</div></div>
      </div>

      <div className="db-card">
        <div className="db-card-label" style={{ marginBottom: 16 }}>All Subjects</div>
        <table className="db-tbl">
          <thead><tr><th>Code</th><th>Subject Name</th><th>Wing</th><th>Enrolled Cadets</th><th>Actions</th></tr></thead>
          <tbody>
            {SUBJECTS.map((s) => (
              <tr key={s.id}>
                <td style={{ fontFamily: "var(--font-ibm-mono), monospace", fontSize: 11 }}>{s.code}</td>
                <td>{s.name}</td>
                <td><span className="db-badge db-badge-gray">{s.wing}</span></td>
                <td style={{ fontFamily: "var(--font-ibm-mono), monospace" }}>{s.cadets}</td>
                <td>
                  <button className="db-btn db-btn-ghost" style={{ fontSize: 9, padding: "4px 10px" }} onClick={() => setManagingSubject(s)}>Manage Cadets</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={`db-modal-overlay${modalOpen ? " open" : ""}`} onClick={() => setModalOpen(false)}>
        <div className="db-modal" onClick={(e) => e.stopPropagation()}>
          <div className="db-modal-header"><div className="db-modal-title">Add Subject</div><button className="db-modal-close" onClick={() => setModalOpen(false)}>×</button></div>
          <div className="db-modal-body">
            <div className="db-form-group"><label className="db-inp-label">Subject Name</label><input className="db-inp" placeholder="e.g. Weapon Training" /></div>
            <div className="db-form-row">
              <div className="db-form-group"><label className="db-inp-label">Code</label><input className="db-inp" placeholder="NCC-XX" /></div>
              <div className="db-form-group"><label className="db-inp-label">Wing</label><select className="db-inp"><option>All</option><option>Army</option><option>Navy</option><option>Air Force</option></select></div>
            </div>
          </div>
          <div className="db-modal-footer">
            <button className="db-btn db-btn-ghost" onClick={() => setModalOpen(false)}>Cancel</button>
            <button className="db-btn db-btn-white" onClick={() => { setModalOpen(false); showToast("Subject created!"); }}>Create</button>
          </div>
        </div>
      </div>

      {/* Manage Cadets Modal */}
      {managingSubject && (
        <div className="db-modal-overlay open" onClick={() => setManagingSubject(null)}>
          <div className="db-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 500 }}>
            <div className="db-modal-header">
              <div className="db-modal-title">Manage Cadets</div>
              <button className="db-modal-close" onClick={() => setManagingSubject(null)}>×</button>
            </div>
            <div className="db-modal-body">
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 13, color: "var(--db-gray4)", marginBottom: 4 }}>Subject</div>
                <div style={{ fontSize: 15, fontWeight: 500, color: "var(--db-gray1)" }}>{managingSubject.name} <span style={{ fontFamily: "var(--font-ibm-mono), monospace", fontSize: 11, color: "var(--db-gray5)", marginLeft: 8 }}>{managingSubject.code}</span></div>
              </div>
              <div className="db-card-label" style={{ marginBottom: 12 }}>Enrollment Strategy</div>
              <div className="db-form-group">
                <select className="db-inp">
                  <option>All Cadets (Auto-enroll)</option>
                  <option>Specific Companies Only</option>
                  <option>Specific Wings Only</option>
                  <option>Manual Enrollment</option>
                </select>
              </div>
              
              <div className="db-card-label" style={{ marginTop: 24, marginBottom: 12 }}>Assign Specific Companies</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                {["Alpha", "Bravo", "Charlie", "Delta"].map(co => (
                  <label key={co} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, cursor: "pointer" }}>
                    <input type="checkbox" defaultChecked={managingSubject.wing === "All"} /> {co}
                  </label>
                ))}
              </div>
            </div>
            <div className="db-modal-footer">
              <button className="db-btn db-btn-ghost" onClick={() => setManagingSubject(null)}>Cancel</button>
              <button className="db-btn db-btn-white" onClick={() => { 
                setManagingSubject(null); 
                showToast("Enrollment settings updated!"); 
              }}>Save Changes</button>
            </div>
          </div>
        </div>
      )}

      <div className={`db-toast${toast ? " show" : ""}`}>{toast}</div>
    </>
  );
}
