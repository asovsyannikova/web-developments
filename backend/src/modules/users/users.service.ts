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
    throw new Error('Required fields are missing');
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

export const getUserById = async (id: number) => {
  const user = await User.findOne({
    where: { id },
    attributes: ['id', 'username', 'email', 'createdAt'],
  });

  if (!user) {
    throw new Error('User not found');
  }

  return user;
};
