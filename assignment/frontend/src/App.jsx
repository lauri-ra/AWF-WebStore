/** @format */
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/navbar';
import Notification from './components/notification';
import Products from './components/products';

import { initApp } from './redux/actionCreators/appActions';

import { dataTestIds } from './tests/constants/components.js';

const App = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(initApp());
	}, []);

	return (
		<div data-testid={dataTestIds.app}>
			<h1 className='flex justify-center text-5xl'>Store</h1>
			<Navbar />
			<Notification />

			<Routes>
				<Route path='/' element={<div>home</div>} />
				<Route path='/products/' element={<Products />}></Route>
			</Routes>
		</div>
	);
};

export default App;
