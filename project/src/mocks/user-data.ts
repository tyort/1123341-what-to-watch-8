import { AuthInfo } from '../types/user';
import {random, internet, datatype} from 'faker';

export const makeFakeUser = (): AuthInfo => ({
  id: datatype.number(40),
  email: internet.email(),
  name: random.words(2),
  'avatar_url': internet.url(),
  token: datatype.string(10),
});
