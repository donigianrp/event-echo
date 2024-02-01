import React from 'react';
import MobileNav from '../nav_bar/mobile_nav/mobile_nav';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Skeleton } from '../ui/skeleton';
import ModeToggleButton from '../nav_bar/mode_toggle_button/mode_toggle_button';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { getServerSession } from 'next-auth';
import { Button } from '../ui/button';

const Header = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div className="sticky top-0 left-0 right-0 z-50 flex items-center justify-between p-2 border-b bg-opacity-30 dark:bg-slate-700 dark:bg-opacity-30 border-border bg-slate-200 backdrop-blur-md">
      <div className="md:hidden mt-2">
        <MobileNav />
      </div>
      <Link href={'/'} className="hidden md:inline-block">
        Logo
      </Link>
      <div className="flex items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="w-12 h-12 rounded-full"
            >
              <Avatar>
                <AvatarImage
                  src={session?.user?.image || 'https://github.com/shadcn.png'}
                />
                <AvatarFallback>
                  <Skeleton className="w-12 h-12 rounded-full" />
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {session ? (
              <>
                <DropdownMenuItem asChild>
                  <Link href={`/user/${session?.user.id}`}>Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/api/auth/signout">Logout</Link>
                </DropdownMenuItem>
              </>
            ) : (
              <DropdownMenuItem asChild>
                <Link href="/login">Login</Link>
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        <ModeToggleButton />
      </div>
    </div>
  );
};

export default Header;
