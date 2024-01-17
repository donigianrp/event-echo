import prisma from '@/db';

export const useSeriesLikes = async ({
  eventId,
  userId,
}: {
  eventId: number;
  userId: number;
}) => {
  const isLikedOrFavorited = await prisma.eventSeries.findUnique({
    where: {
      id: eventId,
    },
    include: {
      user_likes: {
        where: {
          user_id: userId,
          event_series_id: eventId,
        },
      },
      user_favorites: {
        where: {
          user_id: userId,
          event_series_id: eventId,
        },
      },
      _count: {
        select: {
          user_likes: true,
          user_favorites: true,
        },
      },
    },
  });
  return {
    liked: Boolean(isLikedOrFavorited?.user_likes[0]),
    favorited: Boolean(isLikedOrFavorited?.user_favorites[0]),
    likeCount: isLikedOrFavorited?._count.user_likes,
    favCount: isLikedOrFavorited?._count.user_favorites,
  };
};
