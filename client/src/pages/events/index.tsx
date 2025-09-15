import { useCallback, useMemo, useState } from 'react';
import {
  Typography,
  Spin,
  Empty,
  Result,
  Button,
  Pagination,
  Select,
  Space,
} from 'antd';
import { CalendarOutlined, ReloadOutlined } from '@ant-design/icons';

import { formatDate } from '@/utils';
import { eventsMocks } from '@/__fixtures__';

import styles from './index.module.scss';

const pageSizeOptions = [5, 10, 20, 50];

export const Events = () => {
  const [events] = useState(eventsMocks);
  const [loading] = useState<boolean>(false);
  const [error] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(pageSizeOptions[0]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handlePageSizeChange = useCallback((value: number) => {
    setPageSize(value);
    setCurrentPage(1);
  }, []);

  // Рассчитываем данные для текущей страницы
  const paginatedEvents = useMemo(() => {
    return events.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  }, [currentPage, events, pageSize]);

  if (error) {
    return (
      <Result
        status="error"
        title="Упс! Что-то пошло не так"
        subTitle="Не удалось загрузить мероприятия"
        extra={
          <Button type="primary" icon={<ReloadOutlined />}>
            Попробовать снова
          </Button>
        }
      />
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.events}>
        <Space
          orientation="horizontal"
          style={{ width: '100%', justifyContent: 'space-between' }}
        >
          <Typography.Title level={3}>Все полученные</Typography.Title>

          <Space>
            <span>Показывать по:</span>
            <Select
              value={pageSize}
              options={pageSizeOptions.map((option) => ({
                value: option,
                label: option,
              }))}
              onChange={handlePageSizeChange}
              style={{ width: 80 }}
            />
          </Space>
        </Space>

        {loading ? (
          <div className={styles.loading}>
            <Spin size="large" />
            <Typography.Text type="secondary">
              Загрузка мероприятий...
            </Typography.Text>
          </div>
        ) : (
          <div className={styles.contentWrapper}>
            <div className={styles.scrollableContent}>
              <div className={styles.list}>
                {paginatedEvents.map(({ id, title, description, date }) => (
                  <div key={id} className={styles.card}>
                    <div className={styles.header}>
                      <Typography.Title level={5}>{title}</Typography.Title>
                      <Typography.Text type="secondary">
                        <CalendarOutlined style={{ marginRight: 8 }} />
                        {formatDate(date)}
                      </Typography.Text>
                    </div>
                    <div className={styles.content}>{description}</div>
                    <div className={styles.footer}>
                      <span>ID: {id}</span>
                    </div>
                  </div>
                ))}
              </div>

              {events.length === 0 && !loading && (
                <Empty
                  description={'Нет мероприятий'}
                  className={styles.empty}
                />
              )}
            </div>

            {/* Показываем пагинацию только если есть ивенты */}
            {events.length > 0 && (
              <div className={styles.pagination}>
                <Pagination
                  current={currentPage}
                  pageSize={pageSize}
                  total={events.length}
                  onChange={handlePageChange}
                  showSizeChanger={false}
                  showTotal={(total, range) =>
                    `${range[0]}-${range[1]} из ${total} мероприятий`
                  }
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
