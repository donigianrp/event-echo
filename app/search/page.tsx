import Search from '../components/search/search';
import CategorySelect from '../components/search/category_select';
import prisma from '@/db';
import SortSelect from '../components/search/sort_select';
import EventSeriesPagination from '../components/pagination/event_series_pagination';
import { Suspense } from 'react';
import { SearchSkeleton } from '../components/skeletons';
import { Prisma } from '@prisma/client';

export type SubcategoryWithCategory = Prisma.EventSubCategoryGetPayload<{
  include: { event_category: true };
}>;

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    category?: string;
    subcategory?: string;
    order?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const category = searchParams?.category || '';
  const subcategory = searchParams?.subcategory || '';
  const order = searchParams?.order || '';

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
      <div className="flex flex-col gap-6 p-10 justify-center">
        <Suspense key={query + currentPage} fallback={<SearchSkeleton />}>
          <EventSeriesPagination
            query={query}
            currentPage={currentPage}
            category={category}
            subcategory={subcategory}
            order={order}
          />
        </Suspense>
      </div>
    </div>
  );
}
