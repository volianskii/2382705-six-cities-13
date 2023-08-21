import { NameSpace } from '../../constants/store';
import { State } from '../../types/state';
import type { Comment } from '../../types/comment';

export const getComments = (state: State): Comment[] => state[NameSpace.Comments].offerComments;
