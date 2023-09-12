import React from 'react';
import Sorting from './sorting';
import { render, screen } from '@testing-library/react';
import { SortingMap } from '../../constants/sorting';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';


describe('Component: Sorting', () => {
  it('Sorting form should not be opened by default', () => {
    const testActiveSorting = SortingMap.Popular;
    const testOnChangeHandler = vi.fn();
    render(<Sorting activeSorting={testActiveSorting} onChange={testOnChangeHandler} />);

    expect(screen.getByTestId('sortingListElement')).not.toHaveClass('places__options--opened');
  });

  it('the sorting type should change when user selects one of the sorting types', async () => {
    const testActiveSorting = SortingMap.Popular;
    const testOnChangeHandler = vi.fn();
    render(<Sorting activeSorting={testActiveSorting} onChange={testOnChangeHandler} />);
    await userEvent.click(screen.getByTestId('activeSortingElement'));
    await userEvent.click(screen.getByText('Price: low to high'));

    expect(testOnChangeHandler).toBeCalledWith('LowToHigh');
  });

  it('Sorting form should be closed after user hits "Esc" button', async() => {
    const testActiveSorting = SortingMap.Popular;
    const testOnChangeHandler = vi.fn();
    render(<Sorting activeSorting={testActiveSorting} onChange={testOnChangeHandler} />);
    await userEvent.click(screen.getByTestId('activeSortingElement'));
    await userEvent.keyboard('{Escape}');

    expect(screen.getByTestId('sortingListElement')).not.toHaveClass('places__options--opened');
  });
});
