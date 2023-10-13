'use client';

import TextField from '~/core/ui/TextField';
import Button from '~/core/ui/Button';

import configuration from '~/configuration';
import Heading from '~/core/ui/Heading';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

function NewPasswordContainer() {
  const [visiblePassword, setVisiblePassword] = useState(false);
  const { register, handleSubmit, watch, formState } = useForm({
    defaultValues: {
      password: '',
      repeatPassword: '',
    },
  });

  const errors = formState.errors;

  const passwordControl = register('password', {
    required: true,
    minLength: {
      value: 6,
      message: 'Please provide a password with at least 6 characters',
    },
  });

  const passwordValue = watch(`password`);

  const repeatPasswordControl = register('repeatPassword', {
    required: true,
    minLength: {
      value: 6,
      message: 'Please provide a password with at least 6 characters',
    },
    validate: (value) => {
      if (value !== passwordValue) {
        return 'The passwords do not match';
      }

      return true;
    },
  });

  return (
    <>
      <div
        className={
          'shadow-card max-w-[540px] rounded-2xl w-full p-14 space-y-3 flex flex-col items-center justify-center'
        }
      >
        <form
          onSubmit={(e) => {}}
          className={'container mx-auto flex justify-center'}
        >
          <div className={'flex-col space-y-3 justify-center items-center'}>
            <div className={'text-center mb-2'}>
              <Heading type={1}>New password</Heading>
            </div>
            <div className="pb-6">
              <p
                className={
                  'text-lg font-semibold text-center text-grey-800'
                }
              >
                Enter a new password to reset the password on your account.
              </p>
            </div>

            <TextField>
              <TextField.Label>
                New password *
                <TextField.Input
                  {...passwordControl}
                  data-cy={'password-input'}
                  required
                  type="password"
                  placeholder={''}
                  className={'!rounded-xl !ring-0'}
                />
                <TextField.Error
                  data-cy="password-error"
                  error={errors.password?.message}
                />
              </TextField.Label>
            </TextField>

            <TextField>
              <TextField.Label>
                Confirm new password *
                <TextField.Input
                  {...repeatPasswordControl}
                  data-cy={'repeat-password-input'}
                  required
                  type={visiblePassword ? 'text' : 'password'}
                  placeholder={''}
                  inputClassName="pr-14"
                  className={'!rounded-xl !ring-0'}
                />
                <TextField.Error
                  data-cy="repeat-password-error"
                  error={errors.repeatPassword?.message}
                />
              </TextField.Label>
              <TextField.TogglePassword visiblePassword={visiblePassword} onClick={() => setVisiblePassword(!visiblePassword)} />
            </TextField>

            <div className="pt-4">
              <Button
                className={
                  'w-full !font-bold !bg-grey-800 !rounded-[100px] !h-[50px] !tracking-wide'
                }
                type="submit"
                size="large"
                block
              >
                Reset password
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default NewPasswordContainer;
