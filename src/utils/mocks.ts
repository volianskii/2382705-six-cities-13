import { FullOfferType, OfferType } from '../types/offer';
import { Comment, CommentData } from '../types/comment';

import { random, datatype, date, address, system, internet } from 'faker';
import { AuthorizationStatus, UserData } from '../types/authorization';
import { createAPI } from '../services/api';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { State } from '../types/state';
import { City } from '../constants/city';

export type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createAPI>, Action>;
export const extractActionTypes = (actions: Action<string>[]) => actions.map(({ type }) => type);

export const makeFakeOffer = (city?: string): OfferType => ({
  id: random.alpha(),
  title: random.alpha(),
  type: random.alpha(),
  price: datatype.number(),
  city: {
    name: city ?? address.cityName(),
    location: {
      latitude: Number(address.latitude()),
      longitude: Number(address.longitude()),
      zoom: datatype.number() ,
    },
  },
  location: {
    latitude: Number(address.latitude()),
    longitude: Number(address.longitude()),
    zoom: datatype.number(),
  },
  isFavorite: datatype.boolean(),
  isPremium: datatype.boolean(),
  rating: datatype.number(),
  previewImage: random.alpha(),
});

export const makeFakeComment = (userDate?: string): Comment => ({
  id: random.alpha(),
  date: userDate ?? date.past(),
  user: {
    name: random.alpha(),
    avatarUrl: system.filePath(),
    isPro: datatype.boolean(),
  },
  comment: random.alpha(),
  rating: datatype.number({
    'min': 0,
    'max': 5
  }),
});

export const makeFakeFullOffer = (): FullOfferType => ({
  id: random.alpha(),
  title: random.alpha(),
  type: random.alpha(),
  price: datatype.number(),
  city: {
    name: address.cityName(),
    location: {
      latitude: Number(address.latitude()),
      longitude: Number(address.longitude()),
      zoom: datatype.number() ,
    },
  },
  location: {
    latitude: Number(address.latitude()),
    longitude: Number(address.longitude()),
    zoom: datatype.number(),
  },
  isFavorite: datatype.boolean(),
  isPremium: datatype.boolean(),
  rating: datatype.number(),
  description: random.alpha(),
  bedrooms: datatype.number(),
  goods: new Array(3).fill(null).map(() => random.alpha()),
  host: {
    name: random.alpha(),
    avatarUrl: system.filePath(),
    isPro: datatype.boolean(),
  },
  images: new Array(3).fill(null).map(() => system.filePath()),
  maxAdults: datatype.number(),
});

export const makeFakeUser = (email?: string): UserData => ({
  name: internet.userName(),
  avatarUrl: system.filePath(),
  isPro: datatype.boolean(),
  email: email ?? internet.email(),
  token:random.alpha()
});

export const makeFakeCommentData = (): CommentData => ({
  comment: random.alpha(),
  rating: datatype.number({
    'min': 0,
    'max': 5
  })
});

export const makeFakeCity = (city?: string): City => ({
  name: city ?? address.cityName(),
  lat: Number(address.latitude()),
  lng: Number(address.longitude()),
  zoom: datatype.number() ,
});

export const makeFakeStore = (initialState?: Partial<State>): State => ({
  OFFER: {
    offer: null,
    noSuchOfferFound: 'unknown'
  },
  OFFERS: {
    offers: [],
    isOffersDataLoading: false,
    city: 'Paris',
    hasError: false,
    activeOfferId: null
  },
  USER: {
    authorizationStatus: AuthorizationStatus.Unknown,
    user: null,
  },
  NEARBYOFFERS: {
    nearbyOffers: []
  },
  FAVORITES: {
    favorites: []
  },
  COMMENTS: {
    offerComments: [],
    isFormDisabled: false,
    commentsError: false,
    isResponse: false
  },
  ...initialState ?? {}
});

