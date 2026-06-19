import { auth } from "@/features/auth/auth";
import { redirect } from "next/navigation";
import { AdminService } from "@/features/admin/admin.service";
import {
  Users, Home, FileCheck, AlertTriangle, MessageSquare,
  ShieldAlert, ArrowRight, TrendingUp, UserCheck, Flag, Sparkles
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

  const statCards = [
    { title: "Total Users", value: stats.totalUsers, icon: Users, color: "from-violet-500 to-indigo-600", bg: "bg-violet-50" },
    { title: "Students", value: stats.totalStudents, icon: Users, color: "from-emerald-500 to-teal-600", bg: "bg-emerald-50" },
    { title: "Owners", value: stats.totalOwners, icon: UserCheck, color: "from-amber-500 to-orange-600", bg: "bg-amber-50" },
    { title: "Properties", value: stats.totalProperties, icon: Home, color: "from-blue-500 to-cyan-600", bg: "bg-blue-50" },
  ];

  const actionItems = [
    { title: "Property Approvals", count: stats.pendingApprovals, icon: Home, color: "from-amber-500 to-orange-600", href: "/admin/listings" },
    { title: "Owner Verifications", count: stats.pendingVerifications, icon: FileCheck, color: "from-violet-500 to-indigo-600", href: "/admin/verifications/owners" },
    { title: "Pending Reports", count: stats.pendingReports, icon: Flag, color: "from-rose-500 to-pink-600", href: "/admin/reports" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-md">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900">Admin Dashboard</h1>
          </div>
          <p className="text-slate-500 text-sm font-medium ml-[52px]">Platform overview and pending tasks.</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-violet-50 to-indigo-50 text-violet-700 text-sm font-bold rounded-xl border border-violet-200">
          <div className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
          {session.user.name}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.title} className="bg-white rounded-2xl border border-slate-200 p-5 transition-all hover:shadow-lg hover:shadow-violet-100 hover:border-violet-200 hover:-translate-y-0.5">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center shrink-0 shadow-md`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-500">{card.title}</p>
                  <p className="text-2xl font-extrabold text-slate-900 mt-0.5">{valueOrZero(card.value)}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-violet-100 p-6 shadow-md shadow-violet-50">
          <h2 className="text-lg font-extrabold text-slate-900 mb-5 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-amber-500" />
            Action Center
          </h2>
          <div className="space-y-3">
            {actionItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-violet-200 hover:bg-violet-50/50 transition-all">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-md`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-700 text-sm">{item.title}</span>
                      {item.count > 0 && (
                        <p className="text-xs font-bold text-slate-500 mt-0.5">{item.count} item{item.count !== 1 ? 's' : ''} pending</p>
                      )}
                    </div>
                  </div>
                  <Link href={item.href}>
                    <Button variant="ghost" size="sm" className="text-violet-700 gap-1 font-bold">
                      Review <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </Link>
                </div>
              );
            })}
            {actionItems.every(i => i.count === 0) && (
              <div className="text-center py-8 text-sm text-slate-500">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center mx-auto mb-3">
                  <FileCheck className="w-6 h-6 text-emerald-500" />
                </div>
                <span className="font-bold">All caught up! No pending items.</span>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-violet-100 p-6 shadow-md shadow-violet-50">
          <h2 className="text-lg font-extrabold text-slate-900 mb-5 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-violet-600" />
            Quick Links
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <QuickLink href="/admin/users" icon={Users} label="Manage Users" />
            <QuickLink href="/admin/reviews" icon={MessageSquare} label="Moderation" />
            <QuickLink href="/admin/coaching-centers" icon={ShieldAlert} label="Coaching Centers" />
            <QuickLink href="/admin/featured" icon={TrendingUp} label="Featured" />
          </div>
        </div>
      </div>
    </div>
  );
}

function valueOrZero(v: number | string): string {
  if (typeof v === 'number') return v.toString();
  return v || '0';
}

function QuickLink({ href, icon: Icon, label }: { href: string; icon: React.ElementType; label: string }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-gradient-to-r hover:from-violet-50 hover:to-indigo-50 hover:border-violet-200 hover:shadow-md transition-all group"
    >
      <Icon className="w-5 h-5 text-slate-400 group-hover:text-violet-600 transition-colors" />
      <span className="text-sm font-bold text-slate-700 group-hover:text-violet-700 transition-colors">{label}</span>
    </Link>
  );
}
