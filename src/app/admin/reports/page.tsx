import { auth } from "@/features/auth/auth";
import { redirect } from "next/navigation";
import { ReportsService } from "@/features/reports/reports.service";
import { format } from "date-fns";
import Link from "next/link";
import { ExternalLink, Flag, Clock, Sparkles } from "lucide-react";
import { ReportActionButtons } from "./ReportActionButtons";

export const metadata = {
  title: "Report Review - Admin",
  description: "Review property reports submitted by users.",
};

export default async function AdminReportsPage() {
  const session = await auth();

  if (!session?.user) redirect("/login");
  if (session.user.role !== "admin") redirect("/");

  const pendingReports = await ReportsService.getPendingReports();
  const serializedReports = JSON.parse(JSON.stringify(pendingReports));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-md">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900">User Reports</h1>
          </div>
          <p className="text-slate-500 text-sm font-medium ml-[52px]">Review properties reported by students for policy violations.</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-rose-50 to-pink-50 text-rose-700 text-sm font-bold rounded-xl border border-rose-200">
          <Clock className="w-4 h-4" />
          {serializedReports.length} pending
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-violet-100 overflow-hidden shadow-md shadow-violet-50">
        {serializedReports.length === 0 ? (
          <div className="py-16 text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center mx-auto mb-4">
              <Flag className="w-8 h-8 text-emerald-500" />
            </div>
            <p className="text-slate-500 font-bold">No pending reports to review.</p>
            <p className="text-sm text-slate-400 mt-1 font-medium">All reports have been handled.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-violet-100 bg-gradient-to-r from-violet-50/50 to-indigo-50/50">
                  <th className="px-6 py-4 text-xs font-extrabold text-slate-500 uppercase tracking-wider">Property</th>
                  <th className="px-6 py-4 text-xs font-extrabold text-slate-500 uppercase tracking-wider">Reporter</th>
                  <th className="px-6 py-4 text-xs font-extrabold text-slate-500 uppercase tracking-wider">Reason</th>
                  <th className="px-6 py-4 text-xs font-extrabold text-slate-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-4 text-xs font-extrabold text-slate-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-xs font-extrabold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-violet-50">
                {serializedReports.map((report: any) => (
                  <tr key={report._id} className="hover:bg-violet-50/30 transition-colors">
                    <td className="px-6 py-4">
                      {report.property ? (
                        <Link
                          href={`/properties/${report.property.slug}`}
                          target="_blank"
                          className="font-bold text-violet-600 hover:underline flex items-center gap-1"
                        >
                          {report.property.title} <ExternalLink size={14} />
                        </Link>
                      ) : (
                        <span className="text-slate-400 font-medium">Property Deleted</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-slate-900">{report.reporter?.name}</p>
                      <p className="text-slate-500 text-xs font-medium">{report.reporter?.email}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-extrabold bg-gradient-to-r from-rose-50 to-pink-50 px-2.5 py-1 rounded-xl text-rose-700 uppercase tracking-wider border border-rose-200">
                        {report.reason}
                      </span>
                    </td>
                    <td className="px-6 py-4 max-w-[200px]">
                      <p className="truncate text-slate-600 font-medium" title={report.description}>
                        {report.description}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-slate-600 text-sm font-medium whitespace-nowrap">
                      {format(new Date(report.createdAt), "MMM d, yyyy")}
                    </td>
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <div className="flex justify-end gap-2">
                        <ReportActionButtons reportId={report._id} />
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
