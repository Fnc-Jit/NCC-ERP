"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { api } from "@/lib/api";

type User = {
  id: string;
  full_name: string;
  email: string;
  role: string;
  is_active: boolean;
  company?: string;
  wing?: string;
};

type AuditEntry = {
  action: string;
  actor: string;
  time: string;
};

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [audit, setAudit] = useState<AuditEntry[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingAudit, setLoadingAudit] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [toast, setToast] = useState("");
  const showToast = (m: string) => { setToast(m); setTimeout(() => setToast(""), 2500); };

  const [dragOver, setDragOver] = useState(false);
  const [uploadingCSV, setUploadingCSV] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Invite form state
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("cadet");
  const [inviteCompany, setInviteCompany] = useState("Alpha");
  const [inviteWing, setInviteWing] = useState("army");
  const [inviteYear, setInviteYear] = useState("1");

  // Fetch users from API
  const fetchUsers = useCallback(async () => {
    setLoadingUsers(true);
    try {
      const data = await api.get<{ users: User[] }>("/api/users");
      setUsers(data.users || []);
    } catch {
      showToast("Failed to load users");
    } finally {
      setLoadingUsers(false);
    }
  }, []);

  // Fetch audit log from API
  const fetchAudit = useCallback(async () => {
    setLoadingAudit(true);
    try {
      const data = await api.get<{ logs: AuditEntry[] }>("/api/system/audit?limit=10");
      setAudit(data.logs || []);
    } catch {
      // Audit may not be implemented yet, use empty
      setAudit([]);
    } finally {
      setLoadingAudit(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
    fetchAudit();
  }, [fetchUsers, fetchAudit]);

  // Toggle user active status
  const toggleUserStatus = async (user: User) => {
    const newStatus = user.is_active ? "Inactive" : "Active";
    try {
      await api.put(`/api/users/${user.id}/status`, { status: newStatus });
      setUsers(prev => prev.map(u => u.id === user.id ? { ...u, is_active: !u.is_active } : u));
      showToast(`${user.full_name} ${user.is_active ? "deactivated" : "activated"}`);
    } catch {
      showToast("Failed to update user status");
    }
  };

  // Invite user
  const handleInvite = async () => {
    if (!inviteEmail) { showToast("Email is required"); return; }
    try {
      await api.post("/api/users/invite", {
        email: inviteEmail,
        role: inviteRole,
        company: inviteCompany,
        wing: inviteWing,
        year: inviteYear,
      });
      setModalOpen(false);
      setInviteEmail("");
      showToast("Invite sent!");
      fetchUsers();
    } catch (err: unknown) {
      showToast(err instanceof Error ? err.message : "Failed to send invite");
    }
  };

  // CSV Import
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>) => {
    let file: File | null = null;
    if ('dataTransfer' in e) {
      e.preventDefault();
      setDragOver(false);
      file = e.dataTransfer.files[0];
    } else {
      file = e.target.files && e.target.files.length > 0 ? e.target.files[0] : null;
    }

    if (file) {
      setUploadingCSV(true);
      showToast(`Uploading ${file.name}...`);
      try {
        // Parse CSV to JSON and send to API
        const text = await file.text();
        const lines = text.trim().split("\n");
        const headers = lines[0].split(",").map(h => h.trim().toLowerCase());
        const records = lines.slice(1).map(line => {
          const vals = line.split(",").map(v => v.trim());
          const record: Record<string, string> = {};
          headers.forEach((h, i) => { record[h] = vals[i] || ""; });
          return record;
        });
        await api.post("/api/users/import", records);
        showToast(`${records.length} records imported successfully!`);
        fetchUsers();
      } catch {
        showToast("CSV import failed");
      } finally {
        setUploadingCSV(false);
      }
    }
  };

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
          {loadingUsers ? (
            <div style={{ padding: 32, textAlign: "center", color: "var(--db-gray5)", fontFamily: "var(--font-ibm-mono), monospace", fontSize: 11 }}>Loading users...</div>
          ) : users.length === 0 ? (
            <div style={{ padding: 32, textAlign: "center", color: "var(--db-gray5)", fontFamily: "var(--font-ibm-mono), monospace", fontSize: 11 }}>No users found</div>
          ) : (
            users.map((u) => (
              <div className="db-user-row" key={u.id}>
                <div className="db-avatar">{u.full_name.split(" ").map(n => n[0]).join("").slice(0, 2)}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 500 }}>{u.full_name}</div>
                  <div style={{ fontFamily: "var(--font-ibm-mono), monospace", fontSize: 10, color: "var(--db-gray5)" }}>{u.email}</div>
                </div>
                <span className={`db-badge ${u.role === "suo" || u.role === "ano" ? "db-badge-amber" : u.role === "admin" ? "db-badge-green" : "db-badge-gray"}`}>
                  {u.role.toUpperCase()}
                </span>
                <button
                  className={`db-btn ${u.is_active ? "db-btn-ghost" : "db-btn-green"}`}
                  style={{ fontSize: 9, padding: "4px 10px" }}
                  onClick={() => toggleUserStatus(u)}
                >
                  {u.is_active ? "Deactivate" : "Activate"}
                </button>
              </div>
            ))
          )}
        </div>

        {/* Right Column */}
        <div>
          {/* CSV Import */}
          <div className="db-card" style={{ marginBottom: 12 }}>
            <div className="db-card-label" style={{ marginBottom: 12 }}>Bulk CSV Import</div>
            <div
              style={{
                border: `2px dashed ${dragOver ? "var(--db-blue)" : "var(--db-border2)"}`,
                padding: 32,
                textAlign: "center",
                cursor: uploadingCSV ? "not-allowed" : "pointer",
                transition: "all .2s",
                background: dragOver ? "rgba(59,130,246,0.05)" : "transparent"
              }}
              onClick={() => !uploadingCSV && fileInputRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={(e) => { e.preventDefault(); setDragOver(false); }}
              onDrop={handleFileChange}
            >
              {uploadingCSV ? (
                <>
                  <svg className="animate-spin" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--db-blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ margin: "0 auto 12px", display: "block" }}><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                  <div style={{ fontSize: 12, color: "var(--db-blue)" }}>Importing records...</div>
                </>
              ) : (
                <>
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" style={{ margin: "0 auto 12px", display: "block" }}><path d="M16 4v16M10 14l6 6 6-6" stroke="var(--db-gray4)" strokeWidth="1.5" /><path d="M4 24v2a2 2 0 002 2h20a2 2 0 002-2v-2" stroke="var(--db-gray4)" strokeWidth="1.5" /></svg>
                  <div style={{ fontSize: 12, color: "var(--db-gray3)" }}>Drop CSV file or click to upload</div>
                  <div style={{ fontFamily: "var(--font-ibm-mono), monospace", fontSize: 10, color: "var(--db-gray5)", marginTop: 4 }}>Appendix D format required</div>
                </>
              )}
            </div>
            <input type="file" ref={fileInputRef} style={{ display: "none" }} accept=".csv" onChange={handleFileChange} />
          </div>

          {/* Audit Log */}
          <div className="db-card">
            <div className="db-card-label" style={{ marginBottom: 12 }}>Audit Log (Recent)</div>
            {loadingAudit ? (
              <div style={{ padding: 16, textAlign: "center", color: "var(--db-gray5)", fontFamily: "var(--font-ibm-mono), monospace", fontSize: 11 }}>Loading...</div>
            ) : audit.length === 0 ? (
              <div style={{ padding: 16, textAlign: "center", color: "var(--db-gray5)", fontFamily: "var(--font-ibm-mono), monospace", fontSize: 11 }}>No audit logs yet</div>
            ) : (
              <table className="db-tbl">
                <thead><tr><th>Action</th><th>Actor</th><th>Time</th></tr></thead>
                <tbody>
                  {audit.map((a, i) => (
                    <tr key={i}>
                      <td style={{ color: "var(--db-gray3)" }}>{a.action}</td>
                      <td style={{ fontFamily: "var(--font-ibm-mono), monospace", fontSize: 10 }}>{a.actor}</td>
                      <td style={{ fontFamily: "var(--font-ibm-mono), monospace", fontSize: 10, color: "var(--db-gray5)" }}>{a.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* Invite Modal */}
      <div className={`db-modal-overlay${modalOpen ? " open" : ""}`} onClick={() => setModalOpen(false)}>
        <div className="db-modal" onClick={(e) => e.stopPropagation()}>
          <div className="db-modal-header"><div className="db-modal-title">Invite Cadet</div><button className="db-modal-close" onClick={() => setModalOpen(false)}>×</button></div>
          <div className="db-modal-body">
            <div className="db-form-group"><label className="db-inp-label">Email Address</label><input className="db-inp" placeholder="cadet@college.edu.in" value={inviteEmail} onChange={(e) => setInviteEmail(e.target.value)} /></div>
            <div className="db-form-row">
              <div className="db-form-group"><label className="db-inp-label">Role</label><select className="db-inp" value={inviteRole} onChange={(e) => setInviteRole(e.target.value)}><option value="cadet">Cadet</option><option value="suo">SUO</option><option value="ano">ANO</option><option value="admin">Admin</option></select></div>
              <div className="db-form-group"><label className="db-inp-label">Company</label><select className="db-inp" value={inviteCompany} onChange={(e) => setInviteCompany(e.target.value)}><option>Alpha</option><option>Bravo</option><option>Charlie</option><option>Delta</option></select></div>
            </div>
            <div className="db-form-row">
              <div className="db-form-group"><label className="db-inp-label">Wing</label><select className="db-inp" value={inviteWing} onChange={(e) => setInviteWing(e.target.value)}><option value="army">Army</option><option value="navy">Navy</option><option value="airforce">Air Force</option></select></div>
              <div className="db-form-group"><label className="db-inp-label">Year</label><select className="db-inp" value={inviteYear} onChange={(e) => setInviteYear(e.target.value)}><option>1</option><option>2</option><option>3</option><option>4</option></select></div>
            </div>
          </div>
          <div className="db-modal-footer">
            <button className="db-btn db-btn-ghost" onClick={() => setModalOpen(false)}>Cancel</button>
            <button className="db-btn db-btn-white" onClick={handleInvite}>Send Invite</button>
          </div>
        </div>
      </div>
      <div className={`db-toast${toast ? " show" : ""}`}>{toast}</div>
    </>
  );
}
