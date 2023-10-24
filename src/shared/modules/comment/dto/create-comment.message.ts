export const CreateCommentValidationMessage = {
  description: {
    lengthField: 'Min description is 5 chars, max is 1024',
    invalidFormat: 'description is required'
  },
  rating: {
    invalidFormat: 'Rating must be an integer',
    minValue: 'Min rating is 1',
    maxValue: 'Max rating is 5'
  },
  authorId: {
    invalidFormat: 'authorId must be a valid id'
  },
  offerId: {
    invalidFormat: 'offerId must be a valid id'
  },
} as const;
