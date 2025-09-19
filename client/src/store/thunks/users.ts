import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUserData } from '@/api';

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  const userData = await fetchUserData();
  return userData;
});
