/** @format
 * Copy paste your code from the ListPlayers.jsx file here from the previous exercise
 *
 * BEWARE: No props are passed to this component from now on. Instead, all the data is fetched and updated in the redux store.
 *
 * Here are the thunks that you can use to update the redux store:
 * - getPlayers, found in src\redux\actionCreators\thunks\ListPlayers.jsx
 */

import { ListPlayer } from './ListPlayer';
import { useSelector } from 'react-redux';

export const ListPlayers = () => {
	const players = useSelector((state) => state.players);

	return (
		<div>
			<h2>List of players</h2>
			<ul id='players-list'>
				{players &&
					players.map((player) => <ListPlayer key={player.id} name={player.name} id={player.id} />)}
			</ul>
		</div>
	);
};
