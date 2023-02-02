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
import { AddPlayer } from './components/AddPlayer';
import { RequestStatus } from './components/RequestStatus';
import { SelectedPlayer } from './components/SelectedPlayer.jsx';

const REQ_STATUS = {
	loading: 'Loading...',
	success: 'Finished!',
	error: 'An error has occurred!!!',
};

function App() {
	return (
		<>
			<RequestStatus />
			<AddPlayer />
			<ListPlayers />
			<SelectedPlayer />
		</>
	);
}

export default App;
