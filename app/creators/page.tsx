import prisma from '@/db';
import React from 'react';

export default async function Creators() {
  const creators = await prisma.userSeriesLike.aggregate({
    _count: {
      event_series_id: true,
    },
  });
  console.log(creators);
  return <div></div>;
}
