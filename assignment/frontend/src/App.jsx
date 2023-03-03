/** @format */
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Navbar from './components/navbar.jsx';

import { initApp } from './redux/actionCreators/appActions';

import { dataTestIds } from './tests/constants/components.js';

const App = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(initApp());
	}, []);

	return (
		<div data-testid={dataTestIds.app}>
			<Navbar />
		</div>
	);
};

export default App;
