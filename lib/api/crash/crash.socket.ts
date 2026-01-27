import { io, Socket } from 'socket.io-client';
import { useCrashStore } from '@/store/useCrashStore';
import { CrashGameState } from '@/types/crash.types';
import { CrashBetStatus } from '@/types/crash.types';

class CrashSocket {
  private socket: Socket | null = null;
  private currentGameId: string | null = null;

  private readonly url = `${process.env.NEXT_PUBLIC_SOCKET_URL}/crash`;

  connect(gameId: string) {
    if (this.socket && this.currentGameId === gameId) return;

    this.disconnect();
    this.currentGameId = gameId;

    this.socket = io(this.url, {
      transports: ['websocket'],
    });

    this.socket.on('connect', () => {
      this.socket?.emit('subscribe:game', { gameId });
    });

    this.socket.on('game:tick', this.handleGameTick);
    this.socket.on('game:crash', this.handleGameCrash);
  }

  disconnect() {
    if (!this.socket) return;

    this.socket.off();
    this.socket.disconnect();
    this.socket = null;
    this.currentGameId = null;
  }

  private handleGameTick = ({ multiplier }: { multiplier: number }) => {
    const store = useCrashStore.getState();

    if (store.state === CrashGameState.Waiting) {
      store.setGameState(CrashGameState.Running);
    }

    if (store.state !== CrashGameState.Running) return;

    store.setMultiplier(multiplier);

    if (store.status === CrashBetStatus.Won) return;

    const autoCashout = store.autoCashout;

    if (autoCashout && multiplier >= autoCashout) {
      store.cashout(multiplier, store.amount * multiplier);
      store.markRoundFinished();
      this.disconnect();
    }
  };

  private handleGameCrash = ({ crashPoint }: { crashPoint: number }) => {
    const store = useCrashStore.getState();

    if (store.state !== CrashGameState.Running) return;
    if (store.status === CrashBetStatus.Won) return;

    store.crash(crashPoint);
    store.markRoundFinished();
  };
}

export const crashSocket = new CrashSocket();
