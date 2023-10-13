'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';

import If from '~/core/ui/If';
import OAuthProviders from '~/app/auth/components/OAuthProviders';

import EmailPasswordSignInContainer from '~/app/auth/components/EmailPasswordSignInContainer';

import configuration from '~/configuration';
import SolarLogo from '~/core/ui/SolarLogo';
import Heading from '~/core/ui/Heading';

function SignInMethodsContainer() {
  const router = useRouter();

  const onSignIn = useCallback(() => {
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
          <Heading type={5}>Login to continue</Heading>
        </div>
        <EmailPasswordSignInContainer onSignIn={onSignIn} />

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

export default SignInMethodsContainer;
