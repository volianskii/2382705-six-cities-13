import { makeFakeComment } from '../../utils/mocks';
import { addCommentAction, fetchOfferCommentsAction } from '../api-actions';
import { commentsData } from './comments-data';

describe ('comments-data slice', () => {
  it ('should return initial state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {
      offerComments: [],
      isFormDisabled: false,
      commentsError: false,
      isResponse: false
    };

    const result = commentsData.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it ('should return default initial state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {
      offerComments: [],
      isFormDisabled: false,
      commentsError: false,
      isResponse: false
    };

    const result = commentsData.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it ('should set "offerComments" to array with a comment', () => {
    const mockOfferComment = makeFakeComment();
    const expectedOfferCommentsArray = [mockOfferComment];

    const result = commentsData.reducer(undefined, fetchOfferCommentsAction.fulfilled([mockOfferComment], '', undefined));
    expect(result.offerComments).toEqual(expectedOfferCommentsArray);
  });

  it ('should expand "offerComments" array with a new comment, set "isFormDisabled" to "false", set "commentsError" to "false", set "isResponse" to "true" with "addCommentAction.fulfilled" action', () => {
    const mockOfferComment = makeFakeComment();
    const expectedState = {
      offerComments: [mockOfferComment],
      isFormDisabled: false,
      commentsError: false,
      isResponse: true
    };

    const result = commentsData.reducer(undefined, addCommentAction.fulfilled(mockOfferComment, '', undefined));
    expect(result).toEqual(expectedState);
  });

  it ('should set "isFormDisabled" to "true", set "isResponse" to "false" with "addCommentAction.pending" action', () => {
    const expectedState = {
      offerComments: [],
      isFormDisabled: true,
      commentsError: false,
      isResponse: false
    };

    const result = commentsData.reducer(undefined, addCommentAction.pending);
    expect(result).toEqual(expectedState);
  });

  it ('should set "isFormDisabled" to "false", set "commentsError" to "true", set "isResponse" to "true" with "addCommentAction.pending" action', () => {
    const expectedState = {
      offerComments: [],
      isFormDisabled: false,
      commentsError: true,
      isResponse: true
    };

    const result = commentsData.reducer(undefined, addCommentAction.rejected);
    expect(result).toEqual(expectedState);
  });
});
