// services/events.service.ts
import { Event, User, EventParticipant } from '@model';
import { CreateEventDto, UpdateEventDto } from './dto';

export const createEvent = async (
  createEventDto: CreateEventDto,
): Promise<Event> => {
  const user = await User.findByPk(createEventDto.createdBy);
  if (!user) throw new Error('User not found');

  return Event.create({
    ...createEventDto,
    createdAt: new Date(),
  });
};

export const updateEvent = async (
  id: number,
  updates: UpdateEventDto,
): Promise<Event> => {
  const event = await getEventById(id);
  if (updates.title?.trim().length === 0) {
    throw new Error('Title cannot be empty');
  }
  return event.update(updates);
};

export const deleteEvent = async (id: number): Promise<void> => {
  const event = await getEventById(id);
  await event.destroy();
};

export const addParticipant = async (
  eventId: number,
  userId: number,
): Promise<EventParticipant> => {
  // Проверяем существование события и пользователя
  const event = await Event.findByPk(eventId);
  if (!event) throw new Error('Event not found');

  const user = await User.findByPk(userId);
  if (!user) throw new Error('User not found');

  // Проверяем, не является ли пользователь уже участником
  const existingParticipant = await EventParticipant.findOne({
    where: { eventId, userId },
  });

  if (existingParticipant) {
    throw new Error('User is already a participant of this event');
  }

  // Создаем запись вручную
  return EventParticipant.create({
    eventId,
    userId,
    createdAt: new Date(),
  });
};

export const removeParticipant = async (
  eventId: number,
  userId: number,
): Promise<void> => {
  const participant = await EventParticipant.findOne({
    where: { eventId, userId },
  });

  if (!participant) {
    throw new Error('Participant not found');
  }

  await participant.destroy();
};

export const getAllEvents = async (): Promise<Event[]> => {
  return Event.findAll({
    include: [
      {
        model: User,
        as: 'creator',
        attributes: ['id', 'username', 'email'],
      },
      {
        model: User,
        as: 'participants',
        attributes: ['id', 'username', 'email'],
        through: { attributes: [] },
      },
    ],
  });
};

export const getEventById = async (id: number): Promise<Event> => {
  const event = await Event.findByPk(id, {
    include: [
      {
        model: User,
        as: 'creator',
        attributes: ['id', 'username', 'email'],
      },
      {
        model: User,
        as: 'participants',
        attributes: ['id', 'username', 'email'],
        through: { attributes: [] },
      },
    ],
  });

  if (!event) throw new Error('Event not found');
  return event;
};

export const getEventParticipants = async (
  eventId: number,
): Promise<User[]> => {
  const event = await Event.findByPk(eventId, {
    include: [
      {
        model: User,
        as: 'participants',
        attributes: ['id', 'username', 'email'],
        through: { attributes: [] },
      },
    ],
  });

  if (!event) throw new Error('Event not found');

  return event.participants || [];
};
