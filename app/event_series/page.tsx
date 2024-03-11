import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import {
  getFilteredEventSeries,
  getTotalPages,
} from '../components/pagination/actions';
import PaginationPage from '../components/pagination/pagination_page';
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
  const session = await getServerSession(authOptions);
  const sessionId = session?.user.id;
  const limit = 9;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const category = searchParams?.category || '';
  const subcategory = searchParams?.subcategory || '';
  const order = searchParams?.order || '';
  const totalPages = await getTotalPages({
    query,
    limit,
    category,
    subcategory,
    order,
    sessionId,
  });
  const eventSeries = await getFilteredEventSeries({
    query,
    currentPage,
    limit,
    category,
    subcategory,
    order,
    sessionId,
  });

  return (
    <PaginationPage
      eventSeries={eventSeries}
      query={query}
      currentPage={currentPage}
      totalPages={totalPages}
    />
  );
}
