import { createBrowserRouter } from 'react-router';

import { App, NotFound, Events } from '../pages';

import { RootLayout } from '../components';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: 'events',
        element: <Events />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);
