'use client';

import { Loader2 } from 'lucide-react';
import { useEffect, useRef } from 'react';
import useInView from './use_in_view';
import { EventSeries } from '@prisma/client';
import useSWRInfinite from 'swr/infinite';
import EventSeriesCard from '../event_series_card';
import { useSearchParams } from 'next/navigation';
import { Button } from '../ui/button';

export default function LoadSeries({
  route,
  id,
  query,
}: {
  route: string;
  id?: string;
  query?: string;
}) {
  const numOfEventSeries = 5;
  const container = useRef<HTMLDivElement | null>(null);
  const { isInView } = useInView(container);

  const searchParams = useSearchParams();
  const getKey = (pageIndex: number, previousPageData: any) => {
    if (previousPageData && !previousPageData.result.length) return null;
    const params = new URLSearchParams(searchParams);
    params.set('page', pageIndex.toString());
    params.set('limit', numOfEventSeries.toString());
    if (id) {
      params.set('id', id);
    }
    if (query) {
      params.set('query', query);
    }
    return `/api/${route}?${params.toString()}`;
  };
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, size, setSize } = useSWRInfinite(getKey, fetcher);

  useEffect(() => {
    if (isInView) {
      setSize(size + 1);
    }
  }, [isInView]);

  if (!data) {
    return (
      <div className="flex justify-center">
        <Loader2 className="animate-spin h-10 w-10" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 justify-center sm:p-10">
      {data.map((series) => {
        return series.result.map((s: EventSeries) => (
          <EventSeriesCard
            key={s.id}
            id={s.id}
            title={s.title}
            description={s.description}
          />
        ));
      })}
      {size * numOfEventSeries < data[0].count && (
        <div className="flex justify-center">
          <Button
            onClick={() => {
              setSize(size + 1);
            }}
          >
            Load More
          </Button>
        </div>
      )}
    </div>
  );
}
