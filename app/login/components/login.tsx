'use client';

import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Separator } from '@radix-ui/react-dropdown-menu';
import SignIn from './sign_in';
import Link from 'next/link';

export default function Login() {
  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col mx-auto p-8 space-y-6 w-full">
        <div className="flex flex-col space-y-2 text-center">
          <h2 className="text-2xl font-semibold tracking-tight">Sign In</h2>
          <p className="text-sm text-muted-foreground">
            Enter your email to log in
          </p>
        </div>
        <div className="grid gap-6">
          <form>
            <div className="grid gap-2">
              <Input id="email" type="email" placeholder="name@example.com" />
              <Button type="submit">Sign In</Button>
            </div>
          </form>
          <Separator />
          <SignIn />
          <div className="text-center text-muted-foreground">
            {`Don't have an account? `}
            <Link href={'/'} className="underline hover:text-primary">
              Sign up
            </Link>{' '}
          </div>
        </div>
      </div>
    </div>
  );
}
