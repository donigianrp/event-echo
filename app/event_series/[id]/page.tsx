import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import FavoriteButton from '@/app/components/buttons/favorite_button';
import LikeButton from '@/app/components/buttons/like_button';
import Timeline from '@/app/components/timeline/timeline';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/app/components/ui/card';
import { buttonVariants } from '@/components/ui/button';
import prisma from '@/db';
import { useSeriesLikes } from '@/lib/use_series_likes';
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
    include: {
      creator: true,
    },
  });

  const isLikedOrFavorited = await useSeriesLikes({
    eventId: id,
    userId: session?.user.id,
  });

  if (!eventSeries) notFound();

  if (
    !(session?.user.id === eventSeries.creator_id) &&
    eventSeries.is_private
  ) {
    return <p>Private</p>;
  }

  return (
    <>
      <div className="flex flex-col mb-2">
        <div className="flex justify-between">
          <div>
            <Link href={`/user/${eventSeries.creator_id}`}>
              {/*<h2 className="text-lg">{eventSeries.creator.name}</h2>
            <h3 className="text-sm">@{eventSeries.creator.username}</h3> */}
            </Link>
          </div>

          <div className="flex gap-4">
            <div className="flex flex-col">
              <LikeButton eventId={id} liked={isLikedOrFavorited.liked} />
              <p className="text-center">{isLikedOrFavorited.likeCount}</p>
            </div>
            <div className="flex flex-col">
              <FavoriteButton
                eventId={id}
                favorited={isLikedOrFavorited.favorited}
              />
              <p className="text-center">{isLikedOrFavorited.favCount}</p>
            </div>
          </div>
        </div>

        {eventSeries.description}
      </div>
      <Card className="p-2 bg-background">
        <CardHeader>
          <div className="mb-2">
            <div className="flex justify-between">
              <CardTitle className="text-3xl font-medium">
                {eventSeries.title}
              </CardTitle>
              {session?.user.id === eventSeries?.creator_id && (
                <Link
                  className={buttonVariants({ variant: 'default' })}
                  href={`/event_series/${params.id}/edit`}
                >
                  Edit
                </Link>
              )}
            </div>
            <CardTitle className="text-md">
              {eventSeries.creator.name}
            </CardTitle>
          </div>
          <CardDescription>{eventSeries.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="block lg:grid w-full lg:grid-cols-4 lg:gap-4">
            <div className="mb-2 col-span-3 lg:mb-0">
              <Timeline />
            </div>
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Details:</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Example Data 1.</p>
                <p>Example Data 2.</p>
                <p>Example Data 3.</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
