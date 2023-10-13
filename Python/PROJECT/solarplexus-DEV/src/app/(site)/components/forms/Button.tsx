import React, { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

const ButtonStyles: any = {
  variants: {
    contain: {
      primary: 'bg-primary text-white border-primary',
      secondary: 'bg-black text-white border-black',
      grey: 'bg-grey-800 text-white border-grey-800',
    },
    outline: {
      primary: 'bg-transparent border border-primary text-primary',
      secondary: 'bg-transparent border border-secondary text-black',
      grey: 'bg-transparent border border-grey-800 text-black',
    },
    text: {
      primary: 'bg-white text-primary border-white',
      secondary: 'bg-white text-black-white',
      grey: 'bg-white text-grey-800-white',
    },
  },
  size: {
    lg: 'h-[50px] text-lg font-bold rounded-3xl',
    md: 'h-10 rounded-3xl min-w-[160px] px-5 py-1 text-base font-semibold border-2',
    sm: 'h-[30px] rounded-2xl min-w-[130px] px-3 py-0.5 text-xs font-medium border-1',
    xs: 'h-5 rounded-xl min-w-[110px] px-2 py-0 text-xs border-1 font-medium',
  }
}

type Props = ButtonHTMLAttributes<unknown> & {
  variant?: 'contain' | 'outline' | 'text',
  color?: 'primary' | 'secondary' | 'grey',
  size?: 'lg' | 'md' | 'sm' | 'xs'
}

const Button: React.FC<Props> = ({
  className,
  variant = 'contain',
  color = 'primary',
  size = 'md',
  ...rest
}) => {
  return <button className={clsx('hover:opacity-70', ButtonStyles.variants[variant][color], ButtonStyles.size[size], className)} {...rest} />
}

export default Button;
