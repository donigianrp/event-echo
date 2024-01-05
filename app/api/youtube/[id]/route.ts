export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params;
  try {
    const response = await fetch(
      `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=100&order=relevance&videoId=${encodeURI(
        id,
      )}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`,
    );
    const data: { items: YouTubeCommentResp[] } = await response.json();

    return Response.json({ items: data.items }, { status: 200 });
  } catch {
    return Response.json({ status: 400 });
  }
}
