import { User } from '../mocks/users';

const AUTH_TOKEN_KEY_NAME = 'what-to-watch';

export type Token = User | null;

export const getToken = (): Token => {
  const token: string | null = localStorage.getItem(AUTH_TOKEN_KEY_NAME);
  return token !== null
    ? JSON.parse(token) as User
    : null;
};

export const saveToken = (privateData: string): void => {
  localStorage.setItem(AUTH_TOKEN_KEY_NAME, privateData);
};

export const dropToken = (): void => {
  localStorage.removeItem(AUTH_TOKEN_KEY_NAME);
};
