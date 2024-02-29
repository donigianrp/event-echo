import React from 'react';
import { Card, CardContent, CardFooter } from '../components/ui/card';

const CreatorCard = () => {
  return (
    <Card className="flex flex-col h-full">
      <div>
        {/* {thumbnails.medium.width ? (
      <Image
        className={`w-full rounded-t-md`}
        alt="source content thumbnail"
        src={thumbnails.medium.url || ''}
        width={thumbnails.medium.width}
        height={thumbnails.medium.height}
      />
    ) : (
      <div className="flex aspect-video">
        <Image
          className={`mx-auto rounded-full self-center w-1/2`}
          alt="source content thumbnail"
          src={thumbnails.medium.url || ''}
          width={240}
          height={240}
        />
      </div>
    )} */}
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
      </div>
    </Card>
  );
};

export default CreatorCard;
