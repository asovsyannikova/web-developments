import { useCallback, type FC } from 'react';
import { useNavigate } from 'react-router';
import { Button, Typography } from 'antd';

import styles from './index.module.scss';

export const NotFound: FC = () => {
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate('/');
  }, [navigate]);

  return (
    <div className={styles.container}>
      <Typography.Title>Страница не найдена</Typography.Title>
      <Button onClick={handleClick}>На главную</Button>
    </div>
  );
};
