import { Thumbnails } from '@/app/workshop/[id]/page';
import prisma from '@/db';

type OrderMap = {
  [key: string]: any;
  latest: {
    created_at: string;
  };
  oldest: {
    created_at: string;
  };
  views: {
    view_count: string;
  };
  likes: {
    user_likes: {
      _count: string;
    };
  };
  favorites: {
    user_favorites: {
      _count: string;
    };
  };
};

export interface SeriesWithThumbnail {
  id: number;
  title: string;
  description: string | null;
  created_at: Date;
  updated_at: Date;
  is_private: boolean;
  view_count: number | null;
  creator_id: number;
  has_adult_content: boolean;
  has_spam: boolean;
  thumbnails: Thumbnails | null;
}

const orderMap: OrderMap = {
  latest: {
    created_at: 'desc',
  },
  oldest: {
    created_at: 'asc',
  },
  views: {
    view_count: 'desc',
  },
  likes: {
    user_likes: {
      _count: 'desc',
    },
  },
  favorites: {
    user_favorites: {
      _count: 'desc',
    },
  },
};

export async function getFilteredEventSeries({
  limit,
  query,
  currentPage,
  category,
  subcategory,
  order,
  creatorId,
  sessionId,
}: {
  limit: number;
  query: string;
  currentPage: number;
  category: string;
  subcategory: string;
  order: string;
  creatorId?: number;
  sessionId: number;
}) {
  const filteredSeriesArr: SeriesWithThumbnail[] = [];
  const filteredSeries = await prisma.eventSeries.findMany({
    take: limit,
    skip: limit * (currentPage - 1),
    where: {
      ...(creatorId ? { creator_id: creatorId } : {}),
      AND: [
        {
          OR: [
            {
              is_private: false,
            },
            {
              AND: {
                is_private: true,
                creator_id: sessionId,
              },
            },
          ],
        },
        {
          OR: [
            {
              title: {
                contains: query || '',
                mode: 'insensitive',
              },
            },
            {
              description: {
                contains: query || '',
                mode: 'insensitive',
              },
            },
          ],
        },
      ],
      ...(category
        ? {
            category: { value: category },
          }
        : {}),
      ...(subcategory
        ? {
            sub_category: { value: subcategory },
          }
        : {}),
    },
    ...(order === 'likes'
      ? {
          include: {
            _count: {
              select: {
                user_likes: true,
              },
            },
          },
        }
      : {}),
    ...(order === 'favorites'
      ? {
          include: {
            _count: {
              select: {
                user_favorites: true,
              },
            },
          },
        }
      : {}),
    ...(order
      ? {
          orderBy: orderMap[order],
        }
      : {}),
    include: {
      events: {
        where: {
          event_position: 1,
        },
        include: {
          source_contents: {
            include: {
              source_content: {
                select: {
                  thumbnails: true,
                },
              },
            },
          },
        },
      },
    },
  });
  filteredSeries.forEach((series) =>
    filteredSeriesArr.push({
      id: series.id,
      title: series.title,
      description: series.description,
      created_at: series.created_at,
      updated_at: series.updated_at,
      is_private: series.is_private,
      view_count: series.view_count,
      creator_id: series.creator_id,
      has_adult_content: series.has_adult_content,
      has_spam: series.has_spam,
      thumbnails: series.events[0]?.source_contents[0]?.source_content
        .thumbnails as unknown as Thumbnails,
    }),
  );
  return filteredSeriesArr;
}

