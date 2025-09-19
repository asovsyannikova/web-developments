import type { FC, PropsWithChildren } from 'react';
import { createBrowserRouter, Navigate } from 'react-router';

import Cookies from 'js-cookie';

import { App, NotFound, Events, Auth, SignIn, SignUp, Account } from '@/pages';

import { RootLayout } from '@/components';

// eslint-disable-next-line react-refresh/only-export-components
const PrivateRoute: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const isAuthenticated = Cookies.get('token');

  if (!isAuthenticated) {
    return <Navigate to="/auth/in" replace />;
  }

  return children;
};

// eslint-disable-next-line react-refresh/only-export-components
const AuthRoute: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const isAuthenticated = Cookies.get('token');

  if (isAuthenticated) {
    return <Navigate to="/events" replace />;
  }

  return children;
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      // Авто-редирект по дефолту на /
      {
        index: true,
        element: <App />,
      },
      {
        path: 'auth',
        element: (
          <AuthRoute>
            <Auth />
          </AuthRoute>
        ),
        children: [
          // Авто-редирект по дефолту на /auth/in
          {
            index: true,
            element: <Navigate to="in" replace />,
          },
          {
            path: 'in',
            element: <SignIn />,
          },
          {
            path: 'up',
            element: <SignUp />,
          },
        ],
      },
      {
        path: 'events',
        element: (
          <PrivateRoute>
            <Events />
          </PrivateRoute>
        ),
      },
      {
        path: 'account',
        element: (
          <PrivateRoute>
            <Account />
          </PrivateRoute>
        ),
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);
