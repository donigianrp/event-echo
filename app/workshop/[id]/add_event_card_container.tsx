import { YouTubeSearchResp } from '@/global';
import React from 'react';
import AddEventCard from './add_event_card';

export interface Props {
  sourceContents: YouTubeSearchResp[];
}

const AddEventCardContainer = ({ sourceContents }: Props) => {
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {sourceContents.map((content) => {
        return (
          <AddEventCard key={content.id.videoId} sourceContent={content} />
        );
      })}
    </div>
  );
};

export default AddEventCardContainer;
