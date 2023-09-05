import { AuthorizationStatus } from '../../types/authorization';
import { makeFakeUser } from '../../utils/mocks';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions';
import { userData } from './user-data';

describe ('user-data slice', () => {
  const emptyAction = {type: ''};
  const mockUser = makeFakeUser();

  it ('should return initial state with empty action', () => {
    const expectedState = {
      authorizationStatus: AuthorizationStatus.Unknown,
      user: null,
    };

    const result = userData.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it ('should return default initial state with empty action', () => {
    const expectedState = {
      authorizationStatus: AuthorizationStatus.Unknown,
      user: null,
    };

    const result = userData.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it ('should set authorizationStatus to "AUTH", set user to an object with user data with "checkAuthAction.fulfilled" action', () => {
    const expectedState = {
      authorizationStatus: AuthorizationStatus.Auth,
      user: mockUser,
    };

    const result = userData.reducer(undefined, checkAuthAction.fulfilled(mockUser, '', undefined));
    expect(result).toEqual(expectedState);
  });

  it ('should set authorizationStatus to "NO_AUTH", set user to "null" with "checkAuthAction.rejected" action', () => {
    const expectedState = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      user: null,
    };
    const state = {
      authorizationStatus: AuthorizationStatus.Auth,
      user: mockUser,
    };

    const result = userData.reducer(state, checkAuthAction.rejected);
    expect(result).toEqual(expectedState);
  });

  it ('should set authorizationStatus to "AUTH", set user to an object with user data with "loginAction.fulfilled" action', () => {
    const expectedState = {
      authorizationStatus: AuthorizationStatus.Auth,
      user: mockUser,
    };

    const result = userData.reducer(undefined, loginAction.fulfilled(mockUser, '', undefined));
    expect(result).toEqual(expectedState);
  });

  it ('should set authorizationStatus to "NO_AUTH" with "loginAction.rejected" action', () => {
    const expectedStatus = AuthorizationStatus.NoAuth;

    const result = userData.reducer(undefined, loginAction.rejected);
    expect(result.authorizationStatus).toEqual(expectedStatus);
  });

  it ('should set authorizationStatus to "NO_AUTH", set user to "null" with "logoutAction.fulfilled" action', () => {
    const expectedState = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      user: null,
    };
    const state = {
      authorizationStatus: AuthorizationStatus.Auth,
      user: mockUser,
    };
    const result = userData.reducer(state, logoutAction.fulfilled);
    expect(result).toEqual(expectedState);
  });
});
