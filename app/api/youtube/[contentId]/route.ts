// GET /youtube/[contentId]

export async function GET(
  request: Request,
  { params }: { params: { contentId: string } },
) {
  const { contentId } = params;
  try {
    const response = await fetch(
      `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=100&order=relevance&videoId=${encodeURI(
        contentId,
      )}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`,
    );
    const data: { items: YouTubeCommentResp[] } = await response.json();

    return Response.json(
      { items: data.items, channelId: data.items[0].snippet.channelId },
      { status: 200 },
    );
  } catch {
    return Response.json({ status: 400 });
  }
}
