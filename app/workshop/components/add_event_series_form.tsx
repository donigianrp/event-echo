'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { createEventSeries } from '../actions';
import { Checkbox } from '../../components/ui/checkbox';
import { Button } from '../../components/ui/button';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Input } from '../../components/ui/input';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

const initialState = {
  message: '',
};

const AddEventSeriesForm = () => {
  const [state, formAction] = useFormState(createEventSeries, initialState);
  const [cancelled, setCancelled] = useState(false);

  if (cancelled) {
    redirect('/workshop');
  }

  function SubmitButton() {
    const { pending } = useFormStatus();

    return (
      <Button
        id="submit"
        type="submit"
        disabled={pending}
        aria-disabled={pending}
      >
        {pending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please Wait
          </>
        ) : (
          <>Create</>
        )}
      </Button>
    );
  }

  return (
    <div className="flex w-1/2 mx-auto py-10 align-middle">
      <form action={formAction} className="w-full">
        <div className="flex flex-col gap-6">
          <h1 className="text-xl">Create an Event Series</h1>
          <Input
            autoFocus
            placeholder="Title"
            type="text"
            name="title"
            required
            className="border-b p-1"
          ></Input>
          <Textarea placeholder="Description" name="description" />
          <Textarea placeholder="Details" name="details" />
          <div className="flex gap-2 leading-none">
            <Checkbox id="is_private" name="is_private" />
            <Label htmlFor="is_private">Private</Label>
          </div>
          <div className="flex gap-4 justify-end">
            <Button variant="secondary" onClick={() => setCancelled(true)}>
              Cancel
            </Button>
            <SubmitButton />
          </div>
          <p aria-live="polite" className="sr-only" role="status">
            {state?.message}
          </p>
        </div>
      </form>
    </div>
  );
};

export default AddEventSeriesForm;
