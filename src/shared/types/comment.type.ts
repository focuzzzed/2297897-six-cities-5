import {User} from './user.type.js';

export type Comment = {
  description: string;
  createdAt: Date;
  rating: number;
  author: User;
};
