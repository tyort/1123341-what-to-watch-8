import {ActionName} from '../../types/action';
import {CommentsState} from '../../types/state';

const initialState = {
  comments: [],
  isPostCommentFailed: false,
};

export const commentsReducer = (state: CommentsState = initialState, action: 'кто здесь?'): CommentsState => {
  switch (action.type) {
    case ActionName.FailPostComment:
      return {...state, isPostCommentFailed: action.payload};

    case ActionName.LoadComments:
      return {...state, comments: action.payload};

    default:
      return state;
  }
};
