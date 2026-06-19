import { auth } from "@/features/auth/auth";
import { redirect } from "next/navigation";
import { connectToDatabase } from "@/lib/db/connection";
import CoachingCenter from "@/lib/db/models/CoachingCenter";
import { GraduationCap, Sparkles, MapPin } from "lucide-react";
import { AddCoachingCenterForm } from "./AddCoachingCenterForm";
import { ToggleCoachingCenterButton } from "./ToggleCoachingCenterButton";

export const metadata = {
  title: "Coaching Centers - Admin",
};

const CATEGORY_COLORS: Record<string, string> = {
  upsc: "bg-violet-50 text-violet-700 border-violet-200",
  pcs: "bg-blue-50 text-blue-700 border-blue-200",
  ssc: "bg-cyan-50 text-cyan-700 border-cyan-200",
  jee: "bg-amber-50 text-amber-700 border-amber-200",
  neet: "bg-emerald-50 text-emerald-700 border-emerald-200",
  other: "bg-slate-50 text-slate-600 border-slate-200",
};

export default async function AdminCoachingCentersPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  if (session.user.role !== "admin") redirect("/");

  await connectToDatabase();
  const centers = await CoachingCenter.find().sort({ createdAt: -1 }).lean();
  const serialized = JSON.parse(JSON.stringify(centers));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-md">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900">Coaching Centers</h1>
          </div>
          <p className="text-slate-500 text-sm font-medium ml-[52px]">
            Manage coaching centers used for proximity search.
          </p>
        </div>
      </div>

      {/* Add form */}
      <div className="bg-white rounded-3xl border border-violet-100 p-6 shadow-md shadow-violet-50">
        <h2 className="text-base font-extrabold text-slate-900 mb-4 flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-violet-500" /> Add New Center
        </h2>
        <AddCoachingCenterForm />
      </div>

      {/* List */}
      <div className="bg-white rounded-3xl border border-violet-100 overflow-hidden shadow-md shadow-violet-50">
        <div className="px-6 py-4 border-b border-violet-100 bg-gradient-to-r from-violet-50/50 to-indigo-50/50">
          <p className="text-sm font-extrabold text-slate-700">{serialized.length} coaching centers</p>
        </div>
        {serialized.length === 0 ? (
          <div className="py-16 text-center">
            <GraduationCap className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 font-bold">No coaching centers added yet.</p>
          </div>
        ) : (
          <div className="divide-y divide-violet-50">
            {serialized.map((c: any) => (
              <div key={c._id} className="flex items-center justify-between px-6 py-4 hover:bg-violet-50/30 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-100 to-indigo-100 flex items-center justify-center shrink-0">
                    <GraduationCap className="w-5 h-5 text-violet-600" />
                  </div>
                  <div>
                    <p className="font-extrabold text-slate-900">{c.name}</p>
                    <p className="text-xs text-slate-500 font-medium flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3" /> {c.address}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-extrabold px-2.5 py-1 rounded-xl border uppercase tracking-wider ${CATEGORY_COLORS[c.category] || CATEGORY_COLORS.other}`}>
                    {c.category}
                  </span>
                  <ToggleCoachingCenterButton centerId={c._id} isActive={c.isActive} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
