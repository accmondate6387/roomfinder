import { Sidebar } from "@/components/layout/Sidebar";
import { navConfig } from "@/config/site";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Pass correct icons typing from navConfig
  const adminItems = navConfig.adminNav.map((item) => ({
    ...item,
    icon: item.icon as any,
  }));

  return (
    <div className="flex min-h-screen flex-col md:flex-row bg-slate-50">
      <Sidebar items={adminItems} basePath="/admin" userRole="admin" />
      <main className="flex-1 overflow-x-hidden p-4 md:p-8">
        <div className="max-w-7xl mx-auto w-full">{children}</div>
      </main>
    </div>
  );
}
