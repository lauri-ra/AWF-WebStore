import { useSelector } from 'react-redux';

const Navbar = () => {
	const user = useSelector((state) => state.auth);

	return <div className='text-4xl'>Navbar</div>;
};

export default Navbar;
