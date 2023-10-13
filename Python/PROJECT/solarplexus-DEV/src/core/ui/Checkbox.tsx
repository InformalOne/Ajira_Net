import React, { useMemo } from 'react';

const Checkbox: React.FCC<{
  value: boolean;
  onChange: () => void;
}> = ({ value = false, onChange, children }) => {
  return (
    <div className={'text-gray flex items-center space-x-2'}>
      <input
        type="checkbox"
        checked={value}
        onChange={onChange}
        className={'cursor-pointer form-checkbox rounded-sm w-5 h-5 checked:bg-primary-500'}
      />
      <label onClick={onChange} className={'cursor-pointer'}>
        {children}
      </label>
    </div>
  );
};

export default Checkbox;
