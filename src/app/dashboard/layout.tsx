import { Sidebar } from "@/components/layout/Sidebar";
import { navConfig } from "@/config/site";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row bg-gradient-to-br from-slate-50 via-white to-violet-50">
      <Sidebar items={navConfig.ownerNav as any} basePath="/dashboard" userRole="owner" />
      <main className="flex-1 overflow-x-hidden p-4 md:p-8">
        <div className="max-w-6xl mx-auto w-full">{children}</div>
      </main>
    </div>
  );
}
