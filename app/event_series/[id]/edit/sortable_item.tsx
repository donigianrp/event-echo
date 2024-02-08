'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Image from 'next/image';

import { useContext } from 'react';
import { EditSeriesContext } from './edit_series_container';
import { EventPosition } from './page';
interface Props {
  event: EventPosition;
  idx: number;
}
export function SortableItem({ event, idx }: Props) {
  const localStore = useContext(EditSeriesContext);
  const positionMap = localStore?.positionMap || {};
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: event.id });
  const thumbnail = event.thumbnails.medium;
  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={
        'w-full p-2 rounded-md hover:cursor-grab active:cursor-grabbing active:bg-primary hover:bg-primary-hover border-2 border-border'
      }
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition,
      }}
    >
      <div className={`flex flex-col sm:flex-row items-center`}>
        <Image
          className="rounded-sm"
          alt="video thumbnail"
          src={thumbnail.url}
          height={thumbnail.height / 2}
          width={thumbnail.width / 2}
        />
        <div className={`flex flex-1 align-middle`}>
          <h3 className={`text-xl text-foreground ml-4`}>{event.title}</h3>
        </div>
        <div className={`flex w-full sm:w-20 justify-end sm:justify-center`}>
          <h1 className={`sm:text-5xl text-foreground h-full`}>
            {positionMap[event.id]}
          </h1>
        </div>
      </div>
    </div>
  );
}
