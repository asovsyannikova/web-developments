import * as UsersService from './users.service';

import type { CreateUserDto } from './dto';
import type { NextFunction, Request, Response } from 'express';

export const getAllUsers = async (
  _: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const users = await UsersService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const createUserDto: CreateUserDto = req.body;
    const user = await UsersService.createUser(createUserDto);
    res.status(201).json({
      id: user.id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
    });
  } catch (error) {
    next(error);
  }
};
