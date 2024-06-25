export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface UserState {
  userData: any;
  tokens: Tokens;
  status: "idle" | "loading" | "failed";
}
