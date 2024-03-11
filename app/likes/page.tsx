import { getServerSession } from 'next-auth';
import {
  getLikedSeries,
  getTotalLikedPages,
} from '../components/pagination/actions';
import PaginationPage from '../components/pagination/pagination_page';
import { authOptions } from '../api/auth/[...nextauth]/route';
import LoginPrompt from '../components/login_prompt';

export default async function Likes({
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
  const currentPage = Number(searchParams?.page) || 1;
  const limit = 9;
  const session = await getServerSession(authOptions);
  const sessionId = session?.user.id;
  const likedSeries = await getLikedSeries({ sessionId, limit, currentPage });
  const totalLikedPages = await getTotalLikedPages({ sessionId, limit });

  if (!session) {
    return <LoginPrompt />;
  }

  return (
    <PaginationPage
      eventSeries={likedSeries}
      currentPage={currentPage}
      totalPages={totalLikedPages}
    />
  );
}
