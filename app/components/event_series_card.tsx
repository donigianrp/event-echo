'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Thumbnails } from '../workshop/[id]/page';
import { Card, CardContent, CardDescription, CardTitle } from './ui/card';

const EventSeriesCard = (props: {
  id: number;
  title: string;
  description: string | null;
  thumbnails?: Thumbnails;
}) => {
  const pathname = usePathname();
  let link;
  if (pathname.includes('workshop')) {
    link = `/workshop/${props.id}`;
  } else {
    link = `/event_series/${props.id}`;
  }

  const [imageError, setImageError] = useState(false);

  return (
    <Card>
      <CardContent className="flex mx-auto w-full h-40 items-center overflow-hidden relative p-4 justify-center">
        <Link href={link}>
          {props.thumbnails && !imageError && (
            <Image
              className="rounded-sm absolute top-0 left-0 w-full object-fill mix-blend-darken dark:mix-blend-lighten blur-sm transition-all duration-500 opacity-25 hover:opacity-5 hover:scale-125"
              alt="video thumbnail"
              src={props.thumbnails.medium.url}
              height={props.thumbnails.medium.height}
              width={props.thumbnails.medium.width}
              onError={(e) => setImageError(true)}
            />
          )}
          <div className="w-full">
            <CardTitle className="overflow-hidden line-clamp-2 w-full leading-tight">
              {props.title}
            </CardTitle>
            {props.description && (
              <CardDescription className="h-10 overflow-hidden line-clamp-2 mt-2">
                {props.description}
              </CardDescription>
            )}
          </div>
        </Link>
      </CardContent>
    </Card>
  );
};

export default EventSeriesCard;
