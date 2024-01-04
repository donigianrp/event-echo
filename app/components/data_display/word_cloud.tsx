'use client';
import React, { useEffect } from 'react';
import WordCloud, { Options } from 'wordcloud';
import Sentiment from 'sentiment';

interface WordCloudDisplayProps {
  words: [string, number][];
}

const WordCloudDisplayComponent: React.FC<WordCloudDisplayProps> = ({
  words,
}) => {
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

  useEffect(() => {
    const options: Options = {
      list: words,
      gridSize: 20,
      weightFactor: 5,
      fontFamily: 'Impact',
      color: (word, weight, fontSize, distance, theta) => {
        const { score } = sentiment.analyze(word);
        if (score < -10) {
          return sentimentColors['-5'];
        } else if (score > 10) {
          return sentimentColors['5'];
        } else {
          const typedScore = String(score) as keyof typeof sentimentColors;
          return sentimentColors[typedScore];
        }
      },
      backgroundColor: '#fff',
      minSize: 10,
    };

    WordCloud(document.getElementById('my-canvas')!, options);
  }, [words]);

  return (
    <div>
      <canvas id="my-canvas" width="800" height="800"></canvas>
    </div>
  );
};
export default WordCloudDisplayComponent;
