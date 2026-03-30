"use client";

import { useState } from "react";
import { useIsOfficer } from "@/lib/auth-context";

type Notif = { title: string; time: string; read: boolean; audience: "officer" | "cadet" | "all" };

const NOTIFICATIONS: Notif[] = [
  // Officer/Admin only
  { title: "Attendance session #047 created", time: "2 min ago", read: false, audience: "officer" },
  { title: "Dispute from Arjun Kumar Singh — pending review", time: "15 min ago", read: false, audience: "officer" },
  { title: "3 new anonymous feedback submissions", time: "1 hr ago", read: false, audience: "officer" },
  { title: "Blog post by Priya Nair awaiting approval", time: "2 hr ago", read: false, audience: "officer" },
  { title: "Blog post by Kiran Verma awaiting approval", time: "3 hr ago", read: false, audience: "officer" },
  { title: "Session #046 auto-locked after 48 hours", time: "Yesterday", read: true, audience: "officer" },
  { title: "Dev Krishnan account deactivated by Admin", time: "Yesterday", read: true, audience: "officer" },
  // Cadet only
  { title: "Your attendance for session #047 has been marked", time: "5 min ago", read: false, audience: "cadet" },
  { title: "New study material uploaded: CPR & Emergency Response", time: "30 min ago", read: false, audience: "cadet" },
  { title: "Quiz result: B Certificate Mock — 8/10", time: "1 hr ago", read: false, audience: "cadet" },
  { title: "Your dispute for session #044 has been accepted", time: "3 hr ago", read: true, audience: "cadet" },
  // All users
  { title: "Annual Training Camp event published — Apr 12–18", time: "5 hr ago", read: true, audience: "all" },
  { title: "Annual Republic Day Parade — Apr 5 at 0700 hrs", time: "Yesterday", read: true, audience: "all" },
  { title: "B & C Certificate Exam scheduled — May 3", time: "2 days ago", read: true, audience: "all" },
];

export default function NotificationsPage() {
  const isOfficer = useIsOfficer();

  // Filter notifications based on role
  const roleNotifs = NOTIFICATIONS.filter((n) => {
    if (n.audience === "all") return true;
    if (isOfficer && n.audience === "officer") return true;
    if (!isOfficer && n.audience === "cadet") return true;
    return false;
  });

  const [notifs, setNotifs] = useState(roleNotifs);
  const markAll = () => setNotifs((p) => p.map((n) => ({ ...n, read: true })));
  const unreadCount = notifs.filter((n) => !n.read).length;

  return (
    <>
      <div className="db-section-hdr">
        <div>
          <div className="db-section-title">Notifications</div>
          <div className="db-section-sub">{unreadCount} unread</div>
        </div>
        <button className="db-btn db-btn-ghost" onClick={markAll}>Mark All Read</button>
      </div>

      <div className="db-card">
        {notifs.length === 0 ? (
          <div style={{ textAlign: "center", padding: 32, color: "var(--db-gray4)", fontSize: 12 }}>No notifications</div>
        ) : (
          notifs.map((n, i) => (
            <div
              className="db-notif-item"
              key={i}
              onClick={() => setNotifs((p) => p.map((nn, ii) => (ii === i ? { ...nn, read: true } : nn)))}
            >
              <div className={`db-notif-item-dot${n.read ? " read" : ""}`} />
              <div className="db-notif-item-body">
                <div className="db-notif-item-title" style={{ opacity: n.read ? 0.5 : 1 }}>{n.title}</div>
                <div className="db-notif-item-time">{n.time}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
