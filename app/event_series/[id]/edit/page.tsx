import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/db';
import { getServerSession } from 'next-auth';
import EditSeriesContainer from './edit_series_container';
import {
  CategoryModel,
  EventModel,
  EventSeriesModel,
  SubCategoryModel,
} from '@/global';

export type EventSeriesEditTabs = 'details' | 'events';

interface EventPosition extends EventModel {
  event_position: number;
}
export interface EditSeriesContextProps {
  categories: CategoryModel[];
  subCategories: SubCategoryModel[];
  eventSeries: EventSeriesModel | null;
  events: EventPosition[];
  positionMap: { [val: number]: number };
}

const EventSeriesEdit = async ({ params }: { params: { id: string } }) => {
  const session = await getServerSession(authOptions);
  const eventSeries = await prisma.eventSeries.findUnique({
    where: { id: Number(params.id) },
  });

  const events: EventPosition[] = await prisma.$queryRaw`
    WITH EventPositions AS (
      SELECT event_id, event_position
      FROM "event_series_event" 
      WHERE "event_series_event"."event_series_id" = 1
    )

    SELECT "event".*, "event_position" 
    FROM "event"
    LEFT JOIN EventPositions ON EventPositions."event_id" = "event"."id"
    ORDER BY "event_position"
  `;

  const eventSeriesEvents = await prisma.eventSeriesEvent.findMany({
    where: { event_series_id: Number(params.id) },
  });

  const positionMap = eventSeriesEvents.reduce(
    (acc, el) => {
      acc[el.event_id] = el.event_position;
      return acc;
    },
    {} as { [val: number]: number },
  );

  const categories = await prisma.eventCategory.findMany({});
  const subCategories = await prisma.eventSubCategory.findMany({});

  const editSeriesContextProps: EditSeriesContextProps = {
    events,
    categories,
    subCategories,
    positionMap,
    eventSeries,
  };

  return (
    <div className="p-10 xl:w-8/12 mx-auto my-10 align-middle">
      {eventSeries && (
        <EditSeriesContainer editSeriesContextProps={editSeriesContextProps} />
      )}
    </div>
  );
};

export default EventSeriesEdit;
