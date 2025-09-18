import { api } from '@/api';

import { AUTH_LOGIN_URL, AUTH_REGISTER_URL } from '@/constants';

import type { SignInDto, SignUpDto, SignInResultSuccess } from './dto';

interface AuthError {
  status: number;
  message: string;
}

interface AuthResponse<T> {
  data?: T;
  error?: AuthError;
}

export const signIn = async (
  signInDto: SignInDto,
): Promise<AuthResponse<SignInResultSuccess>> => {
  try {
    const data = await api
      .post(AUTH_LOGIN_URL, { json: signInDto })
      .json<SignInResultSuccess>();

    return { data };
  } catch (error: unknown) {
    const err = error as { response?: { status: number; message: string } };
    return {
      error: {
        status: err?.response?.status || 500,
        message: err?.response?.message || 'Произошла ошибка при входе',
      },
    };
  }
};

export const signUp = async (
  signUpDto: SignUpDto,
): Promise<AuthResponse<void> | undefined> => {
  try {
    await api.post(AUTH_REGISTER_URL, { json: signUpDto }).json<void>();
  } catch (error: unknown) {
    const err = error as { response?: AuthError };
    return {
      error: {
        status: err?.response?.status || 500,
        message: err?.response?.message || 'Произошла ошибка при регистрации',
      },
    };
  }
};
