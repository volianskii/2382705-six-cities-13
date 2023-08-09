import {createAction} from '@reduxjs/toolkit';
import { OfferType } from '../mocks/offers';

export const changeCity = createAction<string>('CITIES/changeActiveCity');

export const getOffers = createAction<OfferType[]>('OFFERS/getOffers');
