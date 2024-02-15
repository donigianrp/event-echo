import EventSeriesCard from '../event_series_card';
import {
  SeriesWithThumbnail,
  getFilteredEventSeries,
  getTotalPages,
} from './actions';
import PaginationComponent from './pagination';

export default async function EventSeriesPagination({
  query,
  currentPage,
  category,
  subcategory,
  order,
}: {
  query: string;
  currentPage: number;
  category: string;
  subcategory: string;
  order: string;
}) {
  const limit = 9;

  const eventSeries = await getFilteredEventSeries({
    query,
    currentPage,
    limit,
    category,
    subcategory,
    order,
  });
  const totalPages = await getTotalPages({
    query,
    limit,
    category,
    subcategory,
    order,
  });

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
