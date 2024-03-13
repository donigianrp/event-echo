'use client';

import { Button } from '@/app/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/app/components/ui/dialog';
import { AlertCircle, Loader2 } from 'lucide-react';
import { deleteEventSeries } from '../actions';
import { Form } from '@/app/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { Input } from '@/app/components/ui/input';
import { useFormStatus } from 'react-dom';

const FormSchema = z.object({
  id: z.number(),
});

function onSubmit(values: z.infer<typeof FormSchema>) {
  deleteEventSeries({ id: values.id });
}

const DeleteEventSeries = ({ id }: { id: number }) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      id,
    },
  });

  function DeleteButton() {
    const { pending } = useFormStatus();

    return (
      <Button
        id="submit"
        type="submit"
        disabled={pending}
        aria-disabled={pending}
        variant="destructive"
      >
        {pending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please Wait
          </>
        ) : (
          <>Delete</>
        )}
      </Button>
    );
  }

  return (
    <div className="mt-4 flex flex-col gap-4">
      <h1 className="text-xl">Delete Event Series</h1>
      <p className="">
        Once you delete an event series, there is no going back. Please be
        certain.
      </p>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="destructive" className="w-fit">
            Delete
          </Button>
        </DialogTrigger>
        <DialogContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Input type="hidden" name="id" value={id} />
              <div className="flex flex-col gap-4">
                <AlertCircle className="text-destructive mx-auto" size={32} />
                <p>
                  Are you sure you want to delete this event series? There is no
                  way to restore it once it has been deleted.
                </p>
                <DeleteButton />
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DeleteEventSeries;
