"use client";

import { useState } from "react";
import { useIsOfficer, useRole } from "@/lib/role-context";

const MARK_CADETS = [
  { name: "Arjun Kumar Singh", chest: "KT-SW-01", status: null as string | null },
  { name: "Vikram Reddy", chest: "KT-SW-07", status: null as string | null },
  { name: "Kiran Verma", chest: "KT-SW-11", status: null as string | null },
  { name: "Dev Krishnan", chest: "KT-SW-04", status: null as string | null },
  { name: "Ravi Kumar", chest: "KT-SW-08", status: null as string | null },
  { name: "Suresh Babu", chest: "KT-SW-12", status: null as string | null },
  { name: "Madhan Raj", chest: "KT-SW-02", status: null as string | null },
  { name: "Arun Prakash", chest: "KT-SW-09", status: null as string | null },
  { name: "Nitesh Sinha", chest: "KT-SW-15", status: null as string | null },
  { name: "Omkar Patil", chest: "KT-SW-18", status: null as string | null },
  { name: "Rajesh Yadav", chest: "KT-SW-22", status: null as string | null },
  { name: "Santosh Kumar", chest: "KT-SW-25", status: null as string | null },
];

type CadetRecord = { name: string; chest: string; status: "present" | "late" | "absent" };
type SessionRecord = {
  id: number; date: string; type: string; co: string; wing: string;
  p: number; t: number; pct: number; locked: boolean;
  title: string; time: string;
  cadets: CadetRecord[];
};

const SESSION_HISTORY_INIT: SessionRecord[] = [
  {
    id: 46, date: "27 MAR", type: "Parade", co: "Alpha", wing: "Army", p: 47, t: 52, pct: 90, locked: true,
    title: "Morning Drill Parade", time: "07:00 – 09:30",
    cadets: [
      { name: "Arjun Kumar Singh", chest: "KT-SW-01", status: "present" },
      { name: "Vikram Reddy", chest: "KT-SW-07", status: "present" },
      { name: "Kiran Verma", chest: "KT-SW-11", status: "late" },
      { name: "Dev Krishnan", chest: "KT-SW-04", status: "present" },
      { name: "Ravi Kumar", chest: "KT-SW-08", status: "absent" },
      { name: "Suresh Babu", chest: "KT-SW-12", status: "present" },
      { name: "Madhan Raj", chest: "KT-SW-02", status: "present" },
      { name: "Arun Prakash", chest: "KT-SW-09", status: "present" },
      { name: "Nitesh Sinha", chest: "KT-SW-15", status: "present" },
      { name: "Omkar Patil", chest: "KT-SW-18", status: "absent" },
      { name: "Rajesh Yadav", chest: "KT-SW-22", status: "present" },
      { name: "Santosh Kumar", chest: "KT-SW-25", status: "present" },
    ],
  },
  {
    id: 45, date: "26 MAR", type: "Drill", co: "All", wing: "All", p: 201, t: 247, pct: 81, locked: true,
    title: "Combined Arms Drill", time: "08:00 – 11:00",
    cadets: [
      { name: "Arjun Kumar Singh", chest: "KT-SW-01", status: "present" },
      { name: "Vikram Reddy", chest: "KT-SW-07", status: "present" },
      { name: "Kiran Verma", chest: "KT-SW-11", status: "absent" },
      { name: "Dev Krishnan", chest: "KT-SW-04", status: "present" },
      { name: "Ravi Kumar", chest: "KT-SW-08", status: "present" },
      { name: "Suresh Babu", chest: "KT-SW-12", status: "late" },
      { name: "Madhan Raj", chest: "KT-SW-02", status: "absent" },
      { name: "Arun Prakash", chest: "KT-SW-09", status: "present" },
      { name: "Nitesh Sinha", chest: "KT-SW-15", status: "present" },
      { name: "Omkar Patil", chest: "KT-SW-18", status: "present" },
      { name: "Rajesh Yadav", chest: "KT-SW-22", status: "late" },
      { name: "Santosh Kumar", chest: "KT-SW-25", status: "present" },
    ],
  },
  {
    id: 44, date: "25 MAR", type: "Lecture", co: "Bravo", wing: "Navy", p: 28, t: 40, pct: 70, locked: true,
    title: "Map Reading & Navigation", time: "10:00 – 12:00",
    cadets: [
      { name: "Arjun Kumar Singh", chest: "KT-SW-01", status: "absent" },
      { name: "Vikram Reddy", chest: "KT-SW-07", status: "present" },
      { name: "Kiran Verma", chest: "KT-SW-11", status: "present" },
      { name: "Dev Krishnan", chest: "KT-SW-04", status: "absent" },
      { name: "Ravi Kumar", chest: "KT-SW-08", status: "absent" },
      { name: "Suresh Babu", chest: "KT-SW-12", status: "present" },
      { name: "Madhan Raj", chest: "KT-SW-02", status: "present" },
      { name: "Arun Prakash", chest: "KT-SW-09", status: "late" },
      { name: "Nitesh Sinha", chest: "KT-SW-15", status: "absent" },
      { name: "Omkar Patil", chest: "KT-SW-18", status: "present" },
      { name: "Rajesh Yadav", chest: "KT-SW-22", status: "present" },
      { name: "Santosh Kumar", chest: "KT-SW-25", status: "absent" },
    ],
  },
  {
    id: 43, date: "22 MAR", type: "Camp", co: "All", wing: "All", p: 185, t: 247, pct: 75, locked: true,
    title: "Field Training Exercise", time: "06:00 – 18:00",
    cadets: [
      { name: "Arjun Kumar Singh", chest: "KT-SW-01", status: "present" },
      { name: "Vikram Reddy", chest: "KT-SW-07", status: "absent" },
      { name: "Kiran Verma", chest: "KT-SW-11", status: "present" },
      { name: "Dev Krishnan", chest: "KT-SW-04", status: "present" },
      { name: "Ravi Kumar", chest: "KT-SW-08", status: "late" },
      { name: "Suresh Babu", chest: "KT-SW-12", status: "absent" },
      { name: "Madhan Raj", chest: "KT-SW-02", status: "present" },
      { name: "Arun Prakash", chest: "KT-SW-09", status: "absent" },
      { name: "Nitesh Sinha", chest: "KT-SW-15", status: "present" },
      { name: "Omkar Patil", chest: "KT-SW-18", status: "present" },
      { name: "Rajesh Yadav", chest: "KT-SW-22", status: "present" },
      { name: "Santosh Kumar", chest: "KT-SW-25", status: "present" },
    ],
  },
];

