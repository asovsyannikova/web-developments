import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Card, Row, Col, Spin, Button, Grid } from 'antd';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import classNames from 'classnames';

import {
  type RootState,
  type AppDispatch,
  fetchUser,
  fetchAllEvents,
} from '@/store';

import { EventModal, UserDataDisplay } from '@/components';

import type { EventsType, User } from '@/types';

import styles from './index.module.scss';

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

export const Account: React.FC = () => {
  const {
    data: userData,
    isLoading: isUserLoading,
    error: userError,
  } = useSelector((state: RootState) => state.user);
  const {
    data: events,
    isLoading: isEventsLoading,
    error: eventsError,
  } = useSelector((state: RootState) => state.events);
  const dispatch = useDispatch<AppDispatch>();
  const screens = useBreakpoint();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventsType | undefined>(
    undefined,
  );

  useEffect(() => {
    dispatch(fetchUser());
    dispatch(fetchAllEvents());
  }, [dispatch]);

  const handleCreateClick = () => {
    setSelectedEvent(undefined);
    setIsModalOpen(true);
  };

  const handleEditClick = (event: EventsType) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedEvent(undefined);
  };

  if (isUserLoading || isEventsLoading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (userError || eventsError) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Text type="danger">{userError || eventsError}</Text>
      </div>
    );
  }

  if (!userData?.email) {
    return null;
  }

  const userEvents = events.filter(
    (event: EventsType) => event.createdBy === userData.id,
  );

  const adaptiveHeader = classNames(styles.header, {
    [styles.headerDesktop]: screens.sm,
    [styles.headerMobile]: !screens.sm,
  });

  return (
    <div style={{ padding: '24px' }}>
      <Card style={{ marginBottom: '24px' }}>
        <UserDataDisplay data={userData as User} />
      </Card>

      <div className={adaptiveHeader}>
        <Title level={3} style={{ margin: 0 }}>
          Мои мероприятия
        </Title>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleCreateClick}
        >
          Создать мероприятие
        </Button>
      </div>

      <Row gutter={[16, 16]}>
        {userEvents.map((event: EventsType) => (
          <Col key={event.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              title={event.title}
              extra={
                <Button
                  type="link"
                  icon={<EditOutlined />}
                  onClick={() => handleEditClick(event)}
                >
                  Редактировать
                </Button>
              }
            >
              <p>{event.description}</p>
              <Text type="secondary">Дата: {event.createdAt}</Text>
            </Card>
          </Col>
        ))}
      </Row>

      <EventModal
        open={isModalOpen}
        onClose={handleModalClose}
        event={selectedEvent}
      />
    </div>
  );
};
