import prisma from '@/db';
import React, { Suspense } from 'react';
import CreatorCardContainer from './creator_card_container';
import { SearchSkeleton } from '../components/skeletons';
import Search from '../components/search/search';
import CreatorContainer from './creator_container';

export interface CreatorLikes {
  id: number;
  name: string;
  username: string;
  email: string;
  image: number;
  likes_total: number;
}

export default async function Creators({
  searchParams,
}: {
  searchParams?: {
    page?: string;
    query?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <div className="p-10">
      <div className="w-[600px]">
        <Search placeholder="Search&#8230;" />
      </div>
      <div className="flex flex-col gap-6 pt-10 justify-center">
        <Suspense key={query + currentPage} fallback={<SearchSkeleton />}>
          <CreatorContainer currentPage={currentPage} query={query} />
        </Suspense>
      </div>
    </div>
  );
}
