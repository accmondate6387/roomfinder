import { Star, StarHalf } from "lucide-react";

interface RatingStarsProps {
  rating: number;
  max?: number;
  size?: number;
  className?: string;
}

export function RatingStars({
  rating,
  max = 5,
  size = 16,
  className = "",
}: RatingStarsProps) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = max - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {[...Array(fullStars)].map((_, i) => (
        <Star
          key={`full-${i}`}
          size={size}
          className="fill-amber-500 text-amber-500"
        />
      ))}
      {hasHalfStar && (
        <StarHalf size={size} className="fill-amber-500 text-amber-500" />
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <Star
          key={`empty-${i}`}
          size={size}
          className="text-slate-300"
        />
      ))}
    </div>
  );
}
