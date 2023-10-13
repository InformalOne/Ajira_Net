"use client";
import React, { PropsWithChildren, useRef } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useOnClickOutside } from 'usehooks-ts';
import clsx from 'clsx';


export type ModalProps = PropsWithChildren<unknown> & {
  onClose: () => void;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({ children, onClose, className }) => {
  const ref = useRef(null);

  useOnClickOutside(ref, onClose);

  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 w-full h-full z-10 flex items-center justify-center px-6 bg-grey-800/50">
      <div ref={ref} className={clsx('rounded rounded-[20px] bg-white max-w-[1346px] w-full p-6 relative', className)}>
        <XMarkIcon className="absolute top-6 right-6 cursor-pointer w-10 h-10 z-10" onClick={onClose} />
        {children}
      </div>
    </div>
  )
}

export default Modal;
