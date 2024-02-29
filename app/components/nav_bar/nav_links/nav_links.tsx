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

const homeLink = { name: 'Home', pathName: '/', icon: <Home /> };

const personalLinks = [
  { name: 'Series', pathName: '/event_series', icon: <AreaChart /> },
  { name: 'Favorites', pathName: '/favorites', icon: <Bookmark /> },
  { name: 'Likes', pathName: '/likes', icon: <Heart /> },
  { name: 'Workshop', pathName: '/workshop', icon: <Hammer /> },
];

const popularLinks = [
  { name: 'Series', pathName: '/popular_series', icon: <AreaChart /> },
  { name: 'Creators', pathName: '/creators', icon: <Users /> },
  { name: 'Categories', pathName: '/categories', icon: <LibraryBig /> },
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
    <>
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight my-2">
        Personal
      </h4>
      <NavButton
        navStyle={navStyle}
        handleSheetClose={handleSheetClose}
        pathname={pathname}
        link={homeLink}
        home
      />
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
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight my-2">
        Popular
      </h4>
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
    </>
  );
};

export default NavLinks;
