"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { processReportAction } from "@/features/admin/admin.actions";
import { ShieldCheck, ShieldAlert } from "lucide-react";

export function ReportActionButtons({ reportId }: { reportId: string }) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleResolve = async () => {
    const note = prompt("Enter resolution notes (optional):");
    setIsProcessing(true);
    await processReportAction(reportId, "resolved", note || undefined);
    setIsProcessing(false);
  };

  const handleDismiss = async () => {
    const note = prompt("Enter dismissal reason (optional):");
    setIsProcessing(true);
    await processReportAction(reportId, "dismissed", note || undefined);
    setIsProcessing(false);
  };

  return (
    <>
      <Button 
        variant="outline" 
        size="sm" 
        className="text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200"
        onClick={handleResolve}
        disabled={isProcessing}
      >
        <ShieldCheck size={16} className="mr-1" /> Action Taken
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        className="text-slate-600 hover:bg-slate-100 hover:text-slate-900"
        onClick={handleDismiss}
        disabled={isProcessing}
      >
        <ShieldAlert size={16} className="mr-1" /> Dismiss
      </Button>
    </>
  );
}
