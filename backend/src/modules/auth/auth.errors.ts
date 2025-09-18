import { createErrorMiddleware } from '@utils';

import type { ErrorMaps } from '@sharedTypes';

const errorMap: ErrorMaps = [
  [
    (error) => error.message === 'Email already exists',
    { status: 400, message: 'Email already exists' },
  ],
  [
    (error) => error.message === 'Email and password are required.',
    { status: 400, message: 'Email and password are required.' },
  ],
  [
    (error) => error.message === 'Invalid email format',
    { status: 400, message: 'Invalid email format' },
  ],
  [
    (error) => error.message === 'User not found',
    { status: 404, message: 'User not found' },
  ],
  [
    (error) => error.message === 'Invalid credentials',
    { status: 401, message: 'Invalid credentials' },
  ],
  [
    (error) => error.message === 'Invalid token format',
    { status: 401, message: 'Invalid token format' },
  ],
  [
    (error) => error.message === 'Token does not have expiration date',
    { status: 401, message: 'Token does not have expiration date' },
  ],
];

export const validateErrors = createErrorMiddleware(errorMap);
