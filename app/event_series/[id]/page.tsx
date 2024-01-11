import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import FavoriteButton from '@/app/components/buttons/favorite_button';
import LikeButton from '@/app/components/buttons/like_button';
import { buttonVariants } from '@/components/ui/button';
import prisma from '@/db';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const eventSeries = await prisma.eventSeries.findMany({});
  return eventSeries.map((series) => {
    id: series.id;
  });
}

export default async function EventSeriesPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getServerSession(authOptions);
  const id = Number(params.id);
  const eventSeries = await prisma.eventSeries.findUnique({
    where: { id },
    // include: {
    //   creator: true,
    // },
  });

  if (!eventSeries) notFound();

  if (
    !(session?.user.id === eventSeries.creator_id) &&
    eventSeries.is_private
  ) {
    return <p>Private</p>;
  }

  const isLikedOrFavorited = await prisma.eventSeries.findUnique({
    where: {
      id: id,
    },
    include: {
      user_likes: true,
      user_favorites: true,
      _count: {
        select: {
          user_likes: true,
          user_favorites: true,
        },
      },
    },
  });

  return (
    <div className="flex flex-col gap-4 p-10">
      <div className="flex justify-between">
        <div>
          <h1 className="text-3xl font-medium">{eventSeries.title}</h1>
          <Link href={`/user/${eventSeries.creator_id}`}>
            {/*<h2 className="text-lg">{eventSeries.creator.name}</h2>
            <h3 className="text-sm">@{eventSeries.creator.username}</h3> */}
          </Link>
        </div>

        <div className="flex gap-4">
          <div className="flex flex-col">
            <LikeButton
              eventId={id}
              liked={Boolean(isLikedOrFavorited?.user_likes[0])}
            />
            <p className="text-center">
              {isLikedOrFavorited?._count.user_likes}
            </p>
          </div>
          <div className="flex flex-col">
            <FavoriteButton
              eventId={id}
              favorited={Boolean(isLikedOrFavorited?.user_favorites[0])}
            />
            <p className="text-center">
              {isLikedOrFavorited?._count.user_favorites}
            </p>
          </div>

          {session?.user.id === eventSeries?.creator_id && (
            <Link
              className={buttonVariants({ variant: 'default' })}
              href={`/event_series/${params.id}/edit`}
            >
              Edit
            </Link>
          )}
        </div>
      </div>
      <br />
      {eventSeries.description}
    </div>
  );
}
