import React from 'react';
import clsx from 'clsx';

type Props = {
  avatarImg: string;
  time: string;
  message: string;
  isOwn?: boolean;
  className?: string;
}

const ChatMessage: React.FC<Props> = ({
  avatarImg,
  time,
  message,
  isOwn,
  className
}) => {
  return (
    <div className={clsx('py-7 px-12 flex gap-5 border-b-grey-200',)}>
      <div className="w-7 h-7 shrink-0">
        <img className="w-full h-full object-cover rounded-sm" src={avatarImg} />
      </div>
      <div className="flex gap-1 flex-col items-start">
        <span className="text-[10px] text-gray-500">{time}</span>
        <p className="leading-5">
          {message}
        </p>
        {/*<p className="text-primary-500 mt-1">*/}
        {/*  One2One communication creation guidance (Provide Steps)*/}
        {/*</p>*/}
      </div>
    </div>
  )
}

export default ChatMessage;
