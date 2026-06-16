import { connectToDatabase } from "@/lib/db/connection";
import OwnerVerification from "@/lib/db/models/OwnerVerification";
import { auth } from "@/features/auth/auth";
import { redirect } from "next/navigation";
import { format } from "date-fns";
import { OwnerVerificationButtons } from "./OwnerVerificationButtons";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

export const metadata = {
  title: "Owner Verifications - Admin",
  description: "Review owner verification requests.",
};

export default async function AdminOwnerVerificationsPage() {
  const session = await auth();

  if (!session?.user) redirect("/login");
  if (session.user.role !== "admin") redirect("/");

  await connectToDatabase();

  const verifications = await OwnerVerification.find({ status: "pending" })
    .populate("owner", "name email phone")
    .sort({ createdAt: 1 })
    .lean();

  const serializedVerifications = JSON.parse(JSON.stringify(verifications));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Owner Verifications</h1>
        <p className="text-slate-500 mt-1">Review identity and property proofs submitted by owners.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {serializedVerifications.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            No pending owner verifications to review.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50 text-slate-600 font-medium border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4">Owner</th>
                  <th className="px-6 py-4">Contact</th>
                  <th className="px-6 py-4">ID Proof</th>
                  <th className="px-6 py-4">Property Proof</th>
                  <th className="px-6 py-4">Submitted</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {serializedVerifications.map((req: any) => (
                  <tr key={req._id} className="hover:bg-slate-50/50">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-slate-900">{req.owner?.name}</p>
                      <p className="text-slate-500 text-xs">{req.owner?.email}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-slate-900">{req.phone}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="uppercase text-xs font-semibold bg-slate-100 px-2 py-1 rounded text-slate-700">
                          {req.idProofType}
                        </span>
                        <Link href={req.idProofUrl} target="_blank" className="text-primary hover:text-primary/80">
                          <ExternalLink size={16} />
                        </Link>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {req.propertyProofUrl ? (
                        <Link href={req.propertyProofUrl} target="_blank" className="text-primary hover:text-primary/80 flex items-center gap-1">
                          View <ExternalLink size={14} />
                        </Link>
                      ) : (
                        <span className="text-slate-400">None provided</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {format(new Date(req.createdAt), "MMM d, yyyy")}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <OwnerVerificationButtons verificationId={req._id} />
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
