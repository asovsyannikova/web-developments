import { api } from '@/api';

import { EVENTS_URL } from '@/constants';

import type { EventsResponseDto } from './dto';
import type { EventsType } from '@/types';

export const getEvents = async (): Promise<EventsResponseDto> => {
  const events = await api.get(EVENTS_URL).json<EventsResponseDto>();

  return events;
};

export const fetchEvents = async (): Promise<EventsType[]> => {
  return api.get('events').json<EventsType[]>();
};

export const createEvent = async (
  data: Omit<EventsType, 'id' | 'createdAt'>,
): Promise<EventsType> => {
  return api
    .post(EVENTS_URL, {
      json: data,
    })
    .json<EventsType>();
};

export const updateEvent = async (
  id: number,
  data: Partial<Omit<EventsType, 'id' | 'createdAt'>>,
): Promise<EventsType> => {
  return api
    .put(`${EVENTS_URL}/${id}`, {
      json: data,
    })
    .json<EventsType>();
};
