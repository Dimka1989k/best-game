import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/store/auth.store';

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

async function fetchChatHistory(roomId: string) {
  const token = useAuthStore.getState().session?.accessToken;

  const res = await fetch(`${API_URL}/chat/${roomId}/history`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to load chat history');
  }

  return res.json();
}

export function useChatHistory(roomId = 'general') {
  return useQuery({
    queryKey: ['chat-history', roomId],
    queryFn: () => fetchChatHistory(roomId),
    staleTime: 60_000,
  });
}
