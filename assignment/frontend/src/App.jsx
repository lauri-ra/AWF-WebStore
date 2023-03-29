/** @format */
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar.jsx';
import Notification from './components/Notification.jsx';
import Products from './components/Products.jsx';
import Product from './components/Product.jsx';
import LogOut from './components/LogOut.jsx';
import LoginPage from './components/LoginPage.jsx';
import Register from './components/Register.jsx';
import ProductModify from './components/ProductModify.jsx';
import Users from './components/Users.jsx';
import User from './components/User.jsx';
import UserModify from './components/UserModify.jsx';
import Orders from './components/Orders.jsx';
import OrderView from './components/OrderView.jsx';
import Cart from './components/Cart.jsx';

import { initApp } from './redux/actionCreators/appActions.js';

import { dataTestIds } from './tests/constants/components.js';

const App = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(initApp());
	}, []);

	return (
		<div data-testid={dataTestIds.containerId.app}>
			<h1 className='flex justify-center text-5xl'>Store</h1>
			<Navbar />
			<Notification />

			<Routes>
				<Route path='/' element={<div data-testid={dataTestIds.containerId.main}>home</div>} />
				<Route path='/products/' element={<Products />} />
				<Route path='/products/:id' element={<Product />} />
				<Route path='products/:id/modify' element={<ProductModify />} />
				<Route path='/login' element={<LoginPage />} />
				<Route path='/logout' element={<LogOut />} />
				<Route path='/register' element={<Register />} />
				<Route path='/users' element={<Users />} />
				<Route path='users/:id' element={<User />} />
				<Route path='users/:id/modify' element={<UserModify />} />
				<Route path='/orders' element={<Orders />} />
				<Route path='/orders/:id' element={<OrderView />} />
				<Route path='/cart' element={<Cart />} />
			</Routes>
		</div>
	);
};

export default App;
