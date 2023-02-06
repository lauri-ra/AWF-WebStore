/**
 * Copy paste your code from the SelectedPlayer.jsx file here from the previous exercise.
 *
 * Use similar logic as in the Vue CRUD exercise to call the "handleUpdate"
 * prop function when the update button is clickable and the user clicks it.
 * In the App.jsx, this should trigger the updating of the player in the backend.
 *
 * Likewise, add logic to call the "handleDelete" prop function when the user
 * clicks the delete button. In the App.jsx, this should trigger the deletion of the player in
 * the backend.
 *
 * @format
 */

import React, { useState } from 'react';

export const SelectedPlayer = ({ player, removePlayer, updatePlayer }) => {
	const [isChecked, setIsChecked] = useState(false);

	const handleUpdate = (player) => {
		const status = !player.isActive;
		updatePlayer(player.id, status);
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
								{player.isActive ? 'Active' : 'Inactive'}
								<input
									id='checkbox'
									type='checkbox'
									checked={player.isActive}
									onChange={() => setIsChecked(!isChecked)}
								/>
								<span className='checkmark'></span>
							</label>
						</div>
						<button
							className='btn-update'
							disabled={!isChecked}
							onClick={() => handleUpdate(player)}
						>
							Update
						</button>
						<button className='btn-delete' onClick={() => removePlayer(player.id)}>
							Delete
						</button>
					</div>
				</div>
			) : null}
		</div>
	);
};
