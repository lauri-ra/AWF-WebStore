/**
 * Copy paste your code from the App.jsx file here from the previous exercise.
 *
 * Use similar logic as in the Vue CRUD2 exercise and add authentication to
 * the app.
 *
 * Backend is still using Basic Auth, so you must use the same logic as in the
 * Vue exercise and include the Authorization header to requests to backend.
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

import { AuthUser } from './components/AuthUser.jsx';
import { RequestStatus } from './components/RequestStatus.jsx';

const REQ_STATUS = {
	loading: 'Loading...',
	success: 'Finished!',
	error: 'An error has occurred!!!',
};

function App() {
	return (
		<>
			<AuthUser></AuthUser>
			<RequestStatus></RequestStatus>
		</>
	);
}

export default App;
