"use client";
import React, {
  createContext,
  PropsWithChildren,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import { usePathname } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

type ChatBotProviderProps = PropsWithChildren<any>;

interface IMessage {
  date: string;
  message: string;
  isUser?: boolean;
}

const initialStates: ChatBotContextType = {
  messageState: [
    {
      date: new Date().toISOString(),
      message: `Welcome Guest! We'd love to get to know you a little bit better`,
      isUser: false,
    },
  ],
  inputMessage: '',
  addMessage: () => {},
  jsonData: {},
  onGenerate: () => {},
  onKeyDown: () => {},
  onChangeMessageInput: () => {},
};

type ChatBotContextType = {
  messageState: IMessage[];
  inputMessage: string;
  jsonData: any;
  addMessage: (message: IMessage) => void;
  onGenerate: () => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onChangeMessageInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const ChatBotContext = createContext<ChatBotContextType>(initialStates);

const ChatBotProvider: React.FC<ChatBotProviderProps> = ({ children }) => {
  const [messageState, setMessageState] = useState<IMessage[]>(
    initialStates.messageState,
  );
  const [inputMessage, setInputMessage] = useState<string>(
    initialStates.inputMessage,
  );
  const pathname = usePathname();

  const addMessage = (message: IMessage) => {
    

    setMessageState((prev) => [...prev, message]);
  };

  const supabase = createClientComponentClient({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_KEY,
  });
  

  const onGenerate = async () => {
    // Implement the logic for generating messages here
    // Example logic:
    const user_data = await supabase.auth.getUser();
    
    const { data } = await supabase.from('chat_history').insert([{ user_id: user_data?.data?.user?.id, is_user: true, chat_text:inputMessage}]);
    // setMessageState([...messageState, newUserMessage, newBotMessage]);
    // setInputMessage('');
    console.log('Successful', data);
    const newUserMessage: IMessage = {
      date: new Date().toISOString(),
      message: inputMessage,
      isUser: true,
    };
    const newBotMessage: IMessage = {
      date: new Date().toISOString(),
      message: `Sorry, I don't have an answer for that.`,
    };
    setMessageState([...messageState, newUserMessage, newBotMessage]);
    setInputMessage('');
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onGenerate();
    }
  };

  const onChangeMessageInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(event.target.value);
    console.log('event.target.value', event.target.value);
  };

  // useEffect(() => {
  //   // Check the current route and add a message for file upload if the route is '/brand'
  //   if (pathname === '/brand') {
  //     const newUploadMessage: IMessage = {
  //       date: new Date().toISOString(),
  //       message:
  //         'Please upload your branding guidelines, tone of voice, picture bank and more so we can create material that is in line with your brand.',
  //     };
  //     addMessage(newUploadMessage);
  //   }
  // }, [pathname]);

  return (
    <ChatBotContext.Provider
      value={{
        messageState,
        inputMessage,
        jsonData: initialStates.jsonData,
        addMessage,
        onGenerate,
        onKeyDown,
        onChangeMessageInput,
      }}
    >
      {children}
    </ChatBotContext.Provider>
  );
};

export default ChatBotProvider;
export type { IMessage }
