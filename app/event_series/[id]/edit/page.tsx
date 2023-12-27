import EditEventSeriesForm from '@/app/event_series/components/edit_event_series_form';
import prisma from '@/db';

const EventSeriesEdit = async ({ params }: { params: { id: string } }) => {
  const eventSeries = await prisma.eventSeries.findUnique({
    where: { id: Number(params.id) },
  });

  return <EditEventSeriesForm eventSeries={eventSeries} />;
};

export default EventSeriesEdit;
