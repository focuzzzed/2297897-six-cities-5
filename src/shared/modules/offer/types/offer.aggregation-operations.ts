import {SortType} from '../../../types/index.js';

export const OfferAggregationOperations = {
  lookupUserOperation: {
    $lookup: {
      from: 'users',
      localField: 'authorId',
      foreignField: '_id',
      as: 'authorId',
    }
  },
  unwindUserOperation: {
    $unwind: {
      path: '$authorId',
      preserveNullAndEmptyArrays: true,
    }
  },

  lookupCommentsOperation: {
    $lookup: {
      from: 'comments',
      localField: '_id',
      foreignField: 'offerId',
      as: 'comments',
    },
  },

  addFieldsOperation: {
    $addFields: {
      rating: {
        $divide: [
          {
            $reduce: {
              input: '$comments',
              initialValue: 0,
              in: { $add: ['$$value', '$$this.rating'] },
            },
          },
          {
            $cond: {
              if: {$ne: [{$size: '$comments'}, 0]},
              then: {$size: '$comments'},
              else: 1
            },
          },
        ],
      },
      commentsCount: { $size: '$comments' },
      id: {$toString: '$_id'}
    },
  },

  removeCommentsOperation: {
    $unset: 'comments'
  },

  sortOperation: {
    $sort: {
      createdAt: SortType.Down
    }
  },
};
