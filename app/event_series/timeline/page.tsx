'use client';

import { Button } from '@/app/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/app/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  BarChart4,
  Cloud,
  LineChart,
  Pause,
  PieChart,
  Play,
} from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { useState } from 'react';
import { useEffect } from 'react';

const data = [
  { eventName: 'Video 1', wordCount: 47 },
  { eventName: 'Video 2', wordCount: 22 },
  { eventName: 'Video 3', wordCount: 2 },
  { eventName: 'Video 4', wordCount: 4 },
  { eventName: 'Video 5', wordCount: 1 },
];

const Timeline = () => {
  const [value, setValue] = useState([0]);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let handlePlay: NodeJS.Timeout | undefined;

    if (isPlaying) {
      const increment = () => {
        let num = ++value[0];
        if (value[0] >= data.length - 1) {
          setIsPlaying(false);
          clearInterval(handlePlay);
        }
        setValue([num]);
      };
      handlePlay = setInterval(increment, 1000);
    }
    return () => clearInterval(handlePlay);
  }, [isPlaying]);

  const handleChange = (e: number[]) => {
    setValue([e[0]]);
    setIsPlaying(false);
  };

  const pause = () => {
    setIsPlaying(false);
  };

  const play = () => {
    if (value[0] !== data.length - 1) {
      setIsPlaying(true);
    } else {
      setValue([0]);
      setIsPlaying(true);
    }
  };

  return (
    <div>
      <div className="flex justify-center p-2 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Timeline
      </div>
      <div>
        <div className="px-40">
          <div className="flex justify-end my-2">
            <Slider
              defaultValue={[0]}
              value={value}
              max={data.length - 1}
              step={1}
              className="mr-4"
              onValueChange={(e) => handleChange(e)}
            />
            {isPlaying ? (
              <Button
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
                variant="outline"
                size="icon"
                onClick={() => {
                  play();
                }}
              >
                <Play className="h-4 w-4" />
              </Button>
            )}
          </div>
          <Tabs defaultValue="bar">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="bar">
                <BarChart4 className="h-5" />
              </TabsTrigger>
              <TabsTrigger value="line">
                <LineChart className="h-5" />
              </TabsTrigger>
              <TabsTrigger value="pie">
                <PieChart className="h-5" />
              </TabsTrigger>
              <TabsTrigger value="cloud">
                <Cloud className="h-5" />
              </TabsTrigger>
            </TabsList>
            <TabsContent value="bar">
              <Card>
                <CardHeader>
                  <CardTitle>Event Series Name</CardTitle>
                  <CardDescription>{data[value[0]].eventName}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-center items-center h-80">
                    {data[value[0]].wordCount}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="line">
              <Card>
                <CardHeader>
                  <CardTitle>Event Series Name</CardTitle>
                  <CardDescription>{data[value[0]].eventName}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-center items-center h-80">
                    {data[value[0]].wordCount}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="pie">
              <Card>
                <CardHeader>
                  <CardTitle>Event Series Name</CardTitle>
                  <CardDescription>{data[value[0]].eventName}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-center items-center h-80">
                    {data[value[0]].wordCount}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="cloud">
              <Card>
                <CardHeader>
                  <CardTitle>Event Series Name</CardTitle>
                  <CardDescription>{data[value[0]].eventName}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-center items-center h-80">
                    {data[value[0]].wordCount}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
