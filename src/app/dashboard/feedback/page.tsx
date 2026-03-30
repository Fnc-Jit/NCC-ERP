"use client";

import { useState } from "react";
import { useIsOfficer } from "@/lib/auth-context";

const FEEDBACK = [
  { token: "anon-8f3k9a", msg: "The parade ground is getting very crowded during morning drills. We should split into two groups by wing to avoid confusion.", time: "28 Mar 2026 · 07:12", read: false },
  { token: "anon-2m1p7z", msg: "Study materials for B Certificate are very helpful. Please also add video resources for map reading, as it is hard to understand from PDFs alone.", time: "27 Mar 2026 · 14:34", read: false },
  { token: "anon-9x4r6c", msg: "The camp food was not adequate during the last ATC. Please coordinate with the organizing unit for better rations.", time: "26 Mar 2026 · 09:00", read: false },
  { token: "anon-5t2y8w", msg: "Attendance marking is sometimes done incorrectly for cadets who arrive late but complete the full drill. Please clarify the 'late' policy.", time: "25 Mar 2026 · 16:21", read: false },
  { token: "anon-3q6l1v", msg: "Would appreciate more mock tests before the C Certificate exam. The current 3 quizzes are not enough.", time: "24 Mar 2026 · 11:45", read: false },
];

export default function FeedbackPage() {
  const isOfficer = useIsOfficer();
  return isOfficer ? <OfficerFeedback /> : <CadetFeedback />;
}

function OfficerFeedback() {
  const [items, setItems] = useState(FEEDBACK);
  const [replyingTo, setReplyingTo] = useState<typeof items[0] | null>(null);
  const [toast, setToast] = useState("");
  const showToast = (m: string) => { setToast(m); setTimeout(() => setToast(""), 2500); };
  const markAllRead = () => { setItems((prev) => prev.map((f) => ({ ...f, read: true }))); showToast("All marked as read"); };
  const unreadCount = items.filter((f) => !f.read).length;

  return (
    <>
      <div className="db-section-hdr">
        <div>
          <div className="db-section-title">Anonymous <em>Feedback</em></div>
          <div className="db-section-sub">No user attribution stored · DPDP compliant</div>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <span className="db-badge db-badge-amber">{unreadCount} Unread</span>
          <button className="db-btn db-btn-ghost" onClick={markAllRead}>Mark All Read</button>
        </div>
      </div>

      <div className="db-card" style={{ marginBottom: 16, borderColor: "rgba(239,68,68,.15)", background: "rgba(239,68,68,.04)" }}>
        <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginTop: 2, flexShrink: 0 }}><path d="M8 2a6 6 0 100 12A6 6 0 008 2zM8 5v4M8 10.5v.5" stroke="#ef4444" strokeWidth="1.3" /></svg>
          <div style={{ fontSize: 12, color: "var(--db-gray3)", lineHeight: 1.6 }}>
            Submissions are fully anonymous. <strong style={{ color: "var(--db-gray1)" }}>No user ID is stored.</strong> Even with direct database access, submitters cannot be identified.
          </div>
        </div>
      </div>

      {items.map((f, i) => (
        <div className="db-feedback-item" key={i} style={{ opacity: f.read ? 0.5 : 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span className="db-feedback-token">{f.token}</span>
            <span style={{ fontFamily: "var(--font-ibm-mono), monospace", fontSize: 10, color: "var(--db-gray5)" }}>{f.time}</span>
          </div>
          <div className="db-feedback-body">{f.msg}</div>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="db-btn db-btn-ghost" style={{ fontSize: 9, padding: "4px 10px" }} onClick={() => setReplyingTo(f)}>Reply</button>
            <button className="db-btn db-btn-ghost" style={{ fontSize: 9, padding: "4px 10px" }} onClick={() => { setItems((prev) => prev.map((ff, ii) => ii === i ? { ...ff, read: true } : ff)); }}>
              {f.read ? "Read" : "Mark Read"}
            </button>
          </div>
        </div>
      ))}

      {/* Reply Modal */}
      {replyingTo && (
        <div className="db-modal-overlay open" onClick={() => setReplyingTo(null)}>
          <div className="db-modal" onClick={(e) => e.stopPropagation()}>
            <div className="db-modal-header">
              <div className="db-modal-title">Reply to Feedback</div>
              <button className="db-modal-close" onClick={() => setReplyingTo(null)}>×</button>
            </div>
            <div className="db-modal-body">
              <div style={{ background: "rgba(255,255,255,0.03)", padding: 12, borderRadius: 6, marginBottom: 16, borderLeft: "3px solid var(--db-gray4)" }}>
                <div style={{ fontFamily: "var(--font-ibm-mono), monospace", fontSize: 10, color: "var(--db-gray4)", marginBottom: 6 }}>Original Message ({replyingTo.token})</div>
                <div style={{ fontSize: 13, color: "var(--db-gray2)", lineHeight: 1.5 }}>{replyingTo.msg}</div>
              </div>
              <div className="db-form-group">
                <label className="db-inp-label">Your Reply</label>
                <textarea className="db-inp" rows={4} placeholder="Write your response... This will be linked to the anonymous token." />
              </div>
            </div>
            <div className="db-modal-footer">
              <button className="db-btn db-btn-ghost" onClick={() => setReplyingTo(null)}>Cancel</button>
              <button className="db-btn db-btn-white" onClick={() => { 
                setReplyingTo(null); 
                showToast("Reply sent successfully.");
                setItems((prev) => prev.map(f => f.token === replyingTo.token ? { ...f, read: true } : f));
              }}>Send Reply</button>
            </div>
          </div>
        </div>
      )}

      <div className={`db-toast${toast ? " show" : ""}`}>{toast}</div>
    </>
  );
}

