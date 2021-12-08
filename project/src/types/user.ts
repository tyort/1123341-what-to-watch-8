export type User = {
  email: string;
  password: string;
};

export type AuthInfo = {
  id: number;
  email: string;
  name: string;
  'avatar_url': string;
  token: string;
}
