'use client';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';

interface Props {
  id: number;
}

const EventList = ({ id }: Props) => {
  // const events = await fetch()
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
      {/* {series.map((s) => (
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
      ))} */}
    </div>
  );
};

export default EventList;
