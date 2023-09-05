import { NameSpace } from '../../constants/store';
import { State } from '../../types/state';
import type { Comment } from '../../types/comment';

export const getComments = (state: Pick<State, NameSpace.Comments>): Comment[] => state[NameSpace.Comments].offerComments;
export const getFormDisabledStatus = (state: Pick<State, NameSpace.Comments>): boolean => state[NameSpace.Comments].isFormDisabled;
export const getCommentsError = (state: Pick<State, NameSpace.Comments>): boolean => state[NameSpace.Comments].commentsError;
export const getResponseStatus = (state: Pick<State, NameSpace.Comments>): boolean => state[NameSpace.Comments].isResponse;

