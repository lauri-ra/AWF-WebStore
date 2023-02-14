/** @format 
 * 
 * Student instructions:
 * Copy paste the App.jsx file from the previous exercises into this file. In this exercise, you will be introducing redux, which is a state management library that allows you to manage the state of your application in a single store. The store is a single source of truth for the state of your application, and it is the only place where the state can be updated. 
 * 
 * The fetch functions will start using action creators from now on. Each action creator will be responsible for updating the redux store with the data from the request. You can find the template files for the action creators in the src/redux/actionCreators folder. It is your job to implement them, as well as the reducers that will be used to update the store. The reducers can be found in the src/redux/reducers folder.
 * 
  Hint: Use the provided REQ_STATUS object to update the request status when necessary. "loading" for when the request is in progress, "success" for when the request is successful, and "error" for when the request has failed. The REQ_STATUS object is imported from the src/redux/constants.js file.

*/

import { ListPlayers } from './components/ListPlayers.jsx';
import { SelectedPlayer } from './components/SelectedPlayer.jsx';
import { RequestStatus } from './components/RequestStatus.jsx';
import { useEffect } from 'react';
import { batch, useDispatch } from 'react-redux';

import { setPlayers } from './redux/actionCreators/playersActions.js';
import { setSelectedPlayer } from './redux/actionCreators/selectedPlayerActions.js';
import { setStatus } from './redux/actionCreators/statusActions.js';
import { REQ_STATUS } from './redux/constants.js';

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await fetch('http://localhost:3001/api/players', {
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
				});
				const data = await res.json();
				dispatch(setPlayers(data));
				dispatch(setStatus(REQ_STATUS.success));
			} catch (error) {
				dispatch(setStatus(REQ_STATUS.error));
			}
		};
		fetchData();
	}, []);

	const fetchPlayer = async (id) => {
		batch(async () => {
			dispatch(setStatus(REQ_STATUS.loading));
			try {
				const res = await fetch(`http://localhost:3001/api/players/${id}`, {
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
				});
				const player = await res.json();
				dispatch(setStatus(REQ_STATUS.success));
				dispatch(setSelectedPlayer(player));
			} catch (error) {
				dispatch(setStatus(REQ_STATUS.error));
			}
		});
	};

	return (
		<>
			<RequestStatus />
			<ListPlayers selectPlayer={fetchPlayer} />
			<SelectedPlayer />
		</>
	);
}

export default App;
