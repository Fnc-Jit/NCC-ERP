"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { navSections, pageTitle, appRoles, type AppRole } from "@/lib/dashboard";
import { useRole, useSetRole } from "@/lib/role-context";

function NavIcon({ name }: { name: string }) {
  const icons: Record<string, React.ReactNode> = {
    dashboard: <svg viewBox="0 0 16 16" fill="none"><rect x="1" y="1" width="6" height="6" stroke="currentColor" strokeWidth="1.2"/><rect x="9" y="1" width="6" height="6" stroke="currentColor" strokeWidth="1.2"/><rect x="1" y="9" width="6" height="6" stroke="currentColor" strokeWidth="1.2"/><rect x="9" y="9" width="6" height="6" stroke="currentColor" strokeWidth="1.2"/></svg>,
    attendance: <svg viewBox="0 0 16 16" fill="none"><rect x="2" y="3" width="12" height="11" stroke="currentColor" strokeWidth="1.2"/><path d="M5 7l2 2 4-4" stroke="currentColor" strokeWidth="1.2"/><path d="M2 6h12" stroke="currentColor" strokeWidth="1.2"/></svg>,
    events: <svg viewBox="0 0 16 16" fill="none"><rect x="2" y="3" width="12" height="11" stroke="currentColor" strokeWidth="1.2"/><path d="M5 1v4M11 1v4M2 7h12" stroke="currentColor" strokeWidth="1.2"/></svg>,
    cadets: <svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="5" r="3" stroke="currentColor" strokeWidth="1.2"/><path d="M2 14c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="currentColor" strokeWidth="1.2"/></svg>,
    study: <svg viewBox="0 0 16 16" fill="none"><path d="M2 3h12M2 8h12M2 13h8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>,
    quiz: <svg viewBox="0 0 16 16" fill="none"><path d="M8 2a4 4 0 100 8" stroke="currentColor" strokeWidth="1.2"/><path d="M8 10v2M8 13v1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
    blog: <svg viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="12" height="12" stroke="currentColor" strokeWidth="1.2"/><path d="M5 6h6M5 9h4" stroke="currentColor" strokeWidth="1.2"/></svg>,
    news: <svg viewBox="0 0 16 16" fill="none"><path d="M2 4h12M2 8h8M2 12h6" stroke="currentColor" strokeWidth="1.2"/></svg>,
    ranks: <svg viewBox="0 0 16 16" fill="none"><path d="M8 2l1.5 3 3.5.5-2.5 2.5.5 3.5L8 10l-3 1.5.5-3.5L3 5.5l3.5-.5z" stroke="currentColor" strokeWidth="1.2"/></svg>,
    feedback: <svg viewBox="0 0 16 16" fill="none"><path d="M2 3h12v8H9l-3 3v-3H2z" stroke="currentColor" strokeWidth="1.2"/></svg>,
    reports: <svg viewBox="0 0 16 16" fill="none"><path d="M3 13V7l3-4 3 3 4-4v11H3z" stroke="currentColor" strokeWidth="1.2"/></svg>,
    admin: <svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.2"/><path d="M8 2v1M8 13v1M2 8h1M13 8h1M3.5 3.5l.7.7M11.8 11.8l.7.7M3.5 12.5l.7-.7M11.8 4.2l.7-.7" stroke="currentColor" strokeWidth="1.2"/></svg>,
    notifications: <svg viewBox="0 0 16 16" fill="none"><path d="M8 2a4 4 0 014 4v3l1 2H3l1-2V6a4 4 0 014-4z" stroke="currentColor" strokeWidth="1.2"/><path d="M6.5 13.5a1.5 1.5 0 003 0" stroke="currentColor" strokeWidth="1.2"/></svg>,
    settings: <svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.2"/><path d="M8 1v2M8 13v2M1 8h2M13 8h2M2.9 2.9l1.4 1.4M11.7 11.7l1.4 1.4M2.9 13.1l1.4-1.4M11.7 4.3l1.4-1.4" stroke="currentColor" strokeWidth="1.2"/></svg>,
    subjects: <svg viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="12" height="12" rx="1" stroke="currentColor" strokeWidth="1.2"/><path d="M5 5h6M5 8h6M5 11h3" stroke="currentColor" strokeWidth="1.2"/></svg>,
    marks: <svg viewBox="0 0 16 16" fill="none"><path d="M4 12V8M8 12V4M12 12V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  };
  return <span className="db-nav-icon">{icons[name] ?? icons.dashboard}</span>;
}

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const role = useRole();
  const setRole = useSetRole();
  const filteredSections = useMemo(
    () =>
      navSections
        .map((s) => ({ ...s, items: s.items.filter((i) => i.roles.includes(role)) }))
        .filter((s) => s.items.length > 0),
    [role],
  );

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [roleSwitcherOpen, setRoleSwitcherOpen] = useState(false);

  return (
    <div className="db-shell">
      {/* SIDEBAR */}
      <aside className={`db-sidebar${sidebarCollapsed ? " collapsed" : ""}`}>
        <div className="db-sidebar-logo">
          <div className="db-logo-mark"><span>N</span></div>
          <div className="db-logo-text">NCC<span className="dim">{"//"}</span>CMD</div>
        </div>

        <nav className="db-sidebar-nav">
          {filteredSections.map((section) => (
            <div key={section.label}>
              <div className="db-nav-section-label">{section.label}</div>
              {section.items.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`db-nav-item${active ? " active" : ""}`}
                  >
                    <NavIcon name={item.icon} />
                    <span className="db-nav-label">{item.label}</span>
                    {item.badge ? <span className="db-nav-badge">{item.badge}</span> : null}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        <div className="db-sidebar-footer">
          <div className="db-avatar">JR</div>
          <div className="db-avatar-info">
            <div className="db-avatar-name">Jitraj R.</div>
            <div className="db-avatar-role">{role.toUpperCase()}</div>
          </div>
          <button
            className="db-collapse-btn"
            style={{ marginLeft: "auto" }}
            title="Sign Out"
            onClick={() => { localStorage.removeItem("ncc-role"); router.push("/login"); }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 1H3a1 1 0 00-1 1v10a1 1 0 001 1h2M9 10l3-3-3-3M5 7h7" stroke="currentColor" strokeWidth="1.2"/></svg>
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <div className="db-main">
        <header className="db-header">
          <div className="db-header-left">
            <button className="db-collapse-btn" onClick={() => setSidebarCollapsed(!sidebarCollapsed)}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 3h12M1 7h12M1 11h12" stroke="currentColor" strokeWidth="1.3"/></svg>
            </button>
            <div className="db-page-title">{pageTitle(pathname)}</div>
          </div>
          <div className="db-header-right">
            <Link href="/dashboard/notifications" className="db-hdr-btn">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1a3.5 3.5 0 013.5 3.5V8l1 2H2.5l1-2V4.5A3.5 3.5 0 017 1z" stroke="currentColor" strokeWidth="1.2"/><path d="M5.5 12a1.5 1.5 0 003 0" stroke="currentColor" strokeWidth="1.2"/></svg>
              <span className="db-notif-dot" />
            </Link>
            <Link href="/dashboard/settings" className="db-hdr-btn">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="2" stroke="currentColor" strokeWidth="1.2"/><path d="M7 1v1M7 12v1M1 7h1M12 7h1" stroke="currentColor" strokeWidth="1.2"/></svg>
            </Link>
            {/* Role Switcher */}
            <div style={{ position: "relative" }}>
              <button
                className="db-role-tag"
                style={{ cursor: "pointer", background: "none" }}
                onClick={() => setRoleSwitcherOpen(!roleSwitcherOpen)}
              >
                {role === "captain" ? "Captain" : role.toUpperCase()} View ▾
              </button>
              {roleSwitcherOpen && (
                <div style={{
                  position: "absolute", top: "calc(100% + 6px)", right: 0, minWidth: 160,
                  background: "var(--db-bg2)", border: "1px solid var(--db-border2)",
                  zIndex: 300,
                }}>
                  {appRoles.map((r) => (
                    <button
                      key={r.value}
                      style={{
                        display: "block", width: "100%", textAlign: "left", padding: "10px 14px",
                        fontFamily: "var(--font-ibm-mono), monospace", fontSize: 11, letterSpacing: ".08em",
                        textTransform: "uppercase" as const, cursor: "pointer",
                        background: role === r.value ? "rgba(255,255,255,0.06)" : "transparent",
                        color: role === r.value ? "var(--db-gray1)" : "var(--db-gray4)",
                        border: "none", borderBottom: "1px solid var(--db-border)",
                      }}
                      onClick={() => { setRole(r.value); setRoleSwitcherOpen(false); }}
                    >
                      {r.label} {role === r.value && "✓"}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="db-content">
          <div className="db-view">{children}</div>
        </div>
      </div>
    </div>
  );
}
