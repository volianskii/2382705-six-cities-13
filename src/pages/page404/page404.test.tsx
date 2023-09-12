import Page404 from './page404';
import { withHistory } from '../../utils/mock-component';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';

describe('Component: Page404', () => {
  const mockHistory = createMemoryHistory();

  beforeEach(() => {
    mockHistory.push('/*');
  });

  it('should render correctly', () => {
    const preparedComponent = withHistory(<Page404 />);
    const expectedText = 'page not found';
    const expectedTestId = 'button';

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();

  });

  it('should redirect to main page when user clicks on "To Main Page" button', async () => {
    const expectedText = 'Redirected to main page';
    const mockComponent = <span>{expectedText}</span>;
    const preparedComponent = withHistory(
      <Routes>
        <Route path={'/*'} element={<Page404 />} />
        <Route path={'/'} element={mockComponent} />
      </Routes>,
      mockHistory
    );

    render(preparedComponent);

    await userEvent.click(screen.getByTestId('button'));
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

});
