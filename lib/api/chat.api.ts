import { apiFetch } from '@/lib/api/client';
import type { ChatMessage } from '@/types/chat.types';

export function getChatHistory(roomId: 'general') {
  return apiFetch<{
    roomId: string;
    messages: ChatMessage[];
  }>(`/chat/${roomId}/history`);
}
