import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/app/components/ui/card';
import { FunctionComponent } from 'react';
import WordCloudDisplayComponent from '@/app/components/data_display/word_cloud';
import BarGraph, { GraphData } from '@/app/components/data_display/bar_graph';
import LineGraph from '@/app/components/data_display/line_graph';
// import { comments } from '@/prisma/seedData';

interface Props {
  isAggregate: boolean;
  graphData: GraphData[];
  wordCloudData: [string, number][];
  aggValue: number[];
  value: number;
  type: 'bar' | 'line' | 'cloud';
  comments: {
    source_content_id: number;
    contents: string;
  }[];
}

const TabCard: FunctionComponent<Props> = ({
  isAggregate,
  graphData,
  wordCloudData,
  aggValue,
  value,
  type,
  comments,
}) => {
  const dataDisplay = (type: string) => {
    switch (type) {
      case 'bar':
        return <BarGraph data={graphData} />;
      case 'line':
        return <LineGraph data={graphData} />;
      case 'cloud':
        return <WordCloudDisplayComponent words={wordCloudData} />;
      default:
        return <></>;
    }
  };

  const renderDataDisplay = dataDisplay(type);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Event Series Name</CardTitle>
        {comments && comments.length > 0 ? (
          <CardDescription>
            {isAggregate
              ? `Event ${comments[aggValue[0]]
                  ?.source_content_id} to Event ${comments[aggValue[1]]
                  ?.source_content_id}`
              : `Event ${comments[value]?.source_content_id}`}
          </CardDescription>
        ) : (
          <CardDescription></CardDescription>
        )}
      </CardHeader>
      <CardContent>
        {comments && comments.length > 0 ? (
          renderDataDisplay
        ) : (
          <div className="grid w-full h-[320px]">
            <div className="self-center justify-self-center">
              <h4 className="scroll-m-20 text-xl font-semibold">
                It looks like you haven&#39;t added any events!
              </h4>
              <div className="text-center">Add an event to see some data.</div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TabCard;
