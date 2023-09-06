import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../services/api';
import { AppThunkDispatch, makeFakeComment, makeFakeCommentData, makeFakeFullOffer, makeFakeOffer } from '../utils/mocks';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { Action } from '@reduxjs/toolkit';
import { State } from '../types/state';
import { AuthData, AuthorizationStatus } from '../types/authorization';
import { addCommentAction, addFavoritesAction, checkAuthAction, deleteFavoritesAction, fetchFavoritesAction, fetchFullOfferAction, fetchNearbyOffersAction, fetchOfferAction, fetchOfferCommentsAction, loginAction, logoutAction } from './api-actions';
import { ApiRoute } from '../constants/api';
import { extractActionTypes } from '../utils/mocks';
import { redirectToRoute } from './action';
import * as tokenStorage from '../services/token';

describe('Async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({USER: {
      authorizationStatus: AuthorizationStatus.Unknown,
      user: null }});
  });

  describe('checkAuthAction', () => {
    it('should dispatch "checkAuthAction.pending" and "checkAuthAction.fulfilled" with thunk "checkAuthAction"', async () => {
      mockAxiosAdapter.onGet(ApiRoute.Login).reply(200);
      await store.dispatch(checkAuthAction());
      const actions = extractActionTypes(store.getActions());

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.fulfilled.type
      ]);
    });

    it('should dispatch "checkAuthAction.fulfilled" and "checkAuthAction.rejected" when serveer responses with 400', async () => {
      mockAxiosAdapter.onGet(ApiRoute.Login).reply(400);
      await store.dispatch(checkAuthAction());
      const actions = extractActionTypes(store.getActions());

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.rejected.type
      ]);
    });
  });

  describe('fetchOfferAction', () => {
    it('should dispatch "fetchOfferAction.pending" and "fetchOfferAction.fulfilled" when server responses with 200', async () => {
      const mockOffers = [makeFakeOffer(), makeFakeOffer()];
      mockAxiosAdapter.onGet(ApiRoute.Offers).reply(200, mockOffers);

      await store.dispatch(fetchOfferAction());
      const emittedActions = store.getActions();
      const extractedActionTypes = extractActionTypes(emittedActions);
      const fetchOfferActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchOfferAction.fulfilled>;

      expect(extractedActionTypes).toEqual([
        fetchOfferAction.pending.type,
        fetchOfferAction.fulfilled.type
      ]);

      expect(fetchOfferActionFulfilled.payload).toEqual(mockOffers);
    });

    it('should dispatch "fetchOfferAction.pending" and "fetchOfferAction.rejected" when server responses with 400', async () => {
      mockAxiosAdapter.onGet(ApiRoute.Offers).reply(400, []);
      await store.dispatch(fetchOfferAction());
      const actions = extractActionTypes(store.getActions());

      expect(actions).toEqual([
        fetchOfferAction.pending.type,
        fetchOfferAction.rejected.type
      ]);
    });
  });

  describe('loginAction', () => {
    it('should dispatch "loginAction.pending", "redirectToRoute" and "loginAction.fulfilled" when server responses with 200', async () => {
      const mockUser: AuthData = { login: 'test@test.ru', password: '123456' };
      const fakeServerReply = { token: 'secret' };
      mockAxiosAdapter.onPost(ApiRoute.Login).reply(200, fakeServerReply);

      await store.dispatch(loginAction(mockUser));
      const actions = extractActionTypes(store.getActions());

      expect(actions).toEqual([
        loginAction.pending.type,
        redirectToRoute.type,
        loginAction.fulfilled.type,
      ]);
    });

    it('should call "saveToken once with received token', async () => {
      const mockUser: AuthData = { login: 'test@test.ru', password: '123456' };
      const fakeServerReply = { token: 'secret' };
      mockAxiosAdapter.onPost(ApiRoute.Login).reply(200, fakeServerReply);

      const mockSaveToken = vi.spyOn(tokenStorage, 'saveToken');

      await store.dispatch(loginAction(mockUser));

      expect(mockSaveToken).toBeCalledTimes(1);
      expect(mockSaveToken).toBeCalledWith(fakeServerReply.token);
    });
  });

  describe('logoutAction', () => {
    it('should dispatch "logoutAction.pending" and "logoutAction.fulfilled" when server responses with 204', async () => {
      mockAxiosAdapter.onDelete(ApiRoute.Logout).reply(204);

      await store.dispatch(logoutAction());
      const actions = extractActionTypes(store.getActions());

      expect(actions).toEqual([
        logoutAction.pending.type,
        logoutAction.fulfilled.type,
      ]);
    });

    it('should call "dropToken" once', async () => {
      mockAxiosAdapter.onDelete(ApiRoute.Logout).reply(204);

      const mockDropToken = vi.spyOn(tokenStorage, 'dropToken');

      await store.dispatch(logoutAction());

      expect(mockDropToken).toBeCalledTimes(1);
    });
  });

  describe('fetchFullOfferAction', () => {
    it('should dispatch "fetchFullOfferAction.pending" and "fetchFullOfferAction.fulfilled" when server responses with 200', async () => {
      const mockFullOffer = makeFakeFullOffer();
      mockAxiosAdapter.onGet(`${ApiRoute.Offers}/testId`).reply(200, mockFullOffer);

      await store.dispatch(fetchFullOfferAction('testId'));
      const emittedActions = store.getActions();
      const extractedActionTypes = extractActionTypes(emittedActions);
      const fetchFullOfferActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchFullOfferAction.fulfilled>;

      expect(extractedActionTypes).toEqual([
        fetchFullOfferAction.pending.type,
        fetchFullOfferAction.fulfilled.type
      ]);

      expect(fetchFullOfferActionFulfilled.payload).toEqual(mockFullOffer);
    });

    it('should dispatch "fetchFullOfferAction.pending" and "fetchFullOfferAction.rejected" when server responses with 400', async () => {
      mockAxiosAdapter.onGet(`${ApiRoute.Offers}/testId`).reply(400, undefined);

      await store.dispatch(fetchFullOfferAction('testId'));
      const actions = extractActionTypes(store.getActions());

      expect(actions).toEqual([
        fetchFullOfferAction.pending.type,
        fetchFullOfferAction.rejected.type
      ]);
    });
  });

  describe('fetchNearbyOffersAction', () => {
    it('should dispatch "fetchNearbyOffersAction.pending" and "fetchNearbyOffersAction.fulfilled" when server responses with 200', async () => {
      const mockNearbyOffers = [makeFakeOffer(), makeFakeOffer()];
      mockAxiosAdapter.onGet(`${ApiRoute.Offers}/testId/nearby`).reply(200, mockNearbyOffers);

      await store.dispatch(fetchNearbyOffersAction('testId'));
      const emittedActions = store.getActions();
      const extractedActionTypes = extractActionTypes(emittedActions);
      const fetchNearbyOfferActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchNearbyOffersAction.fulfilled>;

      expect(extractedActionTypes).toEqual([
        fetchNearbyOffersAction.pending.type,
        fetchNearbyOffersAction.fulfilled.type
      ]);

      expect(fetchNearbyOfferActionFulfilled.payload).toEqual(mockNearbyOffers);
    });

    it('should dispatch "fetchNearbyOffersAction.pending" and "fetchNearbyOffersAction.rejected" when server responses with 400', async () => {
      mockAxiosAdapter.onGet(`${ApiRoute.Offers}/testId/nearby`).reply(400, []);
      await store.dispatch(fetchNearbyOffersAction('testId'));
      const actions = extractActionTypes(store.getActions());

      expect(actions).toEqual([
        fetchNearbyOffersAction.pending.type,
        fetchNearbyOffersAction.rejected.type
      ]);
    });
  });

  describe('fetchOfferCommentsAction', () => {
    it('should dispatch "fetchOfferCommentsAction.pending" and "fetchOfferCommentsAction.fulfilled" when server responses with 200', async () => {
      const mockOfferComments = [makeFakeComment(), makeFakeComment()];
      mockAxiosAdapter.onGet(`${ApiRoute.Comments}/testId`).reply(200, mockOfferComments);

      await store.dispatch(fetchOfferCommentsAction('testId'));
      const emittedActions = store.getActions();
      const extractedActionTypes = extractActionTypes(emittedActions);
      const fetchOfferCommentsActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchOfferCommentsAction.fulfilled>;
      fetchOfferCommentsActionFulfilled.payload[0].date = new Date (fetchOfferCommentsActionFulfilled.payload[0].date);
      fetchOfferCommentsActionFulfilled.payload[1].date = new Date (fetchOfferCommentsActionFulfilled.payload[1].date);

      expect(extractedActionTypes).toEqual([
        fetchOfferCommentsAction.pending.type,
        fetchOfferCommentsAction.fulfilled.type
      ]);

      expect(fetchOfferCommentsActionFulfilled.payload).toEqual(mockOfferComments);
    });

    it('should dispatch "fetchOfferCommentsAction.pending" and "fetchOfferCommentsAction.rejected" when server responses with 400', async () => {
      mockAxiosAdapter.onGet(`${ApiRoute.Comments}/testId`).reply(400, []);
      await store.dispatch(fetchOfferCommentsAction('testId'));
      const actions = extractActionTypes(store.getActions());

      expect(actions).toEqual([
        fetchOfferCommentsAction.pending.type,
        fetchOfferCommentsAction.rejected.type
      ]);
    });
  });

  describe('fetchFavoritesAction', () => {
    it('should dispatch "fetchFavoritesAction.pending" and "fetchFavoritesAction.fulfilled" when server responses with 200', async () => {
      const mockFavorites = [makeFakeOffer(), makeFakeOffer()];
      mockAxiosAdapter.onGet(ApiRoute.Favorites).reply(200, mockFavorites);

      await store.dispatch(fetchFavoritesAction());
      const emittedActions = store.getActions();
      const extractedActionTypes = extractActionTypes(emittedActions);
      const fetchFavoritesActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchFavoritesAction.fulfilled>;

      expect(extractedActionTypes).toEqual([
        fetchFavoritesAction.pending.type,
        fetchFavoritesAction.fulfilled.type
      ]);

      expect(fetchFavoritesActionFulfilled.payload).toEqual(mockFavorites);
    });

    it('should dispatch "fetchFavoritesAction.pending" and "fetchFavoritesAction.rejected" when server responses with 400', async () => {
      mockAxiosAdapter.onGet(ApiRoute.Favorites).reply(400, []);
      await store.dispatch(fetchFavoritesAction());
      const actions = extractActionTypes(store.getActions());

      expect(actions).toEqual([
        fetchFavoritesAction.pending.type,
        fetchFavoritesAction.rejected.type
      ]);
    });
  });

  describe('addFavoritesAction', () => {
    it('should dispatch "addFavoritesAction.pending", and "addFavoritesAction.fulfilled" when server responses with 200', async () => {
      const mockFavoriteOfferId = 'testOfferId';
      const fakeServerReply = makeFakeFullOffer();
      mockAxiosAdapter.onPost(`${ApiRoute.Favorites}/${mockFavoriteOfferId}/1`).reply(200, fakeServerReply);

      await store.dispatch(addFavoritesAction(mockFavoriteOfferId));
      const actions = extractActionTypes(store.getActions());

      expect(actions).toEqual([
        addFavoritesAction.pending.type,
        addFavoritesAction.fulfilled.type,
      ]);
    });

    it('should dispatch "addFavoritesAction.pending" and "addFavoritesAction.rejected" when server responses with 400', async () => {
      const mockFavoriteOfferId = 'testOfferId';
      mockAxiosAdapter.onPost(`${ApiRoute.Favorites}/${mockFavoriteOfferId}/1`).reply(400, undefined);

      await store.dispatch(addFavoritesAction(mockFavoriteOfferId));
      const actions = extractActionTypes(store.getActions());

      expect(actions).toEqual([
        addFavoritesAction.pending.type,
        addFavoritesAction.rejected.type
      ]);
    });
  });

  describe('deleteFavoritesAction', () => {
    it('should dispatch "deleteFavoritesAction.pending", and "deleteFavoritesAction.fulfilled" when server responses with 200', async () => {
      const mockFavoriteOfferId = 'testOfferId';
      const fakeServerReply = makeFakeFullOffer();
      mockAxiosAdapter.onPost(`${ApiRoute.Favorites}/${mockFavoriteOfferId}/0`).reply(200, fakeServerReply);

      await store.dispatch(deleteFavoritesAction(mockFavoriteOfferId));
      const actions = extractActionTypes(store.getActions());

      expect(actions).toEqual([
        deleteFavoritesAction.pending.type,
        deleteFavoritesAction.fulfilled.type,
      ]);
    });

    it('should dispatch "deleteFavoritesAction.pending" and "deleteFavoritesAction.rejected" when server responses with 400', async () => {
      const mockFavoriteOfferId = 'testOfferId';
      mockAxiosAdapter.onPost(`${ApiRoute.Favorites}/${mockFavoriteOfferId}/0`).reply(400, undefined);

      await store.dispatch(deleteFavoritesAction(mockFavoriteOfferId));
      const actions = extractActionTypes(store.getActions());

      expect(actions).toEqual([
        deleteFavoritesAction.pending.type,
        deleteFavoritesAction.rejected.type
      ]);
    });
  });

  describe('addCommentAction', () => {
    it('should dispatch "addCommentAction.pending", and "addCommentAction.fulfilled" when server responses with 201', async () => {
      const mockOfferId = 'testOfferId';
      const mockCommentData = makeFakeCommentData();
      const fakeServerReply = makeFakeComment();
      mockAxiosAdapter.onPost(`${ApiRoute.Comments}/${mockOfferId}`).reply(201, fakeServerReply);

      await store.dispatch(addCommentAction({ commentData: mockCommentData, offerId: mockOfferId }));
      const actions = extractActionTypes(store.getActions());

      expect(actions).toEqual([
        addCommentAction.pending.type,
        addCommentAction.fulfilled.type,
      ]);
    });

    it('should dispatch "addCommentAction.pending" and "addCommentAction.rejected" when server responses with 400', async () => {
      const mockOfferId = 'testOfferId';
      const mockCommentData = makeFakeCommentData();
      mockAxiosAdapter.onPost(`${ApiRoute.Comments}/${mockOfferId}`).reply(400, undefined);

      await store.dispatch(addCommentAction({ commentData: mockCommentData, offerId: mockOfferId }));
      const actions = extractActionTypes(store.getActions());

      expect(actions).toEqual([
        addCommentAction.pending.type,
        addCommentAction.rejected.type
      ]);
    });
  });
});


