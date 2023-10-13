import Banner from '~/core/ui/Banner';

function AuthPageShell({ children }: React.PropsWithChildren) {
  return (
    <div
      className={
        'flex flex-col sm:flex-row gap-[143px] w-full h-screen justify-center items-center'
      }
    >
      <div className="max-w-[540px] w-full">{children}</div>
      <Banner />
    </div>
  );
}

export default AuthPageShell;
