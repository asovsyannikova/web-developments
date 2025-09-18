export interface UserState {
  data: User | null;
  isLoading: boolean;
  error: string | null;
}

export interface User {
  id: number;
  username: string;
  email: string;
}
