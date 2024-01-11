import prisma from '@/db';

// GET /event_series/[seriesId]/events

export async function GET(
  request: Request,
  { params }: { params: { seriesId: string } },
) {
  const { seriesId } = params;
  try {
    const results = await prisma.event.findMany({
      where: {
        event_series: {
          some: {
            event_series_id: Number(seriesId),
          },
        },
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

export async function POST(request: Request) {
  const {
    title,
    description,
    creator_id,
    eventSeriesId,
    videoId,
    socialMediaId,
    socialMediaPlatformId,
  } = await request.json();

  try {
    const results = await prisma.event.create({
      data: {
        title,
        description,
        creator_id,
      },
    });

    let contentCreatorId = await prisma.sourceContentCreator.findFirst({
      where: { social_media_id: socialMediaId },
    });

    if (!contentCreatorId) {
      contentCreatorId = await prisma.sourceContentCreator.create({
        data: {
          social_media_platform_id: socialMediaPlatformId,
          social_media_id: socialMediaId,
        },
      });
    }

    let sourceContent = await prisma.sourceContent.findFirst({
      where: { content_id: videoId },
    });

    if (!sourceContent) {
      sourceContent = await prisma.sourceContent.create({
        data: {
          url: '',
          content_id: '',
          channel_id: '',
          social_media_platform_id: socialMediaPlatformId,
          social_content_creator_id: contentCreatorId.id,
        },
      });
    }

    const currentMaxPosition = await prisma.eventSeriesEvent.findMany({
      where: { event_series_id: eventSeriesId },
      orderBy: [
        {
          event_position: 'desc',
        },
      ],
      take: 1,
    });

    //create
    const newEventSeriesEvent = await prisma.eventSeriesEvent.create({
      data: {
        event_id: results.id,
        event_series_id: eventSeriesId,
        event_position: currentMaxPosition[0].event_position + 1,
      },
    });

    return Response.json(
      { success: true, event: newEventSeriesEvent },
      { status: 200 },
    );
  } catch {
    return Response.json({ status: 400 });
  }
}
