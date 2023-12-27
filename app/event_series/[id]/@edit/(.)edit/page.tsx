import Modal from '@/app/event_series/components/modal';
import EditEventSeriesForm from '@/app/event_series/components/edit_event_series_form';
import prisma from '@/db';

const EventSeriesEditModal = async ({ params }: { params: { id: string } }) => {
  const eventSeries = await prisma.eventSeries.findUnique({
    where: { id: Number(params.id) },
  });

  return (
    <Modal>
      <EditEventSeriesForm eventSeries={eventSeries} />
    </Modal>
  );
};

export default EventSeriesEditModal;
