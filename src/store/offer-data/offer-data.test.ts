import { makeFakeFullOffer } from '../../utils/mocks';
import { fetchFullOfferAction } from '../api-actions';
import { offerData, resetOfferFoundStatus } from './offer-data';

describe ('offer-data slice', () => {
  const emptyAction = {type: ''};
  const mockFullOffer = makeFakeFullOffer();
  it ('should return initial state with empty action', () => {
    const expectedState = {
      offer: null,
      noSuchOfferFound: 'unknown'
    };

    const result = offerData.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it ('should return default initial state with empty action', () => {
    const expectedState = {
      offer: null,
      noSuchOfferFound: 'unknown'
    };

    const result = offerData.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it ('should set offerFoundStatus to "unknown" with "resetOfferFoundStatus" action', () => {
    const expectedStatus = 'unknown';
    const state = {
      offer: null,
      noSuchOfferFound: 'false'
    };

    const result = offerData.reducer(state, resetOfferFoundStatus);
    expect(result.noSuchOfferFound).toEqual(expectedStatus);
  });

  it ('should set offer to an object with fullOffer data, set "noSuchOfferFound" to "false" with "fetchFullOfferAction.fulfilled" action', () => {
    const expectedState = {
      offer: mockFullOffer,
      noSuchOfferFound: 'false'
    };

    const result = offerData.reducer(undefined, fetchFullOfferAction.fulfilled(mockFullOffer, '', undefined));
    expect(result).toEqual(expectedState);
  });

  it ('should set "noSuchOfferFound" to "unknown" with "fetchFullOfferAction.pending" action', () => {
    const expectedStatus = 'unknown';
    const state = {
      offer: null,
      noSuchOfferFound: 'false'
    };

    const result = offerData.reducer(state, fetchFullOfferAction.pending);
    expect(result.noSuchOfferFound).toEqual(expectedStatus);
  });

  it ('should set "noSuchOfferFound" to "true" with "fetchFullOfferAction.rejected" action', () => {
    const expectedStatus = 'true';
    const state = {
      offer: null,
      noSuchOfferFound: 'unknown'
    };

    const result = offerData.reducer(state, fetchFullOfferAction.rejected);
    expect(result.noSuchOfferFound).toEqual(expectedStatus);
  });
});
