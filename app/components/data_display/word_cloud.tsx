'use client';
import React, { useEffect } from 'react';
import WordCloud, { Options } from 'wordcloud';
import Sentiment from 'sentiment';
import { useTheme } from 'next-themes';
import useScreenSize from '@/hooks/useScreenSize';
import { useDebounce } from 'use-debounce';
import { useInView } from 'react-intersection-observer';
interface WordCloudDisplayProps {
  words: [string, number][];
}

const WordCloudDisplayComponent: React.FC<WordCloudDisplayProps> = ({
  words,
}) => {
  const { inView, ref } = useInView();
  const { theme } = useTheme();
  const sentiment = new Sentiment();
  const sentimentColors = {
    '-5': '#a30101',
    '-4': '#ad1c0d',
    '-3': '#b73618',
    '-2': '#c25024',
    '-1': '#cc6a2f',
    '0': '#666666',
    '1': '#a9f6a9',
    '2': '#7ee282',
    '3': '#53c85c',
    '4': '#28ad37',
    '5': '#02c502',
  };

  const screenSize = useDebounce(useScreenSize(), 500);

  useEffect(() => {
    if (words && words[0]) {
      const mostFreqWord = words[0][1];
      const options: Options = {
        list: words,
        gridSize: 5,
        weightFactor: mostFreqWord > 15 ? 4 : 12,
        fontFamily: 'Impact',
        color: (word, weight, fontSize, distance, theta) => {
          const { score } = sentiment.analyze(word);
          if (score < -5) {
            return sentimentColors['-5'];
          } else if (score > 5) {
            return sentimentColors['5'];
          } else {
            const typedScore = String(score) as keyof typeof sentimentColors;
            return sentimentColors[typedScore];
          }
        },
        backgroundColor: theme === 'dark' ? '#0F172A' : '#e0e7eb',
        minSize: 10,
        shrinkToFit: true,
      };

      if (inView) {
        WordCloud(document.getElementById('my-canvas')!, options);
      }
    }
  }, [words, theme, screenSize[0].width, inView]);

  return (
    <div id="surrounding_div" className="w-full h-[320px]" ref={ref}>
      {inView && (
        <canvas
          width={document.getElementById('surrounding_div')?.offsetWidth}
          height={document.getElementById('surrounding_div')?.offsetHeight}
          id="my-canvas"
        />
      )}
    </div>
  );
};
export default WordCloudDisplayComponent;
