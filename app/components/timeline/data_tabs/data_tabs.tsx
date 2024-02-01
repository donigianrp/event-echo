import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { BarChart4, Cloud, LineChart } from 'lucide-react';
import { FunctionComponent } from 'react';
import TabCard from './tab_card/tab_card';
import { GraphData } from '../timeline';

export interface Event {
  [val: string]: number;
}

interface Chart {
  type: 'bar' | 'line' | 'cloud';
  icon: JSX.Element;
}

interface Props {
  isAggregate: boolean;
  graphData: GraphData[];
  wordCloudData: [string, number][];
  aggValue: number[];
  value: number;
  comments: {
    source_content_id: number;
    contents: string;
  }[];
}

const charts: Chart[] = [
  { type: 'bar', icon: <BarChart4 className="h-5" /> },
  { type: 'line', icon: <LineChart className="h-5" /> },
  { type: 'cloud', icon: <Cloud className="h-5" /> },
];

const DataTabs: FunctionComponent<Props> = ({
  isAggregate,
  graphData,
  wordCloudData,
  aggValue,
  value,
  comments,
}) => {
  return (
    <Tabs defaultValue="bar">
      <TabsList className="grid w-full grid-cols-3">
        {charts.map((chart, idx) => {
          return (
            <TabsTrigger key={idx} value={chart.type}>
              {chart.icon}
            </TabsTrigger>
          );
        })}
      </TabsList>
      {charts.map((chart, idx) => {
        return (
          <TabsContent key={idx} value={chart.type}>
            <TabCard
              isAggregate={isAggregate}
              graphData={graphData}
              wordCloudData={wordCloudData}
              aggValue={aggValue}
              value={value}
              type={chart.type}
              comments={comments}
            />
          </TabsContent>
        );
      })}
    </Tabs>
  );
};

export default DataTabs;
