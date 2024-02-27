'use client';

import { ChevronLeft, Lock } from 'lucide-react';
import LoginPrompt from './login_prompt';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';

export default function AccessDenied({
  message,
  loggedIn,
}: {
  message: string;
  loggedIn: boolean;
}) {
  const router = useRouter();

  return (
    <div className="flex h-screen items-center">
      <div className="flex flex-col gap-4 mx-auto text-center">
        <Lock className="mx-auto" />
        <h1 className="text-3xl">Access denied</h1>
        <p className="text-lg">{message}</p>
        {!loggedIn && <LoginPrompt />}
        <Button
          variant="outline"
          className="mx-auto size-fit pl-2"
          onClick={router.back}
        >
          <ChevronLeft size={20} />
          Back
        </Button>
      </div>
    </div>
  );
}
