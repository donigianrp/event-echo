'use client';

import { Button } from '../ui/button';
import { useFormState } from 'react-dom';
import { subscribe } from './actions';
import { useSession } from 'next-auth/react';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import Login from '@/app/login/components/login';

export default function SubscribeButton(props: {
  id: number;
  isSubscribed: boolean;
}) {
  const initialState = {
    message: '',
    isSubscribed: props.isSubscribed,
  };

  const { status } = useSession();
  const [state, formAction] = useFormState(subscribe, initialState);

  if (status === 'unauthenticated') {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={'default'}>Subscribe</Button>
        </DialogTrigger>
        <DialogContent>
          <Login />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <form action={formAction}>
      <input type="hidden" name="subscribed_to_id" value={props.id} />
      <input
        type="hidden"
        name="subscribed"
        value={String(props.isSubscribed)}
      />
      {props.isSubscribed ? (
        <Button variant="secondary" type="submit">
          Subscribed
        </Button>
      ) : (
        <Button variant="default" type="submit">
          Subscribe
        </Button>
      )}
      <p aria-live="polite" className="sr-only" role="status">
        {state?.message}
      </p>
    </form>
  );
}
