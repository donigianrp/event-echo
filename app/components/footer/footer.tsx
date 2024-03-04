'use client';

import { AreaChart, CircleUserRound, Hammer, Heart, Home } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from '../ui/navigation-menu';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0">
      <NavigationMenu className="flex max-w-none h-14 bg-card border-t border-border list-none justify-around">
        <NavigationMenuItem>
          <Link href="/">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              <Home className={`${pathname === '/' ? 'text-primary' : ''}`} />
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/event_series">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              <AreaChart
                className={`${pathname.startsWith('/event_series') ? 'text-primary' : ''}`}
              />
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/workshop">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              <Hammer
                className={`${pathname.startsWith('/workshop') ? 'text-primary' : ''}`}
              />
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/likes">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              <Heart
                className={`${pathname.startsWith('/likes') ? 'text-primary' : ''}`}
              />
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href={`/user/${session?.user.id}`}>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              <CircleUserRound
                className={`${pathname.startsWith(`/user/${session?.user.id}`) ? 'text-primary' : ''}`}
              />
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenu>
    </div>
  );
}
