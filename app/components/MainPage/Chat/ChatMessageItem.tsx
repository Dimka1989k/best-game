'use client';

import type { ChatMessage } from '@/types/chat.types';
import avatarIcon from '@/assets/avatar.jpg';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { memo } from 'react';
import { useUserStore } from '@/store/useUserStore';

interface ChatMessageItemProps {
  message: ChatMessage;
  measureRef?: (el: HTMLDivElement | null) => void;
}

export const ChatMessageItem = memo(function ChatMessageItem({
  message,
  measureRef,
}: ChatMessageItemProps) {
  const currentUsername = useUserStore((s) => s.username);
  const isCurrentUser = message.username === currentUsername;

  const gradientClass =
    'bg-[linear-gradient(180deg,#FFCD71_0%,#E59603_100%))] bg-clip-text text-transparent';
  const gradientClassBg = 'bg-[linear-gradient(180deg,#FFCD71_0%,#E59603_100%))]';

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
        <div className="flex justify-between mt-2 pl-3">
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
        <div className={`bg-gray h-px my-2 ${isCurrentUser ? gradientClassBg : 'bg-gray'}`} />
        <p
          className={`text-inter-main whitespace-pre-wrap break-words ${
            isCurrentUser ? gradientClass : 'text-gray'
          }`}
        >
          {message.text}
        </p>
      </div>
    </div>
  );
});
