'use client';
import React, { useState, useEffect, useContext } from 'react';
import { formatDistance } from 'date-fns';
import { usePathname } from 'next/navigation';
import Input from '~/app/(site)/components/forms/Input';
import Button from '~/app/(site)/components/forms/Button';
import ChatMessage from '~/app/(site)/components/ChatMessage';
import Image from 'next/image';
import { ChatBotContext } from '~/app/(site)/core/providers/ChatbotProvider';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { add } from 'cypress/types/lodash';

interface IMessage {
  date: string;
  message: string;
  isUser?: boolean;
}

type Props = {
  hideHeader?: boolean;
};

const ChatBotSidebar: React.FC<Props> = ({ hideHeader }) => {
  const path = usePathname(); // Initialize useRouter
  const {
    messageState,
    inputMessage,
    addMessage,
    onGenerate,
    onKeyDown,
    onChangeMessageInput,
  } = useContext(ChatBotContext);

  const supabase = createClientComponentClient({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_KEY,
  });


  useEffect(() => {
    // fetch adn add messgaefrom db

    // Check the current route and add a message for file upload if the route is '/brand'
    if (path === '/brand') {
      console.log('path', path);
      const newUploadMessage: IMessage = {
        date: new Date().toISOString(),
        message:
          'Please upload your branding guidelines, tone of voice, picture bank and more so we can create material that is in line with your brand',
      };
      addMessage(newUploadMessage);
      getChatHistory();
    }
  }, [path]);

  const [chatHistory, setChatHistory] = useState<string>('');

  async function getChatHistory() {

    const user_data = await supabase.auth.getUser();

    const { data } = await supabase.from("chat_history").select('chat_text, is_user').eq('user_id', user_data?.data?.user?.id).order('created_at', { ascending: true });

    console.log(data);
    if (data !== null) {
      const chatHistoryData = data.map((row: any) => ({
        chat_text: row.chat_text,
        is_user: row.is_user,
      }));
      // Update the chatHistory state with the fetched chat history
      const chatHistoryJson = JSON.stringify(chatHistoryData);
      setChatHistory(chatHistoryJson);

      // Iterate through chat history and create messages based on is_user property
      data.forEach((row: any) => {
        const newMessage: IMessage = {
          date: new Date().toISOString(),
          message: row.chat_text,
          isUser: row.is_user,
        };

        console.log('newMessage', newMessage);
        addMessage(newMessage);
      });

    }
    // Append new messages to the existing messageState

  };

  return (
    <div className="flex flex-col h-full">
      {!hideHeader && (
        <div className="border-b border-gray-200 flex justify-center py-2.5">
          <Image
            decoding={'async'}
            loading={'lazy'}
            src={`/assets/images/logo/logo-without-text.svg`}
            alt={`banner`}
            height={26}
            width={159}
          />
        </div>
      )}
      <div className="flex-1 overflow-auto">
        {messageState.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.isUser ? 'ml-5 pl-5' : 'mr-5 pr-5'
              }`}
          >
            <ChatMessage
              avatarImg={
                message.isUser
                  ? '/assets/images/mock-user.png'
                  : '/assets/images/logo.svg'
              }
              time={formatDistance(new Date(message.date), new Date(), {
                addSuffix: true,
              })}
              message={message.message}
              isOwn={message.isUser}
            />
          </div>
        ))}
      </div>
      <div className="px-6 py-7 mt-auto">
        <div className="relative">
          <Input
            className="w-full pr-[180px]"
            placeholder="Chat"
            size="xl"
            value={inputMessage}
            onChange={onChangeMessageInput}
            onKeyDown={onKeyDown}
            // Swap the background colors for inputMessage and botMessage
            style={{ backgroundColor: 'white' }}
          />
          <Button
            className="absolute top-1/2 transform -translate-y-1/2 right-2 !min-w-[140px]"
            size="md"
            onClick={onGenerate}
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatBotSidebar;
