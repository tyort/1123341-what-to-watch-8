export type User = {
  id: number;
  email: string;
  password: string;
}

export const users: User[] = [
  {
    id: 1,
    email: 'gomarjoba@mail.ru',
    password: '111',
  },
  {
    id: 2,
    email: 'chic@mail.ru',
    password: '222',
  },
  {
    id: 3,
    email: 'lana@mail.ru',
    password: '333',
  },
];
