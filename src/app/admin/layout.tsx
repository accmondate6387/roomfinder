import { Sidebar } from "@/components/layout/Sidebar";
import { navConfig } from "@/config/site";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row bg-gradient-to-br from-slate-50 via-white to-violet-50">
      <Sidebar items={navConfig.adminNav as any} basePath="/admin" userRole="admin" />
      <main className="flex-1 overflow-x-hidden p-4 md:p-8">
        <div className="w-full max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
