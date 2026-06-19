"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { toggleFeaturedAction } from "@/features/admin/admin.actions";
import { Star } from "lucide-react";

export function ToggleFeaturedButton({
  propertyId,
  isFeatured,
}: {
  propertyId: string;
  isFeatured: boolean;
}) {
  const [loading, setLoading] = useState(false);

  const handle = async () => {
    setLoading(true);
    await toggleFeaturedAction(propertyId, !isFeatured);
    setLoading(false);
  };

  return (
    <Button
      variant={isFeatured ? "ghost" : "outline"}
      size="sm"
      onClick={handle}
      disabled={loading}
      className={
        isFeatured
          ? "text-amber-600 hover:bg-amber-50 rounded-xl font-extrabold"
          : "text-slate-500 hover:bg-violet-50 hover:border-violet-200 hover:text-violet-700 rounded-xl font-extrabold"
      }
    >
      <Star className={`w-3.5 h-3.5 mr-1 ${isFeatured ? "fill-amber-500 text-amber-500" : ""}`} />
      {isFeatured ? "Unfeature" : "Feature"}
    </Button>
  );
}
