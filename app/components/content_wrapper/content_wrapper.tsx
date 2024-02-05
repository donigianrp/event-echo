'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

const ContentWrapper = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  return (
    <div
      className={`my-2 mr-2 ml-2 ${
        pathname === '/login' ? '' : 'md:ml-[196px]'
      }`}
    >
      {children}
    </div>
  );
};

export default ContentWrapper;