export default function AttendancePage() {
  const isOfficer = useIsOfficer();
  return isOfficer ? <OfficerAttendance /> : <CadetAttendance />;
}

/* ═══════════════════════ OFFICER / ANO / CAPTAIN VIEW ═══════════════════════ */

function OfficerAttendance() {
  const role = useRole();
  const roleLabel = role === "captain" ? "Captain" : role === "ano" ? "ANO" : role.toUpperCase();

  // Session state
  const [sessionActive, setSessionActive] = useState(true);
  const [sessionLocked, setSessionLocked] = useState(false);
  const [sessionNumber, setSessionNumber] = useState(47);
  const [sessionTitle, setSessionTitle] = useState("Morning Drill Parade");
  const [sessionCompany, setSessionCompany] = useState("Alpha");
  const [sessionType, setSessionType] = useState("Parade");

  // Cadet marking
  const [cadets, setCadets] = useState(MARK_CADETS);
  const [history, setHistory] = useState<SessionRecord[]>(SESSION_HISTORY_INIT);

  // Modals & UI
  const [toast, setToast] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [newSessionOpen, setNewSessionOpen] = useState(false);
  const [infoSession, setInfoSession] = useState<SessionRecord | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [newType, setNewType] = useState("Drill");
  const [newCompany, setNewCompany] = useState("All");
  const [newWing, setNewWing] = useState("All");

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 3000); };

  const markStatus = (index: number, status: string) => {
    if (sessionLocked) return;
    setCadets((prev) => prev.map((c, i) => (i === index ? { ...c, status } : c)));
  };
  const markAll = (status: string) => {
    if (sessionLocked) return;
    setCadets((prev) => prev.map((c) => ({ ...c, status })));
  };

  const marked = cadets.filter((c) => c.status !== null).length;
  const presentCount = cadets.filter((c) => c.status === "present").length;
  const lateCount = cadets.filter((c) => c.status === "late").length;
  const absentCount = cadets.filter((c) => c.status === "absent").length;

  // Submit & lock session
  const handleSubmit = () => {
    if (marked < cadets.length) {
      showToast(`⚠ Mark all cadets before submitting (${cadets.length - marked} remaining)`);
      return;
    }
    setConfirmOpen(true);
  };

  const confirmSubmit = () => {
    setSessionLocked(true);
    setConfirmOpen(false);
    const pct = Math.round(((presentCount + lateCount) / cadets.length) * 100);
    // Add to history
    setHistory((prev) => [
      {
        id: sessionNumber, date: "28 MAR", type: sessionType, co: sessionCompany, wing: "Army",
        p: presentCount + lateCount, t: cadets.length, pct, locked: true,
        title: sessionTitle, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        cadets: cadets.map((c) => ({ name: c.name, chest: c.chest, status: (c.status || "absent") as "present" | "late" | "absent" })),
      },
      ...prev,
    ]);
    showToast(`✓ Session #${sessionNumber} submitted & locked — ${presentCount + lateCount}/${cadets.length} present (${pct}%)`);
  };

  // Create new session
  const handleNewSession = () => {
    if (!newTitle.trim()) { showToast("Enter a session title"); return; }
    setSessionNumber((n) => n + 1);
    setSessionTitle(newTitle);
    setSessionType(newType);
    setSessionCompany(newCompany);
    setSessionActive(true);
    setSessionLocked(false);
    setCadets(MARK_CADETS.map((c) => ({ ...c, status: null })));
    setNewSessionOpen(false);
    setNewTitle("");
    showToast(`✓ Session #${sessionNumber + 1} created — start marking attendance`);
  };

  // Dispute handling
  const [disputes, setDisputes] = useState([
    { name: "Arjun Kumar Singh", session: "25 MAR #044", reason: "Medical emergency — hospital slip attached", status: "pending" as string },
    { name: "Meera Iyer", session: "26 MAR #045", reason: "College exam rescheduled", status: "pending" as string },
    { name: "Vikram Reddy", session: "27 MAR #046", reason: "Family emergency", status: "pending" as string },
  ]);

  const handleDispute = (index: number, action: "accepted" | "rejected") => {
    setDisputes((prev) => prev.map((d, i) => i === index ? { ...d, status: action } : d));
    showToast(`Dispute ${action} for ${disputes[index].name}`);
  };

  const pendingDisputes = disputes.filter((d) => d.status === "pending");

  return (
    <>
      <div className="db-section-hdr">
        <div>
          <div className="db-section-title">Attendance <em>Engine</em></div>
          <div className="db-section-sub">Logged in as {roleLabel} · Sessions · Disputes · History</div>
        </div>
        <button className="db-btn db-btn-white" onClick={() => setNewSessionOpen(true)}>+ New Session</button>
      </div>

      {/* ── ACTIVE SESSION ── */}
      {sessionActive && (
        <div className="db-card" style={{ marginBottom: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 8 }}>
            <div>
              <div className="db-card-label">Active Session</div>
              <div className="db-card-title">{sessionTitle} — {sessionCompany} Company</div>
              <div style={{ fontFamily: "var(--font-ibm-mono), monospace", fontSize: 10, color: "var(--db-gray4)" }}>
                28 MAR 2026 · ARMY WING · SESSION #{sessionNumber}
              </div>
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              {sessionLocked ? (
                <span className="db-badge db-badge-gray">Locked</span>
              ) : (
                <>
                  <span className="db-badge db-badge-green">Live</span>
                  <button className="db-btn db-btn-white" onClick={handleSubmit}>
                    Submit Attendance
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Summary strip */}
          <div style={{ display: "flex", gap: 16, marginBottom: 16, padding: "12px 16px", background: "var(--db-bg3)", flexWrap: "wrap" }}>
            <div style={{ fontFamily: "var(--font-ibm-mono), monospace", fontSize: 11 }}>
              <span style={{ color: "var(--db-gray5)" }}>TOTAL</span> <span style={{ color: "var(--db-gray1)", fontWeight: 600 }}>{cadets.length}</span>
            </div>
            <div style={{ fontFamily: "var(--font-ibm-mono), monospace", fontSize: 11 }}>
              <span style={{ color: "var(--db-gray5)" }}>PRESENT</span> <span style={{ color: "var(--db-green)", fontWeight: 600 }}>{presentCount}</span>
            </div>
            <div style={{ fontFamily: "var(--font-ibm-mono), monospace", fontSize: 11 }}>
              <span style={{ color: "var(--db-gray5)" }}>LATE</span> <span style={{ color: "var(--db-amber)", fontWeight: 600 }}>{lateCount}</span>
            </div>
            <div style={{ fontFamily: "var(--font-ibm-mono), monospace", fontSize: 11 }}>
              <span style={{ color: "var(--db-gray5)" }}>ABSENT</span> <span style={{ color: "var(--db-red)", fontWeight: 600 }}>{absentCount}</span>
            </div>
            <div style={{ fontFamily: "var(--font-ibm-mono), monospace", fontSize: 11, marginLeft: "auto" }}>
              <span style={{ color: "var(--db-gray5)" }}>MARKED</span> <span style={{ color: "var(--db-gray1)", fontWeight: 600 }}>{marked}/{cadets.length}</span>
            </div>
          </div>

          {/* Cadet rows */}
          {cadets.map((c, i) => (
            <div className="db-mark-row" key={i} style={{ opacity: sessionLocked ? 0.5 : 1 }}>
              <div>
                <div className="db-mark-name">{c.name}</div>
                <div className="db-mark-chest">{c.chest}</div>
              </div>
              <div className="db-mark-btns">
                {["present", "late", "absent"].map((s) => (
                  <button
                    key={s}
                    className={`db-mark-btn ${s}${c.status === s ? " active" : ""}`}
                    onClick={() => markStatus(i, s)}
                    disabled={sessionLocked}
                  >
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          ))}

          {/* Bottom bar */}
          {!sessionLocked && (
            <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid var(--db-border)", display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button className="db-btn db-btn-ghost" onClick={() => markAll("present")}>Mark All Present</button>
              <button className="db-btn db-btn-ghost" onClick={() => markAll("absent")}>Mark All Absent</button>
              <button className="db-btn db-btn-white" style={{ marginLeft: "auto" }} onClick={handleSubmit}>
                Submit Attendance ({marked}/{cadets.length})
              </button>
            </div>
          )}
          {sessionLocked && (
            <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid var(--db-border)", display: "flex", gap: 12, alignItems: "center" }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M4 6V4a3 3 0 016 0v2M3 6h8v6H3z" stroke="var(--db-green)" strokeWidth="1.2"/></svg>
              <span style={{ fontFamily: "var(--font-ibm-mono), monospace", fontSize: 10, color: "var(--db-green)", letterSpacing: ".08em" }}>
                SESSION SUBMITTED & LOCKED — {presentCount + lateCount}/{cadets.length} PRESENT ({Math.round(((presentCount + lateCount) / cadets.length) * 100)}%)
              </span>
            </div>
          )}
        </div>
      )}

      {/* ── DISPUTES ── */}
      <div className="db-card" style={{ marginBottom: 12 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div className="db-card-label">Pending Disputes</div>
          <span className="db-badge db-badge-amber">{pendingDisputes.length} Pending</span>
        </div>
        <table className="db-tbl">
          <thead><tr><th>Cadet</th><th>Session</th><th>Reason</th><th>Status</th><th>Action</th></tr></thead>
          <tbody>
            {disputes.map((d, i) => (
              <tr key={i}>
                <td>{d.name}</td>
                <td style={{ fontFamily: "var(--font-ibm-mono), monospace", fontSize: 11 }}>{d.session}</td>
                <td style={{ color: "var(--db-gray3)" }}>{d.reason}</td>
                <td>
                  <span className={`db-badge ${d.status === "pending" ? "db-badge-amber" : d.status === "accepted" ? "db-badge-green" : "db-badge-red"}`}>
                    {d.status.charAt(0).toUpperCase() + d.status.slice(1)}
                  </span>
                </td>
                <td>
                  {d.status === "pending" ? (
                    <>
                      <button className="db-btn db-btn-green" style={{ padding: "4px 10px", fontSize: 9 }} onClick={() => handleDispute(i, "accepted")}>Accept</button>{" "}
                      <button className="db-btn db-btn-ghost" style={{ padding: "4px 10px", fontSize: 9 }} onClick={() => handleDispute(i, "rejected")}>Reject</button>
                    </>
                  ) : (
                    <span style={{ fontFamily: "var(--font-ibm-mono), monospace", fontSize: 9, color: "var(--db-gray5)" }}>Resolved</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── SESSION HISTORY ── */}
      <div className="db-card">
        <div className="db-card-label" style={{ marginBottom: 16 }}>Session History</div>
        <table className="db-tbl">
          <thead><tr><th>#</th><th>Date</th><th>Type</th><th>Company</th><th>Wing</th><th>Present</th><th>Total</th><th>%</th><th>Status</th><th></th></tr></thead>
          <tbody>
            {history.map((s, i) => (
              <tr key={i}>
                <td style={{ fontFamily: "var(--font-ibm-mono), monospace", fontSize: 11, color: "var(--db-gray5)" }}>#{s.id}</td>
                <td style={{ fontFamily: "var(--font-ibm-mono), monospace", fontSize: 11 }}>{s.date}</td>
                <td>{s.type}</td><td>{s.co}</td><td>{s.wing}</td><td>{s.p}</td><td>{s.t}</td>
                <td className={s.pct >= 80 ? "db-green" : "db-amber"} style={{ fontFamily: "var(--font-ibm-mono), monospace" }}>{s.pct}%</td>
                <td><span className="db-badge db-badge-gray">Locked</span></td>
                <td>
                  <button
                    className="db-info-btn"
                    title="View full attendance details"
                    onClick={() => setInfoSession(s)}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.2"/>
                      <path d="M8 7v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                      <circle cx="8" cy="5" r="0.8" fill="currentColor"/>
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── SESSION INFO MODAL ── */}
      <SessionInfoModal session={infoSession} onClose={() => setInfoSession(null)} />

      {/* ── CONFIRM SUBMIT MODAL ── */}
      <div className={`db-modal-overlay${confirmOpen ? " open" : ""}`} onClick={() => setConfirmOpen(false)}>
        <div className="db-modal" onClick={(e) => e.stopPropagation()}>
          <div className="db-modal-header">
            <div className="db-modal-title">Confirm Submission</div>
            <button className="db-modal-close" onClick={() => setConfirmOpen(false)}>×</button>
          </div>
          <div className="db-modal-body">
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" style={{ margin: "0 auto 12px" }}>
                <path d="M14 20V16a6 6 0 0112 0v4M10 20h20v14H10z" stroke="var(--db-gray1)" strokeWidth="1.5"/>
              </svg>
              <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 8 }}>Lock Session #{sessionNumber}?</div>
              <div style={{ fontSize: 12, color: "var(--db-gray3)", lineHeight: 1.6 }}>
                This action cannot be undone. The attendance record will be permanently locked.
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 1, background: "var(--db-border)", marginBottom: 16 }}>
              <div style={{ background: "var(--db-bg2)", padding: "12px 16px", textAlign: "center" }}>
                <div style={{ fontFamily: "var(--font-ibm-mono), monospace", fontSize: 9, color: "var(--db-gray5)", letterSpacing: ".1em" }}>PRESENT</div>
                <div style={{ fontFamily: "var(--font-ibm-mono), monospace", fontSize: 20, color: "var(--db-green)" }}>{presentCount}</div>
              </div>
              <div style={{ background: "var(--db-bg2)", padding: "12px 16px", textAlign: "center" }}>
                <div style={{ fontFamily: "var(--font-ibm-mono), monospace", fontSize: 9, color: "var(--db-gray5)", letterSpacing: ".1em" }}>LATE</div>
                <div style={{ fontFamily: "var(--font-ibm-mono), monospace", fontSize: 20, color: "var(--db-amber)" }}>{lateCount}</div>
              </div>
              <div style={{ background: "var(--db-bg2)", padding: "12px 16px", textAlign: "center" }}>
                <div style={{ fontFamily: "var(--font-ibm-mono), monospace", fontSize: 9, color: "var(--db-gray5)", letterSpacing: ".1em" }}>ABSENT</div>
                <div style={{ fontFamily: "var(--font-ibm-mono), monospace", fontSize: 20, color: "var(--db-red)" }}>{absentCount}</div>
              </div>
            </div>
            <div style={{ fontFamily: "var(--font-ibm-mono), monospace", fontSize: 10, color: "var(--db-gray5)", textAlign: "center" }}>
              Submitted by: {roleLabel} · {new Date().toLocaleTimeString()}
            </div>
          </div>
          <div className="db-modal-footer">
            <button className="db-btn db-btn-ghost" onClick={() => setConfirmOpen(false)}>Cancel</button>
            <button className="db-btn db-btn-white" onClick={confirmSubmit}>Lock & Submit</button>
          </div>
        </div>
      </div>

      {/* ── NEW SESSION MODAL ── */}
      <div className={`db-modal-overlay${newSessionOpen ? " open" : ""}`} onClick={() => setNewSessionOpen(false)}>
        <div className="db-modal" onClick={(e) => e.stopPropagation()}>
          <div className="db-modal-header">
            <div className="db-modal-title">Create New Session</div>
            <button className="db-modal-close" onClick={() => setNewSessionOpen(false)}>×</button>
          </div>
          <div className="db-modal-body">
            <div className="db-form-group">
              <label className="db-inp-label">Session Title</label>
              <input className="db-inp" placeholder="e.g. Morning Drill Parade" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
            </div>
            <div className="db-form-row">
              <div className="db-form-group">
                <label className="db-inp-label">Type</label>
                <select className="db-inp" value={newType} onChange={(e) => setNewType(e.target.value)}>
                  <option>Parade</option><option>Drill</option><option>Lecture</option><option>Camp</option><option>Exam</option>
                </select>
              </div>
              <div className="db-form-group">
                <label className="db-inp-label">Date</label>
                <input type="date" className="db-inp" defaultValue="2026-03-29" />
              </div>
            </div>
            <div className="db-form-row">
              <div className="db-form-group">
                <label className="db-inp-label">Company</label>
                <select className="db-inp" value={newCompany} onChange={(e) => setNewCompany(e.target.value)}>
                  <option>All</option><option>Alpha</option><option>Bravo</option><option>Charlie</option><option>Delta</option>
                </select>
              </div>
              <div className="db-form-group">
                <label className="db-inp-label">Wing</label>
                <select className="db-inp" value={newWing} onChange={(e) => setNewWing(e.target.value)}>
                  <option>All</option><option>Army</option><option>Navy</option><option>Air Force</option>
                </select>
              </div>
            </div>
            <div style={{ fontFamily: "var(--font-ibm-mono), monospace", fontSize: 10, color: "var(--db-gray5)", marginTop: 4 }}>
              Session #{sessionNumber + 1} · Created by {roleLabel}
            </div>
          </div>
          <div className="db-modal-footer">
            <button className="db-btn db-btn-ghost" onClick={() => setNewSessionOpen(false)}>Cancel</button>
            <button className="db-btn db-btn-white" onClick={handleNewSession}>Create & Start</button>
          </div>
        </div>
      </div>

      <div className={`db-toast${toast ? " show" : ""}`}>{toast}</div>
    </>
  );
}

/* ═══════════════════════ SESSION INFO MODAL ═══════════════════════ */

function SessionInfoModal({ session, onClose }: { session: SessionRecord | null; onClose: () => void }) {
  const [filterStatus, setFilterStatus] = useState<string>("all");

  if (!session) return null;

  const presentCount = session.cadets.filter((c) => c.status === "present").length;
  const lateCount = session.cadets.filter((c) => c.status === "late").length;
  const absentCount = session.cadets.filter((c) => c.status === "absent").length;
  const total = session.cadets.length;

  const filtered = filterStatus === "all"
    ? session.cadets
    : session.cadets.filter((c) => c.status === filterStatus);

  return (
    <div className={`db-modal-overlay open`} onClick={onClose}>
      <div className="db-modal" style={{ maxWidth: 640 }} onClick={(e) => e.stopPropagation()}>
        <div className="db-modal-header">
          <div>
            <div className="db-modal-title">Session #{session.id} — Full Details</div>
            <div style={{ fontFamily: "var(--font-ibm-mono), monospace", fontSize: 10, color: "var(--db-gray5)", marginTop: 2 }}>
              {session.date} 2026 · {session.time}
            </div>
          </div>
          <button className="db-modal-close" onClick={onClose}>×</button>
        </div>
        <div className="db-modal-body">
          {/* Session metadata */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
            <span className="db-badge db-badge-white">{session.type}</span>
            <span className="db-badge db-badge-gray">{session.co} Company</span>
            <span className="db-badge db-badge-gray">{session.wing} Wing</span>
            {session.title && <span style={{ fontFamily: "var(--font-ibm-mono), monospace", fontSize: 11, color: "var(--db-gray3)", alignSelf: "center" }}>{session.title}</span>}
          </div>

          {/* Visual attendance bar */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", height: 8, borderRadius: 4, overflow: "hidden", background: "var(--db-bg3)" }}>
              {presentCount > 0 && <div style={{ width: `${(presentCount / total) * 100}%`, background: "var(--db-green)", transition: "width .3s" }} />}
              {lateCount > 0 && <div style={{ width: `${(lateCount / total) * 100}%`, background: "var(--db-amber)", transition: "width .3s" }} />}
              {absentCount > 0 && <div style={{ width: `${(absentCount / total) * 100}%`, background: "var(--db-red)", transition: "width .3s" }} />}
            </div>
          </div>

          {/* Stats grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 1, background: "var(--db-border)", marginBottom: 16 }}>
            <div style={{ background: "var(--db-bg2)", padding: "10px 12px", textAlign: "center" }}>
              <div style={{ fontFamily: "var(--font-ibm-mono), monospace", fontSize: 8, color: "var(--db-gray5)", letterSpacing: ".1em" }}>TOTAL</div>
              <div style={{ fontFamily: "var(--font-ibm-mono), monospace", fontSize: 20, color: "var(--db-gray1)" }}>{total}</div>
            </div>
            <div style={{ background: "var(--db-bg2)", padding: "10px 12px", textAlign: "center" }}>
              <div style={{ fontFamily: "var(--font-ibm-mono), monospace", fontSize: 8, color: "var(--db-gray5)", letterSpacing: ".1em" }}>PRESENT</div>
              <div style={{ fontFamily: "var(--font-ibm-mono), monospace", fontSize: 20, color: "var(--db-green)" }}>{presentCount}</div>
            </div>
            <div style={{ background: "var(--db-bg2)", padding: "10px 12px", textAlign: "center" }}>
              <div style={{ fontFamily: "var(--font-ibm-mono), monospace", fontSize: 8, color: "var(--db-gray5)", letterSpacing: ".1em" }}>LATE</div>
              <div style={{ fontFamily: "var(--font-ibm-mono), monospace", fontSize: 20, color: "var(--db-amber)" }}>{lateCount}</div>
            </div>
            <div style={{ background: "var(--db-bg2)", padding: "10px 12px", textAlign: "center" }}>
              <div style={{ fontFamily: "var(--font-ibm-mono), monospace", fontSize: 8, color: "var(--db-gray5)", letterSpacing: ".1em" }}>ABSENT</div>
              <div style={{ fontFamily: "var(--font-ibm-mono), monospace", fontSize: 20, color: "var(--db-red)" }}>{absentCount}</div>
            </div>
          </div>

          {/* Filter tabs */}
          <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
            {["all", "present", "late", "absent"].map((f) => (
              <button
                key={f}
                className={`db-btn ${filterStatus === f ? "db-btn-white" : "db-btn-ghost"}`}
                style={{ padding: "4px 12px", fontSize: 10, textTransform: "capitalize" }}
                onClick={() => setFilterStatus(f)}
              >
                {f === "all" ? `All (${total})` : `${f.charAt(0).toUpperCase() + f.slice(1)} (${session.cadets.filter((c) => c.status === f).length})`}
              </button>
            ))}
          </div>

          {/* Cadet table */}
          <div style={{ maxHeight: 280, overflowY: "auto" }}>
            <table className="db-tbl">
              <thead><tr><th>#</th><th>Cadet Name</th><th>Chest No.</th><th>Status</th></tr></thead>
              <tbody>
                {filtered.map((c, i) => (
                  <tr key={i}>
                    <td style={{ fontFamily: "var(--font-ibm-mono), monospace", fontSize: 11, color: "var(--db-gray5)" }}>{i + 1}</td>
                    <td>{c.name}</td>
                    <td style={{ fontFamily: "var(--font-ibm-mono), monospace", fontSize: 11 }}>{c.chest}</td>
                    <td>
                      <span className={`db-badge ${c.status === "present" ? "db-badge-green" : c.status === "late" ? "db-badge-amber" : "db-badge-red"}`}>
                        {c.status.charAt(0).toUpperCase() + c.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Attendance rate */}
          <div style={{ marginTop: 12, fontFamily: "var(--font-ibm-mono), monospace", fontSize: 10, color: "var(--db-gray5)", textAlign: "center", letterSpacing: ".08em" }}>
            ATTENDANCE RATE: {session.pct}% · SESSION LOCKED ✓
          </div>
        </div>
        <div className="db-modal-footer">
          <button className="db-btn db-btn-ghost" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════ CADET VIEW (read-only) ═══════════════════════ */
function CadetAttendance() {
  const [toast, setToast] = useState("");
  const showToast = (m: string) => { setToast(m); setTimeout(() => setToast(""), 2500); };
  const [infoSession, setInfoSession] = useState<{
    date: string; type: string; status: string;
    title: string; time: string; co: string; wing: string;
    total: number; present: number; late: number; absent: number;
  } | null>(null);

  const myHistory = [
    { date: "27 MAR", type: "Parade", status: "present", title: "Morning Drill Parade", time: "07:00 – 09:30", co: "Alpha", wing: "Army", total: 52, present: 47, late: 3, absent: 2 },
    { date: "26 MAR", type: "Drill", status: "present", title: "Combined Arms Drill", time: "08:00 – 11:00", co: "All", wing: "All", total: 247, present: 195, late: 6, absent: 46 },
    { date: "25 MAR", type: "Lecture", status: "absent", title: "Map Reading & Navigation", time: "10:00 – 12:00", co: "Bravo", wing: "Navy", total: 40, present: 26, late: 2, absent: 12 },
    { date: "22 MAR", type: "Camp", status: "present", title: "Field Training Exercise", time: "06:00 – 18:00", co: "All", wing: "All", total: 247, present: 180, late: 5, absent: 62 },
    { date: "20 MAR", type: "Drill", status: "present", title: "Squad Formation Drill", time: "07:00 – 09:00", co: "Alpha", wing: "Army", total: 52, present: 48, late: 2, absent: 2 },
    { date: "18 MAR", type: "Parade", status: "late", title: "Evening Parade", time: "17:00 – 18:30", co: "All", wing: "All", total: 247, present: 210, late: 12, absent: 25 },
    { date: "15 MAR", type: "Lecture", status: "present", title: "Weapon Training Theory", time: "10:00 – 12:00", co: "Alpha", wing: "Army", total: 52, present: 44, late: 4, absent: 4 },
    { date: "12 MAR", type: "Drill", status: "present", title: "Rifle Drill Practice", time: "07:00 – 10:00", co: "All", wing: "Army", total: 120, present: 108, late: 5, absent: 7 },
  ];

  return (
    <>
      <div className="db-section-hdr">
        <div>
          <div className="db-section-title">My <em>Attendance</em></div>
          <div className="db-section-sub">Session history · Dispute portal</div>
        </div>
        <button className="db-btn db-btn-ghost" onClick={() => showToast("Dispute form opening...")}>Raise Dispute</button>
      </div>

      <div className="db-grid-4" style={{ marginBottom: 16 }}>
        <div className="db-card">
          <div className="db-card-label">Overall</div>
          <div className="db-card-value db-green">94%</div>
          <div className="db-card-sub">44 / 47 sessions</div>
        </div>
        <div className="db-card">
          <div className="db-card-label">Present</div>
          <div className="db-card-value">42</div>
          <div className="db-card-sub">On time</div>
        </div>
        <div className="db-card">
          <div className="db-card-label">Late</div>
          <div className="db-card-value db-amber">2</div>
          <div className="db-card-sub">Marked as late</div>
        </div>
        <div className="db-card">
          <div className="db-card-label">Absent</div>
          <div className="db-card-value db-red">3</div>
          <div className="db-card-sub">Missed sessions</div>
        </div>
      </div>

      <div className="db-card" style={{ marginBottom: 12, borderColor: "rgba(34,197,94,.15)" }}>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <span className="db-badge db-badge-green">Eligible</span>
          <span style={{ fontSize: 12, color: "var(--db-gray3)" }}>You meet the ≥75% attendance threshold for B &amp; C Certificate examinations.</span>
        </div>
      </div>

      <div className="db-card">
        <div className="db-card-label" style={{ marginBottom: 16 }}>Session History</div>
        <table className="db-tbl">
          <thead><tr><th>Date</th><th>Type</th><th>Status</th><th></th></tr></thead>
          <tbody>
            {myHistory.map((s, i) => (
              <tr key={i}>
                <td style={{ fontFamily: "var(--font-ibm-mono), monospace", fontSize: 11 }}>{s.date}</td>
                <td>{s.type}</td>
                <td>
                  <span className={`db-badge ${s.status === "present" ? "db-badge-green" : s.status === "late" ? "db-badge-amber" : "db-badge-red"}`}>
                    {s.status}
                  </span>
                </td>
                <td>
                  <button
                    className="db-info-btn"
                    title="View session details"
                    onClick={() => setInfoSession(s)}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.2"/>
                      <path d="M8 7v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                      <circle cx="8" cy="5" r="0.8" fill="currentColor"/>
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── CADET SESSION INFO MODAL ── */}
      {infoSession && (
        <div className="db-modal-overlay open" onClick={() => setInfoSession(null)}>
          <div className="db-modal" style={{ maxWidth: 520 }} onClick={(e) => e.stopPropagation()}>
            <div className="db-modal-header">
              <div>
                <div className="db-modal-title">{infoSession.title}</div>
                <div style={{ fontFamily: "var(--font-ibm-mono), monospace", fontSize: 10, color: "var(--db-gray5)", marginTop: 2 }}>
                  {infoSession.date} 2026 · {infoSession.time}
                </div>
              </div>
              <button className="db-modal-close" onClick={() => setInfoSession(null)}>×</button>
            </div>
            <div className="db-modal-body">
              {/* Session metadata */}
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
                <span className="db-badge db-badge-white">{infoSession.type}</span>
                <span className="db-badge db-badge-gray">{infoSession.co} Company</span>
                <span className="db-badge db-badge-gray">{infoSession.wing} Wing</span>
              </div>

              {/* Your status highlight */}
              <div style={{
                padding: "12px 16px", marginBottom: 16,
                border: `1px solid ${infoSession.status === "present" ? "rgba(34,197,94,.2)" : infoSession.status === "late" ? "rgba(245,158,11,.2)" : "rgba(239,68,68,.2)"}`,
                background: infoSession.status === "present" ? "rgba(34,197,94,.06)" : infoSession.status === "late" ? "rgba(245,158,11,.06)" : "rgba(239,68,68,.06)",
              }}>
                <div style={{ fontFamily: "var(--font-ibm-mono), monospace", fontSize: 9, color: "var(--db-gray5)", letterSpacing: ".1em", marginBottom: 4 }}>YOUR STATUS</div>
                <span className={`db-badge ${infoSession.status === "present" ? "db-badge-green" : infoSession.status === "late" ? "db-badge-amber" : "db-badge-red"}`} style={{ fontSize: 11 }}>
                  {infoSession.status.charAt(0).toUpperCase() + infoSession.status.slice(1)}
                </span>
              </div>

              {/* Visual attendance bar */}
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontFamily: "var(--font-ibm-mono), monospace", fontSize: 9, color: "var(--db-gray5)", letterSpacing: ".1em", marginBottom: 6 }}>SESSION ATTENDANCE</div>
                <div style={{ display: "flex", height: 8, borderRadius: 4, overflow: "hidden", background: "var(--db-bg3)" }}>
                  {infoSession.present > 0 && <div style={{ width: `${(infoSession.present / infoSession.total) * 100}%`, background: "var(--db-green)", transition: "width .3s" }} />}
                  {infoSession.late > 0 && <div style={{ width: `${(infoSession.late / infoSession.total) * 100}%`, background: "var(--db-amber)", transition: "width .3s" }} />}
                  {infoSession.absent > 0 && <div style={{ width: `${(infoSession.absent / infoSession.total) * 100}%`, background: "var(--db-red)", transition: "width .3s" }} />}
                </div>
              </div>

              {/* Stats grid */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 1, background: "var(--db-border)", marginBottom: 16 }}>
                <div style={{ background: "var(--db-bg2)", padding: "10px 12px", textAlign: "center" }}>
                  <div style={{ fontFamily: "var(--font-ibm-mono), monospace", fontSize: 8, color: "var(--db-gray5)", letterSpacing: ".1em" }}>TOTAL</div>
                  <div style={{ fontFamily: "var(--font-ibm-mono), monospace", fontSize: 18, color: "var(--db-gray1)" }}>{infoSession.total}</div>
                </div>
                <div style={{ background: "var(--db-bg2)", padding: "10px 12px", textAlign: "center" }}>
                  <div style={{ fontFamily: "var(--font-ibm-mono), monospace", fontSize: 8, color: "var(--db-gray5)", letterSpacing: ".1em" }}>PRESENT</div>
                  <div style={{ fontFamily: "var(--font-ibm-mono), monospace", fontSize: 18, color: "var(--db-green)" }}>{infoSession.present}</div>
                </div>
                <div style={{ background: "var(--db-bg2)", padding: "10px 12px", textAlign: "center" }}>
                  <div style={{ fontFamily: "var(--font-ibm-mono), monospace", fontSize: 8, color: "var(--db-gray5)", letterSpacing: ".1em" }}>LATE</div>
                  <div style={{ fontFamily: "var(--font-ibm-mono), monospace", fontSize: 18, color: "var(--db-amber)" }}>{infoSession.late}</div>
                </div>
                <div style={{ background: "var(--db-bg2)", padding: "10px 12px", textAlign: "center" }}>
                  <div style={{ fontFamily: "var(--font-ibm-mono), monospace", fontSize: 8, color: "var(--db-gray5)", letterSpacing: ".1em" }}>ABSENT</div>
                  <div style={{ fontFamily: "var(--font-ibm-mono), monospace", fontSize: 18, color: "var(--db-red)" }}>{infoSession.absent}</div>
                </div>
              </div>

              {/* Attendance rate */}
              <div style={{ fontFamily: "var(--font-ibm-mono), monospace", fontSize: 10, color: "var(--db-gray5)", textAlign: "center", letterSpacing: ".08em" }}>
                ATTENDANCE RATE: {Math.round(((infoSession.present + infoSession.late) / infoSession.total) * 100)}% · SESSION LOCKED ✓
              </div>
            </div>
            <div className="db-modal-footer">
              <button className="db-btn db-btn-ghost" onClick={() => setInfoSession(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
      <div className={`db-toast${toast ? " show" : ""}`}>{toast}</div>
    </>
  );
}
