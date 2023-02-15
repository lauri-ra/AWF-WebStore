/** @format 
 * 
 *
  Copy paste your code from the SelectedPlayer.jsx file here from the previous exercise.

	BEWARE: No props are passed to this component from now on. Instead, all the data is fetched and updated in the redux store.

	Here are the thunks that you can use to update the redux store:
	- deleteSelectedPlayer, found in src\redux\actionCreators\thunks\SelectedPlayer.jsx
	- updateSelectedPlayer, found in src\redux\actionCreators\thunks\SelectedPlayer.jsx

*/

import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import {
	deleteSelectedPlayer,
	updateSelectedPlayer,
} from '../redux/actionCreators/thunks/SelectedPlayer';

export const SelectedPlayer = () => {
	const [isChecked, setIsChecked] = useState(false);
	const [enableUpdate, setEnableUpdate] = useState(false);

	const dispatch = useDispatch();
	const player = useSelector((state) => state.selectedPlayer);

	useEffect(() => {
		setIsChecked(player.isActive);
	}, [player]);

	const handleCheckboxChange = () => {
		setIsChecked(!isChecked);
		setEnableUpdate(!enableUpdate);
	};

	return (
		<div>
			{player ? (
				<div>
					<h3>Selected Player</h3>
					<div id='selected-player'>
						<div className='player-id'>{player.id}</div>
						<div id='player-name'>{player.name}</div>
						<div id='player-status'>
							<label id='checkbox-label'>
								{isChecked ? 'active' : 'inactive'}
								<input
									id='checkbox'
									type='checkbox'
									checked={isChecked}
									onChange={() => handleCheckboxChange()}
								/>
								<span className='checkmark'></span>
							</label>
						</div>
						<button
							className='btn-update'
							disabled={enableUpdate === false}
							onClick={() => dispatch(updateSelectedPlayer(player))}
						>
							Update
						</button>
						<button
							className='btn-delete'
							onClick={() => dispatch(deleteSelectedPlayer(player.id))}
						>
							Delete
						</button>
					</div>
				</div>
			) : null}
		</div>
	);
};
