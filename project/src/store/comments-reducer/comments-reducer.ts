import { createReducer } from '@reduxjs/toolkit';
import {CommentsState} from '../../types/state';
import { failPostComment, loadComments } from '../actions-functions';

const initialState: CommentsState = {
  comments: [],
  isPostCommentFailed: false,
};

export const commentsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(failPostComment, (state, action) => {
      state.isPostCommentFailed = action.payload;
    })
    .addCase(loadComments, (state, action) => {
      state.comments = action.payload;
    });
});
