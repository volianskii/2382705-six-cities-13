import { withHistory, withStore } from '../../utils/mock-component';
import Favorites from './favorites';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { AuthorizationStatus } from '../../types/authorization';
import { makeFakeOffer, makeFakeStore } from '../../utils/mocks';

describe('Component: Favorites', () => {
  const mockHistory = createMemoryHistory();

  beforeEach(() => {
    mockHistory.push('/favorites');
  });

  it('should render correctly', () => {
    const withHistoryComponent = withHistory(<Favorites />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      USER: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: null,
      },
      FAVORITES: {
        favorites: [makeFakeOffer(), makeFakeOffer(), makeFakeOffer()]
      }
    }));

    render(withStoreComponent);

    expect(screen.getByTestId('favoritesPage')).toBeInTheDocument();
    expect(screen.getAllByTestId('favoritesCardElement')).toHaveLength(3);

  });

});
