'use client';

import React, {
  createContext,
  PropsWithChildren,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import { SidebarMode } from '~/app/(site)/core/types';
import LeftNavigationBar from '~/app/(site)/components/layouts/LeftNavigationBar';
import RightSidebar from '~/app/(site)/components/layouts/RightSidebar';
import { usePathname } from 'next/navigation';

type LayoutProviderProps = PropsWithChildren<any>;

const initialStates: LayoutContextType = {
  sidebarMode: SidebarMode.ChatBotMode,
  visibleSidebar: false,

  handleChangeSidebarMode: () => {},
  handleToggleSidebarVisible: () => {},
};

type LayoutContextType = {
  sidebarMode: SidebarMode;
  visibleSidebar: boolean;

  handleChangeSidebarMode: (mode: SidebarMode) => void;
  handleToggleSidebarVisible: (status: boolean) => void;
};

export const LayoutContext = createContext<LayoutContextType>(initialStates);

const LayoutProvider: React.FC<LayoutProviderProps> = ({ children }) => {
  const [sidebarMode, setSidebarMode] = useState<SidebarMode>(
    SidebarMode.ChatBotMode,
  );
  const [visibleSidebar, setVisibleSidebar] = useState<boolean>(true);
  const [hideLayout, setHideLayout] = useState<boolean>(false);

  const pathname = usePathname();

  useEffect(() => {
    if (pathname.includes('/marketing/editor')) {
      setSidebarMode(SidebarMode.EditorMode);
    } else {
      setSidebarMode(SidebarMode.ChatBotMode);
    }

    setVisibleSidebar(true);

    if (pathname === '/checkout' || pathname === '/welcome') {
      setHideLayout(true);
    } else {
      setHideLayout(false);
    }
  }, [pathname]);

  const renderBetweenMenuAndSidebar = (element: ReactNode) => {
    return (
      <div className="flex h-[100vh] bg-porcelain-50 w-screen">
        <LeftNavigationBar />

        <div className="relative p-14 flex-1 overflow-x-hidden overflow-y-auto">
          {element}
        </div>

        <RightSidebar />
      </div>
    );
  };

  return (
    <LayoutContext.Provider
      value={{
        sidebarMode,
        visibleSidebar,
        handleChangeSidebarMode: setSidebarMode,
        handleToggleSidebarVisible: setVisibleSidebar,
      }}
    >
      {hideLayout ? children : renderBetweenMenuAndSidebar(children)}
    </LayoutContext.Provider>
  );
};

export default LayoutProvider;
