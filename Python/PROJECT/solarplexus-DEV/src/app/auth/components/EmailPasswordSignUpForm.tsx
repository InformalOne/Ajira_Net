import { useForm } from 'react-hook-form';

import TextField from '~/core/ui/TextField';
import Button from '~/core/ui/Button';
import If from '~/core/ui/If';
import { useEffect, useState } from 'react';

const EmailPasswordSignUpForm: React.FCC<{
  onSubmit: (params: {
    email: string;
    password: string;
    repeatPassword: string;
  }) => unknown;
  loading: boolean;
}> = ({ onSubmit, loading }) => {
  const [visiblePassword, setVisiblePassword] = useState(false);

  const { register, handleSubmit, watch, formState, setValue } = useForm({
    defaultValues: {
      email: '',
      password: '',
      repeatPassword: '',
    },
  });

  const emailControl = register('email', { required: true });
  const errors = formState.errors;

  const passwordValue = watch(`password`);

  const passwordControl = register('password', {
    required: true,
    minLength: {
      value: 6,
      message: 'Please provide a password with at least 6 characters',
    },
  });

  useEffect(() => {
    setValue('repeatPassword', passwordValue);
  }, [passwordValue, setValue]);

  return (
    <form className={'w-full'} onSubmit={handleSubmit(onSubmit)}>
      <div className={'flex-col space-y-4'}>
        <TextField>
          <TextField.Label>
            Email
            <TextField.Input
              {...emailControl}
              data-cy={'email-input'}
              required
              type="email"
              placeholder={''}
              className={'!rounded-xl !ring-0'}
            />
          </TextField.Label>

          <TextField.Error error={errors.email?.message} />
        </TextField>

        <TextField>
          <TextField.Label>
            Password
            <TextField.Input
              {...passwordControl}
              data-cy={'password-input'}
              required
              type={visiblePassword ? 'text' : 'password'}
              placeholder={''}
              inputClassName="pr-14"
              className={'!rounded-xl !ring-0'}
            />
            <TextField.Error
              data-cy="password-error"
              error={errors.password?.message}
            />
          </TextField.Label>
          <TextField.TogglePassword visiblePassword={visiblePassword} onClick={() => setVisiblePassword(!visiblePassword)} />
        </TextField>

        <div className="pb-5 pt-4">
          <Button
            className={
              'w-full !font-bold !bg-grey-800 !rounded-[100px] !h-[50px] !tracking-wide'
            }
            data-cy="auth-submit-button"
            type="submit"
            size="large"
            loading={loading}
          >
            <If condition={loading} fallback={`Sign up`}>
              Signing up...
            </If>
          </Button>
        </div>
      </div>
    </form>
  );
};

export default EmailPasswordSignUpForm;
