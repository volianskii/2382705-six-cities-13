import { NameSpace } from '../../constants/store';
import { makeFakeFullOffer } from '../../utils/mocks';
import { getOffer, getOfferFoundStatus } from './selectors';

describe ('offerData selectors', () => {
  const state = {
    [NameSpace.Offer]: {
      offer: makeFakeFullOffer(),
      noSuchOfferFound: 'unknown'
    }
  };

  it ('should return offer data from store', () => {
    const { offer } = state[NameSpace.Offer];
    const result = getOffer(state);
    expect(result).toEqual(offer);
  });

  it ('should return noSuchOfferFound status from store', () => {
    const { noSuchOfferFound } = state[NameSpace.Offer];
    const result = getOfferFoundStatus(state);
    expect(result).toEqual(noSuchOfferFound);
  });
});
