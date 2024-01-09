'use client';

import { Button } from '../ui/button';
import { Save } from 'lucide-react';
import { favorite } from './actions';
import { useFormState } from 'react-dom';

export default function FavoriteButton(props: {
  eventId: number;
  favorited: boolean;
}) {
  const initialState = {
    message: '',
    color: props.favorited ? 'cyan' : 'white',
  };

  const [state, formAction] = useFormState(favorite, initialState);

  return (
    <form action={formAction}>
      <input type="hidden" name="event_series_id" value={props.eventId} />
      <Button variant="outline" size="icon" type="submit">
        <Save color={state.color} fill={state.fill} />
      </Button>
      <p aria-live="polite" className="sr-only" role="status">
        {state?.message}
      </p>
    </form>
  );
}
