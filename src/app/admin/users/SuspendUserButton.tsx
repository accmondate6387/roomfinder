"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { toggleUserSuspensionAction } from "@/features/admin/admin.actions";
import { ShieldAlert, ShieldCheck } from "lucide-react";

export function SuspendUserButton({
  userId,
  currentStatus,
}: {
  userId: string;
  currentStatus: string;
}) {
  const [loading, setLoading] = useState(false);
  const isSuspended = currentStatus === "suspended";

  const handle = async () => {
    if (!isSuspended) {
      const reason = prompt("Reason for suspension:");
      if (!reason) return;
      setLoading(true);
      await toggleUserSuspensionAction(userId, "suspended", reason);
    } else {
      if (!confirm("Reinstate this user?")) return;
      setLoading(true);
      await toggleUserSuspensionAction(userId, "active");
    }
    setLoading(false);
  };

  return (
    <Button
      variant={isSuspended ? "outline" : "ghost"}
      size="sm"
      onClick={handle}
      disabled={loading}
      className={
        isSuspended
          ? "text-emerald-600 hover:bg-emerald-50 hover:border-emerald-200 rounded-xl font-extrabold"
          : "text-rose-500 hover:bg-rose-50 hover:text-rose-600 rounded-xl font-extrabold"
      }
    >
      {isSuspended ? (
        <><ShieldCheck className="w-3.5 h-3.5 mr-1" /> Reinstate</>
      ) : (
        <><ShieldAlert className="w-3.5 h-3.5 mr-1" /> Suspend</>
      )}
    </Button>
  );
}
