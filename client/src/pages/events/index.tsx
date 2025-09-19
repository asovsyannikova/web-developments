// components/Events/index.tsx
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Typography,
  Spin,
  Empty,
  Result,
  Button,
  Pagination,
  Select,
  Space,
  message,
  Modal,
  List,
  Avatar,
} from 'antd';
import {
  CalendarOutlined,
  ReloadOutlined,
  UserOutlined,
} from '@ant-design/icons';

import { formatDate } from '@/utils';
import {
  fetchAllEvents,
  fetchUser,
  setParticipant,
  fetchEventParticipants,
} from '@/store';
import type { AppDispatch, RootState } from '@/store';

import styles from './index.module.scss';
import type { EventsType } from '@/types';

const pageSizeOptions = [5, 10, 20, 50];

export const Events = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    data: events,
    isLoading,
    error,
  } = useSelector((state: RootState) => state.events);
  const { data: user } = useSelector((state: RootState) => state.user);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(pageSizeOptions[1]);
  const [participantsModalVisible, setParticipantsModalVisible] =
    useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventsType | undefined>(
    undefined,
  );
  const [loadingParticipants, setLoadingParticipants] = useState(false);

  const fetchEvents = useCallback(async () => {
    try {
      await dispatch(fetchAllEvents()).unwrap();
    } catch (err) {
      console.error('Error fetching events:', err);
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchUser());
    fetchEvents();
  }, [dispatch, fetchEvents]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handlePageSizeChange = useCallback((value: number) => {
    setPageSize(value);
    setCurrentPage(1);
  }, []);

  const paginatedEvents = useMemo(() => {
    return events.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  }, [currentPage, events, pageSize]);

  const handleParticipant = useCallback(
    async (eventId: number) => {
      if (user?.id) {
        try {
          await dispatch(setParticipant({ eventId, userId: user.id })).unwrap();
          message.success('Вы успешно записались на мероприятие!');
          // Обновляем список мероприятий
          await dispatch(fetchAllEvents()).unwrap();
        } catch {
          message.error('Не удалось записаться на мероприятие');
        }
      }
    },
    [dispatch, user?.id],
  );

  const handleShowParticipants = useCallback(
    async (event: EventsType) => {
      setSelectedEvent(event);
      setParticipantsModalVisible(true);
      setLoadingParticipants(true);

      try {
        await dispatch(fetchEventParticipants(event.id)).unwrap();
      } catch {
        message.error('Не удалось загрузить список участников');
      } finally {
        setLoadingParticipants(false);
      }
    },
    [dispatch],
  );

  const closeParticipantsModal = useCallback(() => {
    setParticipantsModalVisible(false);
    setSelectedEvent(undefined);
  }, []);

  const getParticipantsCount = useCallback((event: EventsType) => {
    return event.participants?.length || 0;
  }, []);

  if (error) {
    return (
      <Result
        status="error"
        title="Упс! Что-то пошло не так"
        subTitle="Не удалось загрузить мероприятия"
        extra={
          <Button
            type="primary"
            icon={<ReloadOutlined />}
            onClick={fetchEvents}
          >
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
          <Typography.Title level={3}>Все мероприятия</Typography.Title>
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

        {isLoading ? (
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
                {paginatedEvents.map((event) => (
                  <div key={event.id} className={styles.card}>
                    <div className={styles.header}>
                      <Typography.Title level={5}>
                        {event.title}
                      </Typography.Title>
                      <Typography.Text type="secondary">
                        <CalendarOutlined style={{ marginRight: 8 }} />
                        {formatDate(event.date)}
                      </Typography.Text>
                    </div>
                    <div className={styles.content}>{event.description}</div>
                    <div className={styles.footer}>
                      <Space orientation="vertical" size="small">
                        <span>ID: {event.id}</span>
                        <Button
                          type="link"
                          size="small"
                          onClick={() => handleShowParticipants(event)}
                          style={{ padding: 0, height: 'auto' }}
                        >
                          Участников: {getParticipantsCount(event)}
                        </Button>
                      </Space>

                      {user?.id && event.createdBy !== user.id && (
                        <Button
                          type="primary"
                          onClick={() => handleParticipant(event.id)}
                          disabled={event.participants?.some(
                            (p) => p.id === user.id,
                          )}
                        >
                          {event.participants?.some((p) => p.id === user.id)
                            ? 'Вы участвуете'
                            : 'Участвовать'}
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {events.length === 0 && !isLoading && (
                <Empty
                  description={'Нет мероприятий'}
                  className={styles.empty}
                />
              )}
            </div>

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

      <Modal
        title={`Участники мероприятия: ${selectedEvent?.title}`}
        open={participantsModalVisible}
        onCancel={closeParticipantsModal}
        footer={[
          <Button key="close" onClick={closeParticipantsModal}>
            Закрыть
          </Button>,
        ]}
      >
        {loadingParticipants ? (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <Spin />
          </div>
        ) : (
          <List
            dataSource={selectedEvent?.participants || []}
            renderItem={(participant) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar icon={<UserOutlined />} />}
                  title={participant.username}
                  description={participant.email}
                />
              </List.Item>
            )}
            locale={{ emptyText: 'Нет участников' }}
          />
        )}
      </Modal>
    </div>
  );
};
