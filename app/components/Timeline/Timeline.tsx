'use client';

import GraphTabs from '@/app/components/Timeline/GraphTabs/GraphTabs';
import { Button } from '@/app/components/ui/button';
import { Minus, Pause, Play, Plus } from 'lucide-react';
import { useState } from 'react';
import { useEffect } from 'react';
import ReactSlider from 'react-slider';

const data = [
  { eventName: 'Video 1', wordCount: 47 },
  { eventName: 'Video 2', wordCount: 22 },
  { eventName: 'Video 3', wordCount: 2 },
  { eventName: 'Video 4', wordCount: 4 },
  { eventName: 'Video 5', wordCount: 1 },
];

const Timeline = () => {
  const [value, setValue] = useState(0);
  const [aggValue, setAggValue] = useState([0, data.length - 1]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAggregate, setIsAggregate] = useState(false);
  const [sum, setSum] = useState(0);

  const calculateSum = () => {
    let total = 0;

    for (let i = aggValue[0]; i <= aggValue[1]; i++) {
      total = total + data[i].wordCount;
    }
    setSum(total);
  };

  useEffect(() => {
    let handlePlay: NodeJS.Timeout | undefined;

    if (isPlaying) {
      let num = value;

      const increment = () => {
        num++;
        setValue(num);
        if (num >= data.length - 1) {
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
    if (value !== data.length - 1) {
      setIsPlaying(true);
    } else {
      setValue(0);
      setIsPlaying(true);
    }
  };

  return (
    <div className="px-80">
      <div className="flex items-center my-2">
        <ReactSlider
          className="w-full h-5"
          trackClassName={`h-2 top-2/4 -translate-y-1/2 bg-foreground rounded-full ${
            isAggregate ? 'aggregate' : 'track'
          }`}
          thumbClassName="bg-black w-5 h-5 rounded-full border-2 border-primary"
          markClassName="cursor-pointer top-2/4 -translate-y-1/2 w-1 rounded-full h-8 bg-primary ml-2 -z-10"
          min={0}
          max={data.length - 1}
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
      <GraphTabs
        isAggregate={isAggregate}
        data={data}
        aggValue={aggValue}
        value={value}
        sum={sum}
      />
    </div>
  );
};

export default Timeline;
