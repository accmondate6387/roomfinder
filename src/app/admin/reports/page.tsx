import { auth } from "@/features/auth/auth";
import { redirect } from "next/navigation";
import { ReportsService } from "@/features/reports/reports.service";
import { format } from "date-fns";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
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
      <div>
        <h1 className="text-3xl font-bold text-slate-900">User Reports</h1>
        <p className="text-slate-500 mt-1">Review properties reported by students for policy violations.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {serializedReports.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            No pending reports to review.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-slate-50 text-slate-600 font-medium border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4">Property</th>
                  <th className="px-6 py-4">Reporter</th>
                  <th className="px-6 py-4">Reason</th>
                  <th className="px-6 py-4">Description</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {serializedReports.map((report: any) => (
                  <tr key={report._id} className="hover:bg-slate-50/50">
                    <td className="px-6 py-4">
                      {report.property ? (
                        <Link 
                          href={`/properties/${report.property.slug}`} 
                          target="_blank"
                          className="font-medium text-primary hover:underline flex items-center gap-1"
                        >
                          {report.property.title} <ExternalLink size={14} />
                        </Link>
                      ) : (
                        <span className="text-slate-400">Property Deleted</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-slate-900">{report.reporter?.name}</p>
                      <p className="text-slate-500 text-xs">{report.reporter?.email}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="uppercase text-xs font-semibold bg-rose-50 px-2 py-1 rounded text-rose-700">
                        {report.reason}
                      </span>
                    </td>
                    <td className="px-6 py-4 max-w-[200px] truncate" title={report.description}>
                      {report.description}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {format(new Date(report.createdAt), "MMM d, yyyy")}
                    </td>
                    <td className="px-6 py-4 text-right">
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
