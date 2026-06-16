import React from "react";
import { Sparkles } from "lucide-react";

interface MatchScoreProps {
  score: number;
}

export function MatchScore({ score }: MatchScoreProps) {
  if (score < 40) return null;

  let colorClass = "bg-emerald-100 text-emerald-800 border-emerald-200";
  if (score >= 80) colorClass = "bg-primary/10 text-primary border-primary/20";
  else if (score >= 60) colorClass = "bg-blue-100 text-blue-800 border-blue-200";

  return (
    <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-bold shadow-sm backdrop-blur-sm ${colorClass}`}>
      <Sparkles className="w-3.5 h-3.5" />
      {score}% Match
    </div>
  );
}
