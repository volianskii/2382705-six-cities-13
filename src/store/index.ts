import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './root-reducer';
import { createAPI } from '../services/api.ts';
import { redirect } from './middlewares/redirect.ts';

const api = createAPI();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }).concat(redirect),
});
