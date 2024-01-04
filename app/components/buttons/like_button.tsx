'use client';

import { Button } from '../ui/button';
import { Heart } from 'lucide-react';
import { like } from './actions';
import { useFormState } from 'react-dom';

export default function LikeButton(props: { id: number; liked: boolean }) {
  const initialState = {
    message: '',
    color: props.liked ? 'pink' : 'white',
    fill: props.liked ? 'pink' : '',
  };

  const [state, formAction] = useFormState(like, initialState);

  return (
    <form action={formAction}>
      <input type="hidden" name="event_series_id" value={props.id} />
      <Button variant="outline" size="icon" type="submit">
        <Heart color={state.color} fill={state.fill} />
      </Button>
      <p aria-live="polite" className="sr-only" role="status">
        {state?.message}
      </p>
    </form>
  );
}
