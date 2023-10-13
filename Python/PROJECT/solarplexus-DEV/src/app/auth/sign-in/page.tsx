import Link from 'next/link';

import Heading from '~/core/ui/Heading';
import configuration from '~/configuration';
import SignInMethodsContainer from '~/app/auth/components/SignInMethodsContainer';

const SIGN_UP_PATH = configuration.paths.signUp;

export const metadata = {
  title: 'Sign In',
};

function SignInPage() {
  return (
    <>
      <SignInMethodsContainer />

      <div className={'w-full flex flex-col items-center text-xs mt-10 max-w-[500px] px-2'}>
        <p className={'flex space-x-1 text-lg text-grey-800'}>
          <span>Don&apos;t have an account?</span>

          <Link
            className={'hover:underline-none'}
            href={SIGN_UP_PATH}
          >
            <span className={'font-bold underline text-grey-800'}>Sign up</span>
          </Link>
        </p>

        <p className={'mt-3 text-center text-sm text-grey-800'}>
          By continue, you agree to our{' '}
          <span className={'underline cursor-pointer'}>Terms of Service</span>{' '}
          and{' '}
          <span className={'underline cursor-pointer'}>Privacy Policy</span>{' '}
        </p>
      </div>
    </>
  );
}

export default SignInPage;
