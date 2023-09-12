import CitiesList from './cities-list';
import { withHistory, withStore } from '../../utils/mock-component';
import { createMemoryHistory } from 'history';
import { extractActionTypes, makeFakeStore } from '../../utils/mocks';
import { Route, Routes } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { changeCity } from '../../store/offers-data/offers-data';

describe('CitiesList', () => {
  const mockHistory = createMemoryHistory();

  beforeEach(() => {
    mockHistory.push('/citiesList');
  });

  it('should render correctly', () => {
    const { withStoreComponent} = withStore(<CitiesList />, makeFakeStore());
    const preparedComponent = withHistory(
      <Routes>
        <Route path={'/citiesList'} element={withStoreComponent} />
      </Routes>,
      mockHistory
    );

    render(preparedComponent);

    expect(screen.getByTestId('citiesListComponent')).toBeInTheDocument();
  });

  it('should dispatch "changeCity" when user clicks on city element', async () => {
    const { withStoreComponent, mockStore } = withStore(<CitiesList />, makeFakeStore());
    const preparedComponent = withHistory(
      <Routes>
        <Route path={'/citiesList'} element={withStoreComponent} />
      </Routes>,
      mockHistory
    );
    render(preparedComponent);

    await userEvent.click(screen.getByText('Cologne'));
    const actions = extractActionTypes(mockStore.getActions());

    expect(actions).toEqual([changeCity.type]);
  });
});
