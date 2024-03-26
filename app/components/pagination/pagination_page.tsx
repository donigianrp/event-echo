import { Prisma } from '@prisma/client';
import Search from '../search/search';
import CategorySelect from '../search/category_select';
import prisma from '@/db';
import SortSelect from '../search/sort_select';
import EventSeriesPagination from './event_series_pagination';
import { Suspense } from 'react';
import { SearchSkeleton } from '../skeletons';
import { SeriesWithThumbnail } from './actions';

export type SubcategoryWithCategory = Prisma.EventSubCategoryGetPayload<{
  include: { event_category: true };
}>;

export default async function PaginationPage({
  eventSeries,
  query,
  currentPage,
  totalPages,
}: {
  query?: string;
  currentPage: number;
  eventSeries: SeriesWithThumbnail[];
  totalPages: number;
}) {
  const categories = await prisma.eventCategory.findMany({
    orderBy: {
      id: 'asc',
    },
  });
  const subcategories: SubcategoryWithCategory[] =
    await prisma.eventSubCategory.findMany({
      include: {
        event_category: true,
      },
      orderBy: {
        id: 'asc',
      },
    });

  return (
    <div className="flex flex-col">
      {query !== undefined && (
        <div className="w-full flex flex-col sm:flex-row gap-4 mx-auto p-10 pb-0">
          <div className="grow">
            <Search placeholder="Search&#8230;" />
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <CategorySelect
              categories={categories}
              subcategories={subcategories}
            />
            <SortSelect />
          </div>
        </div>
      )}
      <div className="flex flex-col gap-6 pt-10 px-10 justify-center">
        <Suspense key={currentPage} fallback={<SearchSkeleton />}>
          <EventSeriesPagination
            eventSeries={eventSeries}
            totalPages={totalPages}
          />
        </Suspense>
      </div>
    </div>
  );
}
