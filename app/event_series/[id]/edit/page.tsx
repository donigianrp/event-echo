import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import EditEventSeriesForm from '@/app/event_series/components/edit_event_series_form';
import prisma from '@/db';
import { getServerSession } from 'next-auth';

const EventSeriesEdit = async ({ params }: { params: { id: string } }) => {
  const session = await getServerSession(authOptions);
  const eventSeries = await prisma.eventSeries.findUnique({
    where: { id: Number(params.id) },
  });
  return <EditEventSeriesForm eventSeries={eventSeries} />;
};

export default EventSeriesEdit;
