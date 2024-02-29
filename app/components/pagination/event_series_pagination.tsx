import { getServerSession } from 'next-auth';
import EventSeriesCard from '../event_series_card';
import {
  SeriesWithThumbnail,
  getFilteredEventSeries,
  getTotalPages,
} from './actions';
import PaginationComponent from './pagination';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function EventSeriesPagination({
  query,
  currentPage,
  category,
  subcategory,
  order,
  creatorId,
}: {
  query: string;
  currentPage: number;
  category: string;
  subcategory: string;
  order: string;
  creatorId?: number;
}) {
  const session = await getServerSession(authOptions);
  const limit = 9;

  const eventSeries = await getFilteredEventSeries({
    query,
    currentPage,
    limit,
    category,
    subcategory,
    order,
    creatorId,
    sessionId: session?.user.id || -1,
  });
  const totalPages = await getTotalPages({
    query,
    limit,
    category,
    subcategory,
    order,
    sessionId: session?.user.id || -1,
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
