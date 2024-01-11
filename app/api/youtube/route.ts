// GET /youtube
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search') || '';
  if (!search) {
    return;
  }
  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${encodeURI(
        search,
      )}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`,
    );

    const data = await res.json();
    return Response.json({ items: data.items }, { status: 200 });
  } catch {
    return Response.json({ status: 400 });
  }
}
