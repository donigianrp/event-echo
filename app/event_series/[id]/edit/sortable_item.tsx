'use client';
import { EventModel } from '@/global';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { TableCell, TableRow } from '@/app/components/ui/table';
import { useContext } from 'react';
import { EditSeriesContext } from './edit_series_container';
interface Props {
  event: EventModel;
  idx: number;
}
export function SortableItem({ event, idx }: Props) {
  const localStore = useContext(EditSeriesContext);
  const positionMap = localStore?.positionMap || {};
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: event.id });

  return (
    <TableRow
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={'w-full hover:cursor-grab active:cursor-grabbing'}
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition,
      }}
    >
      <TableCell>{positionMap[event.id] + 1}</TableCell>
      <TableCell className="font-medium">{event.title}</TableCell>
      <TableCell>{event.description}</TableCell>
    </TableRow>
  );
}
