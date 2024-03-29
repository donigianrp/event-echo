import { useContext } from 'react';
import EditEventSeriesForm from './edit_event_series_details';
import { EditSeriesContext } from './edit_series_container';
import EditSeriesEvents from './edit_series_events';
import AddEventToSeries from './add_event_to_series';
import DeleteEventSeries from './delete_event_series';

const EditSeriesContent = () => {
  const localStore = useContext(EditSeriesContext);
  if (!localStore) return <></>;
  const { eventSeries, tab } = localStore;
  return (
    <div>
      {tab === 'details' && <EditEventSeriesForm eventSeries={eventSeries} />}
      {tab === 'events' && <EditSeriesEvents />}
      {tab === 'add' && <AddEventToSeries />}
      {tab === 'delete' && <DeleteEventSeries id={eventSeries.id} />}
    </div>
  );
};

export default EditSeriesContent;
