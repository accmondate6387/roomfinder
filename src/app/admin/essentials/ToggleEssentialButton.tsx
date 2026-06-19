"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { toggleEssentialAction } from "@/features/admin/admin.actions";

export function ToggleEssentialButton({
  essentialId,
  isActive,
}: {
  essentialId: string;
  isActive: boolean;
}) {
  const [loading, setLoading] = useState(false);

  const handle = async () => {
    setLoading(true);
    await toggleEssentialAction(essentialId, !isActive);
    setLoading(false);
  };

  return (
    <Button
      variant={isActive ? "ghost" : "outline"}
      size="sm"
      onClick={handle}
      disabled={loading}
      className={
        isActive
          ? "text-rose-500 hover:bg-rose-50 rounded-xl font-extrabold"
          : "text-emerald-600 hover:bg-emerald-50 hover:border-emerald-200 rounded-xl font-extrabold"
      }
    >
      {isActive ? "Deactivate" : "Activate"}
    </Button>
  );
}
