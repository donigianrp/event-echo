'use client';

import { Button } from '../ui/button';
import { useFormState } from 'react-dom';
import { subscribe } from './actions';

export default function SubscribeButton(props: {
  id: string;
  isSubscribed: boolean;
}) {
  const initialState = {
    message: '',
    isSubscribed: props.isSubscribed,
  };

  const [state, formAction] = useFormState(subscribe, initialState);

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
