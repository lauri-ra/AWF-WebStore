/** @format
 * @description
 * Student instructions:
 * Copy contents for this file from the react_fetch exercise of the react week.
 *
 * BEWARE: No props are passed to this component from now on. Instead, the selectedPlayer is fetched from the redux store.

 */

import { useSelector } from 'react-redux';

export const SelectedPlayer = () => {
	const player = useSelector((state) => state.selectedPlayer);

	return (
		<div>
			{player ? (
				<div>
					<h3>Selected Player</h3>
					<div id='selected-player'>
						<div id='player-name'>{player.name}</div>
						<div id='player-status'>{player.isActive ? 'active' : 'inactive'}</div>
					</div>
				</div>
			) : null}
		</div>
	);
};
