// POST /event_series/[seriesId]/event/[eventId]/comments
import { YTComment } from 'global';
import prisma from '@/db';

export async function POST(
  request: Request,
  { params }: { params: { eventId: string; seriesId: string } },
) {
  const {
    contents,
    sourceContentId,
  }: { contents: YTComment[]; sourceContentId: number } = await request.json();

  const aggregatedContents = contents.reduce((acc, comment) => {
    acc += comment.snippet.textOriginal;
    if (comment.replies && comment.replies.comments.length > 0) {
      comment.replies.comments.forEach((reply) => {
        acc += reply.snippet.textOriginal;
      });
    }
    return acc;
  }, '');
  try {
    const results = await prisma.comment.create({
      data: {
        contents: aggregatedContents,
        source_content_id: sourceContentId,
      },
    });
    return Response.json({ results }, { status: 200 });
  } catch {
    return Response.json({ status: 400 });
  }
}
