import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

interface MatchScoreProps {
  score: number;
  className?: string;
  showIcon?: boolean;
}

export function MatchScore({ score, className, showIcon = true }: MatchScoreProps) {
  if (score === 0) return null; // Don't show if no score could be calculated

  // Determine color based on score
  let colorClass = "bg-emerald-100 text-emerald-800 border-emerald-200";
  
  if (score < 50) {
    colorClass = "bg-rose-100 text-rose-800 border-rose-200";
  } else if (score < 80) {
    colorClass = "bg-amber-100 text-amber-800 border-amber-200";
  }

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border shadow-sm",
        colorClass,
        className
      )}
      title={`${score}% match based on your filters`}
    >
      {showIcon && <Sparkles size={12} className={score >= 80 ? "text-emerald-600" : score >= 50 ? "text-amber-600" : "text-rose-600"} />}
      {score}% Match
    </div>
  );
}
