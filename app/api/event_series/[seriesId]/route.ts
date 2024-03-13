import prisma from '@/db';

// PUT /event_series/[seriesId]

export async function PUT(
  request: Request,
  { params }: { params: { seriesId: string } },
) {
  try {
    const {
      updatedPositions,
    }: {
      updatedPositions: { eventId: number; newPosition: number }[];
    } = await request.json();

    const { seriesId } = params;

    await prisma.$transaction(async (tx) => {
      for (const { eventId, newPosition } of updatedPositions) {
        await tx.event.updateMany({
          where: {
            event_series_id: Number(seriesId),
            id: eventId,
          },
          data: {
            event_position: newPosition,
          },
        });
      }
    });

    return Response.json({
      success: true,
    });
  } catch {
    return Response.json({
      message: 'error',
      status: 500,
    });
  } finally {
    await prisma.$disconnect();
  }
}
