import { render, screen } from '@testing-library/react';
import { AuthorizationStatus } from '../../types/authorization';
import { withHistory, withStore } from '../../utils/mock-component';
import FavoritesEmpty from './favorites-empty';
import React from 'react';

describe('Component: FavoritesEmpty', () => {
  it('should render correctly', () => {
    const favoritesEmptyText = 'Nothing yet saved.';
    const initialState = {
      USER: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: null,
      },
      FAVORITES: {
        favorites: [],
      }
    };
    const { withStoreComponent } = withStore(<FavoritesEmpty />, initialState);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);


    expect(screen.getByText(favoritesEmptyText)).toBeInTheDocument();
  });
});
