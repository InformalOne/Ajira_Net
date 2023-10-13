import Link from 'next/link';

import Heading from '~/core/ui/Heading';
import SignUpMethodsContainer from '~/app/auth/components/SignUpMethodsContainer';

import configuration from '~/configuration';

const SIGN_IN_PATH = configuration.paths.signIn;

export const metadata = {
  title: 'Sign up',
};

function SignUpPage() {
  return (
    <>
      <SignUpMethodsContainer />
      <div className={'w-full flex flex-col items-center text-lg mt-10 max-w-[500px] px-2'}>
        <p className={'flex space-x-1'}>
          <span>Already have an account?</span>

          <Link
            className={'hover:underline'}
            href={SIGN_IN_PATH}
          >
            <span className={'font-bold underline text-grey-800'}>Sign in</span>
          </Link>
        </p>

        <p className={'mt-3 text-center text-grey-800 text-sm'}>
          By continue, you agree to our{' '}
          <span className={'underline cursor-pointer'}>Terms of Service</span>{' '}
          and{' '}
          <span className={'underline cursor-pointer'}>Privacy Policy</span>{' '}
        </p>
      </div>
    </>
  );
}

export default SignUpPage;
