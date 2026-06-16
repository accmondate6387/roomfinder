import { connectToDatabase } from "@/lib/db/connection";
import Property from "@/lib/db/models/Property";
import { auth } from "@/features/auth/auth";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { format } from "date-fns";
import { approvePropertyAction, rejectPropertyAction } from "@/features/admin/admin.actions";
import { AdminApproveRejectButtons } from "./AdminApproveRejectButtons";

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
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Listing Approvals</h1>
        <p className="text-slate-500 mt-1">Review properties submitted by owners before they go live.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {serializedProperties.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            No pending properties to review.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50 text-slate-600 font-medium border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4">Property</th>
                  <th className="px-6 py-4">Owner</th>
                  <th className="px-6 py-4">Submitted</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {serializedProperties.map((property: any) => (
                  <tr key={property._id} className="hover:bg-slate-50/50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-16 bg-slate-100 rounded overflow-hidden shrink-0">
                          {property.photos?.[0]?.url && (
                            <img src={property.photos[0].url} alt="" className="w-full h-full object-cover" />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900">{property.title}</p>
                          <p className="text-slate-500 text-xs">
                            {property.propertyType.toUpperCase()} in {property.area}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-slate-900">{property.owner?.name}</p>
                      <p className="text-slate-500 text-xs">{property.owner?.email}</p>
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {format(new Date(property.createdAt), "MMM d, yyyy")}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Link href={`/properties/${property.slug}`} target="_blank">
                          <Button variant="outline" size="sm">Preview</Button>
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
