import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import MainPageEmpty from './main-empty';
import React from 'react';
import { makeFakeStore } from '../../utils/mocks';

describe('Component: MainPageEmpty', () => {
  it('should render correctly', () => {
    const testCity = 'Paris';
    const EmptyMainPageText = 'No places to stay available';
    const { withStoreComponent } = withStore(<MainPageEmpty city={testCity}/>, makeFakeStore());
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(EmptyMainPageText)).toBeInTheDocument();
  });
});
