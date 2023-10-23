import {UserTypes} from '../../../types/index.js';

export const CreateUserValidationMessage = {
  name: {
    invalidFormat: 'name is required',
    lengthField: 'min length is 1, max is 15',
  },
  email: {
    invalidFormat: 'email must be a valid address'
  },
  avatarUrl: {
    maxLength: 'Too long for field «avatarUrl»'
  },
  type: {
    invalidFormat: `type must be ${Object.values(UserTypes).join(' | ')}`,
  },
  password: {
    invalidFormat: 'password is required',
    lengthField: 'min length for password is 6, max is 12'
  },
} as const;
