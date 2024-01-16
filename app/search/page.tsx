import Search from '../components/search';
import LoadSeries from '../components/infinite_scroll/load_series';

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';

  return (
    <div className="flex flex-col gap-6 mx-auto justify-center sm:p-10 lg:w-1/2">
      <Search placeholder="Search&#8230;" />
      <LoadSeries route={'event_series'} query={query} />
    </div>
  );
}
