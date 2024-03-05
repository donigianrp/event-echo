import React from 'react';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import ModeToggleButton from '../nav_bar/mode_toggle_button/mode_toggle_button';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { getServerSession } from 'next-auth';
import { Button } from '../ui/button';
import { CircleUserRound } from 'lucide-react';

const Header = async () => {
  const session = await getServerSession(authOptions);
  return (
    <>
      <div className="hidden lg:block text-center">
        <Link href={'/'}>Logo</Link>
      </div>
      <div className="flex items-center justify-evenly">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="w-12 h-12 rounded-full"
            >
              <Avatar>
                <AvatarImage src={session?.user?.image} />
                <AvatarFallback>
                  <CircleUserRound className="w-12 h-12" />
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
    </>
  );
};

export default Header;
