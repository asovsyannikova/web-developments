import { api } from '@/api';

import { EVENTS_URL } from '@/constants';

import type { EventsResponseDto } from './dto';

export const getEvents = async (): Promise<EventsResponseDto> => {
  const events = await api.get(EVENTS_URL).json<EventsResponseDto>();

  return events;
};
