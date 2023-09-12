import React from 'react';
import CardList from './card-list';
import { withHistory, withStore } from '../../utils/mock-component';
import { createMemoryHistory } from 'history';
import { makeFakeOffer, makeFakeStore } from '../../utils/mocks';
import { Route, Routes } from 'react-router-dom';
import { render, screen } from '@testing-library/react';


describe('CardList', () => {
  const mockHistory = createMemoryHistory();

  beforeEach(() => {
    mockHistory.push('/cardList');
  });

  it('should render correctly', () => {
    const mockOffers = [makeFakeOffer(), makeFakeOffer()];
    const { withStoreComponent } = withStore(<CardList offers={mockOffers} listProp='testProp' typeProp='testProp' tabsProp='testProp' />, makeFakeStore());
    const preparedComponent = withHistory(
      <Routes>
        <Route path={'/cardList'} element={withStoreComponent} />
      </Routes>,
      mockHistory
    );

    render(preparedComponent);

    expect(screen.getByTestId('cardListComponent')).toBeInTheDocument();
  });
});
