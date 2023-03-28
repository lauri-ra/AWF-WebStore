import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { dataTestIds } from '../tests/constants/components';

const UserNav = () => {
	return (
		<>
			<Link data-testid={dataTestIds.linkId.cart} className='ml-4' to={'/cart'}>
				Cart
			</Link>
			<Link data-testid={dataTestIds.linkId.login} className='ml-4' to={'/login'}>
				Login
			</Link>
			<Link data-testid={dataTestIds.linkId.register} className='ml-4' to={'/register'}>
				Register
			</Link>
		</>
	);
};

const CustomerNav = () => {
	const location = useLocation();
	return (
		<>
			<Link data-testid={dataTestIds.linkId.orders} className='ml-4' to={'/orders'}>
				Orders
			</Link>
			<Link data-testid={dataTestIds.linkId.cart} className='ml-4' to={'/cart'}>
				Cart
			</Link>
			<Link
				data-testid={dataTestIds.clickId.logout}
				className='ml-4'
				to={'/logout'}
				state={{ from: location.pathname }}
			>
				Logout
			</Link>
		</>
	);
};

const AdminNav = () => {
	const location = useLocation();
	return (
		<>
			<Link data-testid={dataTestIds.linkId.orders} className='ml-4' to={'/orders'}>
				Orders
			</Link>
			<Link data-testid={dataTestIds.linkId.users} className='ml-4' to={'/users'}>
				Users
			</Link>
			<Link
				data-testid={dataTestIds.clickId.logout}
				className='ml-4'
				to={'/logout'}
				state={{ from: location.pathname }}
			>
				Logout
			</Link>
		</>
	);
};

const Navbar = () => {
	const user = useSelector((state) => state.auth);

	return (
		<div data-testid={dataTestIds.containerId.navbar} className='my-4 flex justify-center border-2'>
			<Link data-testid={dataTestIds.linkId.home} className='ml-4' to={'/'}>
				Home
			</Link>
			<Link data-testid={dataTestIds.linkId.products} className='ml-4' to={'/products'}>
				Products
			</Link>

			{user.role === 'guest' && <UserNav />}
			{user.role === 'customer' && <CustomerNav />}
			{user.role === 'admin' && <AdminNav />}

			<div data-testid={dataTestIds.containerId.profile} className='ml-4'>
				<div data-testid={dataTestIds.valueId.role}>Role: {user.role}</div>
			</div>
		</div>
	);
};

export default Navbar;
