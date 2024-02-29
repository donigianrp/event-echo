'use client';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { useState } from 'react';
import AddEventCardContainer from './add_event_card_container';
import { YouTubeSearchResp } from '@/global';

const AddEventToSeries = () => {
  const [term, setTerm] = useState('');
  const [results, setResults] = useState<YouTubeSearchResp[]>([]);

  const fetchVideos = async () => {
    let apiUrl = '';

    const youtubeUrlRegex =
      /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|embed\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const isYoutubeUrl = youtubeUrlRegex.test(term);

    if (isYoutubeUrl) {
      // Extract video ID from the YouTube URL
      const videoId = term.match(youtubeUrlRegex);
      if (videoId) {
        apiUrl = `/api/youtube/video/${videoId[5]}`;
      }
    } else {
      // Use the term as a search term
      const searchTerm = encodeURIComponent(term);
      apiUrl = `/api/youtube?search=${searchTerm}`;
    }

    try {
      // Make the fetch request
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }

      const resp: { items: YouTubeSearchResp[] } = await response.json();

      const filteredResults = resp.items.filter((item) => {
        return item.id.videoId;
      });
      // Parse and return the response JSON
      setResults(filteredResults);
    } catch (error) {
      console.error(error);
      // Handle errors as needed
      return { error: 'fail' };
    }
  };

  return (
    <div className="w-full">
      <div className="w-1/2 m-auto my-5 flex">
        <Input
          placeholder="Enter search term or url (ex: https://www.youtube.com/watch?v=xxxxxxxxx)"
          type="text"
          name="search"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
        <Button className={'ml-2'} onClick={() => fetchVideos()}>
          Search
        </Button>
      </div>
      {term && <AddEventCardContainer sourceContents={results} />}
    </div>
  );
};

export default AddEventToSeries;
