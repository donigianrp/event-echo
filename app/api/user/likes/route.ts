import prisma from '@/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = Number(searchParams.get('limit'));
  const page = Number(searchParams.get('page'));
  const id = Number(searchParams.get('id'));

  const result = await prisma.eventSeries.findMany({
    take: limit,
    skip: limit * page,
    where: {
      is_private: false,
      user_likes: {
        some: {
          user_id: id,
        },
      },
    },
  });

  return Response.json({ result });
}
