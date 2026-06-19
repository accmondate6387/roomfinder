import { auth } from "@/features/auth/auth";
import { redirect } from "next/navigation";
import { AnalyticsService } from "@/features/analytics/analytics.service";
import { Home, Eye, Heart, MessageCircle, TrendingUp, Plus, List, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const metadata = {
  title: "Owner Dashboard - RoomFinder",
  description: "Manage your properties and view analytics.",
};

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) redirect("/login");
  if (session.user.role !== "owner") redirect("/");

  const stats = await AnalyticsService.getOwnerAnalyticsSummary(session.user.id);

  const statCards = [
    { title: "Total Listings", value: stats.totalListings, icon: Home, color: "from-violet-500 to-indigo-600", bgColor: "bg-violet-50", textColor: "text-violet-600" },
    { title: "Total Views", value: stats.totalViews, icon: Eye, color: "from-emerald-500 to-teal-600", bgColor: "bg-emerald-50", textColor: "text-emerald-600" },
    { title: "Favorites", value: stats.totalFavorites, icon: Heart, color: "from-rose-500 to-pink-600", bgColor: "bg-rose-50", textColor: "text-rose-600" },
    { title: "Inquiries", value: stats.totalContacts, icon: MessageCircle, color: "from-amber-500 to-orange-600", bgColor: "bg-amber-50", textColor: "text-amber-600" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-md">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900">Dashboard Overview</h1>
          </div>
          <p className="text-slate-500 text-sm font-medium ml-[52px]">Welcome back, {session.user.name}</p>
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
            <div className="w-2 h-2 rounded-full bg-violet-600" />
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/dashboard/listings/new"
              className="flex flex-col items-center justify-center gap-3 p-6 rounded-2xl bg-gradient-to-br from-violet-50 to-indigo-50 border border-violet-100 hover:from-violet-100 hover:to-indigo-100 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all">
                <Plus className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-extrabold text-violet-700">Add Listing</span>
            </Link>
            <Link
              href="/dashboard/listings"
              className="flex flex-col items-center justify-center gap-3 p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:bg-violet-50 hover:border-violet-200 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-400 to-slate-500 flex items-center justify-center shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all">
                <List className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-extrabold text-slate-700">Manage</span>
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-violet-100 p-6 shadow-md shadow-violet-50">
          <h2 className="text-lg font-extrabold text-slate-900 mb-5 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            Listing Status
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-lg shadow-emerald-300" />
                <span className="font-bold text-slate-700 text-sm">Approved (Live)</span>
              </div>
              <span className="font-extrabold text-emerald-700">{valueOrZero(stats.approvedListings)}</span>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-amber-500 shadow-lg shadow-amber-300" />
                <span className="font-bold text-slate-700 text-sm">Pending Approval</span>
              </div>
              <span className="font-extrabold text-amber-700">{valueOrZero(stats.pendingListings)}</span>
            </div>
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
