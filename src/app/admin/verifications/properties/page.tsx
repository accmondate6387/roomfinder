import { auth } from "@/features/auth/auth";
import { redirect } from "next/navigation";
import { connectToDatabase } from "@/lib/db/connection";
import Property from "@/lib/db/models/Property";
import User from "@/lib/db/models/User";
import { format } from "date-fns";
import Link from "next/link";
import { ShieldCheck, Clock, Sparkles, ExternalLink } from "lucide-react";
import { AdminApproveRejectButtons } from "@/app/admin/listings/AdminApproveRejectButtons";

export const metadata = {
  title: "Property Verifications - Admin",
};

export default async function AdminPropertyVerificationsPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  if (session.user.role !== "admin") redirect("/");

  await connectToDatabase();

  // Show all non-pending (already processed) properties for review
  const properties = await Property.find({ approvalStatus: { $in: ["approved", "rejected"] } })
    .populate("owner", "name email")
    .sort({ updatedAt: -1 })
    .limit(50)
    .lean();

  const serialized = JSON.parse(JSON.stringify(properties));

  const statusStyles: Record<string, string> = {
    approved: "bg-emerald-50 text-emerald-700 border-emerald-200",
    rejected: "bg-rose-50 text-rose-700 border-rose-200",
    pending: "bg-amber-50 text-amber-700 border-amber-200",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-md">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900">Property Verifications</h1>
          </div>
          <p className="text-slate-500 text-sm font-medium ml-[52px]">
            Review status of all approved and rejected property listings.
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-violet-50 text-violet-700 text-sm font-bold rounded-xl border border-violet-200">
          <ShieldCheck className="w-4 h-4" />
          {serialized.length} listings
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-violet-100 overflow-hidden shadow-md shadow-violet-50">
        {serialized.length === 0 ? (
          <div className="py-16 text-center">
            <ShieldCheck className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 font-bold">No processed properties yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-violet-100 bg-gradient-to-r from-violet-50/50 to-indigo-50/50">
                  <th className="px-6 py-4 text-xs font-extrabold text-slate-500 uppercase tracking-wider">Property</th>
                  <th className="px-6 py-4 text-xs font-extrabold text-slate-500 uppercase tracking-wider">Owner</th>
                  <th className="px-6 py-4 text-xs font-extrabold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-extrabold text-slate-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-xs font-extrabold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-violet-50">
                {serialized.map((p: any) => (
                  <tr key={p._id} className="hover:bg-violet-50/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <p className="font-extrabold text-slate-900 max-w-[180px] truncate">{p.title}</p>
                        <Link href={`/properties/${p.slug}`} target="_blank" className="text-violet-400 hover:text-violet-600 shrink-0">
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                      <p className="text-xs text-slate-500 font-medium mt-0.5">{p.area?.replace(/-/g, " ")} · {p.propertyType}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-slate-900">{p.owner?.name}</p>
                      <p className="text-xs text-slate-500">{p.owner?.email}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-extrabold px-2.5 py-1 rounded-xl border capitalize ${statusStyles[p.approvalStatus] || ""}`}>
                        {p.approvalStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500 text-sm font-medium whitespace-nowrap">
                      {format(new Date(p.updatedAt), "MMM d, yyyy")}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <AdminApproveRejectButtons propertyId={p._id} />
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
