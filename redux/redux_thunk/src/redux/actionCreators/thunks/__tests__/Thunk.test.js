/** @format */

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { players } from '../../../../mocks/players';
import { rest, server } from '../../../../mocks/server';
import { REQ_STATUS } from '../../../constants';
import {
	addPlayer,
	removePlayer,
	setPlayers,
	updatePlayer,
} from '../../playersActions';
import {
	clearSelectedPlayer,
	setSelectedPlayer,
} from '../../selectedPlayerActions';
import { setStatus } from '../../statusActions';
import { postPlayer } from '../AddPlayer';
import { getSelectedPlayer } from '../ListPlayer.js';
import { getPlayers } from '../ListPlayers.js';
import {
	deleteSelectedPlayer,
	updateSelectedPlayer,
} from '../SelectedPlayer.js';

let store;
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
beforeEach(() => {
	store = mockStore({});
});

describe('Testing thunk action creators', () => {
	describe('postPlayer:', () => {
		it('should dispatch setStatus(REQ_STATUS.loading), setStatus(REQ_STATUS.success), addPlayer(expectedResponse) and clearSelectedPlayer() action on successful requests', async () => {
			const expectedBody = {
				name: 'New Player',
				isActive: false,
			};
			const expectedResponse = {
				id: players.length + 1,
				name: 'New Player',
				isActive: false,
			};
			const expectedActions = [
				setStatus(REQ_STATUS.loading),
				setStatus(REQ_STATUS.success),
				addPlayer(expectedResponse),
				clearSelectedPlayer(),
			];
			await store.dispatch(postPlayer(expectedBody));
			const actualActions = store.getActions();
			expect(actualActions).toEqual(expectedActions);
		});
		it('should dispatch setStatus(REQ_STATUS.loading), setStatus(REQ_STATUS.error) action on unsuccessful requests', async () => {
			server.use(
				rest.post('**/api/players', (req, res, ctx) => {
					res(ctx.networkError('Network error'));
				})
			);
			const expectedBody = {
				name: 'New Player',
				isActive: false,
			};
			const expectedActions = [
				setStatus(REQ_STATUS.loading),
				setStatus(REQ_STATUS.error),
			];
			await store.dispatch(postPlayer(expectedBody));
			const actualActions = store.getActions();
			expect(actualActions).toEqual(expectedActions);
		});
	});
	describe('getPlayers:', () => {
		it('should dispatch setStatus(REQ_STATUS.loading), setStatus(REQ_STATUS.success), setPlayers(expectedResponse) action on successful requests', async () => {
			const expectedResponse = players.map((player) => ({
				id: player.id,
				name: player.name,
			}));
			const expectedActions = [
				setStatus(REQ_STATUS.loading),
				setStatus(REQ_STATUS.success),
				setPlayers(expectedResponse),
			];
			await store.dispatch(getPlayers());
			const actualActions = store.getActions();
			expect(actualActions).toEqual(expectedActions);
		});
		it('should dispatch setStatus(REQ_STATUS.loading), setStatus(REQ_STATUS.success) action on unsuccessful requests', async () => {
			server.use(
				rest.get('**/api/players', (req, res, ctx) => {
					res(ctx.networkError('Network error'));
				})
			);

			const expectedActions = [
				setStatus(REQ_STATUS.loading),
				setStatus(REQ_STATUS.error),
			];
			await store.dispatch(getPlayers());
			const actualActions = store.getActions();
			expect(actualActions).toEqual(expectedActions);
		});
	});
	describe('getSelectedPlayer:', () => {
		it('should dispatch setStatus(REQ_STATUS.loading), setStatus(REQ_STATUS.success), setSelectedPlayer(expectedResponse) action on successful requests', async () => {
			const expectedResponse = players[0];
			const expectedActions = [
				setStatus(REQ_STATUS.loading),
				setStatus(REQ_STATUS.success),
				setSelectedPlayer(expectedResponse),
			];
			await store.dispatch(getSelectedPlayer(expectedResponse.id));
			const actualActions = store.getActions();
			expect(actualActions).toEqual(expectedActions);
		});
		it('should dispatch setStatus(REQ_STATUS.loading), setStatus(REQ_STATUS.error) action on unsuccessful requests', async () => {
			const player = players[0];
			server.use(
				rest.get('**/api/players/:playerId', (req, res, ctx) => {
					res(ctx.networkError('Network error'));
				})
			);

			const expectedActions = [
				setStatus(REQ_STATUS.loading),
				setStatus(REQ_STATUS.error),
			];
			await store.dispatch(getSelectedPlayer(player.id));
			const actualActions = store.getActions();
			expect(actualActions).toEqual(expectedActions);
		});
	});
	describe('deleteSelectedPlayer:', () => {
		it('should dispatch setStatus(REQ_STATUS.loading), setStatus(REQ_STATUS.success), removePlayer(selectedPlayer.id), clearSelectedPlayer() action on successful requests', async () => {
			const selectedPlayer = players[0];
			const storeWithPlayer = mockStore({ selectedPlayer });
			const expectedActions = [
				setStatus(REQ_STATUS.loading),
				setStatus(REQ_STATUS.success),
				removePlayer(selectedPlayer.id),
				clearSelectedPlayer(),
			];
			await storeWithPlayer.dispatch(deleteSelectedPlayer());
			const actualActions = storeWithPlayer.getActions();
			expect(actualActions).toEqual(expectedActions);
		});
		it('should dispatch setStatus(REQ_STATUS.loading), setStatus(REQ_STATUS.error) action on unsuccessful requests', async () => {
			const selectedPlayer = players[0];
			const storeWithPlayer = mockStore({ selectedPlayer });
			server.use(
				rest.delete('**/api/players/:playerId', (req, res, ctx) => {
					res(ctx.networkError('Network error'));
				})
			);

			const expectedActions = [
				setStatus(REQ_STATUS.loading),
				setStatus(REQ_STATUS.error),
			];
			await storeWithPlayer.dispatch(deleteSelectedPlayer());
			const actualActions = storeWithPlayer.getActions();
			expect(actualActions).toEqual(expectedActions);
		});
	});
	describe('updateSelectedPlayer:', () => {
		it('should dispatch setStatus(REQ_STATUS.loading), setStatus(REQ_STATUS.success), updatePlayer(expectedResponse), clearSelectedPlayer() action on successful requests', async () => {
			const selectedPlayer = players[0];
			const storeWithPlayer = mockStore({ selectedPlayer });
			const expectedBody = !selectedPlayer.isActive;
			const expectedResponse = {
				id: selectedPlayer.id,
				name: selectedPlayer.name,
				isActive: !selectedPlayer.isActive,
			};
			const expectedActions = [
				setStatus(REQ_STATUS.loading),
				setStatus(REQ_STATUS.success),
				updatePlayer(expectedResponse),
				clearSelectedPlayer(),
			];
			await storeWithPlayer.dispatch(updateSelectedPlayer(expectedBody));
			const actualActions = storeWithPlayer.getActions();
			expect(actualActions).toEqual(expectedActions);
		});
		it('should dispatch setStatus(REQ_STATUS.loading), setStatus(REQ_STATUS.error) action on unsuccessful requests', async () => {
			const selectedPlayer = players[0];
			const storeWithPlayer = mockStore({ selectedPlayer });
			const expectedBody = !selectedPlayer.isActive;
			server.use(
				rest.put('**/api/players/:playerId', (req, res, ctx) => {
					res(ctx.networkError('Network error'));
				})
			);

			const expectedActions = [
				setStatus(REQ_STATUS.loading),
				setStatus(REQ_STATUS.error),
			];
			await storeWithPlayer.dispatch(
				updateSelectedPlayer(expectedBody.isActive)
			);
			const actualActions = storeWithPlayer.getActions();
			expect(actualActions).toEqual(expectedActions);
		});
	});
});
