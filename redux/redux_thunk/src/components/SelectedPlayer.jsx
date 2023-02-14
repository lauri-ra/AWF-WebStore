/** @format 
 * 
 *
  Copy paste your code from the SelectedPlayer.jsx file here from the previous exercise.

	BEWARE: No props are passed to this component from now on. Instead, all the data is fetched and updated in the redux store.

	Here are the thunks that you can use to update the redux store:
	- deleteSelectedPlayer, found in src\redux\actionCreators\thunks\SelectedPlayer.jsx
	- updateSelectedPlayer, found in src\redux\actionCreators\thunks\SelectedPlayer.jsx

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
