"use client";
import React, { useState } from "react";
import SearchInput from "@/app/components/search_input";
import he from "he";

const AddEvent = () => {
  const [videos, setVideos] = useState<YouTubeSearchResp[]>([]);

  const handleVideoSearch = async (search: string) => {
    try {
      const ecLocationCoordinates = "35.7795900,-78.6381790"; // Approximate center of the US
      // const wcLocationCoordinates = "36.746841,-119.772591"; // Approximate center of the US
      const locationRadius = "1000km"; // Radius to cover the entire continental US

      const response = await fetch(
        `https://youtube.googleapis.com/youtube/v3/search?part=snippet&order=relevance&maxResults=100&type=video&location=${ecLocationCoordinates}&locationRadius=${locationRadius}&q=${search}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`
      );

      const json = await response.json();
      setVideos(json.items);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleFetchComment = async (videoId: string) => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&maxResults=100&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`
      );
      const json = await response.json();
      setVideos(json.items);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  console.log(videos);

  return (
    <div className="m-8">
      <div className="mb-8">Add Event</div>
      <SearchInput onSearch={handleVideoSearch} />
      <ul className="list-none w-full">
        {videos.map((video) => {
          return (
            <li key={video.id.videoId || video.id.kind}>
              <div className="m-2 p-2 flex items-center justify-between hover:bg-slate-100">
                <div>{he.decode(video.snippet.title)}</div>
                <button
                  className="ml-8 h-9 px-3 py-2 text-xs font-medium text-center text-white bg-primary rounded-lg hover:bg-primary-light focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  type="button"
                  onClick={() => handleFetchComment(video.id.videoId)}
                >
                  Add
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AddEvent;
