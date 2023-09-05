import { NameSpace } from '../../constants/store';
import { makeFakeOffer } from '../../utils/mocks';
import { getNearbyOffers } from './selectors';

describe ('nearbyData selectors', () => {
  const state = {
    [NameSpace.NearbyOffers]: {
      nearbyOffers: new Array(3).fill(null).map(() => makeFakeOffer()),
    }
  };

  it ('should return nearbyOffers from store', () => {
    const { nearbyOffers } = state[NameSpace.NearbyOffers];
    const result = getNearbyOffers(state);
    expect(result).toEqual(nearbyOffers);
  });
});
