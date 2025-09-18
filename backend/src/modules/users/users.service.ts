import { User } from '@model';
import { hash } from 'bcryptjs';

import type { CreateUserDto } from './dto';

export const getAllUsers = async () => {
  return User.findAll({
    attributes: ['id', 'username', 'email', 'createdAt'],
  });
};

export const createUser = async (createUserDto: CreateUserDto) => {
  const { username, email, password } = createUserDto;

  if (!username || !email || !password) {
    throw new Error('Name and email are required');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error('Invalid email format');
  }

  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new Error('Email already exists');
  }

  const hashedPassword = await hash(password, 10);

  return User.create({
    username,
    email,
    password: hashedPassword,
    createdAt: new Date(),
  });
};
