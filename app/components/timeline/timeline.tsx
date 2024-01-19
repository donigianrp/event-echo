'use client';

import { Minus, Pause, Play, Plus } from 'lucide-react';
import { useState } from 'react';
import { useEffect } from 'react';
import ReactSlider from 'react-slider';
import { Button } from '../ui/button';
import DataTabs from './data_tabs/data_tabs';
import { comments } from '@/prisma/seedData';

const nonRelevantWords: { [val: string]: boolean } = {
  that: true,
  when: true,
  this: true,
  have: true,
  with: true,
  from: true,
  they: true,
  what: true,
  your: true,
  like: true,
  just: true,
  some: true,
  more: true,
  will: true,
  than: true,
  into: true,
  them: true,
  then: true,
  only: true,
  come: true,
  over: true,
  well: true,
  here: true,
  much: true,
  also: true,
  make: true,
  back: true,
  even: true,
  good: true,
  very: true,
  want: true,
  work: true,
  find: true,
  give: true,
  many: true,
  such: true,
  need: true,
  take: true,
  help: true,
  live: true,
  turn: true,
  away: true,
  face: true,
  show: true,
  long: true,
  ever: true,
  feel: true,
  keep: true,
  look: true,
  seem: true,
  name: true,
  time: true,
  done: true,
  hear: true,
  sure: true,
  real: true,
  last: true,
  high: true,
  must: true,
  year: true,
  know: true,
  days: true,
  never: true,
  once: true,
  life: true,
};

const cleanString = (word: string) => {
  // Remove words with numbers and trim leading/trailing punctuation
  return word
    .replace(/\b\w*\d\w*\b/g, '') // Remove words with numbers
    .replace(/^[^\w\s]+|[^\w\s]+$/g, '') // Trim leading/trailing punctuation
    .toLowerCase();
};

export interface GraphData {
  name: string;
  wordCount: number;
}

const Timeline = () => {
  const [graphData, setGraphData] = useState<GraphData[]>([]);
  const [wordCloudData, setWordCloudData] = useState<[string, number][]>([]);
  const [value, setValue] = useState(0);
  const [aggValue, setAggValue] = useState([0, comments.length - 1]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAggregate, setIsAggregate] = useState(false);

  const countOccurrences = (arr: string[]) => {
    const result: { [val: string]: number } = {};
    const graphDataArr: { name: string; wordCount: number }[] = [];

    arr.forEach((text) => {
      const cleaned = cleanString(text);
      if (cleaned.length > 3 && !nonRelevantWords[cleaned as string]) {
        result[cleaned] = (result[cleaned] || 0) + 1;
      }
    });

    const wordCloudArr: [string, number][] = Object.entries(result)
      .sort((a, b) => {
        return b[1] - a[1];
      })
      .slice(0, 30);

    wordCloudArr.forEach((item) => {
      const obj: {
        name: string;
        wordCount: number;
      } = { name: '', wordCount: 0 };
      obj['name'] = item[0];
      obj['wordCount'] = item[1];
      graphDataArr.push(obj);
    });

    setWordCloudData(wordCloudArr);
    setGraphData(graphDataArr);
  };

  const calculateSum = () => {
    const aggregateContents: string[] = [];

    for (let i = aggValue[0]; i <= aggValue[1]; i++) {
      const splitContents = comments[i].contents.split(' ');
      aggregateContents.push(...splitContents);
    }
    countOccurrences(aggregateContents);
  };

  useEffect(() => {
    const splitContents = comments[value].contents.split(' ');
    countOccurrences(splitContents);
  }, [value]);

  useEffect(() => {
    let handlePlay: NodeJS.Timeout | undefined;

    if (isPlaying) {
      let num = value;

      const increment = () => {
        num++;
        setValue(num);
        if (num >= comments.length - 1) {
          setIsPlaying(false);
        }
      };
      handlePlay = setInterval(increment, 1000);
    }
    return () => clearInterval(handlePlay);
  }, [isPlaying]);

  useEffect(() => {
    if (aggValue) {
      calculateSum();
    }
  }, [isAggregate, aggValue]);

  const handleChange = (e: number) => {
    setValue(e);
    setIsPlaying(false);
  };

  const pause = () => {
    setIsPlaying(false);
  };

  const play = () => {
    if (value !== comments.length - 1) {
      setIsPlaying(true);
    } else {
      setValue(0);
      setIsPlaying(true);
    }
  };

  return (
    <>
      <div className="flex items-center my-2 ">
        <ReactSlider
          className="w-full h-5 z-10"
          trackClassName={`h-2 top-2/4 -translate-y-1/2 bg-foreground rounded-full ${
            isAggregate ? 'aggregate' : 'track'
          }`}
          thumbClassName="bg-black w-5 h-5 rounded-full border-2 border-primary"
          markClassName="cursor-pointer top-2/4 -translate-y-1/2 w-1 rounded-full h-8 bg-primary ml-2 -z-10"
          min={0}
          max={comments.length - 1}
          marks
          pearling
          minDistance={1}
          step={1}
          value={isAggregate ? aggValue : value}
          onChange={(e) => {
            if (typeof e === 'number') {
              handleChange(e);
            } else {
              setAggValue([e[0], e[1]]);
            }
          }}
        />
        {isAggregate ? (
          <Button
            className="ml-2"
            variant="outline"
            size="icon"
            onClick={() => {
              setIsAggregate(!isAggregate);
            }}
          >
            <Minus className="h-4 w-4" />
          </Button>
        ) : (
          <>
            {isPlaying ? (
              <Button
                className="ml-2"
                variant="outline"
                size="icon"
                onClick={() => {
                  pause();
                }}
              >
                <Pause className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                className="ml-2"
                variant="outline"
                size="icon"
                onClick={() => {
                  play();
                }}
              >
                <Play className="h-4 w-4" />
              </Button>
            )}
            <Button
              className="ml-2"
              variant="outline"
              size="icon"
              onClick={() => {
                setIsAggregate(!isAggregate);
              }}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>
      <DataTabs
        isAggregate={isAggregate}
        graphData={graphData}
        wordCloudData={wordCloudData}
        aggValue={aggValue}
        value={value}
      />
    </>
  );
};

export default Timeline;
