'use client';

import { io, Socket } from 'socket.io-client';
import { useEffect, useRef } from 'react';
import { useAuthStore } from '@/store/auth.store';
import type { ChatMessage } from '@/types/chat.types';

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL!;

export function useChatSocket(onMessage: (msg: ChatMessage) => void) {
  const socketRef = useRef<Socket | null>(null);
  const { session } = useAuthStore();

  useEffect(() => {
    if (!session?.accessToken) return;
    if (socketRef.current) return;

    const socket = io(SOCKET_URL, {
      transports: ['websocket'],
      auth: { token: session.accessToken },
    });

    socketRef.current = socket;

    socket.on('connect', () => {
      socket.emit('chat:join', { roomId: 'general' });
    });

    socket.on('message', (msg: ChatMessage) => {
      onMessage(msg);
    });

    socket.on('chat:error', console.error);

    return () => {
      socket.emit('chat:leave', { roomId: 'general' });
      socket.disconnect();
      socketRef.current = null;
    };
  }, [session?.accessToken, onMessage]);

  const sendMessage = (text: string): ChatMessage | null => {
    if (!text.trim()) return null;
    if (!socketRef.current?.connected) return null;
    if (!session) return null;

    const clientMessageId = crypto.randomUUID();

    const optimistic: ChatMessage = {
      _id: clientMessageId,

      roomId: 'general',
      text,
      username: session.userName,
      userId: session.userId,
      createdAt: new Date().toISOString(),
    };

    socketRef.current.emit('chat:message', {
      roomId: 'general',
      message: text,
      username: session.userName,
      userId: session.userId,
    });

    return optimistic;
  };

  return { sendMessage };
}
