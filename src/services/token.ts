const AUTH_TOKEN_KEY_NAME = 'what-to-watch';

export type Token = {email: string; password: string} | null;

export const getToken = (): Token => {
  const token: string | null = localStorage.getItem(AUTH_TOKEN_KEY_NAME);
  return token !== null
    ? JSON.parse(token) as {email: string; password: string}
    : null;
};

export const saveToken = (privateData: string): void => {
  localStorage.setItem(AUTH_TOKEN_KEY_NAME, privateData);
};

export const dropToken = (): void => {
  localStorage.removeItem(AUTH_TOKEN_KEY_NAME);
};
