import React, { InputHTMLAttributes } from 'react';

type Props = InputHTMLAttributes<unknown>;

const ColorPicker: React.FC<Props> = ({ ...rest }) => {
  return (
    <div className="border border-grey-400 rounded-[10px] overflow-hidden h-10">
      <input
        type="color"
        className="w-[100px] rounded-[10px] bg-white border-none scale-[3]"
        {...rest}
      />
    </div>
  )
}

export default ColorPicker;
