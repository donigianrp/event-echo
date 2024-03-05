import LoadSeries from './infinite_scroll/load_series';

export default async function Feed() {
  return (
    <div className="mx-auto lg:w-1/2 p-10">
      <LoadSeries route={'event_series'} />
    </div>
  );
}
