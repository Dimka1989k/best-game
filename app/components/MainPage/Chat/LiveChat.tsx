'use client';

import Image from 'next/image';
import { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';

import iconChat from '@/assets/chatIcon.svg';
import arrowUp from '@/assets/arrowUp.svg';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ChatMessageItem } from './ChatMessageItem';

import type { ChatMessage } from '@/types/chat.types';
import { useChatHistory } from '@/hooks/useChatHistory';
import { useChatSocket } from '@/hooks/useChatSocket';

export default function LiveChat() {
  const [text, setText] = useState('');
  const [liveMessages, setLiveMessages] = useState<ChatMessage[]>([]);

  const { data, isLoading } = useChatHistory('general');

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

  const parentRef = useRef<HTMLDivElement>(null);

  const ESTIMATED_ROW_HEIGHT = 120;

  const getScrollElement = useCallback(() => parentRef.current, []);

  const virtualizer = useVirtualizer({
    count: messages.length,
    getScrollElement,
    estimateSize: () => ESTIMATED_ROW_HEIGHT,
    overscan: 8,
  });

  const items = virtualizer.getVirtualItems();

  useEffect(() => {
    if (messages.length) {
      virtualizer.scrollToIndex(messages.length - 1, { align: 'end' });
    }
  }, [messages.length, virtualizer]);

  return (
    <div className="max-xl:hidden flex flex-col justify-center relative -left-6">
      <Image src={iconChat} alt="Chat" className="mb-2 mx-auto" />
      <div className="bg-gray w-62.5 h-px mb-2 mx-auto" />
      <div className="flex justify-between px-10 mb-6">
        <p className="text-inter-secondary text-white">250 online</p>
        <p className="text-inter-secondary bg-[linear-gradient(180deg,#ffcd71_0%,#e59603_100%)] bg-clip-text text-transparent">
          48 friends
        </p>
        <p className="text-inter-secondary text-white">54 playing</p>
      </div>
      <div ref={parentRef} className="h-155 overflow-y-auto px-10 pt-6.5 scrollbar-hide">
        {isLoading ? (
          <div className="h-full flex items-center justify-center">
            <p className="text-inter-secondary text-white opacity-70">Loading chat…</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <p className="text-inter-secondary text-white opacity-70">No messages yet</p>
          </div>
        ) : (
          <div
            style={{
              height: virtualizer.getTotalSize(),
              position: 'relative',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                transform: `translateY(${items[0]?.start ?? 0}px)`,
              }}
            >
              {items.map((item) => {
                const msg = messages[item.index];
                if (!msg) return null;
                return (
                  <ChatMessageItem
                    key={msg._id}
                    message={msg}
                    measureRef={virtualizer.measureElement}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
      <div className="flex w-82.5 gap-4 px-10 mt-4">
        <Input
          className="backdrop-blur-lg h-11 w-full pl-4 bg-color-chat border-none! radius-pill text-white placeholder:text-white"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleInputKeyDown}
          placeholder="Write a message..."
        />
        <Button
          className="flex cursor-pointer items-center justify-center bg-color-chat radius-pill p-0 h-11 w-11 transition-all duration-200"
          onClick={handleSendMessage}
        >
          <Image src={arrowUp} alt="Send" />
        </Button>
      </div>
    </div>
  );
}
