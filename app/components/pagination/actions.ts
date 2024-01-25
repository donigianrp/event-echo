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
}: {
  limit: number;
  query: string;
  currentPage: number;
  category: string;
  subcategory: string;
  order: string;
}) {
  return await prisma.eventSeries.findMany({
    take: limit,
    skip: limit * (currentPage - 1),
    where: {
      is_private: false,
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
      ...(category || subcategory
        ? {
            event_type: {
              some: {
                event_type: {
                  AND: [
                    {
                      event_category: {
                        ...(category ? { value: category } : {}),
                      },
                    },
                    {
                      event_sub_category: {
                        ...(subcategory ? { value: subcategory } : {}),
                      },
                    },
                  ],
                },
              },
            },
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
}

export async function getTotalPages({
  limit,
  query,
  category,
  subcategory,
  order,
}: {
  limit: number;
  query: string;
  category: string;
  subcategory: string;
  order: string;
}) {
  const totalPages = await prisma.eventSeries.findMany({
    where: {
      is_private: false,
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
      ...(category || subcategory
        ? {
            event_type: {
              some: {
                event_type: {
                  AND: [
                    {
                      event_category: {
                        ...(category ? { value: category } : {}),
                      },
                    },
                    {
                      event_sub_category: {
                        ...(subcategory ? { value: subcategory } : {}),
                      },
                    },
                  ],
                },
              },
            },
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
