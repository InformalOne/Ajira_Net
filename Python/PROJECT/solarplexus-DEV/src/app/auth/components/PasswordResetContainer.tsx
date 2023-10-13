'use client';

import { FormEvent, useCallback } from 'react';

import useResetPassword from '~/core/hooks/use-reset-password';
import AuthErrorMessage from '~/app/auth/components/AuthErrorMessage';

import If from '~/core/ui/If';
import Alert from '~/core/ui/Alert';
import TextField from '~/core/ui/TextField';
import Button from '~/core/ui/Button';

import configuration from '~/configuration';
import Heading from '~/core/ui/Heading';

function PasswordResetContainer() {
  const resetPasswordMutation = useResetPassword();
  const error = resetPasswordMutation.error;
  const success = resetPasswordMutation.data;

  const onSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const data = new FormData(event.currentTarget);
      const email = data.get('email') as string;
      const redirectTo = getReturnUrl();

      await resetPasswordMutation.trigger({
        email,
        redirectTo,
      });
    },
    [resetPasswordMutation],
  );

  return (
    <>
      <div
        className={
          'shadow-card max-w-[540px] rounded-2xl w-full p-14 space-y-3 flex flex-col items-center justify-center'
        }
      >
        <If condition={success}>
          <Alert type={'success'}>
            Check your Inbox! We emailed you a link for resetting your Password
          </Alert>
        </If>

        <If condition={!resetPasswordMutation.data}>
          <>
            <form
              onSubmit={(e) => void onSubmit(e)}
              className={'container mx-auto flex justify-center'}
            >
              <div className={'flex-col space-y-3 justify-center items-center'}>
                <div className={'text-center mb-2'}>
                  <Heading type={1}>Forgot password</Heading>
                </div>
                <div className="pb-6">
                  <p
                    className={
                      'text-lg font-semibold text-center text-grey-800'
                    }
                  >
                    Enter your email address and we`ll send you a link to reset
                    your password.
                  </p>
                </div>

                <TextField.Label>
                  Email
                  <TextField.Input
                    name="email"
                    required
                    type="email"
                    placeholder={''}
                    className={'!rounded-xl !ring-0'}
                  />
                </TextField.Label>

                <AuthErrorMessage error={error} />

                <div className="pt-4">
                  <Button
                    className={
                      'w-full !font-bold !bg-grey-800 !rounded-[100px] !h-[50px] !tracking-wide'
                    }
                    type="submit"
                    size="large"
                    data-cy="auth-submit-button"
                    loading={resetPasswordMutation.isMutating}
                    block
                  >
                    Continue
                  </Button>
                </div>
              </div>
            </form>
          </>
        </If>
      </div>
    </>
  );
}

export default PasswordResetContainer;

/**
 * @description
 * Return the URL where the user will be redirected to after resetting
 * their password
 */
function getReturnUrl() {
  const host = window.location.origin;
  const callback = configuration.paths.authCallback;
  const redirectPath = configuration.paths.settings.password;

  return `${host}${callback}?redirectPath=${redirectPath}`;
}
