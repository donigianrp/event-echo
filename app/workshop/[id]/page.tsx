import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/db';
import { Session, getServerSession } from 'next-auth';
import EditSeriesContainer from './edit_series_container';
import { EventModel, EventSeriesModel } from '@/global';
import { EventCategory, EventSubCategory } from '@prisma/client';
import AccessDenied from '@/app/components/access_denied';

export type EventSeriesEditTabs = 'details' | 'events' | 'add' | 'delete';

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
export interface EventWithThumbnails extends EventModel {
  thumbnails: Thumbnails;
}
export interface EditSeriesContextProps {
  categories: EventCategory[];
  subCategories: EventSubCategory[];
  eventSeries: EventSeriesModel | null;
  events: EventWithThumbnails[];
  positionMap: { [val: number]: number };
  session: Session | null;
}

const EventSeriesEdit = async ({ params }: { params: { id: string } }) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <AccessDenied
        message="Must be signed in to edit event series."
        loggedIn={false}
      />
    );
  }

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
      details,
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

  if (session?.user.id !== eventSeries.creator_id) {
    return (
      <AccessDenied
        message="Cannot edit another user's event series."
        loggedIn={true}
      />
    );
  }

  const events = await prisma.event.findMany({
    where: {
      event_series_id: Number(params.id),
    },
    include: {
      source_contents: {
        include: {
          source_content: {
            select: {
              thumbnails: true,
            },
          },
        },
      },
    },
    orderBy: {
      event_position: 'asc',
    },
  });

  const eventsWithThumbnails: EventWithThumbnails[] = [];
  events.forEach((event) =>
    eventsWithThumbnails.push({
      id: event.id,
      created_at: event.created_at,
      updated_at: event.updated_at,
      title: event.title,
      description: event.description,
      event_position: event.event_position,
      event_date_start: event.event_date_start,
      event_date_finish: event.event_date_finish,
      creator_id: event.creator_id,
      thumbnails: event.source_contents[0]?.source_content
        .thumbnails as unknown as Thumbnails,
    }),
  );

  const eventSeriesEvents = await prisma.event.findMany({
    where: { event_series_id: Number(params.id) },
  });

  const positionMap = eventSeriesEvents.reduce(
    (acc, el) => {
      acc[el.id] = el.event_position;
      return acc;
    },
    {} as { [val: number]: number },
  );

  const categories = await prisma.eventCategory.findMany({});
  const subCategories = await prisma.eventSubCategory.findMany({});

  const editSeriesContextProps: EditSeriesContextProps = {
    events: eventsWithThumbnails,
    categories,
    subCategories,
    positionMap,
    eventSeries,
    session,
  };

  return (
    <div className="p-10 xl:w-8/12 mx-auto align-middle">
      {eventSeries && (
        <EditSeriesContainer editSeriesContextProps={editSeriesContextProps} />
      )}
    </div>
  );
};

export default EventSeriesEdit;
