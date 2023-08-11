import {createAction} from '@reduxjs/toolkit';
import type {FullOfferType, OfferType} from '../types/offer';
import type {Comment} from '../types/comment';
import {AuthorizationStatus} from '../types/authorization';


export const changeCity = createAction<string>('CITIES/changeActiveCity');

export const loadOffers = createAction<OfferType[]>('data/loadOffers');

export const loadOffer = createAction<FullOfferType>('data/loadOffer');

export const loadNearbyOffers = createAction<OfferType[]>('data/loadNearbyOffers');

export const loadOfferComments = createAction<Comment[]>('data/loadOfferComments');

export const loadFavorites = createAction<OfferType[]>('data/loadFavorites');

export const setOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');

export const setAuthorizationStatus = createAction<AuthorizationStatus>('data/setAuthorizationStatus');

export const redirectToRoute = createAction<string>('app/redirectToRoute');

