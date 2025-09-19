import { Event, User } from '@model';

import { CreateEventDto, UpdateEventDto } from './dto';

export const getAllEvents = async () => {
  return Event.findAll();
};

export const getEventById = async (id: number) => {
  const event = await Event.findByPk(id);

  if (!event) throw new Error('Event not found');

  return event;
};

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
