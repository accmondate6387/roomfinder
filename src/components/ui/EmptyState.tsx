import React from "react";
import * as Icons from "lucide-react";
import { Button } from "./Button";
import Link from "next/link";

interface EmptyStateProps {
  icon: keyof typeof Icons;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  actionHref?: string;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  actionHref,
  className = "",
}: EmptyStateProps) {
  const Icon = Icons[icon] as React.ElementType;

  return (
    <div
      className={`flex flex-col items-center justify-center p-8 text-center rounded-3xl border-2 border-dashed border-violet-200 bg-violet-50/30 min-h-[300px] ${className}`}
    >
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-100 to-indigo-100 flex items-center justify-center mb-6">
        <Icon className="w-8 h-8 text-violet-400" />
      </div>
      <h3 className="text-xl font-extrabold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-500 max-w-sm mb-6 font-medium">{description}</p>
      {actionLabel && actionHref && (
        <Link href={actionHref}>
          <Button variant="primary" className="rounded-2xl">
            {actionLabel}
          </Button>
        </Link>
      )}
      {actionLabel && onAction && !actionHref && (
        <Button onClick={onAction} variant="primary" className="rounded-2xl">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
