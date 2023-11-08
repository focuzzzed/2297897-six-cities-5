import {UserTypes} from '../../../types/index.js';

export const CreateUserValidationMessages = {
  Name: {
    invalidFormat: 'name is required',
    lengthField: 'min length is 1, max is 15',
  },
  Email: {
    invalidFormat: 'email must be a valid address'
  },
  AvatarUrl: {
    maxLength: 'Too long for field «avatarUrl»'
  },
  Type: {
    invalidFormat: `type must be ${Object.values(UserTypes).join(' | ')}`,
  },
  Password: {
    invalidFormat: 'password is required',
    lengthField: 'min length for password is 6, max is 12'
  },
  FavoriteOffers: {
    invalidFormat: 'favorite offers field must be an array'
  }
} as const;
