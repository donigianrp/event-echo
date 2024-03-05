'use client';
import Link from 'next/link';
import { Button } from '../../ui/button';
import {
  AreaChart,
  Bookmark,
  Hammer,
  Heart,
  Home,
  LibraryBig,
  Users,
} from 'lucide-react';
import React, { Dispatch, FunctionComponent, SetStateAction } from 'react';
import { usePathname } from 'next/navigation';
import NavButton from '../../buttons/nav_button';
import { Separator } from '../../ui/separator';

const homeLink = { name: 'Home', pathName: '/', icon: <Home size={20} /> };

const popularLinks = [
  { name: 'Series', pathName: '/event_series', icon: <AreaChart size={20} /> },
  { name: 'Creators', pathName: '/creators', icon: <Users size={20} /> },
  {
    name: 'Categories',
    pathName: '/categories',
    icon: <LibraryBig size={20} />,
  },
];

const personalLinks = [
  { name: 'Workshop', pathName: '/workshop', icon: <Hammer size={20} /> },
  { name: 'Likes', pathName: '/likes', icon: <Heart size={20} /> },
  { name: 'Favorites', pathName: '/favorites', icon: <Bookmark size={20} /> },
];

interface Props {
  navStyle: 'default' | 'mobile';
  setSheetOpen?: Dispatch<SetStateAction<boolean>>;
}
const NavLinks: FunctionComponent<Props> = ({ navStyle, setSheetOpen }) => {
  const handleSheetClose = () => {
    if (setSheetOpen) {
      setSheetOpen(false);
    }
  };
  const pathname = usePathname();
  return (
    <div>
      <NavButton
        navStyle={navStyle}
        handleSheetClose={handleSheetClose}
        pathname={pathname}
        link={homeLink}
        home
      />
      {popularLinks.map((link, idx) => {
        return (
          <NavButton
            key={idx}
            navStyle={navStyle}
            handleSheetClose={handleSheetClose}
            pathname={pathname}
            link={link}
          />
        );
      })}
      <Separator className="my-2" />
      {personalLinks.map((link, idx) => {
        return (
          <NavButton
            key={idx}
            navStyle={navStyle}
            handleSheetClose={handleSheetClose}
            pathname={pathname}
            link={link}
          />
        );
      })}
    </div>
  );
};

export default NavLinks;
