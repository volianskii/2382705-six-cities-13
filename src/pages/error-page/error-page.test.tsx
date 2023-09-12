import { withStore } from '../../utils/mock-component';
import ErrorPage from './error-page';
import { render, screen } from '@testing-library/react';
import { ApiRoute } from '../../constants/api';
import userEvent from '@testing-library/user-event';
import { extractActionTypes } from '../../utils/mocks';
import { fetchOfferAction } from '../../store/api-actions';

describe('Component: ErrorPage', () => {
  it('should render correctly', () => {
    const expectedText = 'Не удалось загрузить предложения для аренды';
    const expectedButtonText = 'Попробовать еще раз';
    const initialStore = {
      OFFERS: {
        offers: [],
        isOffersDataLoading: false,
        city: 'Paris',
        hasError: false,
        activeOfferId: null
      }
    };
    const { withStoreComponent } = withStore(<ErrorPage />, initialStore);

    render(withStoreComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent(expectedButtonText);
  });

  it('should dispatch fetchOfferAction when user clicks on button', async () => {
    const initialStore = {
      OFFERS: {
        offers: [],
        isOffersDataLoading: false,
        city: 'Paris',
        hasError: false,
        activeOfferId: null
      }
    };
    const { withStoreComponent, mockStore, mockAxiosAdapter } = withStore(<ErrorPage />, initialStore);
    mockAxiosAdapter.onGet(ApiRoute.Offers).reply(200, []);

    render(withStoreComponent);
    await userEvent.click(screen.getByRole('button'));
    const actions = extractActionTypes(mockStore.getActions());

    expect(actions).toEqual([
      fetchOfferAction.pending.type,
      fetchOfferAction.fulfilled.type
    ]);
  });
});
