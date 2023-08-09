import {createReducer} from '@reduxjs/toolkit';
import {changeCity, getOffers} from './action';
import offers, { OfferType } from '../mocks/offers';

const initialState: {
  city: string;
  offers: OfferType[];
} = {
  city: 'Paris',
  offers: []
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(getOffers, (state) => {
      state.offers = offers;
    });
});

export {reducer};
