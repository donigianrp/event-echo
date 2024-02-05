'use client';

import { Button } from '../ui/button';
import { Bookmark } from 'lucide-react';
import { favorite } from './actions';
import { useFormState } from 'react-dom';
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
                  props.favorited
                    ? 'text-foreground'
                    : 'fill-primary text-primary'
                }
              />
            </Button>
            <div className="overflow-hidden">
              <p className={`text-center`}>{props.count}</p>
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
        className={`hover:bg-transparent ${props.favorited && 'animate-favorite'}`}
        variant="ghost"
        size="icon"
        type="submit"
        onClick={() => {
          props.favorited = !props.favorited;
          props.favorited ? (props.count += 1) : (props.count -= 1);
        }}
      >
        <Bookmark
          className={
            props.favorited
              ? 'fill-foreground text-foreground'
              : 'text-foreground'
          }
        />
      </Button>
      <p aria-live="polite" className="sr-only" role="status">
        {state?.message}
      </p>
      <div className="overflow-hidden">
        <p
          className={`text-center ${
            props.favorited ? 'animate-count-up' : 'animate-count-down'
          }`}
        >
          {props.count}
        </p>
      </div>
    </form>
  );
}
