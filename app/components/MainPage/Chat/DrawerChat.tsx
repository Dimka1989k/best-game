'use client';

import { useCallback, useMemo, useState, useRef } from 'react';

import { ChatMessageDrawer } from './ChatMessageDrawer';

import type { ChatMessage } from '@/types/chat.types';
import { useChatHistory } from '@/hooks/useChatHistory';
import { useChatSocket } from '@/hooks/useChatSocket';

import chatButton from '@/assets/buttonchat.svg';

import iconChat from '@/assets/chatIcon.svg';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import arrowUp from '@/assets/arrowUp.svg';

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import Image from 'next/image';

export default function DrawerChat() {
  const [text, setText] = useState('');
  const [liveMessages, setLiveMessages] = useState<ChatMessage[]>([]);
  const messagesRef = useRef<HTMLDivElement>(null);

  const { data } = useChatHistory('general');

  const messages = useMemo(() => {
    const map = new Map<string, ChatMessage>();
    (data?.messages ?? []).forEach((m: ChatMessage) => {
      if (m.username !== 'Chat Bot') {
        map.set(m._id, m);
      }
    });

    liveMessages.forEach((m: ChatMessage) => {
      if (m.username !== 'Chat Bot') {
        map.set(m._id, m);
      }
    });

    return Array.from(map.values());
  }, [data?.messages, liveMessages]);

  const handleMessage = useCallback((msg: ChatMessage) => {
    setLiveMessages((prev) => (prev.some((m) => m._id === msg._id) ? prev : [...prev, msg]));
  }, []);

  const { sendMessage } = useChatSocket(handleMessage);

  const handleSendMessage = useCallback(() => {
    const trimmed = text.trim();
    if (!trimmed) return;

    sendMessage(trimmed);
    setText('');
  }, [text, sendMessage]);

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;
    e.preventDefault();
    handleSendMessage();
  };

  return (
    <>
      <Drawer
        onOpenChange={(open) => {
          if (open) {
            requestAnimationFrame(() => {
              messagesRef.current?.scrollTo({
                top: messagesRef.current.scrollHeight,
                behavior: 'auto',
              });
            });
          }
        }}
      >
        <DrawerTrigger>
          <div className="xl:hidden absolute z-9 flex items-center justify-center max-sm:top-140 top-210 right-4 button-yellow p-0 w-12 h-12 radius-pill cursor-pointer">
            <Image src={chatButton} alt="chatButton" />
          </div>
        </DrawerTrigger>
        <DrawerContent className="xl:hidden bg-cards-bg pl-0 pr-0 border-none flex flex-col h-full">
          <DrawerHeader>
            <DrawerTitle></DrawerTitle>
          </DrawerHeader>
          <div className="relative flex flex-col flex-1 min-h-0 overflow-visible pb-6">
            <Image src={iconChat} alt="iconChat" className="mb-2 mx-auto" />
            <div className="px-8">
              <div className="bg-gray w-full h-px mb-2 mx-auto"></div>
            </div>
            <div className="flex justify-between items-center pl-8 pr-8">
              <p className="text-inter-secondary text-white">250 online</p>
              <p className="text-inter-secondary bg-[linear-gradient(180deg,#FFCD71_0%,#E59603_100%)] bg-clip-text text-transparent ">
                48 friends
              </p>
              <p className="text-inter-secondary text-white">54 playing</p>
            </div>
            <div
              ref={messagesRef}
              className="flex-1 flex flex-col gap-4 mt-4 overflow-y-auto pt-6 pr-8 pl-8"
            >
              {messages.map((msg) => (
                <ChatMessageDrawer key={msg._id} message={msg} />
              ))}
            </div>
            <div className="relative w-full flex justify-center items-center gap-4 mt-4 z-99999 px-6">
              <Input
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleInputKeyDown}
                placeholder="Write a message..."
                className="backdrop-blur-lg h-10 w-full pl-4 bg-color-chat border-none! radius-pill text-white placeholder:text-white"
              />
              <Button
                onClick={handleSendMessage}
                variant="default"
                className="backdrop-blur-lg flex items-center justify-center bg-color-chat radius-pill p-0 h-11 w-11  transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_0_12px_rgba(255,205,113,0.45)] hover:bg-[linear-gradient(180deg,#FFCD71_0%,#E59603_100%)] active:translate-y-0 active:scale-95 active:shadow-[0_0_6px_rgba(255,205,113,0.6)] cursor-pointer"
              >
                <Image src={arrowUp} alt="arrowUp" className="" />
              </Button>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
