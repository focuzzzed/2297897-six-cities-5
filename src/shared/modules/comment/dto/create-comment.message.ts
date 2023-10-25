export const CREATE_COMMENT_VALIDATION_MESSAGES = {
  Description: {
    lengthField: 'Min description is 5 chars, max is 1024',
    invalidFormat: 'description is required'
  },
  Rating: {
    invalidFormat: 'Rating must be an integer',
    minValue: 'Min rating is 1',
    maxValue: 'Max rating is 5'
  },
  AuthorId: {
    invalidFormat: 'authorId must be a valid id'
  },
  OfferId: {
    invalidFormat: 'offerId must be a valid id'
  },
} as const;
