export interface ChatUser {
  _id: string;
  username: string;
  avatarURL?: string;
}

export interface ChatMessage {
  _id: string;
  roomId: string;
  text: string;
  username: string;
  createdAt: string;
  updatedAt?: string;
  avatarURL?: string;
  userId: string | ChatUser;
}
