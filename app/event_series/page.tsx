import prisma from '@/db';
import Link from 'next/link';
import React from 'react';
import { DeleteEventSeriesForm } from '@/app/event_series/components/delete_event_series_form';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { buttonVariants } from '@/components/ui/button';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';

export default async function EventSeries() {
  const session = await getServerSession(authOptions);
  let series = await prisma.eventSeries.findMany({
    where: {
      creator_id: session?.user.id,
    },
  });

  return (
    <div className="flex flex-col gap-6 mx-auto justify-center p-10 lg:w-1/2">
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold">Event Series</h1>
        <div className="">
          <Link
            className={buttonVariants({ variant: 'default' })}
            href="/event_series/create"
          >
            Create New Event Series
          </Link>
        </div>
      </div>
      {series.map((s) => (
        <Card key={s.id}>
          <CardHeader>
            <CardTitle>
              <Link href={`/event_series/${s.id}`}>{s.title}</Link>
            </CardTitle>
            <CardDescription>{s.description}</CardDescription>
          </CardHeader>
          <CardFooter>
            <DeleteEventSeriesForm id={s.id} title={s.title} />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
