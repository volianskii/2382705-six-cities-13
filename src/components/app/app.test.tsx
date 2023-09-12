import { MemoryHistory, createMemoryHistory } from 'history';
import { withHistory, withStore } from '../../utils/mock-component';
import { makeFakeOffer, makeFakeStore, makeFakeFullOffer } from '../../utils/mocks';
import { render, screen } from '@testing-library/react';
import App from './app';
import { AuthorizationStatus } from '../../types/authorization';

describe('Application Routing', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render MainPage when user navigates to "/"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      OFFERS: {
        offers: [makeFakeOffer('Paris'), makeFakeOffer('Paris')],
        city: 'Paris',
      }
    }));
    mockHistory.push('/');

    render(withStoreComponent);

    expect(screen.getByTestId('mainPage')).toBeInTheDocument();
  });

  it('should render Login when user navigates to "/login"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    mockHistory.push('/login');

    render(withStoreComponent);

    expect(screen.getByTestId('loginElement')).toBeInTheDocument();
  });

  it('should render Favorites when user navigates to "/favorites"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      USER: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: null,
      },
      FAVORITES: {
        favorites: [makeFakeOffer(), makeFakeOffer()]
      }
    }));
    mockHistory.push('/favorites');

    render(withStoreComponent);

    expect(screen.getByTestId('favoritesPage')).toBeInTheDocument();
  });

  it('should render Offer when user navigates to "/offer/:id"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const testOfferId = 'testOfferId';
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      OFFER: {
        offer: makeFakeFullOffer()
      }
    }));
    mockHistory.push(`/offer/${testOfferId}`);

    render(withStoreComponent);

    expect(screen.getByTestId('offerPage')).toBeInTheDocument();
  });

  it('should render Page404 when user navigates to "*"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());
    mockHistory.push('/wrongAdress');

    render(withStoreComponent);

    expect(screen.getByTestId('page404')).toBeInTheDocument();
  });
});
