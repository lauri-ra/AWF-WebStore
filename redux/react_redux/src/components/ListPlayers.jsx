/** @format
 * @description
 * Student instructions:
 *
 * Copy paste your code from the ListPlayers.jsx file here from the react player fetch exercise
 * BEWARE: Only the selectPlayer function is passed as a prop from now on. The players data is fetched from the redux store.
 *
 */
import { ListPlayer } from './ListPlayer';
import { useSelector } from 'react-redux';

export const ListPlayers = ({ selectPlayer }) => {
	const players = useSelector((state) => state.players);

	return (
		<div>
			<h2>List of players</h2>
			<ul id='players-list'>
				{players &&
					players.map((player) => (
						<ListPlayer key={player.id} name={player.name} id={player.id} onClick={selectPlayer} />
					))}
			</ul>
		</div>
	);
};
