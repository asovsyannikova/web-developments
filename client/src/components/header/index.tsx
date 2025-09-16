import { useMemo } from 'react';
import { Link } from 'react-router';
import Cookies from 'js-cookie';
import { Button } from 'antd';

import styles from './index.module.scss';

export const Header = () => {
  const isAuthenticated = useMemo(() => Cookies.get('token'), []);

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link to={'/'} className={styles.logo}>
          Мероприятия
        </Link>

        {!isAuthenticated && (
          <Link to="/auth/in">
            <Button type="primary">Вход и регистрация</Button>
          </Link>
        )}
      </nav>
    </header>
  );
};
