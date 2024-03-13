import { EventReqParams } from '@/app/workshop/[id]/add_event_card';
import prisma from '@/db';

// GET /event_series/[seriesId]/event

export async function GET(
  request: Request,
  { params }: { params: { seriesId: string } },
) {
  const { seriesId } = params;
  try {
    const results = await prisma.event.findMany({
      where: {
        event_series_id: Number(seriesId),
      },
      include: {
        source_contents: {
          include: {
            source_content: true,
          },
        },
      },
    });

    return Response.json({ results }, { status: 200 });
  } catch {
    return Response.json({ status: 400 });
  }
}

// POST /event_series/[seriesId]/event

export async function POST(request: Request) {
  const { event } = await request.json();

  const {
    title,
    description,
    creator_id,
    eventSeriesId,
    videoId,
    socialMediaId,
    socialMediaPlatformId,
    thumbnails,
    channelId,
    channelTitle,
  }: EventReqParams = event;

  try {
    let sourceContent = await prisma.sourceContent.findFirst({
      where: { content_id: videoId },
    });

    if (!sourceContent) {
      let contentCreator = await prisma.sourceContentCreator.findFirst({
        where: { social_media_id: socialMediaId },
      });

      if (!contentCreator) {
        contentCreator = await prisma.sourceContentCreator.create({
          data: {
            social_media_platform_id: socialMediaPlatformId,
            social_media_id: socialMediaId,
            name: channelTitle,
          },
        });
      }
      sourceContent = await prisma.sourceContent.create({
        data: {
          url: `https://www.youtube.com/watch?v=${videoId}`,
          content_id: videoId,
          channel_id: channelId,
          title,
          social_media_platform_id: socialMediaPlatformId,
          social_content_creator_id: contentCreator.id,
          thumbnails,
        },
      });
    }

    let eventExists = await prisma.event.findFirst({
      where: {
        AND: [
          {
            event_series_id: eventSeriesId,
          },
          {
            source_contents: {
              some: {
                source_content: {
                  content_id: videoId,
                },
              },
            },
          },
        ],
      },
    });

    if (eventExists) {
      throw new Error('403');
    }

    const currentMaxPosition = await prisma.event.findMany({
      where: { event_series_id: eventSeriesId },
      orderBy: [
        {
          event_position: 'desc',
        },
      ],
      take: 1,
    });

    const createdEvent = await prisma.event.create({
      data: {
        title,
        description,
        creator_id,
        event_series_id: eventSeriesId,
        event_position:
          currentMaxPosition.length > 0
            ? currentMaxPosition[0].event_position + 1
            : 1,
      },
    });

    await prisma.sourceContentEvent.create({
      data: {
        event_id: createdEvent.id,
        source_content_id: sourceContent.id,
      },
    });

    return Response.json(
      {
        success: true,
        event: createdEvent,
        sourceContentId: sourceContent.id,
      },
      { status: 200 },
    );
  } catch (err) {
    if (err instanceof Error && err.message === '403') {
      return Response.json({
        status: 403,
        message: 'This event already exists',
      });
    }
    return Response.json({ status: 400 });
  }
}
