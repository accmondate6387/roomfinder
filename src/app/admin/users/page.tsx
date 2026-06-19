import { auth } from "@/features/auth/auth";
import { redirect } from "next/navigation";
import { connectToDatabase } from "@/lib/db/connection";
import User from "@/lib/db/models/User";
import { format } from "date-fns";
import { Users, Sparkles, ShieldCheck, GraduationCap, Building2, ShieldAlert } from "lucide-react";
import { SuspendUserButton } from "./SuspendUserButton";

export const metadata = {
  title: "Manage Users - Admin",
};

export default async function AdminUsersPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  if (session.user.role !== "admin") redirect("/");

  await connectToDatabase();
  const users = await User.find({ role: { $ne: "admin" } })
    .sort({ createdAt: -1 })
    .lean();
  const serialized = JSON.parse(JSON.stringify(users));

  const roleColors: Record<string, string> = {
    student: "bg-blue-50 text-blue-700 border-blue-200",
    owner: "bg-amber-50 text-amber-700 border-amber-200",
  };
  const roleIcons: Record<string, any> = {
    student: GraduationCap,
    owner: Building2,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-md">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900">Manage Users</h1>
          </div>
          <p className="text-slate-500 text-sm font-medium ml-[52px]">
            View and manage all registered students and owners.
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-violet-50 text-violet-700 text-sm font-bold rounded-xl border border-violet-200">
          <Users className="w-4 h-4" />
          {serialized.length} users
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-violet-100 overflow-hidden shadow-md shadow-violet-50">
        {serialized.length === 0 ? (
          <div className="py-16 text-center">
            <Users className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 font-bold">No users found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-violet-100 bg-gradient-to-r from-violet-50/50 to-indigo-50/50">
                  <th className="px-6 py-4 text-xs font-extrabold text-slate-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-4 text-xs font-extrabold text-slate-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-4 text-xs font-extrabold text-slate-500 uppercase tracking-wider">Provider</th>
                  <th className="px-6 py-4 text-xs font-extrabold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-xs font-extrabold text-slate-500 uppercase tracking-wider">Joined</th>
                  <th className="px-6 py-4 text-xs font-extrabold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-violet-50">
                {serialized.map((user: any) => {
                  const RoleIcon = roleIcons[user.role] || Users;
                  return (
                    <tr key={user._id} className="hover:bg-violet-50/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-100 to-indigo-100 flex items-center justify-center text-violet-700 font-extrabold text-sm shrink-0">
                            {user.name?.[0]?.toUpperCase() || "?"}
                          </div>
                          <div>
                            <p className="font-extrabold text-slate-900">{user.name}</p>
                            <p className="text-slate-500 text-xs font-medium">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-extrabold px-2.5 py-1 rounded-xl border ${roleColors[user.role] || "bg-slate-50 text-slate-600 border-slate-200"}`}>
                          <RoleIcon className="w-3 h-3" />
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-xl uppercase tracking-wider">
                          {user.provider}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {user.status === "suspended" ? (
                          <span className="inline-flex items-center gap-1.5 text-xs font-extrabold px-2.5 py-1 rounded-xl bg-rose-50 text-rose-700 border border-rose-200">
                            <ShieldAlert className="w-3 h-3" /> Suspended
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-xs font-extrabold px-2.5 py-1 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <ShieldCheck className="w-3 h-3" /> Active
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-slate-500 text-sm font-medium whitespace-nowrap">
                        {format(new Date(user.createdAt), "MMM d, yyyy")}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <SuspendUserButton userId={user._id} currentStatus={user.status} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
