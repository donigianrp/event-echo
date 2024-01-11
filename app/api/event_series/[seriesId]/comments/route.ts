import prisma from '@/db';

// GET /event_series/[seriesId]/comments
export async function GET(
  request: Request,
  { params }: { params: { seriesId: string } },
) {
  const { seriesId } = params;
  try {
    const results = await prisma.$queryRaw`
      WITH SourceContentIds AS (
        SELECT event_series_event."event_id", source_content_event."source_content_id", event_position
        FROM source_content_event
        LEFT JOIN event_series_event ON event_series_event."event_id" = source_content_event."event_id"
        WHERE event_series_event."event_series_id" = ${Number(seriesId)}
      )

      SELECT comment.*, SourceContentIds."event_id", SourceContentIds."event_position"
      FROM comment
      LEFT JOIN SourceContentIds ON SourceContentIds."source_content_id" = comment."source_content_id"
    `;

    return Response.json({ results }, { status: 200 });
  } catch {
    return Response.json({ status: 400 });
  }
}
