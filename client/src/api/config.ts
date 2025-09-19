import ky from 'ky';
import Cookies from 'js-cookie';

import { GENERAL_API_URL } from '@/constants';

export const api = ky.create({
  prefixUrl: GENERAL_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${Cookies.get('token')}`,
  },
});
