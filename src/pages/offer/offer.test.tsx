import { withHistory, withStore } from '../../utils/mock-component';
import Offer from './offer';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { makeFakeComment, makeFakeFullOffer, makeFakeOffer, makeFakeStore, makeFakeUser } from '../../utils/mocks';
import { AuthorizationStatus } from '../../types/authorization';

describe('Component: ErrorPage', () => {
  const mockHistory = createMemoryHistory();

  beforeEach(() => {
    mockHistory.push('/offer/testOfferId');
  });

  it('should render correctly', () => {
    const withHistoryComponent = withHistory(<Offer />);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      OFFER: {
        offer: makeFakeFullOffer()
      }
    }));
    render(withStoreComponent);

    expect(screen.getByTestId('offerPage')).toBeInTheDocument();
  });

  it('should not contain comments form when user is not authorized', () => {
    const withHistoryComponent = withHistory(<Offer />);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      USER: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        user: makeFakeUser()
      }
    }));

    render(withStoreComponent);

    expect(screen.queryByTestId('commentComponent')).not.toBeInTheDocument();
  });

  it('should contain 10 comments and 3 nearby places\'s cards maximum', () => {
    const withHistoryComponent = withHistory(<Offer />);
    const MAX_COMMENTS_AMOUNT = 10;
    const NEARBY_MAX_AMOUNT = 3;
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      COMMENTS: {
        offerComments: new Array(15).fill(null).map(() => makeFakeComment('2019-05-08T14:13:56.569Z')),
        isFormDisabled: false,
        commentsError: false,
        isResponse: true
      },
      NEARBYOFFERS: {
        nearbyOffers: new Array(5).fill(null).map(() => makeFakeOffer())
      },
      OFFER: {
        offer: makeFakeFullOffer()
      }
    }));

    render(withStoreComponent);

    expect(screen.getAllByTestId('cardComponent')).toHaveLength(NEARBY_MAX_AMOUNT);
    expect(screen.getAllByTestId('review-container')).toHaveLength(MAX_COMMENTS_AMOUNT);
  });

});
