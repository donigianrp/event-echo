import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/app/components/ui/card';
import { FunctionComponent } from 'react';
import { Event } from '../GraphTabs';

interface Props {
  isAggregate: boolean;
  data: Event[];
  aggValue: number[];
  value: number;
  sum: number;
}

const TabCard: FunctionComponent<Props> = ({
  isAggregate,
  data,
  aggValue,
  value,
  sum,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Event Series Name</CardTitle>
        <CardDescription>
          {isAggregate
            ? `${data[aggValue[0]].eventName} to ${data[aggValue[1]].eventName}`
            : data[value].eventName}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex justify-center items-center h-80">
          {isAggregate ? sum : data[value].wordCount}
        </div>
      </CardContent>
    </Card>
  );
};

export default TabCard;
