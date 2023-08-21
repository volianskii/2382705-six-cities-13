import { NameSpace } from '../../constants/store';
import { State } from '../../types/state';
import { AuthorizationStatus } from '../../types/authorization';

export const getAuthStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authorizationStatus;

