/** @format THUNK*/

/**
 * @description thunk for deleting the selected player.
 * Upon starting, Dispatches
 * - setStatus-action with REQ_STATUS[loading]-string as param
 * If Fetch is successful, Dispatches:
 * - setStatus-action with REQ_STATUS[success] string as param,
 * - removePlayer-action with selectedPlayer.id as param
 * - clearSelectedPlayer-action with no parameters
 *
 *  Else Fetch fails, Dispatches:
 * - setStatus-action with REQ_STATUS[error] string as param
 * @return {Function} - thunk with dispatch as param
 *
 * Hint: You have to get the required details of the selected player from the store.
 */

import { setStatus } from '../statusActions';
import { REQ_STATUS } from '../../constants';
import { removePlayer, updatePlayer } from '../playersActions';
import { clearSelectedPlayer } from '../selectedPlayerActions';

export const deleteSelectedPlayer = (id) => {
	return async (dispatch) => {
		try {
			dispatch(setStatus(REQ_STATUS.loading));
			await fetch(`http://localhost:3001/api/players/${id}`, {
				method: 'DELETE',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
			});

			const playerToRemove = {
				id: id,
			};

			dispatch(setStatus(REQ_STATUS.success));
			dispatch(removePlayer(playerToRemove));
			dispatch(clearSelectedPlayer());
		} catch (error) {
			dispatch(setStatus(REQ_STATUS.error));
		}
	};
};

/**
 * @description thunk for updating the selected player.
 * Upon starting, Dispatches
 * - setStatus-action with REQ_STATUS[loading]-string as param
 * If Fetch is successful, Dispatches:
 * - setStatus-action with REQ_STATUS[success] string as param,
 * - updatePlayer-action with updated player as param
 * - clearSelectedPlayer-action with no parameters
 * Else Fetch fails, Dispatches:
 * - setStatus-action with REQ_STATUS[error] string as param
 * @param {Boolean} updatedActivity - the new activity status of the player
 * @return {Function} - thunk with dispatch as param
 * @example
 * // returns a thunk that updates the selected player's activity status to false:
 * updateSelectedPlayer(false)
 * // returns a thunk that updates the selected player's activity status to true:
 * updateSelectedPlayer(true)
 *
 * Hint: You have to get required details of the selected player from the store.
 *
 */
export const updateSelectedPlayer = (player) => {
	return async (dispatch) => {
		try {
			dispatch(setStatus(REQ_STATUS.loading));

			const response = await fetch(`http://localhost:3001/api/players/${player.id}`, {
				method: 'PUT',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ isActive: !player.isActive }),
			});

			const updatedPlayer = await response.json();

			dispatch(setStatus(REQ_STATUS.success));
			dispatch(updatePlayer(updatedPlayer));
			dispatch(clearSelectedPlayer());
		} catch (error) {
			dispatch(setStatus(REQ_STATUS.error));
		}
	};
};
