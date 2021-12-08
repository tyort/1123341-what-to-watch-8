const AUTH_TOKEN_KEY_NAME = 'what-to-watch';

export type Token = string;

// Считываем токен из хранилища;
export const getToken = (): Token => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY_NAME);

  // Только если token равен null или undefined, тогда возвращаем значение правого операнда
  return token ?? '';
};

// Сохраняем токен в localstorage
export const saveToken = (token: Token): void => {
  localStorage.setItem(AUTH_TOKEN_KEY_NAME, token);
};

// Удаляем токен
export const dropToken = (): void => {
  localStorage.removeItem(AUTH_TOKEN_KEY_NAME);
};
