import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import EditEventSeriesForm from '@/app/event_series/components/edit_event_series_form';
import prisma from '@/db';
import { getServerSession } from 'next-auth';

const CreateEvent = async ({ params }: { params: { id: string } }) => {
  const session = await getServerSession(authOptions);
  const eventSeries = await prisma.eventSeries.findUnique({
    where: { id: Number(params.id) },
  });

  const createEvent = () => {};

  const addContentToEvent = () => {};

  const addEventToSeries = () => {};

  if (session?.user.id === eventSeries?.creator_id) {
    return <EditEventSeriesForm eventSeries={eventSeries} />;
  }
  return <p>Cannot edit another user&apos;s event series.</p>;
};

export default CreateEvent;
