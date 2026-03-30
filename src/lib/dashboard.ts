export type AppRole = "cadet" | "suo" | "ano" | "captain" | "admin";

export type NavSection = {
  label: string;
  items: NavItem[];
};

export type NavItem = {
  href: string;
  label: string;
  roles: AppRole[];
  badge?: number;
  icon: string; // SVG icon identifier
};

export const appRoles: { value: AppRole; label: string }[] = [
  { value: "cadet", label: "Cadet" },
  { value: "suo", label: "SUO" },
  { value: "ano", label: "ANO" },
  { value: "captain", label: "Captain" },
  { value: "admin", label: "Admin" },
];

export const navSections: NavSection[] = [
  {
    label: "Operations",
    items: [
      { href: "/dashboard", label: "Dashboard", roles: ["cadet", "suo", "ano", "captain", "admin"], icon: "dashboard" },
      { href: "/dashboard/attendance", label: "Attendance", roles: ["cadet", "suo", "ano", "captain"], icon: "attendance", badge: 3 },
      { href: "/dashboard/events", label: "Events", roles: ["cadet", "suo", "ano", "captain"], icon: "events" },
      { href: "/dashboard/cadets", label: "Cadets", roles: ["suo", "ano", "captain", "admin"], icon: "cadets" },
    ],
  },
  {
    label: "Learning",
    items: [
      { href: "/dashboard/study", label: "Study Hub", roles: ["cadet", "suo", "ano", "captain"], icon: "study" },
      { href: "/dashboard/quiz", label: "Quizzes", roles: ["cadet", "suo", "ano", "captain"], icon: "quiz" },
    ],
  },
  {
    label: "Content",
    items: [
      { href: "/dashboard/blog", label: "Blog", roles: ["cadet", "suo", "ano", "captain"], icon: "blog", badge: 2 },
      { href: "/dashboard/news", label: "News", roles: ["cadet", "suo", "ano", "captain"], icon: "news" },
      { href: "/dashboard/ranks", label: "Ranks", roles: ["cadet", "suo", "ano", "captain"], icon: "ranks" },
    ],
  },
  {
    label: "Admin",
    items: [
      { href: "/dashboard/feedback", label: "Feedback", roles: ["cadet", "suo", "ano", "captain"], icon: "feedback", badge: 5 },
      { href: "/dashboard/reports", label: "Reports", roles: ["ano", "captain", "admin"], icon: "reports" },
      { href: "/dashboard/subjects", label: "Subjects", roles: ["ano", "captain", "admin"], icon: "subjects" },
      { href: "/dashboard/marks", label: "Marks", roles: ["ano", "captain", "admin"], icon: "marks" },
      { href: "/dashboard/admin", label: "Admin", roles: ["ano", "captain", "admin"], icon: "admin" },
      { href: "/dashboard/notifications", label: "Notifications", roles: ["cadet", "suo", "ano", "captain", "admin"], icon: "notifications" },
      { href: "/dashboard/settings", label: "Settings", roles: ["cadet", "suo", "ano", "captain", "admin"], icon: "settings" },
    ],
  },
];

// Flatten for backward compat
export const navItems: NavItem[] = navSections.flatMap((s) => s.items);

export function pageTitle(pathname: string): string {
  const item = navItems.find((i) => i.href === pathname);
  if (item) return item.label;
  const cleaned = pathname.replace("/dashboard/", "").split("/").join(" / ");
  return cleaned
    .split(" ")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function isOfficerRole(role: AppRole): boolean {
  return role === "ano" || role === "captain" || role === "admin";
}
