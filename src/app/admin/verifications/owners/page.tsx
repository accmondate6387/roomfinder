import { connectToDatabase } from "@/lib/db/connection";
import OwnerVerification from "@/lib/db/models/OwnerVerification";
import { auth } from "@/features/auth/auth";
import { redirect } from "next/navigation";
import { format } from "date-fns";
import { OwnerVerificationButtons } from "./OwnerVerificationButtons";
import Link from "next/link";
import { ExternalLink, UserCheck, Clock, Sparkles } from "lucide-react";

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
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-md">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900">Owner Verifications</h1>
          </div>
          <p className="text-slate-500 text-sm font-medium ml-[52px]">Review identity and property proofs submitted by owners.</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-violet-50 to-indigo-50 text-violet-700 text-sm font-bold rounded-xl border border-violet-200">
          <Clock className="w-4 h-4" />
          {serializedVerifications.length} pending
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-violet-100 overflow-hidden shadow-md shadow-violet-50">
        {serializedVerifications.length === 0 ? (
          <div className="py-16 text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center mx-auto mb-4">
              <UserCheck className="w-8 h-8 text-emerald-500" />
            </div>
            <p className="text-slate-500 font-bold">No pending verifications to review.</p>
            <p className="text-sm text-slate-400 mt-1 font-medium">All owners have been verified.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-violet-100 bg-gradient-to-r from-violet-50/50 to-indigo-50/50">
                  <th className="px-6 py-4 text-xs font-extrabold text-slate-500 uppercase tracking-wider">Owner</th>
                  <th className="px-6 py-4 text-xs font-extrabold text-slate-500 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-4 text-xs font-extrabold text-slate-500 uppercase tracking-wider">ID Proof</th>
                  <th className="px-6 py-4 text-xs font-extrabold text-slate-500 uppercase tracking-wider">Property Proof</th>
                  <th className="px-6 py-4 text-xs font-extrabold text-slate-500 uppercase tracking-wider">Submitted</th>
                  <th className="px-6 py-4 text-xs font-extrabold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-violet-50">
                {serializedVerifications.map((req: any) => (
                  <tr key={req._id} className="hover:bg-violet-50/30 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-extrabold text-slate-900">{req.owner?.name}</p>
                      <p className="text-slate-500 text-xs font-medium">{req.owner?.email}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-slate-900 font-bold">{req.phone}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-extrabold bg-slate-100 px-2.5 py-1 rounded-xl text-slate-700 uppercase tracking-wider">
                          {req.idProofType}
                        </span>
                        <Link href={req.idProofUrl} target="_blank" className="text-violet-600 hover:text-violet-700 transition-colors">
                          <ExternalLink size={16} />
                        </Link>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {req.propertyProofUrl ? (
                        <Link href={req.propertyProofUrl} target="_blank" className="text-violet-600 hover:text-violet-700 transition-colors flex items-center gap-1 text-sm font-bold">
                          <ExternalLink size={14} /> View
                        </Link>
                      ) : (
                        <span className="text-slate-400 text-sm font-medium">Not provided</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-slate-600 text-sm font-medium whitespace-nowrap">
                      {format(new Date(req.createdAt), "MMM d, yyyy")}
                    </td>
                    <td className="px-6 py-4 text-right whitespace-nowrap">
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
