"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { processOwnerVerificationAction } from "@/features/admin/admin.actions";
import { Check, X } from "lucide-react";

export function OwnerVerificationButtons({ verificationId }: { verificationId: string }) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleApprove = async () => {
    setIsProcessing(true);
    await processOwnerVerificationAction(verificationId, "approved");
    setIsProcessing(false);
  };

  const handleReject = async () => {
    const note = prompt("Enter rejection reason (visible to owner):");
    if (!note) return;
    
    setIsProcessing(true);
    await processOwnerVerificationAction(verificationId, "rejected", note);
    setIsProcessing(false);
  };

  return (
    <>
      <Button 
        variant="outline" 
        size="sm" 
        className="text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200"
        onClick={handleApprove}
        disabled={isProcessing}
      >
        <Check size={16} className="mr-1" /> Approve
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        className="text-rose-600 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200"
        onClick={handleReject}
        disabled={isProcessing}
      >
        <X size={16} className="mr-1" /> Reject
      </Button>
    </>
  );
}
