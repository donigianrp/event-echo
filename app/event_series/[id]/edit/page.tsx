import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/db';
import { Session, getServerSession } from 'next-auth';
import EditSeriesContainer from './edit_series_container';
import {
  CategoryModel,
  EventModel,
  EventSeriesModel,
  SubCategoryModel,
} from '@/global';

export type EventSeriesEditTabs = 'details' | 'events' | 'add';

export interface ContentThumbnail {
  url: string;
  width: number;
  height: number;
}
export interface EventPosition extends EventModel {
  event_position: number;
  thumbnails: {
    high: ContentThumbnail;
    medium: ContentThumbnail;
    default: ContentThumbnail;
    standard: ContentThumbnail;
  };
}
export interface EditSeriesContextProps {
  categories: CategoryModel[];
  subCategories: SubCategoryModel[];
  eventSeries: EventSeriesModel | null;
  events: EventPosition[];
  positionMap: { [val: number]: number };
  session: Session | null;
}

const EventSeriesEdit = async ({ params }: { params: { id: string } }) => {
  const session = await getServerSession(authOptions);
  const eventSeries = await prisma.eventSeries.findUnique({
    where: { id: Number(params.id) },
  });

  const events = await prisma.$queryRaw<EventPosition[]>`
    WITH EventPositions AS (
      SELECT event_id, event_position
      FROM "event_series_event" 
      WHERE "event_series_event"."event_series_id" = ${Number(params.id)}
    )

    SELECT "event".*, "event_position", "thumbnails" 
    FROM "event"
    INNER JOIN EventPositions ON EventPositions."event_id" = "event"."id"
    LEFT JOIN "source_content_event" ON "source_content_event"."event_id" = "event"."id"
    LEFT JOIN "source_content" ON "source_content"."id" = "source_content_event"."source_content_id"
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
    session,
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
