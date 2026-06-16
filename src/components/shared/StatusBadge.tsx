import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  let colorClass = "bg-slate-100 text-slate-800 border-slate-200";
  let label = status;

  switch (status.toLowerCase()) {
    case "approved":
    case "active":
    case "resolved":
      colorClass = "bg-emerald-100 text-emerald-800 border-emerald-200";
      label = status.charAt(0).toUpperCase() + status.slice(1);
      break;
    case "pending":
    case "draft":
      colorClass = "bg-amber-100 text-amber-800 border-amber-200";
      label = status.charAt(0).toUpperCase() + status.slice(1);
      break;
    case "rejected":
    case "suspended":
    case "dismissed":
      colorClass = "bg-rose-100 text-rose-800 border-rose-200";
      label = status.charAt(0).toUpperCase() + status.slice(1);
      break;
  }

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        colorClass,
        className
      )}
    >
      {label}
    </span>
  );
}
