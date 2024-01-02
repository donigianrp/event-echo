'use client';

import { Button } from '@/app/components/ui/button';
import { signIn } from 'next-auth/react';

export default function SignIn() {
  return (
    <Button
      variant={'outline'}
      onClick={() => signIn('google', { callbackUrl: '/' })}
    >
      Sign in with Google
    </Button>
  );
}
