'use client';

import React, { forwardRef } from 'react';
import classNames from 'clsx';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import Label from './Label';
import If from '~/core/ui/If';
import { visible } from 'ansi-colors';

type Props = React.InputHTMLAttributes<any> & {
  inputClassName?: string
};

const Hint: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <span
      className={`block pl-1 text-xs
        font-normal leading-tight text-gray-500 dark:text-gray-400`}
    >
      {children}
    </span>
  );
};

const Input = forwardRef<React.ElementRef<'input'>, Props>(
  function TextFieldInputComponent({ className, children, inputClassName, ...props }, ref) {
    return (
      <div
        className={classNames(
          `active-within:ring-2 relative flex h-12 w-full items-center
        rounded-lg border border-grey-500 bg-white font-medium text-grey-800
        shadow-sm ring-primary-200 ring-offset-1 transition-all focus-within:ring-2`,
          className,
          {
            [`cursor-not-allowed bg-gray-100 hover:bg-gray-100`]:
              props.disabled,
          },
        )}
      >
        <If condition={children}>
          <span className={'flex pl-2.5'}>{children}</span>
        </If>

        <input
          {...props}
          className={classNames(
            `h-12 flex-1 rounded-md text-base bg-transparent px-3 py-2 outline-none disabled:cursor-not-allowed disabled:opacity-30`,
            inputClassName,
          )}
          ref={ref}
        />
      </div>
    );
  },
);

type TextFieldComponent = React.FC<
  React.PropsWithChildren<{
    className?: string;
  }>
> & {
  Label: typeof Label;
  Hint: typeof Hint;
  Input: typeof Input;
  Error: typeof ErrorMessage;
  TogglePassword: typeof TogglePassword;
};

const TextField: TextFieldComponent = ({ children, className }) => {
  return (
    <div className={classNames(`flex flex-col space-y-1 relative`, className)}>
      {children}
    </div>
  );
};

const ErrorMessage: React.FC<
  { error: Maybe<string> } & React.HTMLAttributes<unknown>
> = ({ error, ...props }) => {
  const shouldDisplay = !!error;

  if (!shouldDisplay) {
    return null;
  }

  return (
    <Hint>
      <span {...props} className={'py-0.5 text-red-700 dark:text-red-500'}>
        {error}
      </span>
    </Hint>
  );
};

const TogglePassword: React.FC<{
  visiblePassword: boolean;
  onClick?: () => void;
}> = ({ visiblePassword, onClick }) => {
  return (
    <span className="absolute right-4 bottom-2.5 z-10 cursor-pointer hover:opacity-70" onClick={onClick}>
      {visiblePassword ? <EyeSlashIcon className="w-7 text-grey-500" /> : <EyeIcon className="w-7 text-grey-500" />}
    </span>
  )
}

TextField.Hint = Hint;
TextField.Label = Label;
TextField.Input = Input;
TextField.Error = ErrorMessage;
TextField.TogglePassword = TogglePassword;

export default TextField;

export {
  TextField,
  Hint as TextFieldHint,
  Label as TextFieldLabel,
  Input as TextFieldInput,
  ErrorMessage as TextFieldError,
};
