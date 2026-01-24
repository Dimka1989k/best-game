import { io, Socket } from 'socket.io-client';
import { useCrashStore } from '@/store/useCrashStore';

let socket: Socket | null = null;
let currentGameId: string | null = null;

export const connectCrashSocket = (gameId: string) => {
  if (socket && currentGameId === gameId) return;

  if (socket) {
    socket.disconnect();
    socket = null;
  }

  currentGameId = gameId;

  const s = io(`${process.env.NEXT_PUBLIC_SOCKET_URL}/crash`, {
    transports: ['websocket'],
  });

  socket = s;

  s.on('connect', () => {
    s.emit('subscribe:game', { gameId });
  });

  s.on('game:tick', ({ multiplier }) => {
    const store = useCrashStore.getState();

    if (store.state !== 'running') return;

    store.setMultiplier(multiplier);

    const autoCashout = store.autoCashout;
    if (autoCashout && multiplier >= autoCashout) {
      store.cashout(multiplier, store.amount * multiplier);
      store.markRoundFinished();
    }
  });

  s.on('game:crash', ({ crashPoint }) => {
    const store = useCrashStore.getState();
    if (store.state !== 'running') return;

    store.crash(crashPoint);
    store.markRoundFinished();
  });
};
