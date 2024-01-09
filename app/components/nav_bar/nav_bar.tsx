import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import NavLinks from './nav_links/nav_links';
import { Skeleton } from '@/components/ui/skeleton';
import MobileNav from './mobile_nav/mobile_nav';
import ModeToggleButton from './mode_toggle_button/mode_toggle_button';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const NavBar = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className="sticky top-0 left-0 right-0 z-50 flex items-center justify-between p-2 border-b bg-opacity-30 dark:bg-slate-700 dark:bg-opacity-30 border-border bg-slate-200 backdrop-blur-md">
      <div className="flex">
        <MobileNav />
        <Link className="hidden p-2 md:flex" href={'/'}>
          Logo
        </Link>
      </div>
      <div className="hidden md:flex md:items-center">
        <NavLinks navStyle="default" />
      </div>
      <div className="flex items-center">
        <Link className="flex p-2" href={`/user/${session?.user.id}`}>
          <Avatar>
            <AvatarImage
              src={session?.user?.image || 'https://github.com/shadcn.png'}
            />
            <AvatarFallback>
              <Skeleton className="w-12 h-12 rounded-full" />
            </AvatarFallback>
          </Avatar>
        </Link>
        <ModeToggleButton />
      </div>
    </div>
  );
};

export default NavBar;
