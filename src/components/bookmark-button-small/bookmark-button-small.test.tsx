import React from 'react';
import BookmarkButtonSmall from './bookmark-button-small';
import { withHistory, withStore } from '../../utils/mock-component';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { extractActionTypes, makeFakeStore } from '../../utils/mocks';
import { createMemoryHistory } from 'history';
import { Route, Routes } from 'react-router-dom';
import { ApiRoute } from '../../constants/api';
import { addFavoritesAction, deleteFavoritesAction } from '../../store/api-actions';
import { AuthorizationStatus } from '../../types/authorization';


describe('BookmarkButtonSmall', () => {
  const mockHistory = createMemoryHistory();

  beforeEach(() => {
    mockHistory.push('/button');
  });

  it('should navigate to "Login" and when user is not authorized and clicks on button', async () => {
    const mockFavoriteOfferId = 'testOfferId';
    const { withStoreComponent } = withStore(<BookmarkButtonSmall id={mockFavoriteOfferId} isActive/>, makeFakeStore());
    const mockComponent = <span data-testid='loginElement'>Mock Login Page</span>;
    const preparedComponent = withHistory(
      <Routes>
        <Route path={'/button'} element={withStoreComponent} />
        <Route path={'/login'} element={mockComponent} />
      </Routes>,
      mockHistory
    );


    render(preparedComponent);
    await userEvent.click(screen.getByRole('button'));

    expect(screen.getByTestId('loginElement')).toBeInTheDocument();
  });

  it('should dispatch to "deleteFavoriteAction.pending", "deleteFavoriteAction.fulfilled" when user is authorized and clicks on active button', async () => {
    const mockFavoriteOfferId = 'testOfferId';
    const { withStoreComponent, mockStore, mockAxiosAdapter } = withStore(<BookmarkButtonSmall id={mockFavoriteOfferId} isActive/>, makeFakeStore(
      {
        USER: {
          authorizationStatus: AuthorizationStatus.Auth,
          user: null
        }
      }
    ));
    mockAxiosAdapter.onPost(`${ApiRoute.Favorites}/${mockFavoriteOfferId}/0`).reply(200, []);
    const preparedComponent = withHistory(
      <Routes>
        <Route path={'/button'} element={withStoreComponent} />
      </Routes>,
      mockHistory,
    );

    render(preparedComponent);
    await userEvent.click(screen.getByRole('button'));

    const actions = extractActionTypes(mockStore.getActions());

    expect(actions).toEqual([
      deleteFavoritesAction.pending.type,
      deleteFavoritesAction.fulfilled.type
    ]);
  });

  it('should dispatch "addFavoriteAction.pending", "addFavoriteAction.fulfilled" when user is authorized and clicks on active button', async () => {
    const mockFavoriteOfferId = 'testOfferId';
    const { withStoreComponent, mockStore, mockAxiosAdapter } = withStore(<BookmarkButtonSmall id={mockFavoriteOfferId} isActive={false}/>, makeFakeStore(
      {
        USER: {
          authorizationStatus: AuthorizationStatus.Auth,
          user: null
        }
      }
    ));
    mockAxiosAdapter.onPost(`${ApiRoute.Favorites}/${mockFavoriteOfferId}/1`).reply(200, []);
    const preparedComponent = withHistory(
      <Routes>
        <Route path={'/button'} element={withStoreComponent} />
      </Routes>,
      mockHistory,
    );

    render(preparedComponent);
    await userEvent.click(screen.getByRole('button'));

    const actions = extractActionTypes(mockStore.getActions());

    expect(actions).toEqual([
      addFavoritesAction.pending.type,
      addFavoritesAction.fulfilled.type
    ]);
  });
});
