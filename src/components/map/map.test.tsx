import { render, screen } from '@testing-library/react';
import Map from './map';
import React from 'react';
import { makeFakeCity, makeFakeOffer } from '../../utils/mocks';

describe('Component: MainPageEmpty', () => {
  it('should render correctly', () => {
    const testCity = makeFakeCity('Paris');
    const testOffers = [makeFakeOffer(), makeFakeOffer()];
    enum testSize {
      heght = '400px',
      width = '500px'
    }

    render(<Map city={testCity} offers={testOffers} selectedOffer={testOffers[0]} height={testSize.heght} width={testSize.width}/>);

    expect(screen.getByTestId('mapElement')).toBeInTheDocument();
  });
});
