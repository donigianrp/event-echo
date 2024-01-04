import prisma from '@/db';
import { Session } from 'next-auth';

export async function getLikesAndFavorites({
  session,
  id,
}: {
  session: Session | null;
  id?: string;
}) {
  let likeIds = new Set();
  let favoriteIds = new Set();
  const results = await prisma.eventSeries.findMany({
    where: {
      ...(id ? { creator_id: id } : {}),
      is_private: false,
    },
    include: {
      user_likes: {
        where: {
          user_id: session?.user.id,
        },
      },
      user_favorites: {
        where: {
          user_id: session?.user.id,
        },
      },
    },
  });

  for (let i = 0; i < results.length; i++) {
    if (results[i].user_likes[0]) {
      likeIds.add(results[i].user_likes[0].event_series_id);
    }
    if (results[i].user_favorites[0]) {
      favoriteIds.add(results[i].user_favorites[0].event_series_id);
    }
  }

  return { results, likeIds, favoriteIds };
}

export async function getLikes({
  session,
  id,
}: {
  session: Session | null;
  id: string;
}) {
  let likeIds = new Set();
  let favoriteIds = new Set();
  const results = await prisma.eventSeries.findMany({
    where: {
      user_likes: {
        some: {
          user_id: id,
        },
      },
    },
    include: {
      user_likes: {
        where: {
          user_id: session?.user.id,
        },
      },
      user_favorites: {
        where: {
          user_id: session?.user.id,
        },
      },
    },
  });

  for (let i = 0; i < results.length; i++) {
    if (results[i].user_likes[0]) {
      likeIds.add(results[i].user_likes[0].event_series_id);
    }
    if (results[i].user_favorites[0]) {
      favoriteIds.add(results[i].user_favorites[0].event_series_id);
    }
  }

  return { results, likeIds, favoriteIds };
}
