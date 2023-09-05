import { NameSpace } from '../../constants/store';
import { State } from '../../types/state';
import { AuthorizationStatus, UserData } from '../../types/authorization';

export const getAuthStatus = (state: Pick<State, NameSpace.User>): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
export const getUserInfo = (state: Pick<State, NameSpace.User>): UserData => state[NameSpace.User].user;
