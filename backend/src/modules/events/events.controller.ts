import { CreateEventDto } from './dto';
import * as EventsService from './events.service';

import type { NextFunction, Request, Response } from 'express';

export const getAllEvents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const events = await EventsService.getAllEvents();
    res.status(200).json(events);
  } catch (error) {
    next(error);
  }
};

export const getEventById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const event = await EventsService.getEventById(Number(req.params.id));
    if (!event) throw new Error('Event not found');
    res.status(200).json(event);
  } catch (error) {
    next(error);
  }
};

export const createEvent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { title, description, date, createdBy } = req.body as CreateEventDto;

    const event = await EventsService.createEvent({
      title,
      description,
      date: new Date(date),
      createdBy,
    });
    res.status(201).json(event);
  } catch (error) {
    next(error);
  }
};

export const updateEvent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { title, description, date } = req.body;
    const event = await EventsService.updateEvent(Number(req.params.id), {
      title,
      description,
      date: date && new Date(date),
    });
    res.status(200).json(event);
  } catch (error) {
    next(error);
  }
};

export const deleteEvent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await EventsService.deleteEvent(Number(req.params.id));
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};
