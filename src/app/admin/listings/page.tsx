import { connectToDatabase } from "@/lib/db/connection";
import Property from "@/lib/db/models/Property";
import { auth } from "@/features/auth/auth";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { format } from "date-fns";
import { approvePropertyAction, rejectPropertyAction } from "@/features/admin/admin.actions";
import { AdminApproveRejectButtons } from "./AdminApproveRejectButtons";
import { Home, Clock, ExternalLink, Sparkles } from "lucide-react";

export const metadata = {
  title: "Listing Approvals - Admin",
  description: "Review and approve property listings.",
};

export default async function AdminListingsPage() {
  const session = await auth();

  if (!session?.user) redirect("/login");
  if (session.user.role !== "admin") redirect("/");

  await connectToDatabase();

  const properties = await Property.find({ approvalStatus: "pending" })
    .populate("owner", "name email phone")
    .sort({ createdAt: -1 })
    .lean();

  const serializedProperties = JSON.parse(JSON.stringify(properties));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-md">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900">Listing Approvals</h1>
          </div>
          <p className="text-slate-500 text-sm font-medium ml-[52px]">Review properties submitted by owners before they go live.</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-amber-50 to-orange-50 text-amber-700 text-sm font-bold rounded-xl border border-amber-200">
          <Clock className="w-4 h-4" />
          {serializedProperties.length} pending
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-violet-100 overflow-hidden shadow-md shadow-violet-50">
        {serializedProperties.length === 0 ? (
          <div className="py-16 text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center mx-auto mb-4">
              <Home className="w-8 h-8 text-emerald-500" />
            </div>
            <p className="text-slate-500 font-bold">No pending properties to review.</p>
            <p className="text-sm text-slate-400 mt-1 font-medium">All properties have been reviewed.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-violet-100 bg-gradient-to-r from-violet-50/50 to-indigo-50/50">
                  <th className="px-6 py-4 text-xs font-extrabold text-slate-500 uppercase tracking-wider">Property</th>
                  <th className="px-6 py-4 text-xs font-extrabold text-slate-500 uppercase tracking-wider">Owner</th>
                  <th className="px-6 py-4 text-xs font-extrabold text-slate-500 uppercase tracking-wider">Submitted</th>
                  <th className="px-6 py-4 text-xs font-extrabold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-violet-50">
                {serializedProperties.map((property: any) => (
                  <tr key={property._id} className="hover:bg-violet-50/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-14 w-20 bg-slate-100 rounded-xl overflow-hidden shrink-0 border border-slate-200">
                          {property.photos?.[0]?.url && (
                            <img src={property.photos[0].url} alt="" className="w-full h-full object-cover" />
                          )}
                        </div>
                        <div>
                          <p className="font-extrabold text-slate-900">{property.title}</p>
                          <p className="text-slate-500 text-xs mt-0.5 font-medium">
                            <span className="uppercase font-bold">{property.propertyType}</span> &middot; {property.area.replace(/-/g, ' ')}
                          </p>
                          <p className="text-violet-600 font-extrabold text-xs mt-1">
                            ₹{Number(property.price).toLocaleString('en-IN')}/mo
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-slate-900">{property.owner?.name}</p>
                      <p className="text-slate-500 text-xs font-medium">{property.owner?.email}</p>
                    </td>
                    <td className="px-6 py-4 text-slate-600 text-sm font-medium">
                      {format(new Date(property.createdAt), "MMM d, yyyy")}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Link href={`/properties/${property.slug}`} target="_blank">
                          <Button variant="ghost" size="sm" className="gap-1.5 font-bold text-violet-700">
                            <ExternalLink className="w-3.5 h-3.5" /> Preview
                          </Button>
                        </Link>
                        <AdminApproveRejectButtons propertyId={property._id} />
                      </div>
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
