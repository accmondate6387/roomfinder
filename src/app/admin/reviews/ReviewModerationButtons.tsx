"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { moderateReviewAction } from "@/features/admin/admin.actions";
import { ShieldAlert, ShieldCheck, Trash2 } from "lucide-react";

export function ReviewModerationButtons({
  reviewId,
  currentStatus,
}: {
  reviewId: string;
  currentStatus: string;
}) {
  const [loading, setLoading] = useState(false);

  const handle = async (action: "flag" | "remove" | "restore") => {
    setLoading(true);
    await moderateReviewAction(reviewId, action);
    setLoading(false);
  };

  if (currentStatus === "removed") {
    return (
      <Button variant="outline" size="sm" disabled={loading}
        onClick={() => handle("restore")}
        className="text-emerald-600 hover:bg-emerald-50 hover:border-emerald-200 rounded-xl font-extrabold">
        <ShieldCheck className="w-3.5 h-3.5 mr-1" /> Restore
      </Button>
    );
  }

  return (
    <div className="flex gap-1.5 justify-end">
      {currentStatus === "active" && (
        <Button variant="ghost" size="sm" disabled={loading}
          onClick={() => handle("flag")}
          className="text-amber-600 hover:bg-amber-50 rounded-xl font-extrabold">
          <ShieldAlert className="w-3.5 h-3.5 mr-1" /> Flag
        </Button>
      )}
      <Button variant="ghost" size="sm" disabled={loading}
        onClick={() => handle("remove")}
        className="text-rose-500 hover:bg-rose-50 rounded-xl font-extrabold">
        <Trash2 className="w-3.5 h-3.5 mr-1" /> Remove
      </Button>
    </div>
  );
}
