import { api } from '@/api';

import type { User } from '@/types';

export const fetchUserData = async (): Promise<User> => {
  return api.get('users/whoami').json<User>();
};
