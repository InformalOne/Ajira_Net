import NewPasswordContainer from '~/app/auth/components/NewPasswordContainer';

export const metadata = {
  title: 'New Password',
};

function NewPasswordPage() {
  return (
    <>
      <div className={'flex flex-col space-y-4'}>
        <NewPasswordContainer />
      </div>
    </>
  );
}

export default NewPasswordPage;
