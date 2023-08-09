import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import type {State, AppDispatch} from '../types/state';
import type {FullOfferType, OfferType} from '../types/offer';
import type {Comment} from '../types/comment';
import {APIRoute} from '../constants/api';
import {loadOffers, loadOffer, setOffersDataLoadingStatus, loadNearbyOffers, loadOfferComments, loadFavorites} from './action';

export const fetchOfferAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setOffersDataLoadingStatus(true));
    const {data} = await api.get<OfferType[]>(APIRoute.Offers);
    dispatch(setOffersDataLoadingStatus(false));
    dispatch(loadOffers(data));
  },
);

export const fetchFullOfferAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchFullOffer',
  async (offerId: string, {dispatch, extra: api}) => {
    const {data} = await api.get<FullOfferType>(`${APIRoute.Offers}/${offerId}`);
    dispatch(loadOffer(data));
  },
);

export const fetchNearbyOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchNearbyOffers',
  async (offerId: string, {dispatch, extra: api}) => {
    const {data} = await api.get<OfferType[]>(`${APIRoute.Offers}/${offerId}/nearby`);
    dispatch(loadNearbyOffers(data));
  },
);

export const fetchOfferCommentsAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOfferComments',
  async (offerId: string, {dispatch, extra: api}) => {
    const {data} = await api.get<Comment[]>(`${APIRoute.Comments}/${offerId}`);
    dispatch(loadOfferComments(data));
  },
);

export const fetchFavoritesAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchFavorites',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<OfferType[]>(APIRoute.Favorites);
    dispatch(loadFavorites(data));
  },
);
