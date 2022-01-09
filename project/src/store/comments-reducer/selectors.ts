import { State } from '../../types/state';
import {Comment} from '../../types/comment';

export const getPostCommentFailedStatus = (state: State): boolean => state.COMMENTS.isPostCommentFailed;
export const getComments = (state: State): Comment[] => state.COMMENTS.comments;
