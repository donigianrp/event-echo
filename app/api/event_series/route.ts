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

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');
  const limit = Number(searchParams.get('limit'));
  const page = Number(searchParams.get('page'));
  const id = Number(searchParams.get('id'));
  const category = searchParams.get('category');
  const subcategory = searchParams.get('subcategory');
  const order = searchParams.get('order');

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

  const [result, count] = await prisma.$transaction([
    prisma.eventSeries.findMany({
      take: limit,
      skip: limit * page,
      where: {
        ...(id ? { creator_id: id } : {}),
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
    }),
    prisma.eventSeries.count({
      where: {
        ...(id ? { creator_id: id } : undefined),
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
    }),
  ]);

  if (!result) {
    return Response.json({
      message: 'error',
      status: 500,
    });
  }

  return Response.json({
    result,
    count,
  });
}
