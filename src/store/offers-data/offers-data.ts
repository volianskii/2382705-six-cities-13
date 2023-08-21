import { NameSpace } from '../../constants/store';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchOfferAction } from '../api-actions';
import { OfferType } from '../../types/offer';

const initialState: {
  offers: OfferType[];
  isOffersDataLoading: boolean;
  city: string;
  hasError: boolean;
} = {
  offers: [],
  isOffersDataLoading: false,
  city: 'Paris',
  hasError: false
};

export const offersData = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {
    changeCity(state, action: PayloadAction<string>) {
      state.city = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOfferAction.pending, (state) => {
        state.isOffersDataLoading = true;
        state.hasError = false;
      })
      .addCase(fetchOfferAction.fulfilled, (state, action) => {
        state.isOffersDataLoading = false;
        state.offers = action.payload;
      })
      .addCase(fetchOfferAction.rejected, (state) => {
        state.isOffersDataLoading = false;
        state.hasError = true;
      });
  }
});

export const { changeCity } = offersData.actions;
