"use client";

import { useState } from "react";
import { useIsOfficer } from "@/lib/auth-context";

const PENDING = [
  { title: "My Experience at RDC Selection Trials", author: "Priya Nair", date: "28 Mar 2026", type: "achievement", preview: "The selection trials at the state level were an eye-opening experience. Competing against over 300 cadets from across Karnataka..." },
  { title: "Leadership Lessons from ATC Belgaum", author: "Kiran Verma", date: "27 Mar 2026", type: "reflection", preview: "Seven days at the Annual Training Camp taught me more about leadership and teamwork than any classroom could have..." },
];

const PUBLISHED = [
  { title: "Best in Firing Camp — A Dream Achieved", author: "Arjun Kumar Singh", date: "15 Mar 2026", type: "spotlight", preview: "Training for the Annual Firing Camp required months of dedication. The moment I heard my name announced as the top scorer..." },
  { title: "Navy Wing Cultural Night — Behind the Scenes", author: "Anjali Menon", date: "10 Mar 2026", type: "reflection", preview: "Organizing a cultural event for 80+ cadets while maintaining drill schedules is not easy. Here is how our company pulled it off..." },
];

export default function BlogPage() {
  const isOfficer = useIsOfficer();
  const [modalOpen, setModalOpen] = useState(false);
  const [viewingPost, setViewingPost] = useState<typeof PUBLISHED[0] | null>(null);
  const [commentingPost, setCommentingPost] = useState<typeof PUBLISHED[0] | null>(null);
  const [toast, setToast] = useState("");
  const showToast = (m: string) => { setToast(m); setTimeout(() => setToast(""), 2500); };

  return (
    <>
      <div className="db-section-hdr">
        <div>
          <div className="db-section-title">Blog {isOfficer ? <em>Moderation</em> : <em>Posts</em>}</div>
          <div className="db-section-sub">{isOfficer ? "Cadet posts · ANO approval workflow" : "Read cadet posts"}</div>
        </div>
        {isOfficer && (
          <button className="db-btn db-btn-white" onClick={() => setModalOpen(true)}>+ Write Post</button>
        )}
      </div>

      {isOfficer ? (
        /* Officer: Two-column moderation view */
        <div className="db-grid-2">
          <div>
            <div className="db-card-label" style={{ marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
              <span className="db-badge db-badge-amber">{PENDING.length} Pending</span> Awaiting Approval
            </div>
            {PENDING.map((p, i) => (
              <div className="db-card" key={i} style={{ marginBottom: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span className="db-badge db-badge-amber">{p.type}</span>
                  <span style={{ fontFamily: "var(--font-ibm-mono), monospace", fontSize: 10, color: "var(--db-gray5)" }}>{p.date}</span>
                </div>
                <div className="db-card-title" style={{ marginTop: 8 }}>{p.title}</div>
                <div className="db-card-desc">{p.preview}</div>
                <div style={{ fontFamily: "var(--font-ibm-mono), monospace", fontSize: 10, color: "var(--db-gray5)", marginTop: 8 }}>By {p.author}</div>
                <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                  <button className="db-btn db-btn-green" style={{ fontSize: 9, padding: "4px 12px" }} onClick={() => showToast("Post approved!")}>Approve</button>
                  <button className="db-btn db-btn-ghost" style={{ fontSize: 9, padding: "4px 12px" }} onClick={() => showToast("Post rejected")}>Reject</button>
                </div>
              </div>
            ))}
          </div>
          <div>
            <div className="db-card-label" style={{ marginBottom: 12 }}>Published Posts</div>
            {PUBLISHED.map((p, i) => (
              <div className="db-card" key={i} style={{ marginBottom: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span className="db-badge db-badge-green">{p.type}</span>
                  <span style={{ fontFamily: "var(--font-ibm-mono), monospace", fontSize: 10, color: "var(--db-gray5)" }}>{p.date}</span>
                </div>
                <div className="db-card-title" style={{ marginTop: 8 }}>{p.title}</div>
                <div className="db-card-desc">{p.preview}</div>
                <div style={{ fontFamily: "var(--font-ibm-mono), monospace", fontSize: 10, color: "var(--db-gray5)", marginTop: 8 }}>By {p.author}</div>
                <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
                  <button className="db-btn db-btn-ghost" style={{ fontSize: 9, padding: "4px 12px" }} onClick={() => setViewingPost(p)}>Read More</button>
                  <button className="db-btn db-btn-ghost" style={{ fontSize: 9, padding: "4px 12px" }} onClick={() => setCommentingPost(p)}>Comment</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Cadet: Read published posts */
        <div>
          <div className="db-card-label" style={{ marginBottom: 12 }}>Published Posts</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {PUBLISHED.map((p, i) => (
              <div className="db-card" key={i}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span className="db-badge db-badge-green">{p.type}</span>
                  <span style={{ fontFamily: "var(--font-ibm-mono), monospace", fontSize: 10, color: "var(--db-gray5)" }}>{p.date}</span>
                </div>
                <div className="db-card-title" style={{ marginTop: 8 }}>{p.title}</div>
                <div className="db-card-desc">{p.preview}</div>
                <div style={{ fontFamily: "var(--font-ibm-mono), monospace", fontSize: 10, color: "var(--db-gray5)", marginTop: 8 }}>By {p.author}</div>
                <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
                  <button className="db-btn db-btn-ghost" style={{ fontSize: 9, padding: "4px 12px" }} onClick={() => setViewingPost(p)}>Read More</button>
                  <button className="db-btn db-btn-ghost" style={{ fontSize: 9, padding: "4px 12px" }} onClick={() => setCommentingPost(p)}>Comment</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Write Post Modal — officer only */}
      {isOfficer && (
        <div className={`db-modal-overlay${modalOpen ? " open" : ""}`} onClick={() => setModalOpen(false)}>
          <div className="db-modal" onClick={(e) => e.stopPropagation()}>
            <div className="db-modal-header"><div className="db-modal-title">Write Post</div><button className="db-modal-close" onClick={() => setModalOpen(false)}>×</button></div>
            <div className="db-modal-body">
              <div className="db-form-group"><label className="db-inp-label">Title</label><input className="db-inp" placeholder="Post title..." /></div>
              <div className="db-form-group"><label className="db-inp-label">Type</label><select className="db-inp"><option>Achievement</option><option>Reflection</option><option>Spotlight</option></select></div>
              <div className="db-form-group"><label className="db-inp-label">Body</label><textarea className="db-inp" rows={6} placeholder="Write your post content here..." /></div>
            </div>
            <div className="db-modal-footer">
              <button className="db-btn db-btn-ghost" onClick={() => setModalOpen(false)}>Cancel</button>
              <button className="db-btn db-btn-white" onClick={() => { setModalOpen(false); showToast("Post submitted for approval!"); }}>Submit</button>
            </div>
          </div>
        </div>
      )}

      {/* Read More Modal */}
      {viewingPost && (
        <div className="db-modal-overlay open" onClick={() => setViewingPost(null)}>
          <div className="db-modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 640 }}>
            <div className="db-modal-header">
              <div className="db-modal-title">Read Post</div>
              <button className="db-modal-close" onClick={() => setViewingPost(null)}>×</button>
            </div>
            <div className="db-modal-body">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <span className="db-badge db-badge-green">{viewingPost.type}</span>
                <span style={{ fontFamily: "var(--font-ibm-mono), monospace", fontSize: 10, color: "var(--db-gray5)" }}>{viewingPost.date}</span>
              </div>
              <div style={{ fontSize: 24, fontWeight: 600, color: "var(--db-gray1)", marginBottom: 8 }}>{viewingPost.title}</div>
              <div style={{ fontFamily: "var(--font-ibm-mono), monospace", fontSize: 11, color: "var(--db-gray4)", marginBottom: 24 }}>By {viewingPost.author}</div>
              <div style={{ fontSize: 14, color: "var(--db-gray3)", lineHeight: 1.7, whiteSpace: "pre-wrap" }}>
                {viewingPost.preview}
                {"\n\n[Full post content mock]\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra."}
              </div>
            </div>
            <div className="db-modal-footer">
              <button className="db-btn db-btn-ghost" onClick={() => setViewingPost(null)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Comment Modal */}
      {commentingPost && (
        <div className="db-modal-overlay open" onClick={() => setCommentingPost(null)}>
          <div className="db-modal" onClick={(e) => e.stopPropagation()}>
            <div className="db-modal-header">
              <div className="db-modal-title">Add Comment</div>
              <button className="db-modal-close" onClick={() => setCommentingPost(null)}>×</button>
            </div>
            <div className="db-modal-body">
              <div style={{ fontSize: 12, color: "var(--db-gray4)", marginBottom: 12 }}>Replying to <strong>{commentingPost.title}</strong> by {commentingPost.author}</div>
              <div className="db-form-group">
                <label className="db-inp-label">Your Comment</label>
                <textarea className="db-inp" rows={4} placeholder="Write a respectful comment..." />
              </div>
            </div>
            <div className="db-modal-footer">
              <button className="db-btn db-btn-ghost" onClick={() => setCommentingPost(null)}>Cancel</button>
              <button className="db-btn db-btn-white" onClick={() => { setCommentingPost(null); showToast("Comment submitted!"); }}>Post Comment</button>
            </div>
          </div>
        </div>
      )}

      <div className={`db-toast${toast ? " show" : ""}`}>{toast}</div>
    </>
  );
}
