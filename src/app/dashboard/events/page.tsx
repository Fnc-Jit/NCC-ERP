"use client";

import { useState } from "react";
import { useIsOfficer } from "@/lib/role-context";

const EVENTS = [
  { type: "Parade", badge: "db-badge-white", date: "Apr 5", title: "Annual Republic Day Parade", desc: "Full unit parade at College Grounds. Dress: Service uniform. 0700 hrs fall-in." },
  { type: "Camp", badge: "db-badge-amber", date: "Apr 12–18", title: "Annual Training Camp (ATC)", desc: "7-day residential camp. Army wing cadets only. Belgaum Training Center." },
  { type: "Exam", badge: "db-badge-green", date: "May 3", title: "B & C Certificate Exam", desc: "Written exam. Min. 75% attendance required. Venue: Main Auditorium." },
];

const DAYS_WITH_EVENTS = [5, 12, 13, 14, 15, 16, 17, 18];

export default function EventsPage() {
  const isOfficer = useIsOfficer();
  const [modalOpen, setModalOpen] = useState(false);
  const [toast, setToast] = useState("");
  const showToast = (m: string) => { setToast(m); setTimeout(() => setToast(""), 2500); };

  const today = new Date();
  const daysInMonth = 31;
  const startDay = 6;

  return (
    <>
      <div className="db-section-hdr">
        <div>
          <div className="db-section-title">Events <em>Calendar</em></div>
          <div className="db-section-sub">March 2026</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="db-btn db-btn-ghost">Month</button>
          <button className="db-btn db-btn-ghost">List</button>
          {isOfficer && (
            <button className="db-btn db-btn-white" onClick={() => setModalOpen(true)}>+ Add Event</button>
          )}
        </div>
      </div>

      <div className="db-grid-3-1" style={{ alignItems: "start" }}>
        {/* Calendar */}
        <div className="db-card">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2 }}>
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <div key={d} style={{ fontFamily: "var(--font-ibm-mono), monospace", fontSize: 9, letterSpacing: ".1em", textTransform: "uppercase" as const, color: "var(--db-gray5)", textAlign: "center", padding: "6px 0" }}>{d}</div>
            ))}
            {Array.from({ length: startDay }, (_, i) => (
              <div key={`e${i}`} />
            ))}
            {Array.from({ length: daysInMonth }, (_, i) => {
              const day = i + 1;
              const isToday = day === today.getDate();
              const hasEvent = DAYS_WITH_EVENTS.includes(day);
              return (
                <div
                  key={day}
                  style={{
                    aspectRatio: "1", display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 11, color: isToday ? "var(--db-gray1)" : "var(--db-gray4)", cursor: "pointer",
                    border: isToday ? "1px solid var(--db-gray1)" : "1px solid transparent",
                    position: "relative",
                  }}
                >
                  {day}
                  {hasEvent && <span style={{ position: "absolute", bottom: 4, width: 4, height: 4, background: "var(--db-amber)", borderRadius: "50%" }} />}
                </div>
              );
            })}
          </div>
        </div>

        {/* Events list */}
        <div>
          <div className="db-card" style={{ marginBottom: 12 }}>
            <div className="db-card-label" style={{ marginBottom: 12 }}>Upcoming Events</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {EVENTS.map((ev, i) => (
                <div className="db-feedback-item" key={i}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span className={`db-badge ${ev.badge}`}>{ev.type}</span>
                    <span style={{ fontFamily: "var(--font-ibm-mono), monospace", fontSize: 10, color: "var(--db-gray5)" }}>{ev.date}</span>
                  </div>
                  <div className="db-card-title" style={{ marginTop: 8 }}>{ev.title}</div>
                  <div className="db-card-desc">{ev.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Create Event Modal — officer only */}
      {isOfficer && (
        <div className={`db-modal-overlay${modalOpen ? " open" : ""}`} onClick={() => setModalOpen(false)}>
          <div className="db-modal" onClick={(e) => e.stopPropagation()}>
            <div className="db-modal-header">
              <div className="db-modal-title">Create Event</div>
              <button className="db-modal-close" onClick={() => setModalOpen(false)}>×</button>
            </div>
            <div className="db-modal-body">
              <div className="db-form-group"><label className="db-inp-label">Event Title</label><input className="db-inp" placeholder="e.g. Annual Training Camp 2026" /></div>
              <div className="db-form-row">
                <div className="db-form-group"><label className="db-inp-label">Type</label><select className="db-inp"><option>Parade</option><option>Camp</option><option>Drill</option><option>Lecture</option><option>Exam</option><option>RDC</option></select></div>
                <div className="db-form-group"><label className="db-inp-label">Start Date</label><input type="date" className="db-inp" /></div>
              </div>
              <div className="db-form-row">
                <div className="db-form-group"><label className="db-inp-label">End Date</label><input type="date" className="db-inp" /></div>
                <div className="db-form-group"><label className="db-inp-label">Location</label><input className="db-inp" placeholder="College Grounds" /></div>
              </div>
              <div className="db-form-row">
                <div className="db-form-group"><label className="db-inp-label">Company</label><select className="db-inp"><option>All</option><option>Alpha</option><option>Bravo</option><option>Charlie</option><option>Delta</option></select></div>
                <div className="db-form-group"><label className="db-inp-label">Wing</label><select className="db-inp"><option>All</option><option>Army</option><option>Navy</option><option>Air Force</option></select></div>
              </div>
              <div className="db-form-group"><label className="db-inp-label">Description</label><textarea className="db-inp" rows={4} placeholder="Full event details..." /></div>
            </div>
            <div className="db-modal-footer">
              <button className="db-btn db-btn-ghost" onClick={() => setModalOpen(false)}>Cancel</button>
              <button className="db-btn db-btn-white" onClick={() => { setModalOpen(false); showToast("Event published!"); }}>Publish Event</button>
            </div>
          </div>
        </div>
      )}
      <div className={`db-toast${toast ? " show" : ""}`}>{toast}</div>
    </>
  );
}
