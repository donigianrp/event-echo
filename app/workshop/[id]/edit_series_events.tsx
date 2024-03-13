'use client';
import { Button } from '@/app/components/ui/button';
import { useToast } from '@/app/components/ui/use-toast';
import { EventModel } from '@/global';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, arrayMove } from '@dnd-kit/sortable';
import { ListRestart, Save, Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';
import { EditSeriesContext } from './edit_series_container';
import { SortableItem } from './sortable_item';
import { deleteEvent } from '../actions';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/app/components/ui/dialog';
import { EventWithThumbnails } from './page';

const EditSeriesEvents = () => {
  const localStore = useContext(EditSeriesContext);
  const events = localStore?.events || [];
  const eventSeries = localStore?.eventSeries;
  const [items, setItems] = useState<EventWithThumbnails[]>(events);
  const [deleteMode, setDeleteMode] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  if (!localStore) return <></>;

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
        <Button
          variant="outline"
          disabled={deleteMode}
          onClick={() => resetOrder()}
        >
          <ListRestart />
        </Button>
        <Button
          variant="outline"
          disabled={deleteMode}
          onClick={() => updateSeriesOrder(items)}
        >
          <Save />
        </Button>
        <Button
          variant="outline"
          className="hover:text-destructive"
          onClick={() => setDeleteMode(!deleteMode)}
        >
          <Trash />
        </Button>
      </div>
      {items.length > 0 && (
        <DndContext onDragEnd={reorderEvents}>
          <main className={'align-middle p-1 g-2'}>
            <div className={'flex flex-col gap-2 w-full'}>
              <SortableContext items={items} disabled={deleteMode}>
                {items.map((item, idx) => (
                  <div
                    key={item.id}
                    className={`flex gap-4 items-center ${deleteMode ? 'bg-card border-2 border-border rounded-md pr-4' : ''}`}
                  >
                    <SortableItem
                      event={item}
                      idx={idx}
                      deleteMode={deleteMode}
                    />
                    {deleteMode && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="destructive" className="w-fit">
                            <Trash />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <p>
                            Are you sure you want to delete this event? There is
                            no way to restore it once it has been deleted.
                          </p>
                          <Button
                            variant="destructive"
                            onClick={() => {
                              deleteEvent({
                                eventId: item.id,
                              });
                              const updatedItems = items.filter(
                                (newItem) => item.id !== newItem.id,
                              );
                              setItems([...updatedItems]);
                              updateSeriesOrder(items);
                            }}
                          >
                            Delete
                          </Button>
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>
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
