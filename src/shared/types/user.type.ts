import {UserTypes} from './user-types.enum.js';

export type User = {
  name: string;
  email: string;
  avatarUrl: string;
  password: string;
  type: UserTypes;
}
