"use client";

import { useState } from "react";
import { useIsOfficer } from "@/lib/auth-context";

export default function ReportsPage() {
  const isOfficer = useIsOfficer();
  return isOfficer ? <OfficerReports /> : <CadetReports />;
}

function OfficerReports() {
  const [exporting, setExporting] = useState(false);
  const [toast, setToast] = useState("");
  const showToast = (m: string) => { setToast(m); setTimeout(() => setToast(""), 2500); };

  const handleExport = () => {
    setExporting(true);
    setTimeout(() => {
      setExporting(false);
      showToast("Report exported successfully!");
    }, 2000);
  };

  return (
    <>
      <div className="db-section-hdr">
        <div>
          <div className="db-section-title">Attendance <em>Reports</em></div>
          <div className="db-section-sub">PDF export · analytics · eligibility</div>
        </div>
        <button 
          className="db-btn db-btn-white" 
          onClick={handleExport}
          disabled={exporting}
        >
          {exporting ? (
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
              Generating PDF...
            </span>
          ) : "Export PDF Report"}
        </button>
      </div>

      <div className="db-card" style={{ marginBottom: 16 }}>
        <div className="db-card-label" style={{ marginBottom: 12 }}>Report Parameters</div>
        <div className="db-form-row">
          <div className="db-form-group" style={{ marginBottom: 0 }}>
            <label className="db-inp-label">Company</label>
            <select className="db-inp"><option>All Companies</option><option>Alpha</option><option>Bravo</option><option>Charlie</option><option>Delta</option></select>
          </div>
          <div className="db-form-group" style={{ marginBottom: 0 }}>
            <label className="db-inp-label">Wing</label>
            <select className="db-inp"><option>All Wings</option><option>Army</option><option>Navy</option><option>Air Force</option></select>
          </div>
        </div>
        <div className="db-form-row" style={{ marginTop: 12 }}>
          <div className="db-form-group" style={{ marginBottom: 0 }}>
            <label className="db-inp-label">From Date</label>
            <input type="date" className="db-inp" defaultValue="2026-01-01" />
          </div>
          <div className="db-form-group" style={{ marginBottom: 0 }}>
            <label className="db-inp-label">To Date</label>
            <input type="date" className="db-inp" defaultValue="2026-03-28" />
          </div>
        </div>
      </div>

      <div className="db-report-summary">
        <div className="db-report-cell"><div className="db-card-label">Avg Attendance</div><div className="db-card-value db-green">84%</div></div>
        <div className="db-report-cell"><div className="db-card-label">Eligible Cadets</div><div className="db-card-value">198</div><div className="db-card-sub">&gt;75% threshold</div></div>
        <div className="db-report-cell"><div className="db-card-label">Ineligible</div><div className="db-card-value db-red">49</div><div className="db-card-sub">Below 75%</div></div>
        <div className="db-report-cell"><div className="db-card-label">Total Sessions</div><div className="db-card-value">47</div><div className="db-card-sub">Jan–Mar 2026</div></div>
      </div>

      <div className="db-card">
        <div className="db-card-label" style={{ marginBottom: 16 }}>Cadet Eligibility Status</div>
        <table className="db-tbl">
          <thead><tr><th>Name</th><th>Chest No.</th><th>Company</th><th>Present</th><th>Total</th><th>%</th><th>Eligibility</th></tr></thead>
          <tbody>
            {[
              { name: "Arjun Kumar Singh", chest: "KT-SW-01-2024", co: "Alpha", p: 44, t: 47, pct: 94 },
              { name: "Priya Nair", chest: "KT-NW-03-2024", co: "Bravo", p: 41, t: 47, pct: 87 },
              { name: "Vikram Reddy", chest: "KT-SW-07-2024", co: "Alpha", p: 33, t: 47, pct: 70 },
              { name: "Sneha Patel", chest: "KT-AF-02-2024", co: "Charlie", p: 28, t: 47, pct: 60 },
              { name: "Kiran Verma", chest: "KT-SW-11-2024", co: "Delta", p: 39, t: 47, pct: 83 },
            ].map((c, i) => (
              <tr key={i}>
                <td>{c.name}</td>
                <td style={{ fontFamily: "var(--font-ibm-mono), monospace", fontSize: 11 }}>{c.chest}</td>
                <td>{c.co}</td><td>{c.p}</td><td>{c.t}</td>
                <td className={c.pct >= 80 ? "db-green" : c.pct >= 65 ? "db-amber" : "db-red"} style={{ fontFamily: "var(--font-ibm-mono), monospace" }}>{c.pct}%</td>
                <td>
                  <span className={`db-badge ${c.pct >= 75 ? "db-badge-green" : c.pct >= 65 ? "db-badge-amber" : "db-badge-red"}`}>
                    {c.pct >= 75 ? "Eligible" : c.pct >= 65 ? "Warning" : "Ineligible"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={`db-toast${toast ? " show" : ""}`}>{toast}</div>
    </>
  );
}

function CadetReports() {
  const [exporting, setExporting] = useState(false);
  const [toast, setToast] = useState("");
  const showToast = (m: string) => { setToast(m); setTimeout(() => setToast(""), 2500); };

  const handleExport = () => {
    setExporting(true);
    setTimeout(() => {
      setExporting(false);
      showToast("Report exported successfully!");
    }, 2000);
  };

  return (
    <>
      <div className="db-section-hdr">
        <div>
          <div className="db-section-title">My <em>Report</em></div>
          <div className="db-section-sub">Personal attendance analytics</div>
        </div>
        <button 
          className="db-btn db-btn-white" 
          onClick={handleExport}
          disabled={exporting}
        >
          {exporting ? (
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
              Generating PDF...
            </span>
          ) : "Download PDF"}
        </button>
      </div>

      <div className="db-report-summary" style={{ marginBottom: 16 }}>
        <div className="db-report-cell"><div className="db-card-label">My Attendance</div><div className="db-card-value db-green">94%</div></div>
        <div className="db-report-cell"><div className="db-card-label">Present</div><div className="db-card-value">42</div><div className="db-card-sub">On time</div></div>
        <div className="db-report-cell"><div className="db-card-label">Late</div><div className="db-card-value db-amber">2</div><div className="db-card-sub">Marked late</div></div>
        <div className="db-report-cell"><div className="db-card-label">Absent</div><div className="db-card-value db-red">3</div><div className="db-card-sub">Missed</div></div>
      </div>

      <div className="db-grid-2" style={{ marginBottom: 16 }}>
        <div className="db-card">
          <div className="db-card-label" style={{ marginBottom: 12 }}>B Certificate Eligibility</div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span className="db-badge db-badge-green" style={{ fontSize: 11, padding: "4px 12px" }}>ELIGIBLE</span>
            <span style={{ fontSize: 12, color: "var(--db-gray3)" }}>94% ≥ 75% threshold</span>
          </div>
        </div>
        <div className="db-card">
          <div className="db-card-label" style={{ marginBottom: 12 }}>C Certificate Eligibility</div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span className="db-badge db-badge-green" style={{ fontSize: 11, padding: "4px 12px" }}>ELIGIBLE</span>
            <span style={{ fontSize: 12, color: "var(--db-gray3)" }}>94% ≥ 75% threshold</span>
          </div>
        </div>
      </div>

      <div className="db-card">
        <div className="db-card-label" style={{ marginBottom: 16 }}>Monthly Breakdown</div>
        <table className="db-tbl">
          <thead><tr><th>Month</th><th>Sessions</th><th>Present</th><th>Late</th><th>Absent</th><th>%</th></tr></thead>
          <tbody>
            {[
              { month: "January", sessions: 16, present: 15, late: 1, absent: 0, pct: 100 },
              { month: "February", sessions: 14, present: 13, late: 0, absent: 1, pct: 93 },
              { month: "March", sessions: 17, present: 14, late: 1, absent: 2, pct: 88 },
            ].map((m, i) => (
              <tr key={i}>
                <td>{m.month}</td>
                <td style={{ fontFamily: "var(--font-ibm-mono), monospace" }}>{m.sessions}</td>
                <td style={{ fontFamily: "var(--font-ibm-mono), monospace" }}>{m.present}</td>
                <td style={{ fontFamily: "var(--font-ibm-mono), monospace", color: m.late > 0 ? "var(--db-amber)" : "var(--db-gray4)" }}>{m.late}</td>
                <td style={{ fontFamily: "var(--font-ibm-mono), monospace", color: m.absent > 0 ? "var(--db-red)" : "var(--db-gray4)" }}>{m.absent}</td>
                <td className={m.pct >= 80 ? "db-green" : m.pct >= 65 ? "db-amber" : "db-red"} style={{ fontFamily: "var(--font-ibm-mono), monospace" }}>{m.pct}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={`db-toast${toast ? " show" : ""}`}>{toast}</div>
    </>
  );
}
