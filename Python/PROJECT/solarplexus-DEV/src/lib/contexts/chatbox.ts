import React, { createContext, useContext, useCallback } from 'react';

interface IMessage {
  date: string;
  message: string;
  isUser?: boolean;
}

interface IChatContext {
  messageState: IMessage[];
  addMessage: (message: IMessage) => void;
  clearMessages: () => void;
}

const ChatContext = createContext<IChatContext | undefined>(undefined);

export const useChat = (): IChatContext => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
