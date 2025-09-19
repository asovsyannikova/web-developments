import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { EventsType, EventsState, User } from '@/types';

const initialState: EventsState = {
  data: [],
  isLoading: false,
  error: null,
};

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setEvents: (state, action: PayloadAction<EventsType[]>) => {
      state.data = action.payload;
      state.error = null;
    },
    setEventsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setEventsError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    updateEventParticipants: (
      state,
      action: PayloadAction<{
        eventId: number;
        participants: User[];
      }>,
    ) => {
      console.log(action.payload);
      const event = state.data.find((e) => e.id === action.payload.eventId);

      if (event) {
        event.participants = action.payload.participants;
      }
    },
  },
});

export const {
  setEvents,
  setEventsLoading,
  setEventsError,
  updateEventParticipants,
} = eventsSlice.actions;
export const eventsReducer = eventsSlice.reducer;
