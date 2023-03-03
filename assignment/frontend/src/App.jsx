/** @format */
import { dataTestIds } from './tests/constants/components.js';

import Navbar from './components/navbar.jsx';

const App = () => {
	return (
		<div data-testid={dataTestIds.app}>
			<Navbar />
		</div>
	);
};

export default App;
