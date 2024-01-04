import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import FavoriteButton from '@/app/components/buttons/favorite_button';
import LikeButton from '@/app/components/buttons/like_button';
import SubscribeButton from '@/app/components/buttons/subscribe_button';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/app/components/ui/avatar';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/app/components/ui/card';
import { Separator } from '@/app/components/ui/separator';
import { Skeleton } from '@/app/components/ui/skeleton';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/app/components/ui/tabs';
import prisma from '@/db';
import { getLikes, getLikesAndFavorites } from '@/lib/button_functions';
import { getServerSession } from 'next-auth';
import Link from 'next/link';

export async function generateStaticParams() {
  const users = await prisma.user.findMany({});
  return users.map((user) => {
    id: user.id;
  });
}

export default async function UserProfile({
  params,
}: {
  params: { id: string };
}) {
  const user = await prisma.user.findUnique({
    where: {
      id: params.id,
    },
  });
  if (!user) {
    return <p>User does not exist.</p>;
  }

  const session = await getServerSession(authOptions);

  const isSubscribed = await prisma.subscriptions.findUnique({
    where: {
      subscription_id: {
        subscribed_by_id: session?.user.id || '',
        subscribed_to_id: params.id,
      },
    },
  });

  const series = await getLikesAndFavorites({ session, id: params.id });
  const likes = await getLikes({ session, id: params.id });
  const subscriptions = await prisma.subscriptions.findMany({
    where: {
      subscribed_by_id: params.id,
    },
    include: {
      subscribed_to: true,
    },
  });

  return (
    <div className="lg:w-1/2 mx-auto flex flex-col gap-6 border-l border-r p-8">
      <div>
        <Avatar className="w-[96px] h-[96px] border">
          <AvatarImage src={user.image || 'https://github.com/shadcn.png'} />
          <AvatarFallback>
            <Skeleton className="w-12 h-12 rounded-full" />
          </AvatarFallback>
        </Avatar>
        <div className="flex justify-between">
          <div>
            <h1 className="text-2xl tracking-tight">{user?.name}</h1>
            <h2 className="text-sm text-muted-foreground">@username</h2>
          </div>
          <div className="items-center">
            {session?.user.id === params.id ? (
              ''
            ) : (
              <SubscribeButton
                id={params.id}
                isSubscribed={Boolean(isSubscribed)}
              />
            )}
          </div>
        </div>
      </div>
      <Separator />
      <Tabs defaultValue="series" className="flex flex-col gap-6">
        <TabsList>
          <TabsTrigger value="series">Event Series</TabsTrigger>
          <TabsTrigger value="likes">Likes</TabsTrigger>
          <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
        </TabsList>
        <TabsContent value="series">
          <div className="flex flex-col gap-6">
            {series.results.map((s) => (
              <Card key={s.id}>
                <CardHeader>
                  <CardTitle>
                    <Link href={`/event_series/${s.id}`}>{s.title}</Link>
                  </CardTitle>
                  <CardDescription>{s.description}</CardDescription>
                </CardHeader>
                <div className="flex px-6 pb-6 gap-2">
                  <LikeButton id={s.id} liked={series.likeIds.has(s.id)} />
                  <FavoriteButton
                    id={s.id}
                    favorited={series.favoriteIds.has(s.id)}
                  />
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="likes">
          <div className="flex flex-col gap-6">
            {likes.results.map((s) => (
              <Card key={s.id}>
                <CardHeader>
                  <CardTitle>
                    <Link href={`/event_series/${s.id}`}>{s.title}</Link>
                  </CardTitle>
                  <CardDescription>{s.description}</CardDescription>
                </CardHeader>
                <div className="flex px-6 pb-6 gap-2">
                  <LikeButton id={s.id} liked={likes.likeIds.has(s.id)} />
                  <FavoriteButton
                    id={s.id}
                    favorited={likes.favoriteIds.has(s.id)}
                  />
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="subscriptions">
          {subscriptions.map((user) => (
            <Link
              key={user.subscribed_to_id}
              href={`/user/${user.subscribed_to_id}`}
            >
              <div className="inline-flex gap-4 items-center">
                <Avatar className="border">
                  <AvatarImage
                    src={
                      user.subscribed_to.image ||
                      'https://github.com/shadcn.png'
                    }
                  />
                  <AvatarFallback>
                    <Skeleton className="w-12 h-12 rounded-full" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <p>{user.subscribed_to.name}</p>
                  <p className="text-xs">@username</p>
                </div>
              </div>
              <Separator className="my-4" />
            </Link>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
