'use client';
import { Button } from '@/app/components/ui/button';
import { useToast } from '@/app/components/ui/use-toast';
import { EventModel } from '@/global';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import { ListRestart, Save } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';
import { EditSeriesContext } from './edit_series_container';
import { EventPosition } from './page';
import { SortableItem } from './sortable_item';

const EditSeriesEvents = () => {
  const localStore = useContext(EditSeriesContext);
  const events = localStore?.events || [];
  const eventSeries = localStore?.eventSeries;
  const [items, setItems] = useState<EventPosition[]>(events);
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
    <div className="flex flex-col gap-4">
      <div className={`flex mt-4 gap-2 justify-end`}>
        <Button variant="outline" onClick={() => resetOrder()}>
          <ListRestart />
        </Button>
        <Button variant="outline" onClick={() => updateSeriesOrder(items)}>
          <Save />
        </Button>
      </div>
      {items.length > 0 && (
        <DndContext onDragEnd={reorderEvents}>
          <main className={'flex flex-col align-middle p-1 g-2'}>
            <div className={'w-full'}>
              <SortableContext items={items}>
                {items.map((item, idx) => (
                  <SortableItem event={item} idx={idx} key={item.id} />
                ))}
              </SortableContext>
            </div>
          </main>
        </DndContext>
      )}
    </div>
  );
};

export default EditSeriesEvents;
