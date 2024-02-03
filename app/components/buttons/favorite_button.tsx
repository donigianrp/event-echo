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
  count: number;
}) {
  const initialState = {
    message: '',
  };

  const { status } = useSession();
  const [state, formAction] = useFormState(favorite, initialState);
  const [favorited, setFavorited] = useState(props.favorited);
  const [count, setCount] = useState(props.count);

  if (status === 'unauthenticated') {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <div>
            <Button
              className={`hover:bg-transparent`}
              variant="ghost"
              size="icon"
            >
              <Bookmark
                className={
                  favorited ? 'text-foreground' : 'fill-primary text-primary'
                }
              />
            </Button>
            <div className="overflow-hidden">
              <p className={`text-center`}>{count}</p>
            </div>
          </div>
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
        className={`hover:bg-transparent ${favorited && 'animate-favorite'}`}
        variant="ghost"
        size="icon"
        type="submit"
        onClick={() => {
          setFavorited(!favorited);
          favorited ? setCount(count - 1) : setCount(count + 1);
        }}
      >
        <Bookmark
          className={
            favorited ? 'fill-foreground text-foreground' : 'text-foreground'
          }
        />
      </Button>
      <p aria-live="polite" className="sr-only" role="status">
        {state?.message}
      </p>
      <div className="overflow-hidden">
        <p
          className={`text-center ${
            favorited ? 'animate-count-up' : 'animate-count-down'
          }`}
        >
          {count}
        </p>
      </div>
    </form>
  );
}
