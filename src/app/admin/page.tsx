import { auth } from "@/features/auth/auth";
import { redirect } from "next/navigation";
import { AdminService } from "@/features/admin/admin.service";
import { 
  Users, 
  Home, 
  FileCheck, 
  AlertTriangle, 
  MessageSquare,
  ShieldAlert
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const metadata = {
  title: "Admin Dashboard - RoomFinder",
  description: "Platform administration and management.",
};

export default async function AdminDashboardPage() {
  const session = await auth();

  if (!session?.user) redirect("/login");
  if (session.user.role !== "admin") redirect("/");

  const stats = await AdminService.getPlatformStats();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
        <p className="text-slate-500 mt-1">Platform overview and pending tasks.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Users" value={stats.totalUsers} icon={<Users className="text-primary h-5 w-5" />} />
        <StatCard title="Total Students" value={stats.totalStudents} icon={<Users className="text-indigo-500 h-5 w-5" />} />
        <StatCard title="Total Owners" value={stats.totalOwners} icon={<Users className="text-emerald-500 h-5 w-5" />} />
        <StatCard title="Total Properties" value={stats.totalProperties} icon={<Home className="text-amber-500 h-5 w-5" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">
            Action Center
          </h2>
          <div className="space-y-4">
            <ActionItem 
              title="Pending Property Approvals" 
              count={stats.pendingApprovals} 
              icon={<Home className="text-amber-500 h-5 w-5" />}
              href="/admin/listings"
            />
            <ActionItem 
              title="Pending Owner Verifications" 
              count={stats.pendingVerifications} 
              icon={<FileCheck className="text-indigo-500 h-5 w-5" />}
              href="/admin/verifications/owners"
            />
            <ActionItem 
              title="Pending Reports" 
              count={stats.pendingReports} 
              icon={<AlertTriangle className="text-rose-500 h-5 w-5" />}
              href="/admin/reports"
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">
            Quick Links
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <Link href="/admin/users">
              <Button variant="outline" className="w-full justify-start gap-2">
                <Users size={16} /> Manage Users
              </Button>
            </Link>
            <Link href="/admin/reviews">
              <Button variant="outline" className="w-full justify-start gap-2">
                <MessageSquare size={16} /> Moderation
              </Button>
            </Link>
            <Link href="/admin/coaching-centers">
              <Button variant="outline" className="w-full justify-start gap-2">
                <ShieldAlert size={16} /> Coaching Centers
              </Button>
            </Link>
            <Link href="/admin/featured">
              <Button variant="outline" className="w-full justify-start gap-2">
                <Home size={16} /> Featured Listings
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon }: { title: string; value: number | string; icon: React.ReactNode }) {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-start gap-4">
      <div className="p-3 bg-slate-50 rounded-lg shrink-0 border border-slate-100">
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
        <p className="text-2xl font-bold text-slate-900">{value}</p>
      </div>
    </div>
  );
}

function ActionItem({ title, count, icon, href }: { title: string; count: number; icon: React.ReactNode; href: string }) {
  return (
    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-100 hover:border-slate-300 transition-colors">
      <div className="flex items-center gap-3">
        {icon}
        <span className="font-medium text-slate-700">{title}</span>
      </div>
      <div className="flex items-center gap-4">
        {count > 0 ? (
          <span className="bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full text-xs font-bold">
            {count} pending
          </span>
        ) : (
          <span className="text-sm text-slate-500">All caught up</span>
        )}
        <Link href={href}>
          <Button variant="ghost" size="sm" className="text-primary">
            Review
          </Button>
        </Link>
      </div>
    </div>
  );
}
