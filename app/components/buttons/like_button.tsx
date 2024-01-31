'use client';

import { Button } from '../ui/button';
import { Heart } from 'lucide-react';
import { like } from './actions';
import { useFormState } from 'react-dom';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import Login from '@/app/login/components/login';
import { Dialog, DialogTrigger, DialogContent } from '../ui/dialog';

export default function LikeButton(props: { eventId: number; liked: boolean }) {
  const initialState = {
    message: '',
    color: props.liked ? '#f9a8d4' : 'white',
    fill: props.liked ? '#f9a8d4' : '',
  };

  const { status } = useSession();
  const [state, formAction] = useFormState(like, initialState);
  const [likeAnimation, setLikeAnimation] = useState(false);

  if (status === 'unauthenticated') {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button
            className={`hover:bg-transparent`}
            variant="ghost"
            size="icon"
          >
            <Heart color={'white'} fill={''} />
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
        className={`hover:bg-transparent ${likeAnimation && 'animate-like'}`}
        variant="ghost"
        size="icon"
        type="submit"
        onClick={() => (props.liked ? '' : setLikeAnimation(true))}
        onAnimationEnd={() => setLikeAnimation(false)}
      >
        <Heart color={state.color} fill={state.fill} />
      </Button>
      <p aria-live="polite" className="sr-only" role="status">
        {state?.message}
      </p>
    </form>
  );
}
