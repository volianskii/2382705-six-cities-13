import { render, screen } from '@testing-library/react';
import LoadingScreen from './loading-screen';
import React from 'react';

describe('Component: Loading Screen', () => {
  it('should render correctly', () => {
    const expectedText = /Loading/i;

    render(<LoadingScreen />);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
