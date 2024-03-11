import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import PaginationComponent from '../components/pagination/pagination';
import { getCreators, getCreatorsTotalPages } from './actions';
import CreatorCard from './creator_card';

export default async function CreatorContainer({
  currentPage,
  query,
}: {
  currentPage: number;
  query: string;
}) {
  const limit = 9;

  const creators = await getCreators({
    limit,
    currentPage,
    query,
  });

  const formatted = creators.map((creator) => ({
    ...creator,
    likes_total: Number(creator.likes_total),
  }));

  const totalPages = await getCreatorsTotalPages({ query, limit: 9 });

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {formatted.map((creator) => {
          return (
            <div key={creator.id}>
              <CreatorCard creator={creator} />
            </div>
          );
        })}
      </div>
      <PaginationComponent totalPages={totalPages} />
    </div>
  );
}