export async function getLikedSeries({
  sessionId,
  limit,
  currentPage,
}: {
  sessionId: number;
  limit: number;
  currentPage: number;
}) {
  const likedSeriesArr: SeriesWithThumbnail[] = [];
  const likedSeries = await prisma.userSeriesLike.findMany({
    take: limit,
    skip: limit * (currentPage - 1),
    where: {
      user_id: sessionId,
    },
    include: {
      event_series: {
        include: {
          events: {
            where: {
              event_position: 1,
            },
            include: {
              source_contents: {
                include: {
                  source_content: {
                    select: {
                      thumbnails: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });
  likedSeries.forEach((series) =>
    likedSeriesArr.push({
      id: series.event_series.id,
      title: series.event_series.title,
      description: series.event_series.description,
      created_at: series.event_series.created_at,
      updated_at: series.event_series.updated_at,
      is_private: series.event_series.is_private,
      view_count: series.event_series.view_count,
      creator_id: series.event_series.creator_id,
      has_adult_content: series.event_series.has_adult_content,
      has_spam: series.event_series.has_spam,
      thumbnails: series.event_series.events[0]?.source_contents[0]
        .source_content.thumbnails as unknown as Thumbnails,
    }),
  );
  return likedSeriesArr;
}

export async function getFavoritedSeries({
  sessionId,
  limit,
  currentPage,
}: {
  sessionId: number;
  limit: number;
  currentPage: number;
}) {
  const favoritedSeriesArr: SeriesWithThumbnail[] = [];
  const favoritedSeries = await prisma.userSeriesFavorite.findMany({
    take: limit,
    skip: limit * (currentPage - 1),
    where: {
      user_id: sessionId,
    },
    include: {
      event_series: {
        include: {
          events: {
            where: {
              event_position: 1,
            },
            include: {
              source_contents: {
                include: {
                  source_content: {
                    select: {
                      thumbnails: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });
  favoritedSeries.forEach((series) =>
    favoritedSeriesArr.push({
      id: series.event_series.id,
      title: series.event_series.title,
      description: series.event_series.description,
      created_at: series.event_series.created_at,
      updated_at: series.event_series.updated_at,
      is_private: series.event_series.is_private,
      view_count: series.event_series.view_count,
      creator_id: series.event_series.creator_id,
      has_adult_content: series.event_series.has_adult_content,
      has_spam: series.event_series.has_spam,
      thumbnails: series.event_series.events[0]?.source_contents[0]
        .source_content.thumbnails as unknown as Thumbnails,
    }),
  );
  return favoritedSeriesArr;
}

export async function getTotalPages({
  limit,
  query,
  category,
  subcategory,
  order,
  sessionId,
}: {
  limit: number;
  query: string;
  category: string;
  subcategory: string;
  order: string;
  sessionId: number;
}) {
  const totalPages = await prisma.eventSeries.findMany({
    where: {
      AND: [
        {
          OR: [
            {
              is_private: false,
            },
            {
              AND: {
                is_private: true,
                creator_id: sessionId,
              },
            },
          ],
        },
        {
          OR: [
            {
              title: {
                contains: query || '',
                mode: 'insensitive',
              },
            },
            {
              description: {
                contains: query || '',
                mode: 'insensitive',
              },
            },
          ],
        },
      ],
      ...(category
        ? {
            category: { value: category },
          }
        : {}),
      ...(subcategory
        ? {
            sub_category: { value: subcategory },
          }
        : {}),
    },
    ...(order === 'likes'
      ? {
          include: {
            _count: {
              select: {
                user_likes: true,
              },
            },
          },
        }
      : {}),
    ...(order === 'favorites'
      ? {
          include: {
            _count: {
              select: {
                user_favorites: true,
              },
            },
          },
        }
      : {}),
    ...(order
      ? {
          orderBy: orderMap[order],
        }
      : {}),
  });

  return Math.ceil(totalPages.length / limit);
}
export async function getWorkshopTotalPages({
  limit,
  query,
  category,
  subcategory,
  order,
  sessionId,
}: {
  limit: number;
  query: string;
  category: string;
  subcategory: string;
  order: string;
  sessionId: number;
}) {
  const totalPages = await prisma.eventSeries.findMany({
    where: {
      AND: [
        {
          creator_id: sessionId,
        },
        {
          OR: [
            {
              title: {
                contains: query || '',
                mode: 'insensitive',
              },
            },
            {
              description: {
                contains: query || '',
                mode: 'insensitive',
              },
            },
          ],
        },
      ],
      ...(category
        ? {
            category: { value: category },
          }
        : {}),
      ...(subcategory
        ? {
            sub_category: { value: subcategory },
          }
        : {}),
    },
    ...(order === 'likes'
      ? {
          include: {
            _count: {
              select: {
                user_likes: true,
              },
            },
          },
        }
      : {}),
    ...(order === 'favorites'
      ? {
          include: {
            _count: {
              select: {
                user_favorites: true,
              },
            },
          },
        }
      : {}),
    ...(order
      ? {
          orderBy: orderMap[order],
        }
      : {}),
  });

  return Math.ceil(totalPages.length / limit);
}

export async function getTotalLikedPages({
  sessionId,
  limit,
}: {
  sessionId: number;
  limit: number;
}) {
  const totalPages = await prisma.userSeriesLike.findMany({
    where: {
      user_id: sessionId,
    },
  });

  return Math.ceil(totalPages.length / limit);
}

export async function getTotalFavoritedPages({
  sessionId,
  limit,
}: {
  sessionId: number;
  limit: number;
}) {
  const totalPages = await prisma.userSeriesFavorite.findMany({
    where: {
      user_id: sessionId,
    },
  });
  return Math.ceil(totalPages.length / limit);
}
