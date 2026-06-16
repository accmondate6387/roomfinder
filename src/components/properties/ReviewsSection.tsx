"use client";

import { useState } from "react";
import { Star, MessageSquare } from "lucide-react";
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
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 mt-8">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Student Reviews</h2>
          <p className="text-slate-500">Real feedback from actual students.</p>
        </div>
        
        {isLoggedIn && userRole === "student" && !showForm && (
          <Button variant="outline" onClick={() => setShowForm(true)} className="gap-2">
            <MessageSquare className="w-4 h-4" />
            Write a Review
          </Button>
        )}
      </div>

      {/* Review Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="mb-10 bg-slate-50 p-6 rounded-2xl border border-slate-200">
          <h3 className="font-bold text-slate-900 mb-4">Rate your experience</h3>
          
          <div className="flex gap-2 mb-6">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="focus:outline-none"
              >
                <Star 
                  className={`w-8 h-8 ${star <= rating ? "fill-warning text-warning" : "text-slate-300"}`} 
                />
              </button>
            ))}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-2">Your Review</label>
            <textarea
              name="comment"
              rows={4}
              required
              minLength={10}
              maxLength={1000}
              placeholder="Tell us about the food, water supply, owner behavior, etc."
              className="w-full rounded-xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="flex gap-3">
            <Button type="button" variant="ghost" onClick={() => setShowForm(false)}>Cancel</Button>
            <Button type="submit" isLoading={isSubmitting}>Post Review</Button>
          </div>
        </form>
      )}

      {/* Reviews List */}
      {existingReviews.length === 0 ? (
        <div className="text-center py-10">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Star className="w-8 h-8 text-slate-300" />
          </div>
          <p className="text-slate-500 font-medium">No reviews yet. Be the first to share your experience!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {existingReviews.map((review) => (
            <div key={review.id} className="pb-6 border-b border-slate-100 last:border-0 last:pb-0">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-bold text-slate-900">{review.authorName}</h4>
                  <p className="text-xs text-slate-500">{new Date(review.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < review.rating ? "fill-warning text-warning" : "text-slate-200"}`} 
                    />
                  ))}
                </div>
              </div>
              <p className="text-slate-600 mt-2">{review.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
