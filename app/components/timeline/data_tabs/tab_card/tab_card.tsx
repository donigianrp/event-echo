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
    title: string | null;
    event_position: number;
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
        <CardTitle className="overflow-hidden line-clamp-2 leading-tight">
          {comments[value]?.title && comments[value].title}
        </CardTitle>
        <CardDescription>
          {comments && comments.length > 0
            ? isAggregate
              ? `Event ${comments[aggValue[0]]?.event_position} to Event ${
                  comments[aggValue[1]]?.event_position
                }`
              : `Event ${comments[value]?.event_position}`
            : ''}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {comments && comments.length > 0 ? (
          comments[value].contents ? (
            <div className="overflow-x-auto">{renderDataDisplay}</div>
          ) : (
            <div className="grid w-full h-[320px]">
              <h4 className="self-center justify-self-center text-xl font-semibold text-center">
                There are no comments for this event
              </h4>
            </div>
          )
        ) : (
          <div className="grid w-full h-[320px]">
            <div className="self-center justify-self-center">
              <h4 className="text-xl font-semibold text-center">
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
