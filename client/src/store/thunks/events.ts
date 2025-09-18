import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchEvents, createEvent, updateEvent } from '@/api';
import { setEvents, setEventsLoading, setEventsError } from '@/store/slices';

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
