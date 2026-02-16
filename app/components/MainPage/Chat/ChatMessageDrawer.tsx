'use client';

import { memo } from 'react';
import type { ChatMessage } from '@/types/chat.types';
import avatarIcon from '@/assets/avatar.jpg';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { useUserStore } from '@/store/useUserStore';

interface ChatMessageDrawerProps {
  message: ChatMessage;
}

export const ChatMessageDrawer = memo(function ChatMessageDrawer({
  message,
}: ChatMessageDrawerProps) {
  const currentUsername = useUserStore((s) => s.username);
  const isCurrentUser = message.username === currentUsername;

  const gradientClass =
    'bg-[linear-gradient(180deg,#FFCD71_0%,#E59603_100%))] bg-clip-text text-transparent';
  const gradientClassBg = 'bg-[linear-gradient(180deg,#FFCD71_0%,#E59603_100%))]';

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
      <div className="flex mt-2 justify-between pl-6">
        <p className={`text-inter-bold ${isCurrentUser ? gradientClass : 'text-white'}`}>
          {message.username}
        </p>
        <p className={`text-inter-secondary ${isCurrentUser ? gradientClass : 'text-gray'}`}>
          {new Date(message.createdAt).toLocaleTimeString('uk-UA', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </div>
      <div
        className={`bg-gray w-full h-px mt-2 mb-2 ${isCurrentUser ? gradientClassBg : 'bg-gray'}`}
      />
      <p
        className={`text-gray text-inter-main wrap-anywhere whitespace-pre-wrap ${
          isCurrentUser ? gradientClass : 'text-gray'
        }`}
      >
        {message.text}
      </p>
    </div>
  );
});
