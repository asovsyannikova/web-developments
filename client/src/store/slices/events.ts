import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { EventsType, EventsState } from '@/types';

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
  },
});

export const { setEvents, setEventsLoading, setEventsError } =
  eventsSlice.actions;
export const eventsReducer = eventsSlice.reducer;
