import React, { InputHTMLAttributes } from 'react';
import Input from '~/app/(site)/components/forms/Input';
import clsx from 'clsx';

type Props = InputHTMLAttributes<unknown> & {
  className?: string;
}

const RangeValue: React.FC<Props> = ({ className, ...rest }) => {
  const { size, ...inputRest } = rest;

  return (
    <div className={clsx('flex gap-4 items-center', className)}>
      <input type="range" className="slider" {...rest} />
      <Input
        className="!h-10 border-grey-400 rounded-[10px] text-center !min-w-[130px] w-[130px] text-xl"
        type="number"
        {...inputRest}
      />
    </div>
  )
}

export default RangeValue;
