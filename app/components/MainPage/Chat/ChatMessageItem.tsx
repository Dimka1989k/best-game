'use client';

import type { ChatMessage } from '@/types/chat.types';
import avatarIcon from '@/assets/avatar.jpg';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { memo } from 'react';

interface ChatMessageItemProps {
  message: ChatMessage;
  measureRef?: (el: HTMLDivElement | null) => void;
}

export const ChatMessageItem = memo(function ChatMessageItem({
  message,
  measureRef,
}: ChatMessageItemProps) {
  return (
    <div ref={measureRef} data-index={message._id} style={{ paddingBottom: 16 }}>
      <div className="relative bg-bg-black radius-md p-4 shadow-message-chat pb-6">
        <div className="absolute shadow-avatar -top-4 -left-4 rounded-full p-0.5 bg-[linear-gradient(180deg,#FFCD71_0%,#E59603_100%)]">
          <Avatar className="w-11 h-11">
            <AvatarImage
              src={message.avatarURL ?? avatarIcon.src}
              alt={message.username}
              className="object-cover"
            />
          </Avatar>
        </div>
        <div className="flex justify-between mt-2">
          <p className="text-white text-inter-bold">{message.username}</p>
          <p className="text-gray text-inter-secondary">
            {new Date(message.createdAt).toLocaleTimeString('uk-UA', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>
        <div className="bg-gray h-px my-2" />
        <p className="text-inter-main text-gray whitespace-pre-wrap break-words">{message.text}</p>
      </div>
    </div>
  );
});
