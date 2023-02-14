/** @format THUNK*/

/**
 * @description thunk for getting all players.
 * Whenever called, dispatches
 * - setStatus-action with REQ_STATUS[loading]-string as param
 * If Fetch is successful, Dispatches:
 * - setStatus-action with REQ_STATUS[success] string as param,
 * - setPlayers-action with response array as param
 * If Fetch fails, Dispatches:
 * - setStatus-action with REQ_STATUS[error] string as param
 * @return {Function} - thunk with dispatch as param
 */

import { REQ_STATUS } from '../../constants';
import { setPlayers } from '../playersActions';
import { setStatus } from '../statusActions';

export const getPlayers = () => {
	return async (dispatch) => {
		dispatch(setStatus(REQ_STATUS.loading));

		try {
			const res = await fetch('http://localhost:3001/api/players', {
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
			});
			const data = await res.json();
			dispatch(setStatus(REQ_STATUS.success));
			dispatch(setPlayers(data));
		} catch (error) {
			dispatch(setStatus(REQ_STATUS.error));
		}
	};
};
