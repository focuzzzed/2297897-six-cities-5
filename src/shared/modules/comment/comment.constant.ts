export const COMMENT_CONSTANT_VALUES = {
  Description: {
    minLength: 20,
    maxLength: 1024,
  },
  Rating: {
    minValue: 1,
    maxValue: 5,
  },
} as const;
