import { NameSpace } from '../../constants/store';
import { AuthorizationStatus } from '../../types/authorization';
import { makeFakeUser } from '../../utils/mocks';
import { getAuthStatus, getUserInfo } from './selectors';

describe ('userData selectors', () => {
  const state = {
    [NameSpace.User]: {
      authorizationStatus: AuthorizationStatus.NoAuth,
      user: makeFakeUser()
    }
  };

  it ('should return authorizationStatus from store', () => {
    const { authorizationStatus } = state[NameSpace.User];
    const result = getAuthStatus(state);
    expect(result).toEqual(authorizationStatus);
  });

  it ('should return userData from store', () => {
    const { user } = state[NameSpace.User];
    const result = getUserInfo(state);
    expect(result).toEqual(user);
  });
});
