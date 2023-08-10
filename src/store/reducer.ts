import {createReducer} from '@reduxjs/toolkit';
import {changeCity, loadFavorites, loadNearbyOffers, loadOffer, loadOfferComments, loadOffers, setOffersDataLoadingStatus} from './action';
import type {FullOfferType, OfferType} from '../types/offer';
import {Comment} from '../types/comment';

const initialState: {
  city: string;
  offers: OfferType[];
  offer: FullOfferType | null;
  nearbyOffers: OfferType[];
  offerComments: Comment[];
  favorites: OfferType[];
  isOffersDataLoading: boolean;
  authorizationStatus: string;
} = {
  city: 'Paris',
  offers: [],
  offer: null,
  nearbyOffers: [],
  offerComments: [],
  favorites: [],
  isOffersDataLoading: false,
  authorizationStatus: 'NOAUTH'
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(loadOffer, (state, action) => {
      state.offer = action.payload;
    })
    .addCase(loadNearbyOffers, (state, action) => {
      state.nearbyOffers = action.payload;
    })
    .addCase(loadOfferComments, (state, action) => {
      state.offerComments = action.payload;
    })
    .addCase(loadFavorites, (state, action) => {
      state.favorites = action.payload;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    });
});

export {reducer};
