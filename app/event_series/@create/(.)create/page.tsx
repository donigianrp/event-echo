import Modal from '@/app/event_series/components/modal';
import AddEventSeriesForm from '@/app/event_series/components/add_event_series_form';

const EventSeriesCreateModal = async () => {
  return (
    <Modal>
      <AddEventSeriesForm />
    </Modal>
  );
};

export default EventSeriesCreateModal;
