'use client';

import { memo } from 'react';
import type { ChatMessage } from '@/types/chat.types';
import avatarIcon from '@/assets/avatar.jpg';
import { Avatar, AvatarImage } from '@/components/ui/avatar';

interface ChatMessageDrawerProps {
  message: ChatMessage;
}

export const ChatMessageDrawer = memo(function ChatMessageDrawer({
  message,
}: ChatMessageDrawerProps) {
  return (
    <div className="relative z-10 shadow-message-chat bg-bg-black w-full radius-md p-4">
      <div className="flex absolute z-20 -top-5 left-0">
        <div className="rounded-full p-0.5 bg-[linear-gradient(180deg,#FFCD71_0%,#E59603_100%)] shadow-avatar">
          <Avatar className="w-11 h-11">
            <AvatarImage
              src={message.avatarURL ?? avatarIcon.src}
              alt={message.username}
              className="cursor-pointer object-cover"
            />
          </Avatar>
        </div>
      </div>
      <div className="flex mt-2 justify-between">
        <p className="text-white text-inter-bold">{message.username}</p>
        <p className="text-gray text-inter-secondary">
          {new Date(message.createdAt).toLocaleTimeString('uk-UA', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </div>
      <div className="bg-gray w-full h-px mt-2 mb-2" />
      <p className="text-gray text-inter-main wrap-anywhere whitespace-pre-wrap">{message.text}</p>
    </div>
  );
});
