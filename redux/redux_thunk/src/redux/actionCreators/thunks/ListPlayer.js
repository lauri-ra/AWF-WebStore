/** @format THUNK*/

/**
 * @description thunk for getting the selected player.
 * Upon starting, Dispatches
 * - setStatus-action with REQ_STATUS[loading]-string as param
 * If Fetch is successful, Dispatches:
 * - setStatus-action with REQ_STATUS[success] string as param,
 * - setSelectedPlayer-action with player-object as param
 *  Else Fetch fails, Dispatches:
 * - setStatus-action with REQ_STATUS[error] string as param
 * @param {Number | String} id - id of the player
 * @return {Function} - thunk
 */

import { setStatus } from '../statusActions';
import { setSelectedPlayer } from '../selectedPlayerActions';
import { REQ_STATUS } from '../../constants';

export const getSelectedPlayer = (id) => {
	return async (dispatch) => {
		try {
			dispatch(setStatus(REQ_STATUS.loading));
			const res = await fetch(`http://localhost:3001/api/players/${id}`, {
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
			});
			const player = await res.json();
			dispatch(setStatus(REQ_STATUS.success));
			dispatch(setSelectedPlayer(player));
		} catch (error) {
			dispatch(setStatus(REQ_STATUS.error));
		}
	};
};
