'use client';

import { Loader2 } from 'lucide-react';
import { useEffect, useRef } from 'react';
import useInView from './use_in_view';
import { EventSeries } from '@prisma/client';
import useSWRInfinite from 'swr/infinite';
import EventSeriesCard from '../event_series_card';

export default function LoadSeries({
  route,
  id,
  query,
}: {
  route: string;
  id?: string;
  query?: string;
}) {
  const container = useRef<HTMLDivElement | null>(null);
  const { isInView } = useInView(container);

  const getKey = (pageIndex: number, previousPageData: any) => {
    if (previousPageData && !previousPageData.result.length) return null;
    let params = `?page=${pageIndex}&limit=5`;
    if (id) {
      params = params + `&id=${id}`;
    }
    if (query) {
      params = params + `&query=${query}`;
    }
    return `/api/${route}` + params;
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
    <div className="flex flex-col gap-6 justify-center sm:p-10 ">
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
      <div ref={container} className="flex justify-center">
        <Loader2 className="animate-spin h-10 w-10" />
      </div>
    </div>
  );
}
