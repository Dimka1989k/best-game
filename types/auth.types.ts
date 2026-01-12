export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

export type AuthUser = {
  userId: string;
  userName: string;
};

export type AuthSession = AuthTokens & AuthUser;

export type RefreshSession = AuthTokens & {
  userId: string;
};
