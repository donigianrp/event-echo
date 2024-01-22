import Search from '../components/search';
import LoadSeries from '../components/infinite_scroll/load_series';
import CategorySelect from '../components/category_select';
import prisma from '@/db';

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    category?: string;
  };
}) {
  const query = searchParams?.query || '';
  const category = searchParams?.category || '';

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
    <div className="flex flex-col gap-6">
      <div className="flex gap-4 flex-col sm:flex-row mx-auto">
        <Search placeholder="Search&#8230;" />
        <CategorySelect categories={categories} subcategories={subcategories} />
      </div>
      <div className="flex flex-col gap-6 mx-auto justify-center lg:w-1/2">
        <LoadSeries route={'event_series'} query={query} category={category} />
      </div>
    </div>
  );
}
