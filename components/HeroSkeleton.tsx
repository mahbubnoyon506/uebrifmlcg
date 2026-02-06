export default function HeroSkeleton() {
  return (
    <div className="relative w-full h-[70vh] min-h-125 flex items-center justify-center bg-muted/20 animate-pulse">
      <div className="absolute inset-0 bg-linear-to-t from-background via-muted/10 to-transparent" />

      <div className="container relative z-10 px-4 text-center space-y-8">
        <div className="space-y-4 flex flex-col items-center">
          <div className="h-12 md:h-16 lg:h-20 w-3/4 max-w-2xl bg-muted rounded-lg" />
          <div className="h-6 md:h-8 w-2/3 max-w-lg bg-muted/60 rounded-md" />
        </div>
        <div className="max-w-3xl mx-auto w-full h-14 md:h-16 bg-muted/40 rounded-full border border-border" />
        <div className="flex items-center justify-center gap-2">
          <div className="w-5 h-5 rounded-full bg-muted" />
          <div className="h-4 w-40 bg-muted/60 rounded" />
        </div>
      </div>
    </div>
  );
}
