 
import { getCurrentUser } from "@/lib/session";
import { constructMetadata } from "@/lib/utils";
import { DeleteAccountSection } from "@/components/dashboard/delete-account";
import { DashboardHeader } from "@/components/dashboard/header";
import { UserNameForm } from "@/components/forms/user-name-form";
import { UserRoleForm } from "@/components/forms/user-role-form";
import { fetchUser } from "@/actions/getUsersDatat";
import { redirect } from "next/navigation";
 
export const metadata = constructMetadata({
  title: "Settings – Next Template",
  description: "Configure your account and website settings.",
});

export default async function SettingsPage({
  params,
}: {
  params: Promise<{ user_id: string }>;
}) {
  const isUser = await getCurrentUser();
  const { user_id } = await params;
   const user = await fetchUser(user_id);

  if (!user?.id) redirect("/admin/users");

  return (
    <>
      <DashboardHeader
        heading="Settings"
        text="Manage account and website settings."
      />
      <div className="divide-y divide-muted pb-10">
        <UserNameForm user={{ id: user.id, name: user.name || "" }} />
        <UserRoleForm user={{ id: user.id, role: user.role }} />
        <DeleteAccountSection />
      </div>
    </>
  );
}
