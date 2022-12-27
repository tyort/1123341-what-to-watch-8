const AUTH_TOKEN_KEY_NAME = 'what-to-watch';

export type Token = string;

export const getToken = (): Token => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY_NAME);
  return token ?? '';
};

export const saveToken = (privateData: string): void => {
  localStorage.setItem(AUTH_TOKEN_KEY_NAME, privateData);
};

export const dropToken = (): void => {
  localStorage.removeItem(AUTH_TOKEN_KEY_NAME);
};
