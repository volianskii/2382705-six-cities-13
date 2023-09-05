import { makeFakeOffer } from '../../utils/mocks';
import { fetchNearbyOffersAction } from '../api-actions';
import { nearbyData } from './nearby-data';

describe ('nearby-data slice', () => {
  it ('should return initial state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {
      nearbyOffers: []
    };

    const result = nearbyData.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it ('should return default initial state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {
      nearbyOffers: []
    };

    const result = nearbyData.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it ('should set "nearbyOffers" to array with an offer', () => {
    const mockNearbyOffer = makeFakeOffer();
    const expectedState = {
      nearbyOffers: [mockNearbyOffer]
    };

    const result = nearbyData.reducer(undefined, fetchNearbyOffersAction.fulfilled([mockNearbyOffer], '', undefined));
    expect(result).toEqual(expectedState);
  });
});
