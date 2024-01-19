import { useTheme } from 'next-themes';
import { FunctionComponent } from 'react';
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { GraphData } from './bar_graph';

interface Props {
  data: GraphData[];
}

const LineGraph: FunctionComponent<Props> = ({ data }) => {
  const { theme } = useTheme();
  const foregroundToggle = theme === 'dark' ? '#f2f2f2' : '#09090b';
  return (
    <ResponsiveContainer width="100%" height={320}>
      <LineChart data={data}>
        <Line
          className="z-20"
          type="monotone"
          dataKey="wordCount"
          stroke="#30d98a"
          activeDot={{ stroke: foregroundToggle }}
          animationBegin={0}
          animationDuration={500}
        />
        <XAxis
          height={65}
          dataKey="name"
          stroke={foregroundToggle}
          interval={0}
          tick={({ x, y, payload }) => {
            return (
              <g transform={`translate(${x},${y})`}>
                <text
                  x={0}
                  y={0}
                  dy={10}
                  textAnchor="end"
                  fill={foregroundToggle}
                  transform="rotate(-45)"
                >
                  {payload.value}
                </text>
              </g>
            );
          }}
        />
        <YAxis stroke={foregroundToggle} />
        <Tooltip
          cursor={{ visibility: 'hidden' }}
          content={({ active, payload, label }) => {
            if (active && payload && payload.length) {
              return (
                <div className="bg-popover rounded-xl border border-border p-2">
                  {label}: {payload[0].value}
                </div>
              );
            }
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineGraph;
