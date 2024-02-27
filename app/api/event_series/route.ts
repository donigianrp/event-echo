import { SeriesWithThumbnail } from '@/app/components/pagination/actions';
import { Thumbnails } from '@/app/event_series/[id]/edit/page';
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

  const resultArr: SeriesWithThumbnail[] = [];
  const [result, count] = await prisma.$transaction([
    prisma.eventSeries.findMany({
      take: limit,
      skip: limit * page,
      where: {
        ...(id ? { creator_id: id } : { is_private: false }),
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
            events: {
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
    }),
  ]);

  result.forEach((series) =>
    resultArr.push({
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
      thumbnails: series.events[0]?.events.source_contents[0].source_content
        .thumbnails as unknown as Thumbnails,
    }),
  );

  if (!result || !resultArr) {
    return Response.json({
      message: 'error',
      status: 500,
    });
  }

  return Response.json({
    result: resultArr,
    count,
  });
}
