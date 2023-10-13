import React, { SelectHTMLAttributes } from 'react';
import clsx from 'clsx';

const SelectStyles: any = {
  size: {
    lg: 'border border-grey-400 rounded-[10px] text-xl h-10 px-5 appearance-none bg-[url("/assets/images/icons/arrow_down_icon.svg")] bg-no-repeat bg-right',
    md: 'h-10 rounded border border-grey-500/50 px-5 appearance-none bg-[url("/assets/images/icons/chevron_down_solid_icon.svg")] bg-no-repeat bg-chevron bg-chevron-p',
  },
}

const OptionStyles: any = {
  size: {
    lg: 'text-xl',
    md: 'text-base'
  }
}

type Props = Omit<SelectHTMLAttributes<unknown>, 'size'> & {
  items?: Array<{
    label: string;
    value: string;
  }>,
  size?: 'lg' | 'md'
}

const Select: React.FC<Props> = ({ className, items, size = 'lg', ...rest }) => {
  return (
    <select
      className={clsx(SelectStyles.size[size], className)}
      {...rest}
    >
      {items?.map((item, index) => (
        <option key={index} value={item.value} className={OptionStyles.size[size]}>{item.label}</option>
      ))}
    </select>
  )
}

export default Select;
