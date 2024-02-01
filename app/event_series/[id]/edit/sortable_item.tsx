'use client';
import { EventModel } from '@/global';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Image from 'next/image';

import { TableCell, TableRow } from '@/app/components/ui/table';
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
  const thumbnail = event.thumbnails.default;
  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={
        'w-full  rounded-r-md hover:cursor-grab active:cursor-grabbing active:bg-primary hover:bg-primary-hover  my-2 border-2 border-gray-100'
      }
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition,
      }}
    >
      <div className={`flex items-center`}>
        <div>
          <Image
            alt="video thumbnail"
            src={thumbnail.url}
            height={thumbnail.height}
            width={thumbnail.width}
          />
        </div>
        <div className={`flex flex-1 align-middle`}>
          <h3 className={`text-xl text-black ml-4`}>{event.title}</h3>
        </div>
        <div className={`w-[75px] mr-2 flex justify-center`}>
          <h1 className={`text-5xl text-black h-full`}>
            {positionMap[event.id]}
          </h1>
        </div>
      </div>
    </div>
  );
}
