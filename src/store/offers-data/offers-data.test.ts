import { makeFakeOffer } from '../../utils/mocks';
import { fetchOfferAction } from '../api-actions';
import { changeCity, offersData, setActiveOfferId } from './offers-data';
import { random } from 'faker';


describe ('offers-data slice', () => {
  const emptyAction = {type: ''};
  const mockOffer = makeFakeOffer();
  it ('should return initial state with empty action', () => {
    const expectedState = {
      offers: [],
      isOffersDataLoading: false,
      city: 'Paris',
      hasError: false,
      activeOfferId: null
    };

    const result = offersData.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it ('should return default initial state with empty action', () => {
    const expectedState = {
      offers: [],
      isOffersDataLoading: false,
      city: 'Paris',
      hasError: false,
      activeOfferId: null
    };

    const result = offersData.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });

  it ('should set city to a certain city name with "changeCity" action', () => {
    const expectedCity = 'Cologne';

    const result = offersData.reducer(undefined, changeCity(expectedCity));
    expect(result.city).toEqual(expectedCity);
  });

  it ('should set activeOfferId to a certain id with "setActiveOfferId" action', () => {
    const expectedActiveId = random.alpha();

    const result = offersData.reducer(undefined, setActiveOfferId(expectedActiveId));
    expect(result.activeOfferId).toEqual(expectedActiveId);
  });

  it ('should set isOffersDataLoading to "false", set offers to an array with an offer with "fetchOfferAction.fulfilled" action', () => {
    const expectedState = {
      offers: [mockOffer],
      isOffersDataLoading: false,
      city: 'Paris',
      hasError: false,
      activeOfferId: null
    };
    const state = {
      offers: [],
      isOffersDataLoading: true,
      city: 'Paris',
      hasError: false,
      activeOfferId: null
    };
    const result = offersData.reducer(state, fetchOfferAction.fulfilled([mockOffer]));
    expect(result).toEqual(expectedState);
  });

  it ('should set isOffersDataLoading to "true", set hasError to "false" with "fetchOfferAction.pending" action', () => {
    const expectedState = {
      offers: [],
      isOffersDataLoading: true,
      city: 'Paris',
      hasError: false,
      activeOfferId: null
    };
    const state = {
      offers: [],
      isOffersDataLoading: false,
      city: 'Paris',
      hasError: true,
      activeOfferId: null
    };
    const result = offersData.reducer(state, fetchOfferAction.pending);
    expect(result).toEqual(expectedState);
  });

  it ('should set isOffersDataLoading to "false", set hasError to "true" with "fetchOfferAction.rejected" action', () => {
    const expectedState = {
      offers: [],
      isOffersDataLoading: false,
      city: 'Paris',
      hasError: true,
      activeOfferId: null
    };
    const state = {
      offers: [],
      isOffersDataLoading: true,
      city: 'Paris',
      hasError: false,
      activeOfferId: null
    };
    const result = offersData.reducer(state, fetchOfferAction.rejected);
    expect(result).toEqual(expectedState);
  });
});
