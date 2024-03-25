'use client';
import React from 'react';
import { Card, CardContent, CardFooter } from '../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { CircleUserRound } from 'lucide-react';
import { CreatorLikes } from './page';
import Link from 'next/link';

interface Props {
  creator: CreatorLikes;
}

const CreatorCard = (props: Props) => {
  const { id, name, username, email, image, likes_total } = props.creator;

  return (
    <Card className="flex flex-col h-full">
      <Link href={`user/${id}`}>
        <CardContent className={`flex p-2`}>
          <div>
            <Avatar className="h-20 w-20">
              <AvatarImage src={`https://gravatar.com/avatar/${image}`} />
              <AvatarFallback>
                <CircleUserRound className="w-10 h-10" />
              </AvatarFallback>
            </Avatar>
          </div>
          <div className={`ml-10 flex items-center`}>
            <div className="line-clamp-1 min-h-6" title={username || ''}>
              {username}
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};

export default CreatorCard;
