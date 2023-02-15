/** @format NORMAL ACTION CREATORS
 * These are the action creators that are used in the thunks.
 */

import { ADD_PLAYER, REMOVE_PLAYER, SET_PLAYERS, UPDATE_PLAYER } from '../constants';

/**
 * @description normal action creator that returns an action with type SET_PLAYERS to the frontends reducers along with the payload that includes players.
 * @param {Array} players - The players ids and names in an array.
 * @return {Object} action
 */
export const setPlayers = (players) => {
	return {
		type: SET_PLAYERS,
		payload: players,
	};
};

/**
 * @description normal action creator that returns an action with type ADD_PLAYER to the frontends reducers along with the payload that includes player.
 * @param {Object} player - The player with id and name that is to be included in store.
 * @return {Object} action
 */
export const addPlayer = (player) => {
	return {
		type: ADD_PLAYER,
		payload: player,
	};
};

/**
 * @description normal action creator that returns an action with type REMOVE_PLAYER to the frontends reducers along with the payload of playerId.
 * @param {String} playerId - The players id.
 * @return {Object} action
 */
export const removePlayer = (playerId) => {
	return {
		type: REMOVE_PLAYER,
		payload: playerId,
	};
};

/**
 * @description normal action creator that returns an action with type UPDATE_PLAYER to the frontends reducers along with the payload of player.
 * @param {Object} player - The player with id and name that is to be updated in store.
 * @return {Object} action
 */
export const updatePlayer = (player) => {
	return {
		type: UPDATE_PLAYER,
		payload: player,
	};
};
