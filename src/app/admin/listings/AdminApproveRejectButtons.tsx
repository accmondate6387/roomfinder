"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { approvePropertyAction, rejectPropertyAction } from "@/features/admin/admin.actions";
import { Check, X } from "lucide-react";

export function AdminApproveRejectButtons({ propertyId }: { propertyId: string }) {
  const [isApproving, setIsApproving] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);

  const handleApprove = async () => {
    setIsApproving(true);
    await approvePropertyAction(propertyId);
    setIsApproving(false);
  };

  const handleReject = async () => {
    const reason = prompt("Enter rejection reason:");
    if (!reason) return;
    
    setIsRejecting(true);
    await rejectPropertyAction(propertyId, reason);
    setIsRejecting(false);
  };

  return (
    <>
      <Button 
        variant="outline" 
        size="sm" 
        className="text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 rounded-xl font-extrabold"
        onClick={handleApprove}
        disabled={isApproving || isRejecting}
      >
        <Check size={16} className="mr-1" /> Approve
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        className="text-rose-600 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200 rounded-xl font-extrabold"
        onClick={handleReject}
        disabled={isApproving || isRejecting}
      >
        <X size={16} className="mr-1" /> Reject
      </Button>
    </>
  );
}
