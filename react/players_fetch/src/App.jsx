/** 
 * Student instructions:
 *
 * Use the provided components to create a React app that fetches players from
 * the provided API and displays them in a list when the App is first rendered.
 * When a player is clicked in the list, fetch that player and display it in the
 * selected player section. Give ListPlayer a function as its selectPlayer prop:
 * it is used to fetch a specific player and should take a player id as its only
 * argument.
 *
 * You can use the Vue exercise players_fetch as a reference and inspiration.
 *
 * REMEMBER: use the same ids, classes and attributes as in the Vue
 * exercise in the same places to pass the tests. Remember to pass in the
 * appropriate props to the child components.
 *
 * BEWARE: The component props may be different from the Vue exercise
 * and the tests will not pass if you use the wrong props.
 *
 * Hint: Use the provided REQ_STATUS object to update the request status when
 * necessary. "loading" for when the request is in progress, "success" for when
 * the request is successful, and "error" for when the request has failed.
 */

import { ListPlayers } from './components/ListPlayers.jsx';
import { SelectedPlayer } from './components/SelectedPlayer.jsx';
import { RequestStatus } from './components/RequestStatus.jsx';

const REQ_STATUS = {
	loading: 'Loading...',
	success: 'Finished!',
	error: 'An error has occurred!!!',
};

function App() {
	return (
		<>
			<RequestStatus />
			<ListPlayers />
			<SelectedPlayer />
		</>
	);
}

export default App;
