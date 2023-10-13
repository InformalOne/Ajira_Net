'use client';

import { useContext } from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import { LayoutContext } from '~/app/(site)/core/providers/LayoutProvider';
import { SidebarMode } from '~/app/(site)/core/types';
import ChatBotSidebar from '~/app/(site)/components/layouts/RightSidebar/ChatBotSidebar';
import EditorSidebar from '~/app/(site)/components/layouts/RightSidebar/EditorSidebar';

function RightSidebar() {
  const { sidebarMode, visibleSidebar, handleToggleSidebarVisible } = useContext(LayoutContext);

  const handleToggleCollapse = () => {
    handleToggleSidebarVisible(!visibleSidebar);
  }


  return (
    <div className="relative flex-shrink-0">
      <span
        className={clsx('absolute -left-12 top-3 cursor-pointer hover:opacity-60', !visibleSidebar && 'rotate-180')}
        onClick={handleToggleCollapse}
      >
        <Image src="/assets/images/icons/collapse_icon.svg" width={33} height={27} alt="collapse" />
      </span>
      {visibleSidebar && (
        <div className="w-[41.25rem] border-l border-gray-200 bg-white h-full">
          {sidebarMode === SidebarMode.ChatBotMode && 
          
              <ChatBotSidebar />
          }
          {sidebarMode === SidebarMode.EditorMode && <EditorSidebar />}
        </div>
      )}
    </div>
  );
}

export default RightSidebar;
