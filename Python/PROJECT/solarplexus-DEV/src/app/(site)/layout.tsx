import { use } from 'react';
import loadUserData from '~/lib/server/loaders/load-user-data';
import LayoutProvider from '~/app/(site)/core/providers/LayoutProvider';
import EditorProvider from '~/app/(site)/core/providers/EditorProvider';
import ChatBotProvider from './core/providers/ChatbotProvider';
import ProjectProvider from './core/providers/ProjectProvider';
import { redirect } from 'next/navigation';


export const dynamic = 'force-dynamic';

function SiteLayout({ children }: React.PropsWithChildren) {
  const data = use(loadUserData());

  if (!data.accessToken) {
    redirect('/auth/sign-in');
  }

  return (
    <>
      <EditorProvider>
        <ChatBotProvider>
          <ProjectProvider>
            <LayoutProvider>{children}</LayoutProvider>
          </ProjectProvider>
        </ChatBotProvider>
      </EditorProvider>
      {/* <SiteHeaderSessionProvider
        data={data.session}
        accessToken={data.accessToken}
      /> */}
    </>
  );
}

export default SiteLayout;
