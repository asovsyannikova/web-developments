import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { Button, Space, Typography } from 'antd';

import EventsImage from './assets/events.svg';

import styles from './index.module.scss';

const { Title, Paragraph } = Typography;

export const App = () => {
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate('/events');
  }, [navigate]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.textBlock}>
          <Title level={1}>Добро пожаловать!</Title>
          <Paragraph className={styles.description}>
            Организуйте и участвуйте в мероприятиях вместе с нами. Создавайте
            интересные встречи и находите единомышленников.
          </Paragraph>

          <Space size="large" className={styles.actions}>
            <Button type="primary" size="large" onClick={handleClick}>
              Смотреть мероприятия
            </Button>
          </Space>
        </div>

        <div className={styles.imageBlock}>
          <img src={EventsImage} alt="Events illustration" />
        </div>
      </div>
    </div>
  );
};
