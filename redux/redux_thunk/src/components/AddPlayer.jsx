/** @format
 *
 * Student instructions:
 * Copy contents for this file from the react_redux exercise
 *
 * BEWARE: No props are passed to this component from now on. Instead, all the data is fetched and updated in the redux store.
 *
 * Here are the thunks that you can use to update the redux store:
 * - postPlayer, found in src\redux\actionCreators\thunks\AddPlayer.jsx
 */

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postPlayer } from '../redux/actionCreators/thunks/AddPlayer';

export const AddPlayer = () => {
	const [playerName, setPlayerName] = useState('');

	const dispatch = useDispatch();

	const addPlayer = (event) => {
		event.preventDefault();

		const playerObj = {
			name: playerName,
			isActive: false,
		};

		dispatch(postPlayer(playerObj));
		setPlayerName('');
	};

	return (
		<div>
			<h3>Add Player</h3>
			<form id='submit-player' onSubmit={addPlayer}>
				<input
					id='input-player'
					name='name'
					type='text'
					placeholder='Enter player name'
					value={playerName}
					onChange={({ target }) => setPlayerName(target.value)}
				/>
				<button className='btn-add' type='submit'>
					Add player
				</button>
			</form>
		</div>
	);
};
