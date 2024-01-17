import Link from 'next/link';
import React from 'react';
import { buttonVariants } from '@/components/ui/button';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import LoadSeries from '../components/infinite_scroll/load_series';

export default async function EventSeries() {
  const session = await getServerSession(authOptions);

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
      <LoadSeries route={'event_series'} id={session?.user.id} />
    </div>
  );
}
