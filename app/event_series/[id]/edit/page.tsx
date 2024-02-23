import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/db';
import { Session, getServerSession } from 'next-auth';
import EditSeriesContainer from './edit_series_container';
import { EventModel, EventSeriesModel } from '@/global';
import { EventCategory, EventSubCategory } from '@prisma/client';

export type EventSeriesEditTabs = 'details' | 'events' | 'add';

export interface ContentThumbnail {
  url: string;
  width: number;
  height: number;
}

export interface Thumbnails {
  high: ContentThumbnail;
  medium: ContentThumbnail;
  default: ContentThumbnail;
  standard: ContentThumbnail;
}
export interface EventPosition extends EventModel {
  event_position: number;
  thumbnails: Thumbnails;
}
export interface EditSeriesContextProps {
  categories: EventCategory[];
  subCategories: EventSubCategory[];
  eventSeries: EventSeriesModel | null;
  events: EventPosition[];
  positionMap: { [val: number]: number };
  session: Session | null;
}

const EventSeriesEdit = async ({ params }: { params: { id: string } }) => {
  const session = await getServerSession(authOptions);
  const eventSeries = (
    await prisma.$queryRaw<EventSeriesModel[]>`
    WITH EventSeriesTags AS (
      SELECT event_series_id, json_agg(
        json_build_object(
          'id', event_tag.id::varchar(255),
          'text', event_tag_text)
      ) as tags
    FROM event_tag_event_series
    INNER JOIN event_tag ON event_tag_event_series.event_tag_text = event_tag.text
    WHERE event_series_id = ${Number(params.id)}
    GROUP BY event_series_id
    )
    SELECT 
      id,
      title,
      description,
      is_private,
      view_count,
      creator_id,
      has_adult_content,
      has_spam,
      category_id,
      sub_category_id,
      COALESCE(EventSeriesTags.tags, '[]') as tags
    FROM event_series
    LEFT JOIN EventSeriesTags ON EventSeriesTags.event_series_id = event_series.id
    WHERE id = ${Number(params.id)}
    `
  )[0];

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
