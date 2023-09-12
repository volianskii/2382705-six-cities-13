import Logo from './logo';
import { withHistory } from '../../utils/mock-component';
import { render, screen } from '@testing-library/react';
import React from 'react';

describe('Logo Component', () => {
  it('should render correctly', () => {
    const preparedComponent = withHistory(<Logo />);
    const expectedTestId = 'logo-container';
    const expectedAltText = '6 cities logo';

    render(preparedComponent);

    expect(screen.getByAltText(expectedAltText)).toBeInTheDocument();
    expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();

  });
});
