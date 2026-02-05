export function MovieDetailsSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="relative w-full h-150 md:h-125 flex items-center">
        <div className="container mx-auto px-4 relative z-10 flex flex-col md:flex-row gap-8">
          {/* Poster Skeleton */}
          <div className="hidden md:block w-72 shrink-0 aspect-2/3 rounded-lg bg-muted" />

          {/* Details Content Skeleton */}
          <div className="flex flex-col justify-center space-y-6 w-full max-w-2xl">
            {/* Title & Year */}
            <div className="h-12 w-3/4 bg-muted rounded" />

            {/* Metadata Bar */}
            <div className="flex gap-3 h-4 w-1/2 bg-muted rounded" />

            {/* Action Bar Skeleton */}
            <div className="flex items-center gap-6 py-4">
              {/* User Score Circle */}
              <div className="w-14 h-14 rounded-full bg-muted" />
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-muted" />
                <div className="w-10 h-10 rounded-full bg-muted" />
              </div>
              <div className="h-6 w-24 bg-muted rounded" />
            </div>

            {/* Tagline & Overview */}
            <div className="h-5 w-1/3 bg-muted rounded italic" />
            <div className="space-y-3">
              <div className="h-6 w-20 bg-muted rounded" />
              <div className="space-y-2">
                <div className="h-4 w-full bg-muted rounded" />
                <div className="h-4 w-full bg-muted rounded" />
                <div className="h-4 w-2/3 bg-muted rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CastSkeleton() {
  return (
    <div className=" animate-pulse">
      <div className="container mx-auto px-4 py-12">
        <div className="h-8 w-48 bg-muted rounded mb-6" />
        <div className="flex gap-4 overflow-hidden">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className="min-w-35 border border-border rounded-lg overflow-hidden"
            >
              <div className="aspect-square w-full bg-muted" />
              <div className="p-3 space-y-2">
                <div className="h-3 w-3/4 bg-muted rounded" />
                <div className="h-2 w-1/2 bg-muted rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
