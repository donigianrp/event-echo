'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { editUser } from '../actions';
import { Button } from '@/app/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { Input } from '@/app/components/ui/input';
import { redirect } from 'next/navigation';
import { Label } from '@/app/components/ui/label';

const initialState = {
  message: '',
};

export default function EditUserForm(props: { user: any }) {
  const [state, formAction] = useFormState(editUser, initialState);
  const [displayName, setDisplayName] = useState(props.user.name);
  const [username, setUsername] = useState(props.user.username);
  const [cancelled, setCancelled] = useState(false);

  if (cancelled) {
    redirect(`/user/${props.user.id}`);
  }

  function SubmitButton() {
    const { pending } = useFormStatus();

    return (
      <Button
        id="submit"
        type="submit"
        disabled={pending}
        aria-disabled={pending}
      >
        {pending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please Wait
          </>
        ) : (
          <>Submit</>
        )}
      </Button>
    );
  }

  return (
    <div className="flex p-10 w-full xl:w-1/2 mx-auto my-10 align-middle">
      <form action={formAction}>
        <h1 className="text-xl">Edit Profile</h1>
        <Input type="hidden" name="id" value={props.user.id} />
        <Label htmlFor="display_name">Display Name</Label>
        <Input
          placeholder="Display Name"
          type="text"
          name="display_name"
          required
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
        <Label htmlFor="username">Username</Label>
        <Input
          placeholder="Username"
          type="text"
          name="username"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <div className="flex gap-4 justify-end">
          <Button variant="secondary" onClick={() => setCancelled(true)}>
            Cancel
          </Button>
          <SubmitButton />
        </div>
        <p aria-live="polite" className="sr-only" role="status">
          {state?.message}
        </p>
      </form>
    </div>
  );
}
