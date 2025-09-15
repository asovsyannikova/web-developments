import { Link } from 'react-router';

import styles from './index.module.scss';

export const Header = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link to={'/'} className={styles.logo}>
          Мероприятия
        </Link>
      </nav>
    </header>
  );
};
