'use client';

import { Button } from '../ui/button';
import { Bookmark } from 'lucide-react';
import { favorite } from './actions';
import { useFormState } from 'react-dom';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import Login from '@/app/login/components/login';

export default function FavoriteButton(props: {
  eventId: number;
  favorited: boolean;
}) {
  const initialState = {
    message: '',
    fill: props.favorited ? 'white' : '',
  };

  const { status } = useSession();
  const [state, formAction] = useFormState(favorite, initialState);
  const [favoriteAnimation, setFavoriteAnimation] = useState(false);

  if (status === 'unauthenticated') {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button
            className={`hover:bg-transparent`}
            variant="ghost"
            size="icon"
          >
            <Bookmark color={'white'} fill={''} />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <Login />
        </DialogContent>
      </Dialog>
    );
  }

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
