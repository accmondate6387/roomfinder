import { auth } from "@/features/auth/auth";
import { redirect } from "next/navigation";
import { connectToDatabase } from "@/lib/db/connection";
import Review from "@/lib/db/models/Review";
import User from "@/lib/db/models/User";
import Property from "@/lib/db/models/Property";
import { format } from "date-fns";
import Link from "next/link";
import { Star, Sparkles, ExternalLink } from "lucide-react";
import { ReviewModerationButtons } from "./ReviewModerationButtons";

export const metadata = {
  title: "Review Moderation - Admin",
};

export default async function AdminReviewsPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  if (session.user.role !== "admin") redirect("/");

  await connectToDatabase();

  const reviews = await Review.find()
    .populate("user", "name email")
    .populate("property", "title slug")
    .sort({ createdAt: -1 })
    .limit(100)
    .lean();

  const serialized = JSON.parse(JSON.stringify(reviews));

  const statusStyles: Record<string, string> = {
    active: "bg-emerald-50 text-emerald-700 border-emerald-200",
    flagged: "bg-amber-50 text-amber-700 border-amber-200",
    removed: "bg-rose-50 text-rose-700 border-rose-200",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-md">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900">Review Moderation</h1>
          </div>
          <p className="text-slate-500 text-sm font-medium ml-[52px]">
            Monitor and moderate property reviews submitted by students.
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-violet-50 text-violet-700 text-sm font-bold rounded-xl border border-violet-200">
          <Star className="w-4 h-4" />
          {serialized.length} reviews
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-violet-100 overflow-hidden shadow-md shadow-violet-50">
        {serialized.length === 0 ? (
          <div className="py-16 text-center">
            <Star className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 font-bold">No reviews yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-violet-100 bg-gradient-to-r from-violet-50/50 to-indigo-50/50">
                  <th className="px-6 py-4 text-xs font-extrabold text-slate-500 uppercase tracking-wider">Property</th>
                  <th className="px-6 py-4 text-xs font-extrabold text-slate-500 uppercase tracking-wider">Reviewer</th>
                  <th className="px-6 py-4 text-xs font-extrabold text-slate-500 uppercase tracking-wider">Rating</th>
                  <th className="px-6 py-4 text-xs font-extrabold text-slate-500 uppercase tracking-wider">Comment</th>
                  <th className="px-6 py-4 text-xs font-extrabold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-extrabold text-slate-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-xs font-extrabold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-violet-50">
                {serialized.map((review: any) => (
                  <tr key={review._id} className="hover:bg-violet-50/30 transition-colors">
                    <td className="px-6 py-4">
                      {review.property ? (
                        <Link href={`/properties/${review.property.slug}`} target="_blank"
                          className="font-bold text-violet-600 hover:underline flex items-center gap-1 max-w-[160px] truncate">
                          {review.property.title} <ExternalLink className="w-3 h-3 shrink-0" />
                        </Link>
                      ) : <span className="text-slate-400 text-xs">Deleted</span>}
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-slate-900">{review.user?.name}</p>
                      <p className="text-xs text-slate-500">{review.user?.email}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        <span className="font-extrabold text-slate-900">{review.ratings?.overall}</span>
                        <span className="text-xs text-slate-400">/5</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 max-w-[200px]">
                      <p className="truncate text-slate-600 font-medium text-xs" title={review.comment}>
                        {review.comment}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-extrabold px-2.5 py-1 rounded-xl border capitalize ${statusStyles[review.status] || ""}`}>
                        {review.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500 text-xs font-medium whitespace-nowrap">
                      {format(new Date(review.createdAt), "MMM d, yyyy")}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <ReviewModerationButtons reviewId={review._id} currentStatus={review.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
