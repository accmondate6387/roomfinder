"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createReviewSchema, CreateReviewInput } from "@/validations";
import { submitReviewAction } from "@/features/reviews/reviews.actions";
import { Button } from "../ui/Button";
import { Star } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

interface ReviewFormProps {
  propertyId: string;
  onSuccess?: () => void;
}

const CATEGORIES = [
  { id: "cleanliness", label: "Cleanliness" },
  { id: "waterSupply", label: "Water Supply" },
  { id: "electricity", label: "Electricity" },
  { id: "wifiQuality", label: "WiFi Quality" },
  { id: "safety", label: "Safety" },
  { id: "ownerBehaviour", label: "Owner Behaviour" },
  { id: "overall", label: "Overall Experience" },
] as const;

export function ReviewForm({ propertyId, onSuccess }: ReviewFormProps) {
  const router = useRouter();
  const { user } = useAuthStore();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CreateReviewInput>({
    resolver: zodResolver(createReviewSchema),
    defaultValues: {
      propertyId,
      ratings: {
        cleanliness: 0,
        waterSupply: 0,
        electricity: 0,
        wifiQuality: 0,
        safety: 0,
        ownerBehaviour: 0,
        overall: 0,
      },
      comment: "",
    },
  });

  const ratings = watch("ratings");

  const onSubmit = async (data: CreateReviewInput) => {
    if (!user) {
      router.push("/login");
      return;
    }

    if (user.role !== "student") {
      setError("Only students can leave reviews.");
      return;
    }

    setError(null);
    const result = await submitReviewAction(data);

    if (result.success) {
      onSuccess?.();
    } else {
      setError(result.error || "Failed to submit review");
    }
  };

  const handleStarClick = (category: keyof typeof ratings, value: number) => {
    setValue(`ratings.${category}`, value, { shouldValidate: true });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        {CATEGORIES.map((category) => (
          <div key={category.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="text-sm font-medium text-slate-700">{category.label}</span>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => handleStarClick(category.id as any, star)}
                  className="p-1 transition-transform hover:scale-110 focus:outline-none"
                >
                  <Star
                    size={24}
                    className={`transition-colors ${
                      star <= (ratings[category.id as keyof typeof ratings] || 0)
                        ? "fill-amber-500 text-amber-500"
                        : "fill-slate-100 text-slate-300"
                    }`}
                  />
                </button>
              ))}
            </div>
            {errors.ratings?.[category.id as keyof typeof errors.ratings] && (
              <p className="text-xs text-rose-500 block sm:hidden">
                {(errors.ratings[category.id as keyof typeof errors.ratings] as any)?.message}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <label htmlFor="comment" className="text-sm font-medium text-slate-700">
          Your Review
        </label>
        <textarea
          id="comment"
          {...register("comment")}
          rows={4}
          className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
          placeholder="Share your experience..."
        />
        {errors.comment && <p className="text-sm text-rose-500">{errors.comment.message}</p>}
      </div>

      {error && <p className="text-sm text-rose-500 p-3 bg-rose-50 rounded-md border border-rose-100">{error}</p>}

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Submitting..." : "Submit Review"}
      </Button>
    </form>
  );
}
