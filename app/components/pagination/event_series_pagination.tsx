import EventSeriesCard from '../event_series_card';
import { SeriesWithThumbnail } from './actions';
import PaginationComponent from './pagination';

export default async function EventSeriesPagination({
  eventSeries,
  totalPages,
}: {
  eventSeries: SeriesWithThumbnail[];
  totalPages: number;
}) {
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {eventSeries.map((s: SeriesWithThumbnail) => {
          return (
            <EventSeriesCard
              key={s.id}
              id={s.id}
              title={s.title}
              description={s.description}
              thumbnails={s.thumbnails || undefined}
            />
          );
        })}
      </div>
      <PaginationComponent totalPages={totalPages} />
    </div>
  );
}
