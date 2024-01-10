interface UserState {
  user: string | null;
  role: string | null;
  token: string | null;
  isLoggedIn: boolean;
}

export type {  UserState};
