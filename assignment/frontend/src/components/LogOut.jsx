import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { logOut } from '../redux/actionCreators/authActions';

const LogOut = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		dispatch(logOut());
		if (location.state.from === '/products' || location.state.from === '/') {
			navigate(location.state.from);
		} else {
			// Timeout to wait for the state to change before navigating
			setTimeout(() => {
				navigate('/login');
			}, 100);
		}
	}, [dispatch, navigate, location]);

	return null;
};

export default LogOut;
