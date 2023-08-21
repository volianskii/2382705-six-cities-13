import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../../types/authorization';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions';
import { NameSpace } from '../../constants/store';

const initialState: {
  authorizationStatus:AuthorizationStatus;
} = {
  authorizationStatus: AuthorizationStatus.Unknown,
};

export const userData = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(loginAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      });
  }
});
