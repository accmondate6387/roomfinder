import { auth } from "@/features/auth/auth";
import { redirect } from "next/navigation";
import { AnalyticsService } from "@/features/analytics/analytics.service";
import { Eye, Heart, MessageCircle, TrendingUp, BarChart3, Sparkles } from "lucide-react";

export const metadata = {
  title: "Analytics - Owner Dashboard",
  description: "View your property analytics.",
};

export default async function AnalyticsPage() {
  const session = await auth();

  if (!session?.user) redirect("/login");
  if (session.user.role !== "owner") redirect("/");

  const stats = await AnalyticsService.getOwnerAnalyticsSummary(session.user.id);

  const cards = [
    { title: "Total Views", value: stats.totalViews, icon: Eye, color: "from-blue-500 to-cyan-600", change: "+12%", changeType: "up" },
    { title: "Favorites", value: stats.totalFavorites, icon: Heart, color: "from-rose-500 to-pink-600", change: "+8%", changeType: "up" },
    { title: "Inquiries", value: stats.totalContacts, icon: MessageCircle, color: "from-amber-500 to-orange-600", change: "+5%", changeType: "up" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-md">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900">Analytics</h1>
        </div>
        <p className="text-slate-500 text-sm font-medium ml-[52px]">Track your property performance.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.title} className="bg-white rounded-2xl border border-slate-200 p-5 transition-all hover:shadow-lg hover:shadow-violet-100 hover:border-violet-200 hover:-translate-y-0.5">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center shadow-md`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className={`text-xs font-extrabold px-2 py-1 rounded-xl ${
                  card.changeType === "up" ? "bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 border border-emerald-200" : "bg-red-50 text-red-600"
                }`}>
                  {card.change}
                </span>
              </div>
              <p className="text-2xl font-extrabold text-slate-900">{valueOrZero(card.value)}</p>
              <p className="text-sm font-bold text-slate-500 mt-1">{card.title}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-3xl border border-violet-100 p-8 text-center shadow-md shadow-violet-50">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center mx-auto mb-4">
          <BarChart3 className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="text-lg font-extrabold text-slate-900 mb-1">Detailed Analytics</h3>
        <p className="text-sm text-slate-500 max-w-sm mx-auto font-medium">
          Detailed charts and trends will be available soon. Track views, favorites, and inquiries over time.
        </p>
      </div>
    </div>
  );
}

function valueOrZero(v: number | string): string {
  if (typeof v === 'number') return v.toString();
  return v || '0';
}
