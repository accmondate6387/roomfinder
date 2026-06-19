import { auth } from "@/features/auth/auth";
import { redirect } from "next/navigation";
import { connectToDatabase } from "@/lib/db/connection";
import OwnerVerification from "@/lib/db/models/OwnerVerification";
import { VerificationForm } from "@/components/forms/VerificationForm";
import { Shield, ShieldCheck, ShieldAlert, Clock, Sparkles } from "lucide-react";

export const metadata = {
  title: "Verification - Owner Dashboard",
  description: "Verify your identity as a property owner.",
};

export default async function VerificationPage() {
  const session = await auth();

  if (!session?.user) redirect("/login");
  if (session.user.role !== "owner") redirect("/");

  await connectToDatabase();

  const existingVerification = await OwnerVerification.findOne({
    owner: session.user.id,
  }).lean();

  const serializedVerification = existingVerification ? JSON.parse(JSON.stringify(existingVerification)) : null;

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-md">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900">Owner Verification</h1>
        </div>
        <p className="text-slate-500 text-sm font-medium ml-[52px]">Verify your identity to build trust with students.</p>
      </div>

      <div className="bg-white rounded-3xl border border-violet-100 p-6 shadow-md shadow-violet-50">
        {!serializedVerification && (
          <div className="space-y-6">
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shrink-0 shadow-md">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-extrabold text-blue-900 text-sm">Why verify?</p>
                <p className="text-sm text-blue-700 mt-0.5 font-medium">
                  Verified owners get a badge, higher search ranking, and increased trust from students.
                </p>
              </div>
            </div>
            <VerificationForm />
          </div>
        )}

        {serializedVerification?.status === "pending" && (
          <div className="text-center py-10">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center mx-auto mb-5">
              <Clock className="w-10 h-10 text-amber-500" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 mb-2">Verification in Progress</h3>
            <p className="text-slate-500 max-w-md mx-auto font-medium">
              Your documents are being reviewed by our team. This usually takes 24-48 hours.
            </p>
          </div>
        )}

        {serializedVerification?.status === "approved" && (
          <div className="text-center py-10">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center mx-auto mb-5">
              <ShieldCheck className="w-10 h-10 text-emerald-500" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900 mb-2">You&apos;re Verified!</h3>
            <p className="text-slate-500 max-w-md mx-auto font-medium">
              Your identity has been verified. Students can see your verified badge on listings.
            </p>
          </div>
        )}

        {serializedVerification?.status === "rejected" && (
          <div className="space-y-6">
            <div className="text-center py-6">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-rose-100 to-pink-100 flex items-center justify-center mx-auto mb-5">
                <ShieldAlert className="w-10 h-10 text-rose-500" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 mb-2">Verification Rejected</h3>
              {serializedVerification.adminNote && (
                <p className="text-slate-500 max-w-md mx-auto bg-rose-50 border border-rose-200 rounded-2xl p-4 mt-4 text-sm font-medium">
                  <span className="font-extrabold text-rose-700">Reason: </span>
                  {serializedVerification.adminNote}
                </p>
              )}
            </div>
            <div className="border-t border-violet-100 pt-6">
              <p className="text-sm font-bold text-slate-700 mb-4">Submit a new verification request with corrected documents:</p>
              <VerificationForm />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
