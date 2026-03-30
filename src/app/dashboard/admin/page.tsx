"use client";

import { useState } from "react";

const USERS = [
  { name: "Arjun Kumar Singh", email: "arjun@kjc.edu.in", role: "Cadet", status: "Active" },
  { name: "Priya Nair", email: "priya@kjc.edu.in", role: "Cadet", status: "Active" },
  { name: "Vikram Reddy", email: "vikram@kjc.edu.in", role: "Cadet", status: "Active" },
  { name: "Dev Krishnan", email: "dev@kjc.edu.in", role: "Cadet", status: "Inactive" },
  { name: "Rahul Sharma", email: "rahul@kjc.edu.in", role: "SUO", status: "Active" },
  { name: "Anjali Menon", email: "anjali@kjc.edu.in", role: "UO", status: "Active" },
];

const AUDIT = [
  { action: "attendance.mark", actor: "ANO Jitraj", time: "2 min ago" },
  { action: "post.approve", actor: "ANO Jitraj", time: "18 min ago" },
  { action: "user.deactivate", actor: "Admin Sys", time: "1 hr ago" },
  { action: "event.create", actor: "ANO Jitraj", time: "3 hr ago" },
];

export default function AdminPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [toast, setToast] = useState("");
  const showToast = (m: string) => { setToast(m); setTimeout(() => setToast(""), 2500); };

  return (
    <>
      <div className="db-section-hdr">
        <div>
          <div className="db-section-title">Admin <em>Panel</em></div>
          <div className="db-section-sub">User management · audit logs · system config</div>
        </div>
        <button className="db-btn db-btn-white" onClick={() => setModalOpen(true)}>+ Invite User</button>
      </div>

      <div className="db-grid-2" style={{ marginBottom: 12 }}>
        {/* Users */}
        <div className="db-card">
          <div className="db-card-label" style={{ marginBottom: 16 }}>User Accounts</div>
          {USERS.map((u, i) => (
            <div className="db-user-row" key={i}>
              <div className="db-avatar">{u.name.split(" ").map(n => n[0]).join("").slice(0, 2)}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 500 }}>{u.name}</div>
                <div style={{ fontFamily: "var(--font-ibm-mono), monospace", fontSize: 10, color: "var(--db-gray5)" }}>{u.email}</div>
              </div>
              <span className={`db-badge ${u.role === "SUO" || u.role === "UO" ? "db-badge-amber" : "db-badge-gray"}`}>{u.role}</span>
              <button
                className={`db-btn ${u.status === "Active" ? "db-btn-ghost" : "db-btn-green"}`}
                style={{ fontSize: 9, padding: "4px 10px" }}
                onClick={() => showToast(u.status === "Active" ? `${u.name} deactivated` : `${u.name} activated`)}
              >
                {u.status === "Active" ? "Deactivate" : "Activate"}
              </button>
            </div>
          ))}
        </div>

        {/* Right Column */}
        <div>
          {/* CSV Import */}
          <div className="db-card" style={{ marginBottom: 12 }}>
            <div className="db-card-label" style={{ marginBottom: 12 }}>Bulk CSV Import</div>
            <div
              style={{ border: "2px dashed var(--db-border2)", padding: 32, textAlign: "center", cursor: "pointer", transition: "border-color .2s" }}
              onClick={() => showToast("CSV import initiated")}
            >
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" style={{ margin: "0 auto 12px", display: "block" }}><path d="M16 4v16M10 14l6 6 6-6" stroke="var(--db-gray4)" strokeWidth="1.5" /><path d="M4 24v2a2 2 0 002 2h20a2 2 0 002-2v-2" stroke="var(--db-gray4)" strokeWidth="1.5" /></svg>
              <div style={{ fontSize: 12, color: "var(--db-gray3)" }}>Drop CSV file or click to upload</div>
              <div style={{ fontFamily: "var(--font-ibm-mono), monospace", fontSize: 10, color: "var(--db-gray5)", marginTop: 4 }}>Appendix D format required</div>
            </div>
          </div>

          {/* Audit Log */}
          <div className="db-card">
            <div className="db-card-label" style={{ marginBottom: 12 }}>Audit Log (Recent)</div>
            <table className="db-tbl">
              <thead><tr><th>Action</th><th>Actor</th><th>Time</th></tr></thead>
              <tbody>
                {AUDIT.map((a, i) => (
                  <tr key={i}>
                    <td style={{ color: "var(--db-gray3)" }}>{a.action}</td>
                    <td style={{ fontFamily: "var(--font-ibm-mono), monospace", fontSize: 10 }}>{a.actor}</td>
                    <td style={{ fontFamily: "var(--font-ibm-mono), monospace", fontSize: 10, color: "var(--db-gray5)" }}>{a.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
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
              <div className="db-form-group"><label className="db-inp-label">Year</label><select className="db-inp"><option>1</option><option>2</option><option>3</option><option>4</option></select></div>
            </div>
          </div>
          <div className="db-modal-footer">
            <button className="db-btn db-btn-ghost" onClick={() => setModalOpen(false)}>Cancel</button>
            <button className="db-btn db-btn-white" onClick={() => { setModalOpen(false); showToast("Invite sent!"); }}>Send Invite</button>
          </div>
        </div>
      </div>
      <div className={`db-toast${toast ? " show" : ""}`}>{toast}</div>
    </>
  );
}
