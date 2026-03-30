"use client";

import { useState } from "react";

const MARKS_DATA = [
  { name: "Arjun Kumar Singh", chest: "KT-SW-01", drill: 88, weapons: 92, mapReading: 76, firstAid: 85 },
  { name: "Priya Nair", chest: "KT-NW-03", drill: 90, weapons: null, mapReading: 82, firstAid: 88 },
  { name: "Vikram Reddy", chest: "KT-SW-07", drill: 72, weapons: 68, mapReading: 55, firstAid: 70 },
  { name: "Sneha Patel", chest: "KT-AF-02", drill: 65, weapons: null, mapReading: 58, firstAid: 74 },
  { name: "Kiran Verma", chest: "KT-SW-11", drill: 82, weapons: 78, mapReading: 80, firstAid: 90 },
  { name: "Rahul Sharma", chest: "KT-SW-00", drill: 95, weapons: 96, mapReading: 88, firstAid: 92 },
];

function scoreColor(v: number | null) {
  if (v === null) return "var(--db-gray5)";
  if (v >= 80) return "var(--db-green)";
  if (v >= 60) return "var(--db-amber)";
  return "var(--db-red)";
}

export default function MarksPage() {
  const [subject, setSubject] = useState("all");
  const [toast, setToast] = useState("");
  const showToast = (m: string) => { setToast(m); setTimeout(() => setToast(""), 2500); };

  return (
    <>
      <div className="db-section-hdr">
        <div>
          <div className="db-section-title">Marks <em>Management</em></div>
          <div className="db-section-sub">Cadet scores · Subject-wise entry</div>
        </div>
        <button className="db-btn db-btn-white" onClick={() => showToast("Entering edit mode...")}>Edit Marks</button>
      </div>

      <div className="db-form-row" style={{ marginBottom: 16 }}>
        <div className="db-form-group" style={{ marginBottom: 0 }}>
          <label className="db-inp-label">Filter Subject</label>
          <select className="db-inp" value={subject} onChange={(e) => setSubject(e.target.value)}>
            <option value="all">All Subjects</option>
            <option value="drill">Drill & Commands</option>
            <option value="weapons">Weapon Training</option>
            <option value="mapReading">Map Reading</option>
            <option value="firstAid">First Aid</option>
          </select>
        </div>
        <div className="db-form-group" style={{ marginBottom: 0 }}>
          <label className="db-inp-label">Company</label>
          <select className="db-inp"><option>All Companies</option><option>Alpha</option><option>Bravo</option><option>Charlie</option><option>Delta</option></select>
        </div>
      </div>

      <div className="db-card">
        <div className="db-card-label" style={{ marginBottom: 16 }}>Cadet Marks</div>
        <table className="db-tbl">
          <thead>
            <tr>
              <th>Name</th><th>Chest No.</th>
              {(subject === "all" || subject === "drill") && <th>Drill</th>}
              {(subject === "all" || subject === "weapons") && <th>Weapons</th>}
              {(subject === "all" || subject === "mapReading") && <th>Map Reading</th>}
              {(subject === "all" || subject === "firstAid") && <th>First Aid</th>}
              {subject === "all" && <th>Avg</th>}
            </tr>
          </thead>
          <tbody>
            {MARKS_DATA.map((c, i) => {
              const scores = [c.drill, c.weapons, c.mapReading, c.firstAid].filter((s): s is number => s !== null);
              const avg = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : null;
              return (
                <tr key={i}>
                  <td>{c.name}</td>
                  <td style={{ fontFamily: "var(--font-ibm-mono), monospace", fontSize: 11 }}>{c.chest}</td>
                  {(subject === "all" || subject === "drill") && <td style={{ fontFamily: "var(--font-ibm-mono), monospace", color: scoreColor(c.drill) }}>{c.drill}</td>}
                  {(subject === "all" || subject === "weapons") && <td style={{ fontFamily: "var(--font-ibm-mono), monospace", color: scoreColor(c.weapons) }}>{c.weapons ?? "—"}</td>}
                  {(subject === "all" || subject === "mapReading") && <td style={{ fontFamily: "var(--font-ibm-mono), monospace", color: scoreColor(c.mapReading) }}>{c.mapReading}</td>}
                  {(subject === "all" || subject === "firstAid") && <td style={{ fontFamily: "var(--font-ibm-mono), monospace", color: scoreColor(c.firstAid) }}>{c.firstAid}</td>}
                  {subject === "all" && <td style={{ fontFamily: "var(--font-ibm-mono), monospace", fontWeight: 600, color: scoreColor(avg) }}>{avg ?? "—"}</td>}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className={`db-toast${toast ? " show" : ""}`}>{toast}</div>
    </>
  );
}
