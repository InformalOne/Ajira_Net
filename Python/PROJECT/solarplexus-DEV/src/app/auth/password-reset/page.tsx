import Link from 'next/link';

import configuration from '~/configuration';

import PasswordResetContainer from '~/app/auth/components/PasswordResetContainer';

export const metadata = {
  title: 'Password Reset',
};

function PasswordResetPage() {
  return (
    <PasswordResetContainer />
  );
}

export default PasswordResetPage;
