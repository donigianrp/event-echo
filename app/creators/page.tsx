import prisma from '@/db';
import React from 'react';

export default async function Creators() {
  const creators = await prisma.userSeriesFavorite.aggregate({
    _count: {
      event_series_id: true,
    },
  });
  return <div></div>;
}
