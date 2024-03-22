import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import LoginPrompt from '../components/login_prompt';
import {
  getFavoritedSeries,
  getTotalFavoritedPages,
} from '../components/pagination/actions';
import PaginationPage from '../components/pagination/pagination_page';
import NoContentDisplay from '../components/no_content_display/no_content_display';

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

  const message = {
    header: 'No favorites yet!',
    description: 'Any series you favorite will be diplayed on this page.',
  };

  if (!session) {
    return <LoginPrompt />;
  }

  return (
    <>
      {favoritedSeries.length > 0 ? (
        <PaginationPage
          eventSeries={favoritedSeries}
          currentPage={currentPage}
          totalPages={totalFavoritedPages}
        />
      ) : (
        <NoContentDisplay message={message} />
      )}
    </>
  );
};

export default Favorites;
