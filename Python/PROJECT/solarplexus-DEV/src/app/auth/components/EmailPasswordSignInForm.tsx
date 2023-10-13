'use client';

import { useForm } from 'react-hook-form';
import Link from 'next/link';

import TextField from '~/core/ui/TextField';
import Button from '~/core/ui/Button';
import If from '~/core/ui/If';
import { useState } from 'react';
import { AuthError } from '@supabase/gotrue-js';
import CheckBox from '~/app/(site)/components/forms/CheckBox';

const EmailPasswordSignInForm: React.FCC<{
  onSubmit: (params: { email: string; password: string }) => unknown;
  loading: boolean;
  error: Maybe<Error | AuthError | unknown>;
}> = ({ onSubmit, loading, error }) => {
  const [checked, setChecked] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState(false);
  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const emailControl = register('email', {
    required: true,
    pattern: {
      value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
      message: 'Please provide right email format',
    },
  });
  const passwordControl = register('password', {
    required: true,
    minLength: {
      value: 6,
      message: 'Please provide a password with at least 6 characters',
    },
  });
  const errors = formState.errors;

  return (
    <form className={'w-full'} onSubmit={handleSubmit(onSubmit)}>
      <div className={'flex-col space-y-5'}>
        <TextField>
          <TextField.Label>
            Email
            <TextField.Input
              data-cy={'email-input'}
              required
              type="email"
              placeholder={'your@email.com'}
              {...emailControl}
            />
          </TextField.Label>
          <TextField.Error error={errors.email?.message} />
          {!!error && (
            <TextField.Error
              error={`We can't find your email. Sign up for an account`}
            />
          )}
        </TextField>

        <TextField>
          <TextField.Label>
            Password
            <TextField.Input
              required
              data-cy={'password-input'}
              type={visiblePassword ? 'text' : 'password'}
              placeholder={''}
              inputClassName="pr-14"
              {...passwordControl}
            />
          </TextField.Label>
          <TextField.TogglePassword visiblePassword={visiblePassword} onClick={() => setVisiblePassword(!visiblePassword)} />
        </TextField>
        <div className={`flex justify-between pt-2`}>
          <div className={'flex items-center space-x-1'}>
            <CheckBox
              checked={checked}
              onChange={() => setChecked(!checked)}
              label="Remember me"
            />
          </div>
          <div className={'py-0.5 text-sm'}>
            <Link
              href={'/auth/password-reset'}
              className={'underline hover:underline font-semibold text-grey-800'}
            >
              Forgot password?
            </Link>
          </div>
        </div>

        <div className="pb-5">
          <Button
            className={
              'w-full !font-bold !bg-grey-800 !rounded-[100px] !h-[50px] !tracking-wide'
            }
            data-cy="auth-submit-button"
            type="submit"
            size="large"
            loading={loading}
          >
            <If condition={loading} fallback={'Continue'}>
              Signing in...
            </If>
          </Button>
        </div>
      </div>
    </form>
  );
};

export default EmailPasswordSignInForm;
