import { Outlet } from 'react-router';

import styles from './index.module.scss';

export const Auth = () => {
  return (
    <div className={styles.container}>
      <Outlet />
    </div>
  );
};
