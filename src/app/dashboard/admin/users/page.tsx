import { ModulePage } from "@/components/dashboard/module-page";

export default function AdminUsersPage() {
  return (
    <ModulePage
      eyebrow="Admin"
      title="User Management"
      summary="Manage cadet lifecycle, invites, activation, and role assignment with separation-of-duties constraints."
      cards={[
        { label: "Total Users", value: "402" },
        { label: "Deactivated", value: "11" },
        { label: "Pending Invites", value: "24" },
      ]}
      listTitle="Recent Admin Actions"
      listItems={[
        "Invited 12 cadets via bulk CSV",
        "Deactivated 2 graduated cadets",
        "Promoted 1 user from cadet to SUO",
      ]}
    />
  );
}
