import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { dataTestIds } from '../tests/constants/components.js';

/**
 *
 * @returns Navbar component for user. Includes links to cart, login and register.
 */
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

/**
 *
 * @returns Navbar component for customer. Includes links to orders, cart and logout
 */
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

/**
 *
 * @returns Navbar component for admin. Includes links to orders, users and logout
 */
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

/**
 *
 * @returns Main navbar component. Includes links to home, products and profile, that are
 * always visible. Also other nav components depending on the user role.
 */
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
