import { NameSpace } from '../../constants/store';
import { getComments, getCommentsError, getFormDisabledStatus, getResponseStatus } from './selectors';
import { makeFakeComment } from '../../utils/mocks';

describe ('commentsData selectors', () => {
  const state = {
    [NameSpace.Comments]: {
      offerComments: new Array(3).fill(null).map(() => makeFakeComment()),
      isFormDisabled: true,
      commentsError: false,
      isResponse: true,
    }
  };

  it('should return comments from state', () => {
    const { offerComments } = state[NameSpace.Comments];
    const result = getComments(state);
    expect(result).toEqual(offerComments);
  });

  it('should return FormDisabledStatus from state', () => {
    const { isFormDisabled } = state[NameSpace.Comments];
    const result = getFormDisabledStatus(state);
    expect(result).toBe(isFormDisabled);
  });

  it('should return CommentsError from state', () => {
    const { commentsError } = state[NameSpace.Comments];
    const result = getCommentsError(state);
    expect(result).toBe(commentsError);
  });

  it('should return ResponseStatus from state', () => {
    const { isResponse } = state[NameSpace.Comments];
    const result = getResponseStatus(state);
    expect(result).toBe(isResponse);
  });
});
