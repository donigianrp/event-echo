import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { BarChart4, Cloud, LineChart, PieChart } from 'lucide-react';
import { FunctionComponent } from 'react';
import TabCard from './TabCard/TabCard';

export interface Event {
  eventName: string;
  wordCount: number;
}

interface Props {
  isAggregate: boolean;
  data: Event[];
  aggValue: number[];
  value: number;
  sum: number;
}

const charts = [
  { type: 'bar', icon: <BarChart4 className="h-5" /> },
  { type: 'line', icon: <LineChart className="h-5" /> },
  { type: 'pie', icon: <PieChart className="h-5" /> },
  { type: 'cloud', icon: <Cloud className="h-5" /> },
];

const GraphTabs: FunctionComponent<Props> = ({
  isAggregate,
  data,
  aggValue,
  value,
  sum,
}) => {
  return (
    <Tabs defaultValue="bar">
      <TabsList className="grid w-full grid-cols-4">
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
              data={data}
              aggValue={aggValue}
              value={value}
              sum={sum}
            />
          </TabsContent>
        );
      })}
    </Tabs>
  );
};

export default GraphTabs;
