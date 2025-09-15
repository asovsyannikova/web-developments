import { createBrowserRouter } from 'react-router';
import { RootLayout } from '../components';
import { App } from '../pages';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <App />,
      },
    ],
  },
]);
