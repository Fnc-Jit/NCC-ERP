import { SiteThemeToggle } from "@/components/theme/site-theme-provider";

export default function Home() {
  const loginOptions = ["Cadet", "ANO", "Captain"];
  const techStack = [
    ["Framework", "Next.js 14", "App Router · SSR · Vercel Deploy"],
    ["Language", "TypeScript 5.x", "Strict mode · DB types from Supabase CLI"],
    ["Styling", "Tailwind CSS 3.x", "Utility-first · shadcn/ui components"],
    ["Backend / DB", "Supabase", "PostgreSQL 15 · Auth · Storage · Realtime · Edge Functions"],
    ["Server State", "TanStack Query 5", "All API calls via useQuery/useMutation"],
    ["Client State", "Zustand 4", "Auth user · sidebar open state only"],
    ["Forms", "React Hook Form + Zod", "Zod = single source of truth for validation"],
    ["Rich Text", "TipTap 2", "Blog/news editor · image extension"],
    ["Charts", "Recharts 2", "Attendance analytics · RadialBarChart for eligibility ring"],
    ["Calendar", "react-big-calendar", "Month / week / day / agenda views"],
    ["Dates", "date-fns 3", "No moment.js · tree-shakeable"],
    ["PDF Export", "pdf-lib (Edge Function)", "Server-side attendance report generation"],
  ];

  const roles = [
    {
      badge: "Role 01",
      title: "Cadet",
      desc: "Default role for all enrolled NCC cadets. Self-registers via invite link. Read-focused with limited write access.",
      perms: [
        "View own attendance",
        "Dispute attendance",
        "Take quizzes",
        "Submit blog (pending)",
        "Submit feedback",
        "View events",
        "Download own data",
      ],
    },
    {
      badge: "Role 02",
      title: "SUO",
      desc: "Senior Under Officer — elevated cadet. Can act as limited ANO for their company. All actions flagged acting_role: SUO in audit log.",
      perms: [
        "Mark attendance (own company)",
        "View company attendance",
        "Post announcements",
        "All cadet permissions",
      ],
    },
    {
      badge: "Role 03",
      title: "ANO",
      desc: "Associate NCC Officer. Full operational write access. Manages all cadets, content, and operations across the unit.",
      perms: [
        "Mark all attendance",
        "Resolve disputes",
        "Create events",
        "Publish news",
        "Approve blog posts",
        "Manage ranks",
        "Read feedback",
        "Export PDF reports",
        "Create quizzes",
        "Upload study resources",
      ],
    },
    {
      badge: "Role 04",
      title: "Admin",
      desc: "System administrator (IT staff or trusted senior). Manages accounts and infrastructure. No content creation — separation of duties enforced.",
      perms: [
        "Manage user accounts",
        "Bulk CSV import",
        "View audit logs",
        "Invite cadets",
        "Export reports",
        "Process data deletion",
      ],
    },
  ];

  return (
    <>
      <nav className="ncc-nav">
        <div className="nav-logo">
          NCC<span>{"//"}</span>CMD
        </div>
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#plan">Impl. Plan</a>
          <a href="#stack">Stack</a>
          <a href="#roles">Roles</a>
        </div>
        <div className="nav-actions">
          <SiteThemeToggle />
          <a className="nav-cta" href="#plan">
            View Plan →
          </a>
          <details className="login-menu">
            <summary className="nav-cta login-summary">Login</summary>
            <div className="login-dropdown">
              {loginOptions.map((role) => (
                <a key={role} href={`/login?role=${role.toLowerCase()}`}>
                  {role} Login
                </a>
              ))}
            </div>
          </details>
        </div>
      </nav>

      <section className="hero" id="hero">
        <div className="hero-grid-bg" />
        <div className="hero-scan-line" />
        <div className="hero-corner tl" />
        <div className="hero-corner tr" />
        <div className="hero-corner bl" />
        <div className="hero-corner br" />

        <div className="hero-tag">NCC Digital Command &amp; Management Platform — v1.0</div>
        <h1 className="hero-headline">
          Command.
          <br />
          <em>Coordinate.</em>
          <br />
          Deploy.
        </h1>

        <div className="hero-sub">
          <p className="hero-desc">
            A unified digital ecosystem for NCC units — replacing fragmented WhatsApp chains and
            physical registers with role-aware, data-driven operations. Built for 150–500+ cadets.
          </p>
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat-num">6</span>
              <span className="hero-stat-label">Core Modules</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-num">4</span>
              <span className="hero-stat-label">User Roles</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat-num">~12</span>
              <span className="hero-stat-label">Week Build</span>
            </div>
          </div>
        </div>

        <div className="hero-ctas">
          <details className="login-menu">
            <summary className="btn-primary login-summary">Login</summary>
            <div className="login-dropdown">
              {loginOptions.map((role) => (
                <a key={role} href={`/login?role=${role.toLowerCase()}`}>
                  {role} Login
                </a>
              ))}
            </div>
          </details>
          <a className="btn-primary" href="#plan">
            Implementation Plan
          </a>
          <a
            className="btn-secondary"
            href="#features"
          >
            Explore Features
          </a>
        </div>

        <div className="hero-scroll-hint">Scroll to explore</div>
      </section>

      <section className="tiles-section" id="features">
        <div className="section-label">01 — Platform Modules</div>
        <div className="tiles-header">
          <h2 className="tiles-title">
            Six modules.
            <br />
            <em>One command surface.</em>
          </h2>
        </div>

        <div className="tiles-grid">
          <div className="tile tile-lg">
            <div className="tile-hover-line" />
            <div className="tile-num">01.A</div>
            <svg className="tile-icon" viewBox="0 0 40 40" fill="none">
              <rect x="4" y="8" width="32" height="24" rx="1" stroke="currentColor" strokeWidth="1.2" />
              <path d="M13 20l4 4 10-10" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            <div className="tile-title">Attendance Engine</div>
            <div className="tile-desc">
              Real-time parade and session tracking. QR + manual fallback. Offline-first for field
              ops. 95%+ entry rate target. Dispute resolution workflow with 48hr session lock.
            </div>
            <div className="tile-arrow">↗</div>
          </div>

          <div className="tile tile-md">
            <div className="tile-hover-line" />
            <div className="tile-num">01.B</div>
            <svg className="tile-icon" viewBox="0 0 40 40" fill="none">
              <path d="M8 32V16l12-8 12 8v16" stroke="currentColor" strokeWidth="1.2" />
              <rect x="15" y="22" width="10" height="10" stroke="currentColor" strokeWidth="1.2" />
            </svg>
            <div className="tile-title">Study Repository</div>
            <div className="tile-desc">
              Structured B &amp; C Certificate prep. PDF storage, MCQ quizzes with attempt
              tracking. Private bucket, signed URLs.
            </div>
            <div className="tile-arrow">↗</div>
          </div>

          <div className="tile tile-sm">
            <div className="tile-hover-line" />
            <div className="tile-num">01.C</div>
            <svg className="tile-icon" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="14" stroke="currentColor" strokeWidth="1.2" />
              <path d="M20 12v8l6 4" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            <div className="tile-title">Events &amp; Calendar</div>
            <div className="tile-desc">
              Parade, camp, and drill scheduling. Real-time broadcast to cadets.
            </div>
            <div className="tile-arrow">↗</div>
          </div>

          <div className="tile tile-7">
            <div className="tile-hover-line" />
            <div className="tile-num">01.D</div>
            <svg className="tile-icon" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="16" r="6" stroke="currentColor" strokeWidth="1.2" />
              <path d="M8 34c0-6.627 5.373-12 12-12s12 5.373 12 12" stroke="currentColor" strokeWidth="1.2" />
              <path d="M28 8l2 2-2 2M32 10h-4" stroke="currentColor" strokeWidth="1.2" />
            </svg>
            <div className="tile-title">Rank Hierarchy &amp; Cadet Profiles</div>
            <div className="tile-desc">
              Official digital record of ranks from Lance Corporal to SUO. Company breakdown across
              Army, Navy, Air Force wings. Chest number registry. Achievement spotlight with
              ANO-approval workflow.
            </div>
            <div className="tile-arrow">↗</div>
          </div>

          <div className="tile tile-md">
            <div className="tile-hover-line" />
            <div className="tile-num">01.E</div>
            <svg className="tile-icon" viewBox="0 0 40 40" fill="none">
              <path d="M6 30l8-8 6 6 6-10 8 10" stroke="currentColor" strokeWidth="1.5" />
              <rect
                x="4"
                y="6"
                width="32"
                height="28"
                rx="1"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeDasharray="2 2"
              />
            </svg>
            <div className="tile-title">ANO Reports</div>
            <div className="tile-desc">
              PDF export via Edge Function. Attendance analytics with Recharts. Eligibility
              thresholds enforced automatically.
            </div>
            <div className="tile-arrow">↗</div>
          </div>

          <div className="tile tile-sm">
            <div className="tile-hover-line" />
            <div className="tile-num">01.F</div>
            <svg className="tile-icon" viewBox="0 0 40 40" fill="none">
              <path
                d="M20 6C12.268 6 6 12.268 6 20s6.268 14 14 14 14-6.268 14-14S27.732 6 20 6z"
                stroke="currentColor"
                strokeWidth="1.2"
              />
              <path d="M20 16v4l3 3" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="20" cy="29" r="1.5" fill="currentColor" />
            </svg>
            <div className="tile-title">Anonymous Feedback</div>
            <div className="tile-desc">
              Safe cadet-to-ANO channel. Zero identifying metadata stored.
            </div>
            <div className="tile-arrow">↗</div>
          </div>

          <div className="tile tile-full kpi-strip">
            <div className="tile-hover-line" />
            <div className="kpi-grid">
              <div className="kpi-item">
                <div className="kpi-value">95%</div>
                <div className="kpi-label">Target Attendance Entry</div>
              </div>
              <div className="kpi-divider" />
              <div className="kpi-item">
                <div className="kpi-value">&lt;10%</div>
                <div className="kpi-label">Event No-Show Target</div>
              </div>
              <div className="kpi-divider" />
              <div className="kpi-item">
                <div className="kpi-value">+15%</div>
                <div className="kpi-label">Attendance Rate Improvement</div>
              </div>
              <div className="kpi-divider" />
              <div className="kpi-item">
                <div className="kpi-value">&gt;60%</div>
                <div className="kpi-label">DAU Target (6 months)</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="impl-section" id="plan">
        <div className="section-label">02 — Implementation Plan</div>
        <div className="impl-header">
          <h2 className="impl-title">
            12-week
            <br />
            <em>build track.</em>
          </h2>
          <p className="impl-intro">
            Phased delivery across four sprints. Each phase ships a working vertical slice. Stack:
            Next.js 14 App Router · TypeScript · Tailwind · shadcn/ui · Supabase · Vercel.
          </p>
        </div>

        <div className="phases-track">
          <div className="phase">
            <div className="phase-meta">
              <div>
                <div className="phase-num">
                  <span className="phase-dot dot-active" />
                  Phase 00
                </div>
                <div className="phase-week" style={{ fontSize: "16px", marginTop: "12px" }}>
                  Pre-Dev
                </div>
              </div>
              <div>
                <div className="phase-week">W0</div>
                <div className="phase-week-label">Setup</div>
              </div>
            </div>
            <div className="phase-body">
              <div className="phase-title">Environment &amp; Backend Handoff</div>
              <ul className="phase-tasks">
                <li>Receive Supabase URL/key and test credentials</li>
                <li>Confirm staging project access and seeded schema</li>
                <li>
                  Bootstrap app:
                  <code className="phase-code"> npx create-next-app@latest ncc-web</code>
                </li>
                <li>Install core dependencies and initialize shadcn/ui</li>
                <li>Set folder architecture per implementation spec</li>
                <li>Configure middleware for role-based route protection</li>
                <li>Generate database types via Supabase CLI</li>
              </ul>
            </div>
            <div className="phase-stack">
              <div className="stack-tag">Next.js 14</div>
              <div className="stack-tag">Supabase CLI</div>
              <div className="stack-tag">Vercel</div>
              <div className="stack-tag">shadcn/ui</div>
            </div>
          </div>

          {[
            {
              n: "Phase 01",
              w: "W1–W3",
              wl: "Foundation",
              t: "Auth + Dashboard Shell + Cadet Profiles",
              tasks: [
                "Login + set-password flows with Supabase Auth",
                "Role-aware dashboard shell and navigation",
                "Cadet list with filters, search, and status",
                "Cadet profile detail with editable fields",
                "Shared components: RoleGuard, EmptyState, ConfirmDialog",
              ],
              stack: ["Supabase Auth", "@supabase/ssr", "Zustand", "React Query", "RHF + Zod"],
            },
            {
              n: "Phase 02",
              w: "W4–W6",
              wl: "Core Ops",
              t: "Attendance + Events + Notifications",
              tasks: [
                "Attendance session creation and marking workflow",
                "Disputes inbox with accept/reject and remarks",
                "48-hour lock policy enforcement",
                "Events calendar and event detail pages",
                "Realtime notification badge and notifications page",
              ],
              stack: ["Recharts", "react-big-calendar", "Supabase Realtime", "date-fns", "TipTap"],
            },
            {
              n: "Phase 03",
              w: "W7–W9",
              wl: "Content",
              t: "Study Hub + Blog + Ranks + News + Feedback",
              tasks: [
                "Resource uploads with signed URL download",
                "Quiz runner + attempt tracking + result views",
                "Blog moderation workflow and status badges",
                "News publishing with markdown rendering",
                "Anonymous feedback pipeline with no user link",
              ],
              stack: ["TipTap", "react-markdown", "Supabase Storage", "remark-gfm"],
            },
            {
              n: "Phase 04",
              w: "W10–W11",
              wl: "Admin + Reports",
              t: "Admin Panel + PDF Reports + Bulk Import",
              tasks: [
                "User management, activation, and invites",
                "CSV validation preview with row-level errors",
                "Audit log viewer with filters",
                "Attendance PDF report generation via Edge Function",
                "Analytics cards and charts on reports page",
              ],
              stack: ["Papa Parse", "pdf-lib (Edge)", "Resend", "Recharts", "service_role"],
            },
            {
              n: "Phase 05",
              w: "W12",
              wl: "QA + Launch",
              t: "Testing, Hardening & Production Deploy",
              tasks: [
                "Playwright E2E for critical cadet/ANO/admin flows",
                "Unit tests for calculations and validators",
                "RLS policy verification and lock edge cases",
                "Security + accessibility + performance audits",
                "Production cutover and ANO UAT sign-off",
              ],
              stack: ["Playwright", "Jest", "OWASP ZAP", "Lighthouse", "Supabase Pro"],
              pending: true,
            },
          ].map((phase) => (
            <div className="phase" key={phase.n}>
              <div className="phase-meta">
                <div className="phase-num">
                  <span className={`phase-dot ${phase.pending ? "dot-pending" : "dot-active"}`} />
                  {phase.n}
                </div>
                <div>
                  <div className="phase-week">{phase.w}</div>
                  <div className="phase-week-label">{phase.wl}</div>
                </div>
              </div>
              <div className="phase-body">
                <div className="phase-title">{phase.t}</div>
                <ul className="phase-tasks">
                  {phase.tasks.map((task) => (
                    <li key={task}>{task}</li>
                  ))}
                </ul>
              </div>
              <div className="phase-stack">
                {phase.stack.map((item) => (
                  <div className="stack-tag" key={item}>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="stack-section" id="stack">
        <div className="section-label">03 — Technology Stack</div>
        <div className="stack-grid">
          {techStack.map(([category, name, version]) => (
            <div className="stack-item" key={name}>
              <div className="stack-category">{category}</div>
              <div className="stack-name">{name}</div>
              <div className="stack-version">{version}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="roles-section" id="roles">
        <div className="section-label">04 — User Roles &amp; Permissions</div>
        <div className="roles-grid">
          {roles.map((role) => (
            <div className="role-card" key={role.title}>
              <div className="role-badge">{role.badge}</div>
              <div className="role-title">{role.title}</div>
              <div className="role-desc">{role.desc}</div>
              <div className="role-perms">
                {role.perms.map((perm) => (
                  <span className="perm-tag" key={perm}>
                    {perm}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="support-section" id="support">
        <div className="section-label">05 — Help &amp; Support</div>
        <div className="support-grid">
          <div className="support-panel">
            <p className="support-kicker">Need Assistance</p>
            <h2 className="support-title">Help and support for cadets, officers, and command staff.</h2>
            <p className="support-copy">
              Reach out for login help, attendance corrections, event clarification, or platform
              access issues. This area can later connect to email, WhatsApp support, or a ticket
              system.
            </p>
          </div>

          <div className="support-panel">
            <p className="support-kicker">Support Scope</p>
            <ul className="support-list">
              <li>Account access and password reset support</li>
              <li>Attendance dispute escalation guidance</li>
              <li>Study material and quiz issue reporting</li>
              <li>Technical assistance for ANO and Captain workflows</li>
            </ul>
          </div>
        </div>

        <div className="credit-banner">
          <div className="credit-copy">Made with Love By Jitraj</div>
          <div className="credit-links">
            <a href="https://github.com/Fnc-Jit" target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/jitraj-esh/" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-logo">NCC CMD Platform — v1.0 Confidential</div>
        <div className="footer-note">Next.js 14 · Supabase · Vercel · ~₹4,000–5,000/mo production</div>
      </footer>
    </>
  );
}
