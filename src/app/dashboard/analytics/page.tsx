import { auth } from "@/features/auth/auth";
import { redirect } from "next/navigation";
import { AnalyticsService } from "@/features/analytics/analytics.service";
import { BarChart3, LineChart } from "lucide-react";

export const metadata = {
  title: "Analytics - Owner Dashboard",
  description: "View analytics for your properties.",
};

export default async function OwnerAnalyticsPage() {
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
        <h1 className="text-3xl font-bold text-slate-900">Analytics</h1>
        <p className="text-slate-500 mt-1">Track the performance of your property listings.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-900">Total Views</h3>
            <BarChart3 className="text-slate-400" size={20} />
          </div>
          <p className="text-3xl font-bold text-emerald-600">{stats.totalViews}</p>
          <p className="text-sm text-slate-500 mt-2">Across all {stats.totalListings} listings</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-900">Total Favorites</h3>
            <LineChart className="text-slate-400" size={20} />
          </div>
          <p className="text-3xl font-bold text-rose-600">{stats.totalFavorites}</p>
          <p className="text-sm text-slate-500 mt-2">Times students saved your properties</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-900">Contact Clicks</h3>
            <LineChart className="text-slate-400" size={20} />
          </div>
          <p className="text-3xl font-bold text-amber-600">{stats.totalContacts}</p>
          <p className="text-sm text-slate-500 mt-2">WhatsApp or call button clicks</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 text-center mt-8">
        <h3 className="text-lg font-medium text-slate-900 mb-2">Detailed Charts Coming Soon</h3>
        <p className="text-slate-500 max-w-md mx-auto">
          We are working on bringing you detailed time-series charts so you can see how your properties perform day by day.
        </p>
      </div>
    </div>
  );
}
