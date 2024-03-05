'use client';
import React from 'react';
import { Card, CardContent, CardFooter } from '../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { CircleUserRound } from 'lucide-react';

const CreatorCard = ({}) => {
  const user = {
    image: '',
  };
  return (
    <Card className="flex flex-col h-full">
      <div>
        <Avatar>
          <AvatarImage src={`https://gravatar.com/avatar/${user?.image}`} />
          <AvatarFallback>
            <CircleUserRound className="w-12 h-12" />
          </AvatarFallback>
        </Avatar>
      </div>

      <CardContent className={`flex flex-col justify-end p-2`}>
        <div className={`flex flex-col justify-end`}>
          {/* <div className="line-clamp-2 min-h-12" title={decodedTitle || ''}>
              {decodedTitle}
            </div>
            <div className={`text-sm line-clamp-1 text-muted-foreground`}>
              {channelTitle}
            </div> */}
        </div>
      </CardContent>
      <CardFooter className={`p-4 pt-2 justify-end`}></CardFooter>
    </Card>
  );
};

export default CreatorCard;
