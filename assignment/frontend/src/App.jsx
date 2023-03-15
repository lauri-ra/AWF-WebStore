/** @format */
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Notification from './components/Notification';
import Products from './components/Products';
import Product from './components/Product';
import LogOut from './components/LogOut';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import ProductModify from './components/ProductModify';
import Users from './components/Users';
import User from './components/User';
import UserModify from './components/UserModify';
import Orders from './components/Orders';
import Cart from './components/Cart';

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
				<Route path='/products/' element={<Products />} />
				<Route path='/products/:id' element={<Product />} />
				<Route path='products/:id/modify' element={<ProductModify />} />
				<Route path='/login' element={<LoginForm />} />
				<Route path='/logout' element={<LogOut />} />
				<Route path='/register' element={<RegisterForm />} />
				<Route path='/users' element={<Users />} />
				<Route path='users/:id' element={<User />} />
				<Route path='users/:id/modify' element={<UserModify />} />
				<Route path='/orders' element={<Orders />} />
				<Route path='/cart' element={<Cart />} />
			</Routes>
		</div>
	);
};

export default App;
