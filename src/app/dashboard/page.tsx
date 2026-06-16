import { auth } from "@/features/auth/auth";
import { redirect } from "next/navigation";
import { AnalyticsService } from "@/features/analytics/analytics.service";
import { Home, Eye, Heart, MessageCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const metadata = {
  title: "Owner Dashboard - RoomFinder",
  description: "Manage your properties and view analytics.",
};

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.role !== "owner") {
    redirect("/");
  }

  const stats = await AnalyticsService.getOwnerAnalyticsSummary(session.user.id);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Dashboard Overview</h1>
        <p className="text-slate-500 mt-1">Welcome back, {session.user.name}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Listings"
          value={stats.totalListings}
          icon={<Home className="text-primary h-5 w-5" />}
        />
        <StatCard
          title="Total Views"
          value={stats.totalViews}
          icon={<Eye className="text-emerald-500 h-5 w-5" />}
        />
        <StatCard
          title="Total Favorites"
          value={stats.totalFavorites}
          icon={<Heart className="text-rose-500 h-5 w-5" />}
        />
        <StatCard
          title="Contact Clicks"
          value={stats.totalContacts}
          icon={<MessageCircle className="text-amber-500 h-5 w-5" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Quick Actions</h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/dashboard/listings/new" className="flex-1">
              <Button className="w-full">Add New Listing</Button>
            </Link>
            <Link href="/dashboard/listings" className="flex-1">
              <Button variant="outline" className="w-full">Manage Listings</Button>
            </Link>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Listing Status</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-slate-100">
              <span className="text-slate-600">Approved (Live)</span>
              <span className="font-semibold text-emerald-600">{stats.approvedListings}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-100">
              <span className="text-slate-600">Pending Approval</span>
              <span className="font-semibold text-amber-600">{stats.pendingListings}</span>
            </div>
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
