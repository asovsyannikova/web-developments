import type { FC } from 'react';
import { Outlet } from 'react-router-dom';

import { Header } from '../header';

export const RootLayout: FC = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
