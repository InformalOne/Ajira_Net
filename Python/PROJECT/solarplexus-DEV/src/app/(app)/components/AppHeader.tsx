'use client';

import useSignOut from '~/core/hooks/use-sign-out';
import useUserSession from '~/core/hooks/use-user-session';
import ProfileDropdown from '~/components/ProfileDropdown';
import MobileNavigation from '~/components/MobileNavigation';

import Heading from '~/core/ui/Heading';
import AppContainer from './AppContainer';

const AppHeader: React.FCC<{
  Icon?: React.ReactNode;
}> = ({ children, Icon }) => {
  const userSession = useUserSession();
  const signOut = useSignOut();

  return (
    <div className="flex items-center justify-between border-b border-gray-50 dark:border-dark-700">
      <AppContainer>
        <div className={'flex w-full flex-1 justify-between'}>
          <div
            className={
              'flex items-center justify-between space-x-2.5 lg:space-x-0'
            }
          >
            <div className={'flex items-center lg:hidden'}>
              <MobileNavigation />
            </div>

            <div className={'flex items-center space-x-2 lg:space-x-4'}>
              <Heading type={5}>
                <span className={'flex items-center space-x-0.5 lg:space-x-2'}>
                  {Icon}

                  <span
                    className={
                      'lg:text-initial text-base font-medium dark:text-white'
                    }
                  >
                    {children}
                  </span>
                </span>
              </Heading>
            </div>
          </div>

          <div className={'flex items-center space-x-4'}>
            <div className={'hidden items-center md:flex'}></div>

            <ProfileDropdown
              userSession={userSession}
              signOutRequested={signOut}
            />
          </div>
        </div>
      </AppContainer>
    </div>
  );
};

export default AppHeader;
