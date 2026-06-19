"use client";

import { useState } from "react";
import { Star, MessageSquare, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { submitReviewAction } from "@/features/social/reviews.actions";
import { Button } from "@/components/ui/Button";

interface ReviewProps {
  id: string;
  authorName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

interface ReviewsSectionProps {
  propertyId: string;
  isLoggedIn: boolean;
  userRole?: string;
  existingReviews: ReviewProps[];
}

export function ReviewsSection({ propertyId, isLoggedIn, userRole, existingReviews }: ReviewsSectionProps) {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isLoggedIn) {
      toast.error("Please log in to leave a review.");
      return;
    }
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    formData.append("propertyId", propertyId);
    formData.append("rating", rating.toString());
    const result = await submitReviewAction(null, formData);
    setIsSubmitting(false);
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success(result.message);
      setShowForm(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-violet-100 p-6 md:p-8 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 mb-1">Student Reviews</h2>
          <p className="text-sm text-slate-500 font-medium">Real feedback from actual tenants.</p>
        </div>
        {isLoggedIn && userRole === "student" && !showForm && (
          <Button variant="outline" onClick={() => setShowForm(true)} className="gap-2 rounded-2xl font-extrabold">
            <MessageSquare className="w-4 h-4" />
            Write a Review
          </Button>
        )}
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-10 bg-gradient-to-br from-violet-50 to-indigo-50 rounded-2xl border border-violet-200 p-6">
          <h3 className="font-extrabold text-slate-900 mb-4">Rate your experience</h3>
          <div className="flex gap-1 mb-6">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="focus:outline-none transition-transform hover:scale-110"
              >
                <Star
                  className={`w-8 h-8 transition-all ${
                    star <= (hoverRating || rating)
                      ? "fill-amber-400 text-amber-400"
                      : "text-slate-300"
                  }`}
                />
              </button>
            ))}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold text-slate-700 mb-2">Your Review</label>
            <textarea
              name="comment"
              rows={4}
              required
              minLength={10}
              maxLength={1000}
              placeholder="Tell us about the food, water supply, owner behavior, etc."
              className="w-full rounded-2xl border-2 border-slate-200 px-4 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-400 resize-none"
            />
          </div>

          <div className="flex gap-3">
            <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2.5 rounded-2xl border-2 border-slate-200 text-sm font-extrabold text-slate-600 hover:bg-white transition-all">
              Cancel
            </button>
            <Button type="submit" isLoading={isSubmitting} className="rounded-2xl">Post Review</Button>
          </div>
        </form>
      )}

      {existingReviews.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-100 to-indigo-100 flex items-center justify-center mx-auto mb-4">
            <Star className="w-8 h-8 text-violet-400" />
          </div>
          <p className="text-slate-500 font-bold">No reviews yet. Be the first!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {existingReviews.map((review) => (
            <div key={review.id} className="p-5 rounded-2xl border border-slate-100 hover:border-violet-200 hover:shadow-md hover:shadow-violet-50 transition-all">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-100 to-indigo-100 flex items-center justify-center text-sm font-extrabold text-violet-600 shrink-0">
                    {review.authorName?.[0]?.toUpperCase() || "S"}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-sm">{review.authorName}</h4>
                    <p className="text-xs font-bold text-slate-400">{new Date(review.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-3.5 h-3.5 ${i < review.rating ? "fill-amber-400 text-amber-400" : "text-slate-200"}`} />
                  ))}
                </div>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed font-medium">{review.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
