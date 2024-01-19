import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/db';
import { getServerSession } from 'next-auth';
import EditSeriesContainer from './edit_series_container';

export type EventSeriesEditTabs = 'details' | 'events';

const EventSeriesEdit = async ({ params }: { params: { id: string } }) => {
  const session = await getServerSession(authOptions);
  const eventSeries = await prisma.eventSeries.findUnique({
    where: { id: Number(params.id) },
  });

  const categories = await prisma.eventCategory.findMany({});
  const subCategories = await prisma.eventSubCategory.findMany({});

  return (
    <div className="p-10 xl:w-8/12 mx-auto my-10 align-middle">
      {eventSeries && (
        <EditSeriesContainer
          eventSeries={eventSeries}
          categories={categories}
          subCategories={subCategories}
        />
      )}
    </div>
  );
};

export default EventSeriesEdit;
