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
  return (
    <>
      <Button
        variant="ghost"
        className={`m-2 block ${navStyle === 'default' ? 'w-full' : 'w-2/4'}`}
        asChild
      >
        <Link href="/" onClick={handleSheetClose}>
          <div className="flex items-center">
            <Home />
            <div className="ml-2">Home</div>
          </div>
        </Link>
      </Button>
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight ">
        Personal
      </h4>
      {personalLinks.map((link) => {
        return (
          <Button
            key={link.name}
            variant="ghost"
            className={`m-2 block ${
              navStyle === 'default' ? 'w-full' : 'w-2/4'
            }`}
            asChild
          >
            <Link href={link.pathName} onClick={handleSheetClose}>
              <div className="flex items-center">
                {link.icon}
                <div className="ml-2">{link.name}</div>
              </div>
            </Link>
          </Button>
        );
      })}
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight mt-4 ">
        Popular
      </h4>
      {popularLinks.map((link) => {
        return (
          <Button
            key={link.name}
            variant="ghost"
            className={`m-2 block ${
              navStyle === 'default' ? 'w-full' : 'w-2/4'
            }`}
            asChild
          >
            <Link href={link.pathName} onClick={handleSheetClose}>
              <div className="flex items-center">
                {link.icon}
                <div className="ml-2">{link.name}</div>
              </div>
            </Link>
          </Button>
        );
      })}
    </>
  );
};

export default NavLinks;
