import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchEvents,
  createEvent,
  updateEvent,
  setEventParticipant,
  getEventParticipants,
} from '@/api';
import {
  setEvents,
  setEventsLoading,
  setEventsError,
  updateEventParticipants,
} from '@/store/slices';

interface CreateEventData {
  createdBy: number;
  title: string;
  description: string;
  date: string;
}

export const fetchAllEvents = createAsyncThunk(
  'events/fetchAll',
  async (_, { dispatch }) => {
    try {
      dispatch(setEventsLoading(true));
      const events = await fetchEvents();
      dispatch(setEvents(events));
    } catch (error) {
      dispatch(
        setEventsError(
          error instanceof Error ? error.message : 'Failed to fetch events',
        ),
      );
    } finally {
      dispatch(setEventsLoading(false));
    }
  },
);

export const createNewEvent = createAsyncThunk(
  'events/create',
  async (data: CreateEventData, { dispatch }) => {
    try {
      dispatch(setEventsLoading(true));
      await createEvent(data);
      const events = await fetchEvents();
      dispatch(setEvents(events));
    } catch (error) {
      dispatch(
        setEventsError(
          error instanceof Error ? error.message : 'Failed to create event',
        ),
      );
      throw error;
    } finally {
      dispatch(setEventsLoading(false));
    }
  },
);

export const updateExistingEvent = createAsyncThunk(
  'events/update',
  async (
    { id, data }: { id: number; data: Partial<CreateEventData> },
    { dispatch },
  ) => {
    try {
      dispatch(setEventsLoading(true));
      await updateEvent(id, data);
      const events = await fetchEvents();
      dispatch(setEvents(events));
    } catch (error) {
      dispatch(
        setEventsError(
          error instanceof Error ? error.message : 'Failed to update event',
        ),
      );
      throw error;
    } finally {
      dispatch(setEventsLoading(false));
    }
  },
);

export const setParticipant = createAsyncThunk(
  'events/setParticipant',
  async (
    { eventId, userId }: { eventId: number; userId: number },
    { dispatch },
  ) => {
    try {
      dispatch(setEventsLoading(true));
      await setEventParticipant(eventId, userId);

      // Обновляем список мероприятий после добавления участника
      const events = await fetchEvents();
      dispatch(setEvents(events));

      return { success: true };
    } catch (error) {
      dispatch(
        setEventsError(
          error instanceof Error ? error.message : 'Failed to set participant',
        ),
      );
      throw error;
    } finally {
      dispatch(setEventsLoading(false));
    }
  },
);

export const fetchEventParticipants = createAsyncThunk(
  'events/fetchParticipants',
  async (eventId: number, { dispatch }) => {
    try {
      const participants = await getEventParticipants(eventId);
      dispatch(updateEventParticipants({ eventId, participants }));
      
      return participants;
    } catch (error) {
      dispatch(
        setEventsError(
          error instanceof Error ? error.message : 'Failed to set participant',
        ),
      );
      throw error;
    } finally {
      dispatch(setEventsLoading(false));
    }
  },
);
