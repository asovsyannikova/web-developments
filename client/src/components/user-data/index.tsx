import type { FC } from 'react';
import { Typography } from 'antd';
import type { User } from '@/types';

import styles from './index.module.scss';

const { Text } = Typography;

interface Props {
  data: User;
}

const FIELD_LABELS: Record<keyof Omit<User, 'id'>, string> = {
  username: 'Имя пользователя',
  email: 'Email',
};

export const UserDataDisplay: FC<Props> = ({ data }) => {
  return (
    <div className={styles.container}>
      {(Object.keys(FIELD_LABELS) as Array<keyof typeof FIELD_LABELS>).map(
        (field) => (
          <div key={field} className={styles.field}>
            <Text strong>{FIELD_LABELS[field]}: </Text>
            <Text>{data[field]?.toString() || '-'}</Text>
          </div>
        ),
      )}
    </div>
  );
};
