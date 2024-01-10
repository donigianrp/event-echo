'use client';

import { Button } from '../ui/button';
import { Bookmark } from 'lucide-react';
import { favorite } from './actions';
import { useFormState } from 'react-dom';
import { useState } from 'react';

export default function FavoriteButton(props: {
  eventId: number;
  favorited: boolean;
}) {
  const initialState = {
    message: '',
    fill: props.favorited ? 'white' : '',
  };

  const [state, formAction] = useFormState(favorite, initialState);
  const [favoriteAnimation, setFavoriteAnimation] = useState(false);

  return (
    <form action={formAction}>
      <input type="hidden" name="event_series_id" value={props.eventId} />
      <Button
        className={`hover:bg-transparent ${
          favoriteAnimation && 'animate-favorite'
        }`}
        variant="ghost"
        size="icon"
        type="submit"
        onClick={() => (props.favorited ? '' : setFavoriteAnimation(true))}
        onAnimationEnd={() => setFavoriteAnimation(false)}
      >
        <Bookmark color={'white'} fill={state.fill} />
      </Button>
      <p aria-live="polite" className="sr-only" role="status">
        {state?.message}
      </p>
    </form>
  );
}
