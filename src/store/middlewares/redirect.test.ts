import { redirect } from './redirect';
import { MockStore, configureMockStore } from '@jedmao/redux-mock-store';
import { AnyAction } from '@reduxjs/toolkit';
import browserHistory from '../../services/browser-history';
import { redirectToRoute } from '../action';
import { State } from '../../types/state';
import { vi } from 'vitest';

vi.mock('../../services/browser-history', () => ({
  default: {
    location: { pathname: '' },
    push(path: string) {
      this.location.pathname = path;
    }
  }
}));

describe('Redirect middleware', () => {
  let store: MockStore;
  beforeAll(() => {
    const middleware = [redirect];
    const mockStoreCreator = configureMockStore<State, AnyAction>(middleware);
    store = mockStoreCreator();
  });

  beforeEach(() => {
    browserHistory.push('');
  });

  it('should redirect to "/login" with "redirectToRoute" action', () => {
    const redirectAction = redirectToRoute('/login');
    store.dispatch(redirectAction);
    expect(browserHistory.location.pathname).toBe('/login');
  });

  it('should not redirect to "/falsePath" with empty action', () => {
    const emptyAction = { type: '', payload: '/falsePath' };
    store.dispatch(emptyAction);
    expect(browserHistory.location.pathname).not.toBe('/falsePath');
  });
});
