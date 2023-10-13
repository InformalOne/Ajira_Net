import React, { InputHTMLAttributes } from 'react';
import clsx from 'clsx';

const InputStyles: any = {
  size: {
    xl: 'h-[60px] bg-white shadow-card border border-grey-150 rounded rounded-[20px] px-5',
    lg: 'h-12 rounded-lg border border-grey-500/50 px-4',
    base: 'h-10 rounded border border-grey-500/50 px-5',
    md: 'h-[30px] rounded-2xl border border-grey-800 px-4 text-sm',
    sm: 'h-5 rounded-xl min-w-[110px] px-2 py-0 text-xs border-grey-800 px-4 text-xs',
  },
}

type Props = Omit<InputHTMLAttributes<any>, 'size'> & {
  variants?: 'contained' | 'outlined';
  size?: 'xl' | 'lg' | 'md' | 'sm' | 'base';
}

const Input: React.FC<Props> = ({
  className,
  variants = 'outlined',
  size = 'md',
  ...rest
}) => {
  return (
    <input
      className={clsx(
      'disabled:bg-grey-10 disabled:text-grey-450 disabled:font-medium',
        InputStyles.size[size],
        className
      )}
      { ...rest }
    />
  )
}

export default Input;
