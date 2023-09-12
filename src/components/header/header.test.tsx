import { render, screen } from '@testing-library/react';
import { AuthorizationStatus } from '../../types/authorization';
import { withHistory, withStore } from '../../utils/mock-component';
import Header from './header';
import React from 'react';
import { extractActionTypes, makeFakeOffer, makeFakeUser } from '../../utils/mocks';
import userEvent from '@testing-library/user-event';
import { logoutAction } from '../../store/api-actions';
import { ApiRoute } from '../../constants/api';
import { createMemoryHistory } from 'history';
import { Route, Routes } from 'react-router-dom';

describe('Component: Header', () => {
  const mockHistory = createMemoryHistory();

  beforeEach(() => {
    mockHistory.push('/header');
  });

  it('should contain "Sign in" button when user is not authorized', () => {
    const headerNoAuthText = 'Sign in';
    const initialState = {
      USER: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        user: null,
      },
      FAVORITES: {
        favorites: [],
      }
    };
    const { withStoreComponent } = withStore(<Header />, initialState);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);


    expect(screen.getByText(headerNoAuthText)).toBeInTheDocument();
  });

  it('should contain user information, the amount of favorites saved and "Sign out" button when user is authorized', () => {
    const headerAuthText = 'Sign out';
    const testEmail = 'test@gmail.com';
    const initialState = {
      USER: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: makeFakeUser(testEmail),
      },
      FAVORITES: {
        favorites: [makeFakeOffer(), makeFakeOffer()],
      }
    };
    const { withStoreComponent } = withStore(<Header />, initialState);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(headerAuthText)).toBeInTheDocument();
    expect(screen.getByText(testEmail)).toBeInTheDocument();
    expect(screen.getByTestId('favoritesAmount')).toHaveTextContent(initialState.FAVORITES.favorites.length.toString());
  });

  it('should dispatch "logoutAction.pending" and "logoutAction.fulfilled" when user is authorized and clicks on "Sign out" button', async () => {
    const testEmail = 'test@gmail.com';
    const initialState = {
      USER: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: makeFakeUser(testEmail),
      },
      FAVORITES: {
        favorites: [makeFakeOffer(), makeFakeOffer()],
      }
    };
    const { withStoreComponent, mockStore, mockAxiosAdapter } = withStore(<Header />, initialState);
    const preparedComponent = withHistory(withStoreComponent);
    mockAxiosAdapter.onDelete(ApiRoute.Logout).reply(204);

    render(preparedComponent);

    await userEvent.click(screen.getByTestId('signOutElement'));
    const actions = extractActionTypes(mockStore.getActions());
    expect(actions).toEqual([
      logoutAction.pending.type,
      logoutAction.fulfilled.type]
    );
  });

  it('should navigate to Login page page when user is not authorized and clicks on "Sign in" button', async () => {
    const initialState = {
      USER: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        user: null,
      },
      FAVORITES: {
        favorites: [makeFakeOffer(), makeFakeOffer()],
      }
    };
    const { withStoreComponent } = withStore(<Header />, initialState);
    const mockComponent = <span data-testid='loginElement'>Mock Login Page</span>;
    const preparedComponent = withHistory(
      <Routes>
        <Route path={'/header'} element={withStoreComponent} />
        <Route path={'/login'} element={mockComponent} />
      </Routes>,
      mockHistory
    );

    render(preparedComponent);

    await userEvent.click(screen.getByText('Sign in'));
    expect(screen.getByTestId('loginElement')).toBeInTheDocument();
  });
});
