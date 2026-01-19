export interface ChatMessage {
  _id: string;
  roomId: string;
  username: string;
  text: string;
  userId: string;
  createdAt: string;
  avatarURL?: string;
  clientMessageId?: string;
}
