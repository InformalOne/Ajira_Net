import Button from './Button';
import AuthProviderLogo from '~/core/ui/AuthProviderLogo';

const AuthProviderButton: React.FCC<{
  providerId: string;
  onClick: () => unknown;
}> = ({ children, providerId, onClick }) => {
  return (
    <Button
      data-cy={'auth-provider-button'}
      block
      color={'custom'}
      className={`!h-11 relative border border-grey-100 text-gray-600 bg-grey-50
        transition-all hover:border-gray-300
        focus:ring-2 active:bg-gray-100 flex items-center gap-5 !rounded-lg`}
      onClick={onClick}
      data-provider={providerId}
    >
      <AuthProviderLogo providerId={providerId} />

      <span className={'ml-4 text-lg font-semibold text-grey-700'}>{children}</span>
    </Button>
  );
};

export default AuthProviderButton;
