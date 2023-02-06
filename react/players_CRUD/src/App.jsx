/**
 * Copy paste your code from the App.jsx file here from the previous exercise.
 *
 * Use similar logic as in the Vue CRUD exercise to create a new player in the
 * backend when the user submits the form in the AddPlayer component.
 *
 * Likewise, add logic to update the player in the backend when the user clicks
 * the update button in the SelectedPlayer component.
 *
 * Finally, add logic to delete the player in the backend when the user clicks
 * the delete button in the SelectedPlayer component.
 *
 * HINT: Before the above logic, it may be better to start by updating the SelectedPlayer component to use the new props.
 *
 * REMEMBER: use the same ids, classes and attributes as in the Vue exercise in
 * the same places to pass the tests. Remember to pass in the appropriate props
 * to the child components.
 *
 * BEWARE: The component props may be different from the Vue exercise and the
 * tests will not pass if you use the wrong props.
 *
 * @format
 */

import { ListPlayers } from './components/ListPlayers.jsx';
import { SelectedPlayer } from './components/SelectedPlayer.jsx';
import { RequestStatus } from './components/RequestStatus.jsx';
import { useEffect, useState } from 'react';
import { AddPlayer } from './components/AddPlayer.jsx';

const REQ_STATUS = {
	loading: 'Loading...',
	success: 'Finished!',
	error: 'An error has occurred!!!',
};

function App() {
	const [players, setPlayers] = useState([]);
	const [selectedPlayer, setSelectedPlayer] = useState(null);
	const [status, setStatus] = useState(null);

	const fetchData = async () => {
		try {
			const res = await fetch('http://localhost:3001/api/players', {
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
			});
			const data = await res.json();
			setPlayers(data);
			setStatus(REQ_STATUS.success);
		} catch (error) {
			setStatus(REQ_STATUS.error);
		}
	};

	useEffect(() => {
		setStatus(REQ_STATUS.loading);
		fetchData();
	}, []);

	const fetchPlayer = async (id) => {
		setStatus(REQ_STATUS.loading);
		try {
			const res = await fetch(`http://localhost:3001/api/players/${id}`, {
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
			});
			const player = await res.json();
			setSelectedPlayer(player);
			setStatus(REQ_STATUS.success);
		} catch (error) {
			setStatus(REQ_STATUS.error);
		}
	};

	const addPlayer = async (player) => {
		await fetch('http://localhost:3001/api/players', {
			method: 'post',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(player),
		});

		fetchData();
	};

	const removePlayer = async (id) => {
		await fetch(`http://localhost:3001/api/players/${id}`, {
			method: 'delete',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		});

		fetchData();
		setSelectedPlayer(null);
	};

	const updatePlayer = async (id, status) => {
		await fetch(`http://localhost:3001/api/players/${id}`, {
			method: 'put',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ status }),
		});
	};
	return (
		<>
			<RequestStatus status={status} />
			<AddPlayer handleSubmit={addPlayer} />
			<ListPlayers players={players} selectPlayer={fetchPlayer} />
			<SelectedPlayer
				player={selectedPlayer}
				removePlayer={removePlayer}
				updatePlayer={updatePlayer}
			/>
		</>
	);
}

export default App;
