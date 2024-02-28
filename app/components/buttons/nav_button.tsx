import React, { FunctionComponent } from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';

type Link = {
  name: string;
  pathName: string;
  icon: React.JSX.Element;
};

interface Props {
  navStyle: 'default' | 'mobile';
  handleSheetClose: () => void;
  pathname: string;
  home?: boolean;
  link: Link;
}

const NavButton: FunctionComponent<Props> = ({
  navStyle,
  handleSheetClose,
  pathname,
  link,
  home,
}) => {
  const isHomeButton = home
    ? pathname === link.pathName
    : pathname.startsWith(link.pathName);

  return (
    <Button
      variant="ghost"
      className={`block ${navStyle === 'default' ? 'w-full' : 'w-[150px]'} ${isHomeButton ? 'text-primary' : ''}`}
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
};

export default NavButton;
