'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Image from 'next/image';

import { useContext } from 'react';
import { EditSeriesContext } from './edit_series_container';
import { GripVertical } from 'lucide-react';
import { EventWithThumbnails } from './page';
interface Props {
  event: EventWithThumbnails;
  idx: number;
  deleteMode: boolean;
}
export function SortableItem({ event, idx, deleteMode }: Props) {
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
      className={`w-full bg-card p-2 px-4 rounded-md ${deleteMode ? 'pr-0 hover:cursor-auto' : 'border-2 border-border hover:cursor-grab active:cursor-grabbing active:bg-primary hover:bg-primary/90'}`}
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition,
      }}
    >
      <div className={`flex flex-col gap-4 sm:flex-row items-center`}>
        <GripVertical className={`${deleteMode ? 'text-transparent' : ''}`} />
        <Image
          className="rounded-sm h-auto w-auto"
          alt="video thumbnail"
          src={thumbnail.url}
          height={thumbnail.height / 3}
          width={thumbnail.width / 3}
        />
        <div
          className={`flex w-full justify-end sm:justify-center items-center gap-4`}
        >
          <div className={`flex flex-1 align-middle`}>
            <h3 className={`text-xl text-foreground ml-4`}>{event.title}</h3>
          </div>
          {!deleteMode && (
            <h1 className={`sm:text-3xl sm:w-14 text-foreground text-center`}>
              {positionMap[event.id]}
            </h1>
          )}
        </div>
      </div>
    </div>
  );
}
