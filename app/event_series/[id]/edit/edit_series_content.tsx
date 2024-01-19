import { useContext } from 'react';
import EditEventSeriesForm from './edit_event_series_details';
import { EditSeriesContext } from './edit_series_container';
import EditSeriesEvents from './edit_series_events';

const EditSeriesContent = () => {
  const localStore = useContext(EditSeriesContext);
  if (!localStore) return <></>;
  const { eventSeries, tab } = localStore;
  return (
    <div>
      {tab === 'details' ? (
        <EditEventSeriesForm eventSeries={eventSeries} />
      ) : (
        <EditSeriesEvents />
      )}
    </div>
  );
};

export default EditSeriesContent;
