import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import LoginPrompt from '../components/login_prompt';
import {
  getFavoritedSeries,
  getTotalFavoritedPages,
} from '../components/pagination/actions';
import PaginationPage from '../components/pagination/pagination_page';

const Favorites = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    category?: string;
    subcategory?: string;
    order?: string;
  };
}) => {
  const session = await getServerSession(authOptions);
  const currentPage = Number(searchParams?.page) || 1;
  const limit = 9;
  const sessionId = session?.user.id;
  const favoritedSeries = await getFavoritedSeries({
    sessionId,
    limit,
    currentPage,
  });
  const totalFavoritedPages = await getTotalFavoritedPages({
    sessionId,
    limit,
  });

  if (!session) {
    return <LoginPrompt />;
  }

  return (
    <PaginationPage
      eventSeries={favoritedSeries}
      currentPage={currentPage}
      totalPages={totalFavoritedPages}
    />
  );
};

export default Favorites;
