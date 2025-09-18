import ky from 'ky';

import { GENERAL_API_URL } from '@/constants';

export const api = ky.create({
  prefixUrl: GENERAL_API_URL,
});
