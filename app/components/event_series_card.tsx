import Link from 'next/link';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from './ui/card';
import React from 'react';
import { Thumbnails } from '../event_series/[id]/edit/page';
import Image from 'next/image';

const EventSeriesCard = (props: {
  id: number;
  title: string;
  description: string | null;
  thumbnails?: Thumbnails;
}) => {
  return (
    <Card className="mx-auto w-full">
      <Link href={`/event_series/${props.id}`}>
        <CardHeader>
          <div className="flex justify-between items-center">
            {props.thumbnails && (
              <div className="mr-4 hidden sm:inline-block">
                <Image
                  className="rounded-sm"
                  alt="video thumbnail"
                  src={props.thumbnails.medium.url}
                  height={props.thumbnails.medium.height}
                  width={props.thumbnails.medium.width}
                />
              </div>
            )}
            <div className="w-full">
              <CardTitle className="h-12 overflow-hidden line-clamp-2 w-full">
                {props.title}
              </CardTitle>
              {props.description && (
                <CardDescription className="h-10 overflow-hidden line-clamp-2 mt-2">
                  {props.description}
                </CardDescription>
              )}
            </div>
          </div>
        </CardHeader>
        {props.thumbnails && (
          <CardContent className="flex justify-center items-center sm:hidden">
            <Image
              className="rounded-sm w-2/3 inline-block sm:hidden"
              alt="video thumbnail"
              src={props.thumbnails.medium.url}
              height={props.thumbnails.medium.height}
              width={props.thumbnails.medium.width}
            />
          </CardContent>
        )}
      </Link>
    </Card>
  );
};

export default EventSeriesCard;
