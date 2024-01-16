import prisma from '@/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');
  const limit = Number(searchParams.get('limit'));
  const page = Number(searchParams.get('page'));
  const id = Number(searchParams.get('id'));

  const result = await prisma.eventSeries.findMany({
    take: limit,
    skip: limit * page,
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
    },
  });

  if (!result) {
    return Response.json({
      message: 'error',
      status: 500,
    });
  }

  return Response.json({
    result,
  });
}
