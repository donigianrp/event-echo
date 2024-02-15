'use client';

import React, { FunctionComponent, useEffect, useState } from 'react';
import { CardDescription } from '../ui/card';
import { useRef } from 'react';

interface Props {
  description: string | null;
}

const EventDescription: FunctionComponent<Props> = ({ description }) => {
  const [isShown, setIsShown] = useState(false);
  const [showButton, setShowButton] = useState(false);

  const ref = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (ref.current && ref.current.scrollHeight !== ref.current.clientHeight) {
      setShowButton(true);
    }
  }, [ref.current]);

  return (
    <div>
      <CardDescription
        id="cardDesc"
        className={`${isShown ? '' : 'line-clamp-2'} hyphens-auto`}
        ref={ref}
      >
        {description}
      </CardDescription>
      {showButton && (
        <span
          className="text-muted-foreground hover:text-foreground hover:cursor-pointer text-[0.8rem]"
          onClick={() => {
            setIsShown(!isShown);
          }}
        >
          {isShown ? 'Show less' : 'Show more...'}
        </span>
      )}
    </div>
  );
};

export default EventDescription;
