'use client';

import Link from 'next/link';
import FavoriteButton from './buttons/favorite_button';
import LikeButton from './buttons/like_button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { DeleteEventSeriesForm } from '../event_series/components/delete_event_series_form';

export default function EventSeriesCard(props: {
  id: number;
  title: string;
  description: string | null;
  likeIds?: Set<any>;
  favoriteIds?: Set<any>;
}) {
  return (
    <Card className="mx-auto w-full">
      <Link href={`/event_series/${props.id}`}>
        <CardHeader>
          <CardTitle>{props.title}</CardTitle>
          <CardDescription className="h-10 overflow-hidden">
            {props.description}
          </CardDescription>
        </CardHeader>
      </Link>
      {/* {props.likeIds && props.favoriteIds ? (
        <div className="flex px-6 pb-6 gap-2">
          <LikeButton eventId={props.id} liked={props.likeIds.has(props.id)} />
          <FavoriteButton
            eventId={props.id}
            favorited={props.favoriteIds.has(props.id)}
          />
        </div>
      ) : (
        <CardFooter>
          <DeleteEventSeriesForm id={props.id} title={props.title} />
        </CardFooter>
      )} */}
    </Card>
  );
}
