import React from 'react';
import MobileNav from '../nav_bar/mobile_nav/mobile_nav';
import Header from '../header/header';

const ContentWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="md:hidden flex justify-between sticky top-0 left-0 right-0 z-50 items-center p-2 border-b bg-opacity-30 dark:bg-slate-700 dark:bg-opacity-30 border-border bg-slate-200 backdrop-blur-md">
        <MobileNav />
        <Header />
      </div>
      <div className="p-2 md:pl-[172px]">{children}</div>
    </>
  );
};

export default ContentWrapper;
