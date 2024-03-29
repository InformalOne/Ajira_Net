import React from 'react';
import { Cog8ToothIcon } from '@heroicons/react/24/outline';

import NavigationMenu from '~/core/ui/Navigation/NavigationMenu';
import NavigationItem from '~/core/ui/Navigation/NavigationItem';
import AppHeader from '~/app/(app)/components/AppHeader';
import AppContainer from '~/app/(app)/components/AppContainer';

const links = [
  {
    path: '/settings/profile',
    label: `Profile`,
  },
  {
    path: '/settings/subscription',
    label: 'Subscription',
  },
];

async function SettingsLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      <AppHeader>
        <span className={'flex space-x-2'}>
          <Cog8ToothIcon className="w-6" />
          <span>Settings</span>
        </span>
      </AppHeader>

      <AppContainer>
        <NavigationMenu bordered>
          {links.map((link) => (
            <NavigationItem
              className={'flex-1 lg:flex-none'}
              link={link}
              key={link.path}
            />
          ))}
        </NavigationMenu>

        <div
          className={`mt-4 flex h-full flex-col space-y-4 lg:mt-6 lg:flex-row lg:space-x-8 lg:space-y-0`}
        >
          {children}
        </div>
      </AppContainer>
    </>
  );
}

export default SettingsLayout;
