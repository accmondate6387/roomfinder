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
      className={`flex flex-col items-center justify-center p-8 text-center rounded-2xl border border-dashed border-slate-300 bg-slate-50/50 min-h-[300px] ${className}`}
    >
      <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-6">
        <Icon className="w-8 h-8 text-slate-400" />
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-500 max-w-sm mb-6">{description}</p>
      {actionLabel && actionHref && (
        <Link href={actionHref}>
          <Button variant="primary">
            {actionLabel}
          </Button>
        </Link>
      )}
      {actionLabel && onAction && !actionHref && (
        <Button onClick={onAction} variant="primary">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
