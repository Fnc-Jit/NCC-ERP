"use client";

import Link from "next/link";
import { useRole, useIsOfficer } from "@/lib/auth-context";

export default function DashboardHomePage() {
  const role = useRole();
  const isOfficer = useIsOfficer();

  if (!isOfficer) return <CadetDashboard />;
  return <OfficerDashboard />;
}

/* ═══════════════════════ OFFICER / ANO DASHBOARD ═══════════════════════ */
function OfficerDashboard() {
  return (
    <>
      {/* Section Header */}
      <div className="db-section-hdr">
        <div>
          <div className="db-section-title">Command <em>Overview</em></div>
          <div className="db-section-sub">Saturday, 28 March 2026 · Academic Year 2025–26</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <Link href="/dashboard/attendance" className="db-btn db-btn-ghost" style={{ textDecoration: "none" }}>Mark Attendance</Link>
          <Link href="/dashboard/events" className="db-btn db-btn-white" style={{ textDecoration: "none" }}>+ New Event</Link>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="db-grid-4" style={{ marginBottom: 12 }}>
        <div className="db-card">
          <div className="db-card-top-bar db-bar-green" />
          <div className="db-card-label">Unit Attendance</div>
          <div className="db-card-value db-green">87%</div>
          <div className="db-card-sub">+3% vs last month</div>
          <div className="db-progress-track" style={{ marginTop: 12 }}>
            <div className="db-progress-fill db-bar-green" style={{ width: "87%" }} />
          </div>
        </div>
        <div className="db-card">
          <div className="db-card-top-bar db-bar-amber" />
          <div className="db-card-label">Pending Disputes</div>
          <div className="db-card-value db-amber">3</div>
          <div className="db-card-sub">2 from Alpha, 1 from Bravo</div>
        </div>
        <div className="db-card">
          <div className="db-card-label">Total Cadets</div>
          <div className="db-card-value">247</div>
          <div className="db-card-sub">Active this semester</div>
        </div>
        <div className="db-card">
          <div className="db-card-top-bar" style={{ background: "var(--db-blue)" }} />
          <div className="db-card-label">Upcoming Events</div>
          <div className="db-card-value db-blue">4</div>
          <div className="db-card-sub">Next: Annual Parade — Apr 5</div>
        </div>
      </div>

      {/* Chart + Today */}
      <div className="db-grid-3-1" style={{ marginBottom: 12 }}>
        <div className="db-card">
          <div className="db-card-label" style={{ marginBottom: 16 }}>Monthly Attendance Trend</div>
          <div className="db-chart-bars">
            {[72, 68, 80, 84, 87, 90].map((v, i) => (
              <div className="db-chart-bar-wrap" key={i}>
                <div
                  className="db-chart-bar"
                  style={{
                    height: `${(v / 100) * 80}px`,
                    background: v >= 80 ? "var(--db-green)" : v >= 65 ? "var(--db-amber)" : "var(--db-red)",
                  }}
                  title={`${v}%`}
                />
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
            {["JAN", "FEB", "MAR", "APR", "MAY", "JUN"].map((m) => (
              <span key={m} className="db-chart-bar-lbl">{m}</span>
            ))}
          </div>
        </div>
        <div className="db-card">
          <div className="db-card-label">Today</div>
          <div style={{ marginTop: 8 }}>
            {[
              { name: "Morning Drill", time: "09:00", badge: "db-badge-green" },
              { name: "Map Reading", time: "14:00", badge: "db-badge-amber" },
              { name: "Drill Practice", time: "16:00", badge: "db-badge-gray" },
            ].map((s, i) => (
              <div key={i} style={{ fontSize: 12, padding: "8px 0", borderBottom: i < 2 ? "1px solid var(--db-border)" : "none", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: "var(--db-gray3)" }}>{s.name}</span>
                <span className={`db-badge ${s.badge}`}>{s.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Company Breakdown + Spotlight */}
      <div className="db-grid-1-2">
        <div className="db-card">
          <div className="db-card-label" style={{ marginBottom: 16 }}>Company Attendance</div>
          {[
            { label: "Alpha", v: 90 },
            { label: "Bravo", v: 82 },
            { label: "Charlie", v: 75 },
            { label: "Delta", v: 88 },
          ].map((d) => (
            <div key={d.label} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontFamily: "var(--font-ibm-mono), monospace", fontSize: 10, letterSpacing: ".05em" }}>{d.label}</span>
                <span style={{ fontFamily: "var(--font-ibm-mono), monospace", fontSize: 10, color: d.v >= 80 ? "var(--db-green)" : d.v >= 65 ? "var(--db-amber)" : "var(--db-red)" }}>{d.v}%</span>
              </div>
              <div className="db-progress-track">
                <div className={`db-progress-fill ${d.v >= 80 ? "db-bar-green" : d.v >= 65 ? "db-bar-amber" : "db-bar-red"}`} style={{ width: `${d.v}%` }} />
              </div>
            </div>
          ))}
        </div>
        <div className="db-card">
          <div className="db-card-label" style={{ marginBottom: 16 }}>Cadet Spotlight</div>
          <div className="db-spotlight">
            <div className="db-spotlight-star">★</div>
            <div>
              <div className="db-spotlight-title">Best in Annual Firing Camp 2025</div>
              <div className="db-spotlight-body">Cadet Arjun Kumar Singh secured top score in the Annual Firing Camp at Belgaum, representing the college wing with distinction.</div>
              <div className="db-spotlight-author">CDT ARJUN K. SINGH · ALPHA COMPANY · ARMY WING</div>
            </div>
          </div>
          <div className="db-spotlight" style={{ marginTop: 8, borderColor: "transparent", background: "var(--db-bg3)" }}>
            <div className="db-spotlight-star" style={{ color: "var(--db-gray5)" }}>★</div>
            <div>
              <div className="db-spotlight-title">RDC Selection — Republic Day Camp</div>
              <div className="db-spotlight-body">Cadet Priya Nair selected for Republic Day Camp 2026, New Delhi. One of three selected from the state quota.</div>
              <div className="db-spotlight-author">CDT PRIYA NAIR · BRAVO COMPANY · NAVY WING</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ═══════════════════════ CADET DASHBOARD ═══════════════════════ */
function CadetDashboard() {
  return (
    <>
      <div className="db-section-hdr">
        <div>
          <div className="db-section-title">My <em>Dashboard</em></div>
          <div className="db-section-sub">Saturday, 28 March 2026 · Alpha Company · Army Wing</div>
        </div>
      </div>

      {/* Personal Stats */}
      <div className="db-grid-4" style={{ marginBottom: 12 }}>
        <div className="db-card">
          <div className="db-card-top-bar db-bar-green" />
          <div className="db-card-label">My Attendance</div>
          <div className="db-card-value db-green">94%</div>
          <div className="db-card-sub">44/47 sessions</div>
          <div className="db-progress-track" style={{ marginTop: 12 }}>
            <div className="db-progress-fill db-bar-green" style={{ width: "94%" }} />
          </div>
        </div>
        <div className="db-card">
          <div className="db-card-label">Rank</div>
          <div className="db-card-value">SGT</div>
          <div className="db-card-sub">Sergeant · Alpha Company</div>
        </div>
        <div className="db-card">
          <div className="db-card-label">Quiz Score</div>
          <div className="db-card-value db-green">8/10</div>
          <div className="db-card-sub">Last: B Certificate Mock</div>
        </div>
        <div className="db-card">
          <div className="db-card-top-bar" style={{ background: "var(--db-blue)" }} />
          <div className="db-card-label">Next Event</div>
          <div className="db-card-value db-blue" style={{ fontSize: 18 }}>Annual Parade</div>
          <div className="db-card-sub">Apr 5 · 0700 hrs · College Grounds</div>
        </div>
      </div>

      {/* Today Schedule + Eligibility */}
      <div className="db-grid-2" style={{ marginBottom: 12 }}>
        <div className="db-card">
          <div className="db-card-label" style={{ marginBottom: 12 }}>Today&apos;s Schedule</div>
          {[
            { name: "Morning Drill", time: "09:00", badge: "db-badge-green" },
            { name: "Map Reading", time: "14:00", badge: "db-badge-amber" },
            { name: "Drill Practice", time: "16:00", badge: "db-badge-gray" },
          ].map((s, i) => (
            <div key={i} style={{ fontSize: 12, padding: "8px 0", borderBottom: i < 2 ? "1px solid var(--db-border)" : "none", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: "var(--db-gray3)" }}>{s.name}</span>
              <span className={`db-badge ${s.badge}`}>{s.time}</span>
            </div>
          ))}
        </div>
        <div className="db-card">
          <div className="db-card-label" style={{ marginBottom: 12 }}>Certificate Eligibility</div>
          <div style={{ display: "flex", gap: 20, alignItems: "center", marginBottom: 16 }}>
            <div>
              <div style={{ fontFamily: "var(--font-ibm-mono), monospace", fontSize: 10, color: "var(--db-gray5)", letterSpacing: ".1em", textTransform: "uppercase" as const }}>B Certificate</div>
              <span className="db-badge db-badge-green" style={{ marginTop: 4 }}>Eligible</span>
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-ibm-mono), monospace", fontSize: 10, color: "var(--db-gray5)", letterSpacing: ".1em", textTransform: "uppercase" as const }}>C Certificate</div>
              <span className="db-badge db-badge-green" style={{ marginTop: 4 }}>Eligible</span>
            </div>
          </div>
          <div className="db-card-desc">
            You meet the ≥75% attendance requirement for both B and C Certificate examinations. Keep up the good work!
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="db-grid-3">
        <Link href="/dashboard/attendance" className="db-card" style={{ textDecoration: "none", color: "inherit" }}>
          <div className="db-card-label">View Attendance</div>
          <div className="db-card-desc">Check your session history and dispute any marking errors.</div>
        </Link>
        <Link href="/dashboard/quiz" className="db-card" style={{ textDecoration: "none", color: "inherit" }}>
          <div className="db-card-label">Take Quiz</div>
          <div className="db-card-desc">Attempt B/C Certificate mock tests and review your scores.</div>
        </Link>
        <Link href="/dashboard/study" className="db-card" style={{ textDecoration: "none", color: "inherit" }}>
          <div className="db-card-label">Study Hub</div>
          <div className="db-card-desc">Download study materials for drill, weapons, map reading &amp; more.</div>
        </Link>
      </div>
    </>
  );
}
