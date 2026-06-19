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
    <div className="p-5 rounded-2xl border border-slate-200 bg-white transition-all hover:border-violet-200 hover:shadow-md hover:shadow-violet-50">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-100 to-indigo-100 flex items-center justify-center overflow-hidden shrink-0">
            {review.user.image ? (
              <img src={review.user.image} alt={review.user.name} className="h-full w-full object-cover" />
            ) : (
              <span className="text-sm font-extrabold text-violet-600">
                {review.user.name?.[0]?.toUpperCase() || "S"}
              </span>
            )}
          </div>
          <div>
            <h4 className="font-extrabold text-slate-900 text-sm">{review.user.name}</h4>
            <span className="text-xs font-bold text-slate-400">
              {formatDistanceToNow(new Date(review.createdAt), { addSuffix: true })}
            </span>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl">
          <Flag size={14} />
        </Button>
      </div>

      <RatingStars rating={review.ratings.overall} className="mb-3" />
      <p className="text-slate-600 text-sm leading-relaxed font-medium">{review.comment}</p>
    </div>
  );
}
