import React, { InputHTMLAttributes } from 'react';
import clsx from 'clsx';

const CheckBoxStyles: any = {
  size: {
    md: 'w-[22px] h-[22px] rounded-[0.25rem]',
    lg: 'w-8 h-8 rounded-[6px]'
  }
}

type Props = Omit<InputHTMLAttributes<unknown>, 'size'> & {
  className?: string;
  labelClassName?: string;
  label?: string;
  size?: 'md' | 'lg'
}

const CheckBox: React.FC<Props> = ({
  className,
  labelClassName,
  label,
  size = 'md',
  ...rest
}) => {
  return (
    <label
      className={clsx('flex items-center gap-2 cursor-pointer hover:opacity-70', labelClassName)}>
      <input
        className={clsx(`
          relative cursor-pointer border-2 border-grey-400 appearance-none checked:bg-[url("/assets/images/icons/check_icon.svg")] bg-no-repeat bg-center bg-70%
        `, CheckBoxStyles.size[size], className)}
        type="checkbox"
        {...rest}
      />
      {label}
    </label>
  )
}

export default CheckBox;
