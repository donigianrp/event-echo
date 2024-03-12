import prisma from '@/db';
import { CreatorLikes } from './page';

export async function getCreators({
  limit = 9,
  currentPage = 1,
  query = '',
}: {
  limit: number;
  currentPage: number;
  query: string;
}) {
  const creators = await prisma.$queryRaw<CreatorLikes[]>`
    WITH SeriesLikes AS (
      SELECT event_series_id, "event_series"."creator_id", COUNT(event_series_id) as likes
      FROM "user_series_like"
      INNER JOIN "event_series" ON "event_series"."id" = event_series_id
      GROUP BY event_series_id, "event_series"."id"
    )
  
    SELECT "user"."id", "user"."name", "user"."username", "user"."email", "user"."image", COALESCE(SUM(CAST("likes" AS NUMERIC)), 0)as likes_total
    FROM SeriesLikes
    INNER JOIN "user" ON SeriesLikes."creator_id" = "user"."id"
    WHERE "user"."status" LIKE 'active'
    AND LOWER("user"."username") LIKE LOWER(${'%' + query + '%'})
    GROUP BY "creator_id", "user"."id"
    ORDER BY likes_total DESC
    LIMIT ${limit} OFFSET ${limit * (currentPage - 1)}
  `;
  return creators;
}

export async function getCreatorsTotalPages({
  query,
  limit,
}: {
  query: string;
  limit: number;
}) {
  const creators = await prisma.$queryRaw<CreatorLikes[]>`
    WITH SeriesLikes AS (
        SELECT event_series_id, "event_series"."creator_id", COUNT(event_series_id) as likes
        FROM "user_series_like"
        INNER JOIN "event_series" ON "event_series"."id" = event_series_id
        GROUP BY event_series_id, "event_series"."id"
    )

    SELECT "user"."id"
    FROM SeriesLikes
    INNER JOIN "user" ON SeriesLikes."creator_id" = "user"."id"
    WHERE "user"."status" LIKE 'active'
    AND LOWER("user"."username") LIKE LOWER(${'%' + query + '%'})
    GROUP BY "creator_id", "user"."id"
  `;
  return Math.ceil(creators.length / limit);
}
