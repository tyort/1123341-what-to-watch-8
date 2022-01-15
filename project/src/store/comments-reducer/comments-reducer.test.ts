import { makeFakeReviews } from '../../mocks/reviews';
import { failPostComment, loadComments } from '../actions-functions';
import { commentsReducer } from './comments-reducer';
import {initialState} from './comments-reducer';

const fakeReviews = makeFakeReviews(6);

describe('Reducer: commentsReducer', () => {
  it('Without additional parameters should return initial state', () => {
    expect(commentsReducer(void 0, {type: 'NONEXISTENT_ACTION'}))
      .toEqual({comments: [], isPostCommentFailed: false});
  });
  it('Should not increase comments count in case of POST-method failed', () => {
    expect(commentsReducer(initialState, failPostComment(true)))
      .toEqual({comments: [], isPostCommentFailed: true});
    expect(commentsReducer(initialState, failPostComment(false)))
      .toEqual({comments: [], isPostCommentFailed: false});
  });
  it('Should upload comments to state from server', () => {
    expect(commentsReducer(initialState, loadComments(fakeReviews)))
      .toEqual({comments: fakeReviews, isPostCommentFailed: false});
  });
});
