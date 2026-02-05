interface MovieCardSkeletonProps {
  count?: number;
}

export default function MovieCardSkeleton({
  count = 10,
}: MovieCardSkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-card rounded-xl overflow-hidden border border-border shadow-sm"
        >
          <div className="relative aspect-2/3 w-full bg-muted animate-pulse" />
          <div className="p-3 space-y-2">
            <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
            <div className="h-3 w-1/4 bg-muted rounded animate-pulse" />
          </div>
        </div>
      ))}
    </>
  );
}
