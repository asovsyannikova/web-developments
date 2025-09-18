export type EventsType = {
  id: number;
  title: string;
  description: string;
  date: string;
  createdBy: number;
  createdAt: string;
};

export interface EventsState {
  data: EventsType[];
  isLoading: boolean;
  error: string | null;
}
