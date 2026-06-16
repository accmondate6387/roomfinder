import { auth } from "@/features/auth/auth";
import { redirect } from "next/navigation";
import { OwnerService } from "@/features/owner/owner.service";
import { VerificationForm } from "@/components/forms/VerificationForm";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { ShieldCheck, Clock, XCircle } from "lucide-react";
import { format } from "date-fns";

export const metadata = {
  title: "Owner Verification - RoomFinder",
  description: "Verify your account to publish listings.",
};

export default async function OwnerVerificationPage() {
  const session = await auth();

  if (!session?.user) redirect("/login");
  if (session.user.role !== "owner") redirect("/");

  const verification = await OwnerService.getVerificationStatus(session.user.id);
  const isVerified = (session.user as any).isOwnerVerified; // This needs to match the user session type

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Owner Verification</h1>
        <p className="text-slate-500 mt-2">
          Verifying your account builds trust with students and allows you to publish your listings live on the platform.
        </p>
      </div>

      {isVerified ? (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-8 text-center space-y-4">
          <div className="mx-auto bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center">
            <ShieldCheck className="text-emerald-600 h-8 w-8" />
          </div>
          <h2 className="text-2xl font-bold text-emerald-900">You are a Verified Owner!</h2>
          <p className="text-emerald-700 max-w-md mx-auto">
            Your identity has been verified by our team. The "Verified Owner" badge is now displayed on all your property listings.
          </p>
        </div>
      ) : verification ? (
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">Verification Status</h2>
            <StatusBadge status={verification.status} />
          </div>
          
          <div className="p-6">
            {verification.status === "pending" && (
              <div className="text-center space-y-4 py-8">
                <div className="mx-auto bg-amber-50 w-16 h-16 rounded-full flex items-center justify-center">
                  <Clock className="text-amber-500 h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900">Verification Pending</h3>
                <p className="text-slate-500 max-w-md mx-auto">
                  We have received your documents and are currently reviewing them. This usually takes 24-48 hours.
                </p>
                <div className="mt-6 pt-6 border-t border-slate-100 text-sm text-slate-500 flex flex-col gap-2 items-center">
                  <p>Submitted on: {format(new Date(verification.createdAt), "PPP")}</p>
                  <p>ID Proof Type: <span className="uppercase">{verification.idProofType}</span></p>
                </div>
              </div>
            )}

            {verification.status === "rejected" && (
              <div className="space-y-6">
                <div className="bg-rose-50 border border-rose-200 rounded-lg p-6 flex gap-4 items-start">
                  <XCircle className="text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-rose-900 mb-1">Verification Rejected</h3>
                    <p className="text-rose-700 text-sm mb-3">
                      Unfortunately, we could not verify your identity based on the documents provided.
                    </p>
                    {verification.adminNote && (
                      <div className="bg-white/50 p-3 rounded border border-rose-200/50 text-sm text-rose-800">
                        <span className="font-medium block mb-1">Reason:</span>
                        {verification.adminNote}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="border-t border-slate-100 pt-6">
                  <h3 className="font-semibold text-slate-900 mb-4">Submit Again</h3>
                  <VerificationForm />
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
          <div className="p-6 border-b border-slate-100">
            <h2 className="text-lg font-bold text-slate-900">Submit Details</h2>
          </div>
          <div className="p-6">
            <VerificationForm />
          </div>
        </div>
      )}
    </div>
  );
}
