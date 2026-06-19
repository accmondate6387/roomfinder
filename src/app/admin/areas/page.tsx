import { auth } from "@/features/auth/auth";
import { redirect } from "next/navigation";
import { connectToDatabase } from "@/lib/db/connection";
import AreaInsight from "@/lib/db/models/AreaInsight";
import Property from "@/lib/db/models/Property";
import { Map, Sparkles, TrendingUp } from "lucide-react";

export const metadata = {
  title: "Area Insights - Admin",
};

export default async function AdminAreasPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  if (session.user.role !== "admin") redirect("/");

  await connectToDatabase();

  // Aggregate live stats per area
  const areaCounts = await Property.aggregate([
    { $match: { approvalStatus: "approved" } },
    { $group: { _id: "$area", count: { $sum: 1 }, avgRent: { $avg: "$price" } } },
    { $sort: { count: -1 } },
  ]);

  const insights = await AreaInsight.find().lean();
  const insightMap = Object.fromEntries(insights.map((i: any) => [i.slug, i]));

  const allAreas = [
    "civil-lines", "katra", "allahpur", "george-town", "jhusi",
    "tagore-town", "naini", "phaphamau", "kareli",
  ];

  const areaCountMap = Object.fromEntries(areaCounts.map((a) => [a._id, { count: a.count, avgRent: Math.round(a.avgRent) }]));

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-md">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900">Area Insights</h1>
        </div>
        <p className="text-slate-500 text-sm font-medium ml-[52px]">
          Overview of listings and average rents per area in Prayagraj.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {allAreas.map((slug) => {
          const data = areaCountMap[slug] || { count: 0, avgRent: 0 };
          const insight = insightMap[slug];
          return (
            <div key={slug} className="bg-white rounded-2xl border border-violet-100 p-5 shadow-sm hover:shadow-md hover:border-violet-200 transition-all">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-extrabold text-slate-900 capitalize">
                    {slug.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase())}
                  </p>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">Prayagraj</p>
                </div>
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-100 to-indigo-100 flex items-center justify-center shrink-0">
                  <Map className="w-4 h-4 text-violet-600" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                  <p className="text-xs text-slate-500 font-extrabold uppercase tracking-wider mb-1">Listings</p>
                  <p className="font-extrabold text-slate-900 text-lg">{data.count}</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                  <p className="text-xs text-slate-500 font-extrabold uppercase tracking-wider mb-1">Avg Rent</p>
                  <p className="font-extrabold text-slate-900 text-lg">
                    {data.avgRent > 0 ? `₹${data.avgRent.toLocaleString("en-IN")}` : "—"}
                  </p>
                </div>
              </div>
              {insight && (
                <div className="mt-3 flex items-center gap-3">
                  <div className="flex items-center gap-1 text-xs font-bold text-violet-600">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>Friendliness: {insight.studentFriendliness?.toFixed(1) || "—"}/5</span>
                  </div>
                  <div className="text-xs font-bold text-emerald-600">
                    Affordability: {insight.affordability?.toFixed(1) || "—"}/5
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
