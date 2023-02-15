/** @format THUNK*/

/**
 * @description thunk for posting a new player.
 * Upon starting, Dispatches
 * - setStatus-action with REQ_STATUS[loading]-string as param
 * If Fetch is successful, Dispatches:
 * - setStatus-action with REQ_STATUS[success] string as param,
 * - addPlayer-action with returned player-object
 * - clearSelectedPlayer-action with no parameters
 *
 *  Else Fetch fails, Dispatches:
 * - setStatus-action with REQ_STATUS[error] string as param
 * @param {Object} newPlayer -  The player to be added
 * @return {Function} - thunk with dispatch as param
 */

import { setStatus } from '../statusActions';
import { REQ_STATUS } from '../../constants';
import { addPlayer } from '../playersActions';
import { clearSelectedPlayer } from '../selectedPlayerActions';

export const postPlayer = (newPlayer) => {
	return async (dispatch) => {
		try {
			await dispatch(setStatus(REQ_STATUS.loading));
			const response = await fetch('http://localhost:3001/api/players', {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(newPlayer),
			});

			const addedPlayer = await response.json();
			dispatch(setStatus(REQ_STATUS.success));
			dispatch(addPlayer(addedPlayer));
			dispatch(clearSelectedPlayer());
		} catch (error) {
			dispatch(setStatus(REQ_STATUS.error));
		}
	};
};
