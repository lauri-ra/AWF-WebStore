/**
 * Copy paste your code from the ListPlayers.jsx file here from the previous exercise
 */

import { ListPlayer } from './ListPlayer';

export const ListPlayers = ({ players, selectPlayer }) => {
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
