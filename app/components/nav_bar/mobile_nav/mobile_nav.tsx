import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
} from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import NavLinks from '../nav_links/nav_links';

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="top">
        <SheetClose asChild>
          <NavLinks navStyle="mobile" />
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
