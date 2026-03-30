import { ModulePage } from "@/components/dashboard/module-page";

export default function AdminAuditPage() {
  return (
    <ModulePage
      eyebrow="Admin"
      title="Audit Logs"
      summary="Append-only trace of privileged actions across users, attendance, events, and content modules."
      cards={[
        { label: "Entries Today", value: "67" },
        { label: "Critical", value: "2" },
        { label: "Exported", value: "5" },
      ]}
      listTitle="Latest Events"
      listItems={[
        "ANO approved post: Spotlight #228",
        "Admin changed role: user_381 -> SUO",
        "ANO generated attendance report: Mar 2026",
      ]}
    />
  );
}
