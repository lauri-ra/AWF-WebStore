import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { dataTestIds } from '../tests/constants/components';

const UserNav = () => {
	return (
		<>
			<Link data-testid={dataTestIds.cart} className='ml-4' to={'/cart'}>
				Cart
			</Link>
			<Link data-testid={dataTestIds.login} className='ml-4' to={'/login'}>
				Login
			</Link>
			<Link data-testid={dataTestIds.register} className='ml-4' to={'/register'}>
				Register
			</Link>
		</>
	);
};

const CustomerNav = () => {
	return (
		<>
			<Link data-testid={dataTestIds.orders} className='ml-4' to={'/orders'}>
				Orders
			</Link>
			<Link data-testid={dataTestIds.cart} className='ml-4' to={'/cart'}>
				Cart
			</Link>
			<Link data-testid={dataTestIds.logout} className='ml-4' to={'/logout'}>
				Logout
			</Link>
		</>
	);
};

const AdminNav = () => {
	return (
		<>
			<Link data-testid={dataTestIds.orders} className='ml-4' to={'/orders'}>
				Orders
			</Link>
			<Link data-testid={dataTestIds.users} className='ml-4' to={'/users'}>
				Users
			</Link>
			<Link data-testid={dataTestIds.logout} className='ml-4' to={'/logout'}>
				Logout
			</Link>
		</>
	);
};

const Navbar = () => {
	const user = useSelector((state) => state.auth);

	return (
		<div data-testid={dataTestIds.navbar} className='my-4 flex justify-start border-2'>
			<Link data-testid={dataTestIds.home} className='ml-4' to={'/'}>
				Home
			</Link>
			<Link data-testid={dataTestIds.products} className='ml-4' to={'/products'}>
				Products
			</Link>

			{user.role === 'guest' && <UserNav />}
			{user.role === 'customer' && <CustomerNav />}
			{user.role === 'admin' && <AdminNav />}

			<div data-testid={dataTestIds.profile} className='ml-4'>
				Role: {user.role}
			</div>
		</div>
	);
};

export default Navbar;
