// api/events.ts
import { api } from '@/api';
import { EVENTS_URL } from '@/constants';
import type { EventsType, User } from '@/types';

export const getEvents = async (): Promise<EventsType[]> => {
  return api.get(EVENTS_URL).json<EventsType[]>();
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

export const setEventParticipant = async (
  eventId: number,
  userId: number,
): Promise<{ success: boolean }> => {
  return api
    .post(`${EVENTS_URL}/${eventId}/participants`, {
      json: { userId },
    })
    .json<{ success: boolean }>();
};

export const getEventParticipants = async (
  eventId: number,
): Promise<User[]> => {
  return api.get(`${EVENTS_URL}/${eventId}/participants`).json<User[]>();
};
