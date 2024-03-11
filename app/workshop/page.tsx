import { buttonVariants } from '@/components/ui/button';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { authOptions } from '../api/auth/[...nextauth]/route';
import LoginPrompt from '../components/login_prompt';
import {
  getFilteredEventSeries,
  getTotalPages,
} from '../components/pagination/actions';
import PaginationPage from '../components/pagination/pagination_page';

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

  if (!session) {
    return (
      <div className="flex h-screen items-center">
        <LoginPrompt />
      </div>
    );
  }

  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const category = searchParams?.category || '';
  const subcategory = searchParams?.subcategory || '';
  const order = searchParams?.order || '';
  const creatorId = session?.user.id;
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
    <div className="flex flex-col gap-6 mx-auto justify-center sm:p-10">
      <div className="flex flex-col sm:flex-row gap-4 justify-between px-10">
        <h1 className="text-2xl sm:text-3xl font-semibold">
          Event Series Workshop
        </h1>
        <div className="">
          <Link
            className={buttonVariants({ variant: 'default' })}
            href="/workshop/create"
          >
            Create New Event Series
          </Link>
        </div>
      </div>
      <PaginationPage
        eventSeries={eventSeries}
        query={query}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </div>
  );
}
