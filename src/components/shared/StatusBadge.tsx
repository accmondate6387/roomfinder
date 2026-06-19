interface StatusBadgeProps {
  status: string;
  className?: string;
}

export function StatusBadge({ status, className = "" }: StatusBadgeProps) {
  let colorClass = "bg-slate-100 text-slate-700 border-slate-200";
  let label = status;

  switch (status.toLowerCase()) {
    case "approved":
    case "active":
    case "resolved":
      colorClass = "bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 border-emerald-200";
      break;
    case "pending":
    case "draft":
      colorClass = "bg-gradient-to-r from-amber-50 to-orange-50 text-amber-700 border-amber-200";
      break;
    case "rejected":
    case "suspended":
    case "dismissed":
      colorClass = "bg-gradient-to-r from-rose-50 to-pink-50 text-rose-700 border-rose-200";
      break;
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-extrabold border shadow-sm ${colorClass} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full shadow-sm ${
        status.toLowerCase() === "approved" || status.toLowerCase() === "active" || status.toLowerCase() === "resolved"
          ? "bg-emerald-500 shadow-emerald-300"
          : status.toLowerCase() === "pending" || status.toLowerCase() === "draft"
          ? "bg-amber-500 shadow-amber-300"
          : "bg-rose-500 shadow-rose-300"
      }`} />
      {label.charAt(0).toUpperCase() + label.slice(1)}
    </span>
  );
}
