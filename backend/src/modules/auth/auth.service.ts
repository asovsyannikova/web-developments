import { compare } from 'bcryptjs';
import { decode, type JwtPayload } from 'jsonwebtoken';

import { User, RevokedToken } from '@model';
import { createJwtToken } from '@utils';

import type { SignInDto } from './dto';

export const signIn = async (signInDto: SignInDto) => {
  const { email, password } = signInDto;
  if (!email || !password) throw new Error('Email and password are required.');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error('Invalid email format');
  }

  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error('User not found');
  }

  const isPasswordValid = await compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid credentials');
  }

  return createJwtToken(user.id);
};

export const revokeToken = async (token: string) => {
  const decoded = decode(token);

  if (!decoded || typeof decoded === 'string') {
    throw new Error('Invalid token format');
  }

  const payload = decoded as JwtPayload;
  if (!payload.exp) {
    throw new Error('Token does not have expiration date');
  }

  await RevokedToken.create({
    token,
    expiresAt: new Date(payload.exp * 1000),
  });
};
