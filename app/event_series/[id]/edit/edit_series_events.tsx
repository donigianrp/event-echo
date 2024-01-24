'use client';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableHeaderRow,
  TableRow,
} from '@/app/components/ui/table';
import { EventModel } from '@/global';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import { useContext, useState } from 'react';
import { EditSeriesContext } from './edit_series_container';
import { SortableItem } from './sortable_item';
import { Button } from '@/app/components/ui/button';
import { useToast } from '@/app/components/ui/use-toast';
import { revalidatePath } from 'next/cache';
import { useRouter } from 'next/navigation';

const EditSeriesEvents = () => {
  const localStore = useContext(EditSeriesContext);
  const events = localStore?.events || [];
  const eventSeries = localStore?.eventSeries;
  const [items, setItems] = useState<EventModel[]>(events);
  const { toast } = useToast();
  const router = useRouter();

  const reorderEvents = (e: DragEndEvent) => {
    if (!e.over) return;

    if (e.active.id !== e.over.id) {
      setItems((items) => {
        const oldIdx = e.active.data.current?.sortable.index;
        const newIdx = e.over?.data.current?.sortable.index;
        return arrayMove(items, oldIdx, newIdx);
      });
    }
  };

  const resetOrder = () => {
    setItems(events);
  };

  const updateSeriesOrder = async (items: EventModel[]) => {
    const updatedPositions: { eventId: number; newPosition: number }[] =
      items.map((item, idx) => {
        return {
          eventId: item.id,
          newPosition: idx + 1,
        };
      });
    try {
      const response = await fetch(`/api/event_series/${eventSeries?.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ updatedPositions }),
      });
      const { message } = await response.json();
      toast({ title: 'Successfully reordered series' });
      router.refresh();
    } catch (error) {
      toast({ title: 'Failed to reorder series' });
    }
  };

  return (
    <div>
      <Button onClick={() => resetOrder()}>Reset</Button>
      <Button onClick={() => updateSeriesOrder(items)}>Save</Button>
      <DndContext onDragEnd={reorderEvents}>
        <main className={'flex flex-col align-middle p-1 g-2'}>
          <Table>
            <TableHeader>
              <TableHeaderRow>
                <TableHead className="w-[50px]">Pos.</TableHead>
                <TableHead className="w-[400px]">Title</TableHead>
                <TableHead>Description</TableHead>
              </TableHeaderRow>
            </TableHeader>
            <TableBody>
              <SortableContext items={items}>
                {items.map((item, idx) => (
                  <SortableItem event={item} idx={idx} key={item.id} />
                ))}
              </SortableContext>
            </TableBody>
          </Table>
        </main>
      </DndContext>
    </div>
  );
};

export default EditSeriesEvents;
