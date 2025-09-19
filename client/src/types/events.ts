export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  createdAt: string;
}

export interface EventsType {
  id: number;
  title: string;
  description: string;
  date: string;
  createdBy: number;
  createdAt: string;
  participants?: User[];
}

export interface EventsState {
  data: EventsType[];
  isLoading: boolean;
  error: string | null;
}
