import { Sidebar } from "@/components/layout/Sidebar";
import { navConfig } from "@/config/site";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Pass correct icons typing from navConfig
  const ownerItems = navConfig.ownerNav.map((item) => ({
    ...item,
    icon: item.icon as any,
  }));

  return (
    <div className="flex min-h-screen flex-col md:flex-row bg-slate-50">
      <Sidebar items={ownerItems} basePath="/dashboard" userRole="owner" />
      <main className="flex-1 overflow-x-hidden p-4 md:p-8">
        <div className="max-w-6xl mx-auto w-full">{children}</div>
      </main>
    </div>
  );
}
