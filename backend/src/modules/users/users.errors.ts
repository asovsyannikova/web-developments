import { createErrorMiddleware } from '@utils';

import type { ErrorMaps } from '@sharedTypes';

const errorMap: ErrorMaps = [
  [
    (error) => error.message === 'Email already exists',
    { status: 400, message: 'Email already exists' },
  ],
  [
    (error) => error.message === 'Invalid email format',
    { status: 400, message: 'Invalid email format' },
  ],
  [
    (error) => error.message === 'Name and email are required',
    { status: 400, message: 'Name and email are required' },
  ],
];

export const validateErrors = createErrorMiddleware(errorMap);