function CadetFeedback() {
  const [toast, setToast] = useState("");
  const [feedback, setFeedback] = useState("");
  const showToast = (m: string) => { setToast(m); setTimeout(() => setToast(""), 2500); };

  const handleSubmit = () => {
    if (!feedback.trim()) { showToast("Please enter feedback"); return; }
    setFeedback("");
    showToast("Feedback submitted anonymously. Thank you!");
  };

  return (
    <>
      <div className="db-section-hdr">
        <div>
          <div className="db-section-title">Submit <em>Feedback</em></div>
          <div className="db-section-sub">100% anonymous · Your identity is never stored</div>
        </div>
      </div>

      <div className="db-card" style={{ marginBottom: 16, borderColor: "rgba(34,197,94,.15)", background: "rgba(34,197,94,.04)" }}>
        <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginTop: 2, flexShrink: 0 }}><path d="M8 2a6 6 0 100 12A6 6 0 008 2zM6 8l2 2 4-4" stroke="var(--db-green)" strokeWidth="1.3" /></svg>
          <div style={{ fontSize: 12, color: "var(--db-gray3)", lineHeight: 1.6 }}>
            Your feedback is <strong style={{ color: "var(--db-gray1)" }}>completely anonymous</strong>. No user ID, IP address, or identifying information is stored. Your ANO will receive the feedback without knowing who submitted it.
          </div>
        </div>
      </div>

      <div className="db-card">
        <div className="db-card-label" style={{ marginBottom: 16 }}>Write Your Feedback</div>
        <div className="db-form-group">
          <label className="db-inp-label">Your Message</label>
          <textarea
            className="db-inp"
            rows={6}
            placeholder="Share your thoughts, suggestions, or concerns anonymously..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: "var(--font-ibm-mono), monospace", fontSize: 10, color: "var(--db-gray5)" }}>
            {feedback.length} / 500 characters
          </span>
          <button className="db-btn db-btn-white" onClick={handleSubmit}>Submit Anonymously</button>
        </div>
      </div>
      <div className={`db-toast${toast ? " show" : ""}`}>{toast}</div>
    </>
  );
}
