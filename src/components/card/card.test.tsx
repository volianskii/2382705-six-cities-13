import React from 'react';
import { makeFakeOffer, makeFakeStore } from '../../utils/mocks';
import Card from './card';
import { vi } from 'vitest';
import { withHistory, withStore } from '../../utils/mock-component';
import { Route, Routes } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Card', () => {
  const mockHistory = createMemoryHistory();

  beforeEach(() => {
    mockHistory.push('/card');
  });

  it('should render correctly', () => {
    const fakeOffer = makeFakeOffer();
    const mockOnMouseEnter = vi.fn();
    const mockOnMouseLeave = vi.fn();
    const { withStoreComponent } = withStore(<Card offer={fakeOffer} onMouseEnter={mockOnMouseEnter} onMouseLeave={mockOnMouseLeave} type={'test'} />, makeFakeStore());
    const preparedComponent = withHistory(
      <Routes>
        <Route path={'/card'} element={withStoreComponent} />
      </Routes>,
      mockHistory
    );

    render(preparedComponent);

    expect(screen.getByTestId('cardComponent')).toBeInTheDocument();
  });

  it('should call "onMouseEnterHandler" when pointer enters the card and call "onMouseLeaveHandler" when pointer leaves the card ', async () => {
    const fakeOffer = makeFakeOffer();
    const mockOnMouseEnter = vi.fn();
    const mockOnMouseLeave = vi.fn();
    const { withStoreComponent } = withStore(<Card offer={fakeOffer} onMouseEnter={mockOnMouseEnter} onMouseLeave={mockOnMouseLeave} type={'test'} />, makeFakeStore());
    const preparedComponent = withHistory(
      <Routes>
        <Route path={'/card'} element={withStoreComponent} />
      </Routes>,
      mockHistory
    );

    render(preparedComponent);
    await userEvent.hover(screen.getByTestId('cardComponent'));
    await userEvent.unhover(screen.getByTestId('cardComponent'));
    expect(mockOnMouseEnter).toBeCalledTimes(1);
    expect(mockOnMouseLeave).toBeCalledTimes(1);
  });
});
