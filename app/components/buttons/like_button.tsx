'use client';

import { Button } from '../ui/button';
import { Heart } from 'lucide-react';
import { like } from './actions';
import { useFormState } from 'react-dom';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import Login from '@/app/login/components/login';
import { Dialog, DialogTrigger, DialogContent } from '../ui/dialog';

export default function LikeButton(props: {
  eventId: number;
  liked: boolean;
  count: number;
}) {
  const initialState = {
    message: '',
  };

  const { status } = useSession();
  const [state, formAction] = useFormState(like, initialState);
  const [liked, setLiked] = useState(props.liked);
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
              <Heart
                className={
                  liked ? 'text-foreground' : 'fill-pink-300 text-pink-300'
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
    <div className="flex flex-col">
      <form action={formAction}>
        <input type="hidden" name="event_series_id" value={props.eventId} />
        <Button
          className={`hover:bg-transparent ${liked && 'animate-like'}`}
          variant="ghost"
          size="icon"
          type="submit"
          onClick={() => {
            setLiked(!liked);
            liked ? setCount(count - 1) : setCount(count + 1);
          }}
        >
          <Heart
            className={
              liked ? 'fill-pink-300 text-pink-300' : 'text-foreground'
            }
          />
        </Button>
        <p aria-live="polite" className="sr-only" role="status">
          {state?.message}
        </p>
      </form>
      <div className="overflow-hidden">
        <p
          className={`text-center ${
            liked ? 'animate-count-up' : 'animate-count-down'
          }`}
        >
          {count}
        </p>
      </div>
    </div>
  );
}
