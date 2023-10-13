'use client';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import If from '~/core/ui/If';

import EmailPasswordSignUpContainer from '~/app/auth/components/EmailPasswordSignUpContainer';
import OAuthProviders from '~/app/auth/components/OAuthProviders';

import configuration from '~/configuration';
import SolarLogo from '~/core/ui/SolarLogo';
import Heading from '~/core/ui/Heading';

function SignUpMethodsContainer() {
  const router = useRouter();

  const onSignUp = useCallback(() => {
    router.push(configuration.paths.appHome);
  }, [router]);

  return (
    <>
      <div
        className={
          'shadow-card max-w-[540px] rounded-2xl w-full p-14 space-y-3 flex flex-col items-center justify-center'
        }
      >
        <SolarLogo />
        <div className="pb-5">
          <Heading type={5}>Create your account</Heading>
        </div>
        <EmailPasswordSignUpContainer onSignUp={onSignUp} />

        <If condition={configuration.auth.providers.oAuth.length}>
          <div className={'flex items-center justify-center mb-4 mt-8 w-full'}>
            <div
              className={'border-t-2 opacity-20 border-gray-400 mx-2 w-full'}
            ></div>
            <div className={'text-lg font-semibold opacity-20'}>OR</div>
            <div
              className={'border-t-2 opacity-20 border-gray-400 mx-2 w-full'}
            ></div>
          </div>
          <OAuthProviders />
        </If>
      </div>
    </>
  );
}

export default SignUpMethodsContainer;
