/**
 * Student instructions:
 * Use the given template with props to create AddPlayer component similar to
 * the AddPlayer component in the Vue exercise. Instead of using <template>,
 * use JSX.
 *
 * "handleSubmit" prop is a function that will be called when the form is
 * submitted.
 *
 * REMEMBER: use the same ids, classes and attributes as in the Vue exercise in
 * the same places to pass the tests.
 */

import { useState } from 'react';

export const AddPlayer = ({ handleSubmit }) => {
	const [playerName, setPlayerName] = useState('');

	const addPlayer = (event) => {
		event.preventDefault();

		const playerObj = {
			name: playerName,
			isActive: false,
		};

		handleSubmit(playerObj);
		setPlayerName('');
	};

	return (
		<div>
			<h3>Add Player</h3>
			<form id='submit-player' onSubmit={addPlayer}>
				<input
					id='input-player'
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
