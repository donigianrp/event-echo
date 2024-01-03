import { authOptions } from '@/app/api/auth/[...nextauth]/route';
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
    include: {
      creator: true,
    },
  });

  if (!eventSeries) notFound();

  if (
    !(session?.user.id === eventSeries.creator_id) &&
    eventSeries.is_private
  ) {
    return <p>Private</p>;
  }

  return (
    <div className="flex flex-col gap-4 p-10">
      <div className="flex justify-between">
        <div>
          <h1 className="text-3xl font-medium">{eventSeries.title}</h1>
          <h2 className="text-md">{eventSeries.creator.name}</h2>
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
      <br />
      {eventSeries.description}
    </div>
  );
}
