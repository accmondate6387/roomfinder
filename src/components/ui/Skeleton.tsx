interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = "" }: SkeletonProps) {
  return <div className={`skeleton ${className}`} />;
}

export function PropertyCardSkeleton() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden flex flex-col h-full">
      {/* Image skeleton */}
      <Skeleton className="w-full aspect-[4/3]" />
      
      {/* Content skeleton */}
      <div className="p-5 flex-1 flex flex-col gap-4">
        {/* Title & Price */}
        <div className="flex justify-between items-start gap-4">
          <div className="space-y-2 flex-1">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
          <Skeleton className="h-6 w-20" />
        </div>

        {/* Tags */}
        <div className="flex gap-2">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>

        {/* Amenities */}
        <div className="grid grid-cols-2 gap-2 mt-auto pt-4 border-t border-slate-100">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
      </div>
    </div>
  );
}
