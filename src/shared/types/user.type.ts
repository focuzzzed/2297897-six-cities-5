import {UserTypes} from './user-types.enum.js';

export type User = {
  name: string;
  email: string;
  avatarUrl?: string;
  type: UserTypes;
}
