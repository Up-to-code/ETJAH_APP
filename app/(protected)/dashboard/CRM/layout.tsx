import { getCurrentUser } from "@/lib/session";

export default async function CRMLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  if (!user) return <div>You are not authorized to access this page.</div>;
  if (user.role !== "ADMIN")
    return <div>You are not authorized to access this page.</div>;
  return <div>{children}</div>;
}
