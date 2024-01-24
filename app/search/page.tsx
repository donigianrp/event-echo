import Search from '../components/search/search';
import LoadSeries from '../components/infinite_scroll/load_series';
import CategorySelect from '../components/search/category_select';
import prisma from '@/db';
import SortSelect from '../components/search/sort_select';

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
  const category = searchParams?.category || '';
  const subcategory = searchParams?.subcategory || '';
  const order = searchParams?.order || '';

  const categories = await prisma.eventCategory.findMany({
    orderBy: {
      id: 'asc',
    },
  });
  const subcategories = await prisma.eventSubCategory.findMany({
    orderBy: {
      id: 'asc',
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="sm:w-4/5 flex flex-col gap-4 mx-auto sm:p-10 sm:pb-4">
        <Search placeholder="Search&#8230;" />
        <div className="flex gap-4">
          <CategorySelect
            categories={categories}
            subcategories={subcategories}
          />
          <SortSelect />
        </div>
      </div>
      <div className="flex flex-col gap-6 mx-auto justify-center lg:w-1/2">
        <LoadSeries
          route={'event_series'}
          query={query}
          category={category}
          subcategory={subcategory}
          order={order}
        />
      </div>
    </div>
  );
}
