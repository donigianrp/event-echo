import React from 'react';
import { CreatorLikes } from './page';
import CreatorCard from './creator_card';

interface Props {
  creators: CreatorLikes[];
}

const CreatorCardContainer = (props: Props) => {
  const { creators } = props;
  console.log(creators);
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {creators.map((creator) => {
        return <CreatorCard key={creator.id} creator={creator} />;
      })}
    </div>
  );
};

export default CreatorCardContainer;
