import { Card } from './ui/card';

export function EventSeriesCardSkeleton() {
  return (
    <div className="relative rounded-lg before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-neutral-100/10 before:to-transparent isolate overflow-hidden shadow-xl shadow-black/5 before:border-t before:border-neutral-100/10">
      <Card className="p-6 space-y-1.5">
        <div className="h-12">
          <div className="h-6 rounded-lg bg-foreground/20 w-3/5"></div>
        </div>
        <div className="h-10">
          <div className="h-5 rounded-lg bg-foreground/10 w-4/5"></div>
        </div>
      </Card>
    </div>
  );
}

export function SearchSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <EventSeriesCardSkeleton />
      <EventSeriesCardSkeleton />
      <EventSeriesCardSkeleton />
      <EventSeriesCardSkeleton />
      <EventSeriesCardSkeleton />
      <EventSeriesCardSkeleton />
      <EventSeriesCardSkeleton />
      <EventSeriesCardSkeleton />
      <EventSeriesCardSkeleton />
    </div>
  );
}
