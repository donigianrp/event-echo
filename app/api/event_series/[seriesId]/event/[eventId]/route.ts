import prisma from '@/db';

// DELETE /event_series/[seriesId]/event/[eventId]

export async function DELETE(
  request: Request,
  { params }: { params: { eventId: string; seriesId: string } },
) {
  const { eventId, seriesId } = params;
  try {
    const sourceContent = await prisma.sourceContentEvent.findFirst({
      where: { event_id: Number(eventId) },
    });

    if (sourceContent) {
      const count = await prisma.sourceContentEvent.count({
        where: { source_content_id: Number(sourceContent.source_content_id) },
      });

      if (count <= 1) {
        await prisma.sourceContent.delete({
          where: { id: sourceContent.source_content_id },
        });
      }

      await prisma.sourceContentEvent.delete({
        where: {
          source_content_id_event_id: {
            source_content_id: sourceContent.source_content_id,
            event_id: Number(eventId),
          },
        },
      });
    }

    const event = await prisma.event.delete({
      where: { id: Number(eventId) },
    });

    return Response.json({ event }, { status: 200 });
  } catch {
    return Response.json({ status: 400 });
  }
}

// PUT /event_series/[seriesId]/event/[eventId]

export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id: eventId } = params;
  const { title = '', description = '' } = await request.json();

  try {
    const results = await prisma.event.update({
      where: { id: Number(eventId) },
      data: {
        title,
        description,
      },
    });

    return Response.json({ results }, { status: 200 });
  } catch {
    return Response.json({ status: 400 });
  }
}

// GET /event_series/[seriesId]/event/[eventId]

export async function GET(
  request: Request,
  { params }: { params: { eventId: string; seriesId: string } },
) {
  const { eventId, seriesId } = params;
  try {
    const event = prisma.event.findFirst({
      where: { id: Number(eventId) },
    });

    return Response.json({ event }, { status: 200 });
  } catch {
    return Response.json({ status: 400 });
  }
}
