'use client';

import { RefObject, useEffect, useState } from 'react';

export default function useInView(ref: RefObject<HTMLElement>) {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (ref?.current) {
      const observer = new IntersectionObserver(([entry]) => {
        setIsInView(entry.isIntersecting);
      });

      observer.observe(ref.current);

      return () => observer.disconnect();
    }
  }, [ref]);

  return { isInView };
}
