import React from 'react';
import clsx from 'clsx';
import { CheckIcon, MinusIcon } from '@heroicons/react/24/outline';

type Props = {
  checked?: boolean;
  checking?: boolean;
  onSelect?: () => void;
};

const TableCheckbox: React.FC<Props> = ({ checked, checking, onSelect }) => {
  return (
    <span
      className={clsx(
        'w-4 h-4 border border-grey-300 bg-white rounded block cursor-pointer flex-shrink-0 flex items-center justify-center',
        (checked || checking) && '!border-primary !bg-primary',
      )}
      onClick={onSelect}
    >
      {checking ? (
        <MinusIcon className="w-4 h-4 text-white" />
      ) : checked ? (
        <CheckIcon className="w-4 h-4 text-white" />
      ) : null}
    </span>
  );
};

export default TableCheckbox;
