import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import type { State, AppDispatch } from '../types/state';
import type { FullOfferType, OfferType } from '../types/offer';
import type { Comment, CommentData } from '../types/comment';
import { ApiRoute } from '../constants/api';
import { redirectToRoute } from './action';
import { AuthData, UserData } from '../types/authorization';
import { dropToken, saveToken } from '../services/token';

export const fetchOfferAction = createAsyncThunk<OfferType[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'OFFERS/fetchOffers',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<OfferType[]>(ApiRoute.Offers);

    return data;
  }
);

export const fetchFullOfferAction = createAsyncThunk<FullOfferType, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'OFFER/fetchFullOffer',
  async (offerId: string, {extra: api}) => {
    const {data} = await api.get<FullOfferType>(`${ApiRoute.Offers}/${offerId}`);

    return data;
  }
);

export const fetchNearbyOffersAction = createAsyncThunk<OfferType[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'NEARBYOFFERS/fetchNearbyOffers',
  async (offerId: string, {extra: api}) => {
    const {data} = await api.get<OfferType[]>(`${ApiRoute.Offers}/${offerId}/nearby`);

    return data;
  }
);

export const fetchOfferCommentsAction = createAsyncThunk<Comment[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'COMMENTS/fetchOfferComments',
  async (offerId: string, {extra: api}) => {
    const {data} = await api.get<Comment[]>(`${ApiRoute.Comments}/${offerId}`);

    return data;
  }
);

export const fetchFavoritesAction = createAsyncThunk<OfferType[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'FAVORITES/fetchFavorites',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<OfferType[]>(ApiRoute.Favorites);

    return data;
  }
);

export const addFavoritesAction = createAsyncThunk<FullOfferType, string | undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'FAVORITES/addFavorites',
  async (id: string, {extra: api}) => {
    const {data} = await api.post<FullOfferType>(`${ApiRoute.Favorites}/${id}/1`);

    return data;
  }
);

export const deleteFavoritesAction = createAsyncThunk<FullOfferType, string | undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'FAVORITES/deleteFavorites',
  async (id: string, {extra: api}) => {
    const {data} = await api.post<FullOfferType>(`${ApiRoute.Favorites}/${id}/0`);

    return data;
  }
);

export const checkAuthAction = createAsyncThunk<UserData, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'USER/checkAuth',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<UserData>(ApiRoute.Login);

    return data;
  }
);

export const loginAction = createAsyncThunk<UserData, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'USER/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data} = await api.post<UserData>(ApiRoute.Login, {email, password});
    saveToken(data.token);
    dispatch(redirectToRoute('/'));

    return data;
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'USER/logout',
  async (_arg, {extra: api}) => {
    await api.delete(ApiRoute.Logout);
    dropToken();
  },
);

export const addCommentAction = createAsyncThunk<Comment, {commentData: CommentData; offerId: string}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'COMMENTS/addCommentAction',
  async ({commentData, offerId}, {extra: api}) => {
    const {data} = await api.post<Comment>(`${ApiRoute.Comments}/${offerId}`, commentData);

    return data;
  }
);
