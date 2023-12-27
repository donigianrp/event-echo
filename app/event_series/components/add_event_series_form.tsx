'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { createEventSeries } from '../actions';
import { Checkbox } from '@/components/ui/checkbox';
import { Button, buttonVariants } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

const initialState = {
  message: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button id="submit" variant="default" type="submit" aria-disabled={pending}>
      Create
    </Button>
  );
}

const AddEventSeriesForm = () => {
  const [state, formAction] = useFormState(createEventSeries, initialState);

  return (
    <div className="flex w-1/2 mx-auto my-10 align-middle">
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
          <Textarea placeholder="Description" name="description"></Textarea>
          <div className="flex gap-2 leading-none">
            <Checkbox id="is_private" name="is_private" />
            <Label htmlFor="is_private">Private</Label>
          </div>
          <div className="flex gap-4 justify-end">
            <Link
              id="cancel"
              className={buttonVariants({ variant: 'secondary' })}
              href="/event_series"
            >
              Cancel
            </Link>
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
