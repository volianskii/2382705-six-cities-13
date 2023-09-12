import { withHistory, withStore } from '../../utils/mock-component';
import MainPage from './main';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { makeFakeOffer, makeFakeStore } from '../../utils/mocks';

describe('Component: ErrorPage', () => {

  it('should render correctly', () => {
    const withHistoryComponent = withHistory(<MainPage />);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      OFFERS: {
        offers: [makeFakeOffer('Paris'), makeFakeOffer('Paris')],
        city: 'Paris',
      }
    }));

    render(withStoreComponent);

    expect(screen.getByTestId('mainPage')).toBeInTheDocument();
  });

});
