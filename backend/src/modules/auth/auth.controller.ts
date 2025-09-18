import * as UsersService from '@modules/users/users.service';

import * as AuthService from './auth.service';
import type { CreateUserDto } from '@modules/users/dto';

import type { SignInDto } from './dto';
import type { NextFunction, Request, Response } from 'express';

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authRegisterDto: CreateUserDto = req.body;
    await UsersService.createUser(authRegisterDto);
    res.status(201).json({
      message: 'User successfully registered!',
    });
  } catch (error) {
    next(error);
  }
};

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authSignInDto: SignInDto = req.body;
    const token = await AuthService.signIn(authSignInDto);
    res.status(200).json({ token: token });
  } catch (error) {
    next(error);
  }
};

export const signOut = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      res.status(401).send();
      return;
    }

    await AuthService.revokeToken(token);
    res.status(200).json({ message: 'Successfully logged out' });
  } catch (error) {
    next(error);
  }
};
