'use client';
import { useTheme } from 'next-themes';
import { FunctionComponent, useState } from 'react';
import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export interface GraphData {
  name: string;
  wordCount: number;
}

interface Props {
  data: GraphData[];
}

const BarGraph: FunctionComponent<Props> = ({ data }) => {
  const [currentBar, setCurrentBar] = useState('');
  const { theme } = useTheme();
  const foregroundToggle = theme === 'dark' ? '#f2f2f2' : '#09090b';

  return (
    <ResponsiveContainer minWidth={650} height={320}>
      <BarChart data={data}>
        <Bar
          type="monotone"
          dataKey="wordCount"
          fill="#30d98a"
          animationBegin={0}
          animationDuration={500}
          onMouseOver={(state) => {
            setCurrentBar(state.name);
          }}
          onMouseOut={() => {
            setCurrentBar('');
          }}
        >
          {data.map((entry, index) => (
            <Cell
              key={index}
              stroke={currentBar === entry.name ? foregroundToggle : '#30d98a'}
              strokeWidth={2}
            />
          ))}
        </Bar>
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
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarGraph;
