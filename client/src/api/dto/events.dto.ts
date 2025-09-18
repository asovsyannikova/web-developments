export interface EventsDto {
  id: number;
  title: string;
  description: string;
  date: string;
  createdBy: number;
  createdAt: string;
}

export type EventsResponseDto = EventsDto[];
