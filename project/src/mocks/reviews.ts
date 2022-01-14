import {Review} from '../types/review';
import {random, date, lorem, datatype} from 'faker';

export const makeFakeReviews = (count: number): Review[] => new Array(count)
  .fill(null)
  .map(() => (
    {
      'id': datatype.number(40),
      'user': {
        'id': datatype.number(40),
        'name': random.words(2),
      },
      'rating': datatype.number({min: 1, max: 10, precision: 0.1}),
      'comment': lorem.sentences(3),
      'date': `${date.past().toISOString()}`,
    }
  ));
