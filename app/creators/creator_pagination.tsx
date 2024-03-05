import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import {
  getCreators,
  getCreatorsTotalPages,
} from '../components/pagination/actions';
import PaginationComponent from '../components/pagination/pagination';

export default async function CreatorPagination({
  query,
  currentPage,
  order,
  creatorId,
}: {
  query: string;
  currentPage: number;
  order: string;
  creatorId?: number;
}) {
  const session = await getServerSession(authOptions);
  const limit = 9;

  const creators = await getCreators({
    query,
    currentPage,
    limit,
    order,
    creatorId,
    sessionId: session?.user.id || -1,
  });

  const totalPages = await getCreatorsTotalPages({
    query,
    limit,
    order,
    sessionId: session?.user.id || -1,
  });

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {creators.map((s) => {
          return <div key={s.id}></div>;
        })}
      </div>
      <PaginationComponent totalPages={totalPages} />
    </div>
  );
}
