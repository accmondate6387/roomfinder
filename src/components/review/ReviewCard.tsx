import { ReviewDTO } from "@/types";
import { RatingStars } from "./RatingStars";
import { formatDistanceToNow } from "date-fns";
import { User, Flag } from "lucide-react";
import { Button } from "../ui/Button";

interface ReviewCardProps {
  review: ReviewDTO;
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="p-6 rounded-lg border border-slate-200 bg-white shadow-sm space-y-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-200">
            {review.user.image ? (
              <img src={review.user.image} alt={review.user.name} className="h-full w-full object-cover" />
            ) : (
              <User className="h-5 w-5 text-slate-400" />
            )}
          </div>
          <div>
            <h4 className="font-semibold text-slate-900">{review.user.name}</h4>
            <span className="text-xs text-slate-500">
              {formatDistanceToNow(new Date(review.createdAt), { addSuffix: true })}
            </span>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-rose-500 hover:bg-rose-50">
          <Flag size={16} />
        </Button>
      </div>

      <div>
        <RatingStars rating={review.ratings.overall} className="mb-2" />
        <p className="text-slate-700 text-sm leading-relaxed">{review.comment}</p>
      </div>
    </div>
  );
}
