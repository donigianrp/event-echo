import { getServerSession } from 'next-auth';
import {
  getLikedSeries,
  getTotalLikedPages,
} from '../components/pagination/actions';
import PaginationPage from '../components/pagination/pagination_page';
import { authOptions } from '../api/auth/[...nextauth]/route';
import LoginPrompt from '../components/login_prompt';
import NoContentDisplay from '../components/no_content_display/no_content_display';

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

  const message = {
    header: 'No likes yet!',
    description: 'Any series you like will be displayed on this page.',
  };

  if (!session) {
    return <LoginPrompt />;
  }

  return (
    <>
      {likedSeries.length > 0 ? (
        <PaginationPage
          eventSeries={likedSeries}
          currentPage={currentPage}
          totalPages={totalLikedPages}
        />
      ) : (
        <NoContentDisplay message={message} />
      )}
    </>
  );
}
