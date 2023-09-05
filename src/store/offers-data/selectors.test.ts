import { NameSpace } from '../../constants/store';
import { makeFakeOffer } from '../../utils/mocks';
import { getOffers, getLoadingStatus, getActiveCity, getErrorStatus, getActiveOfferId } from './selectors';

describe ('offersData selectors', () => {
  const state = {
    [NameSpace.Offers]: {
      offers: new Array(3).fill(null).map(() => makeFakeOffer()),
      isOffersDataLoading: false,
      city: 'Cologne',
      hasError: true,
      activeOfferId: null
    }
  };

  it ('should return offers from store', () => {
    const { offers } = state[NameSpace.Offers];
    const result = getOffers(state);
    expect(result).toEqual(offers);
  });

  it ('should return offersDataLoadin status from store', () => {
    const { isOffersDataLoading } = state[NameSpace.Offers];
    const result = getLoadingStatus(state);
    expect(result).toEqual(isOffersDataLoading);
  });

  it ('should return activeCity from store', () => {
    const { city } = state[NameSpace.Offers];
    const result = getActiveCity(state);
    expect(result).toEqual(city);
  });

  it ('should return error status from store', () => {
    const { hasError } = state[NameSpace.Offers];
    const result = getErrorStatus(state);
    expect(result).toEqual(hasError);
  });

  it ('should return activeOfferId from store', () => {
    const { activeOfferId } = state[NameSpace.Offers];
    const result = getActiveOfferId(state);
    expect(result).toEqual(activeOfferId);
  });
});
