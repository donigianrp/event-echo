import React, { FunctionComponent } from 'react';

interface Message {
  header: string;
  description: string;
}

interface Props {
  message: Message;
}

const NoContentDisplay: FunctionComponent<Props> = ({ message }) => {
  return (
    <div className="grid w-full min-h-[320px] h-full">
      <div className="self-center justify-self-center">
        <h4 className="text-xl font-semibold text-center">{message.header}</h4>
        <div className="text-center">{message.description}</div>
      </div>
    </div>
  );
};

export default NoContentDisplay;
