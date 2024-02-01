// GET /youtube/video/[contentId]
export async function GET(
  request: Request,
  { params }: { params: { contentId: string } },
) {
  const { contentId } = params;
  try {
    const res = await fetch(
      `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${encodeURI(
        contentId,
      )}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`,
    );

    const data = await res.json();
    return Response.json({ items: data.items }, { status: 200 });
  } catch {
    return Response.json({ status: 400 });
  }
}
