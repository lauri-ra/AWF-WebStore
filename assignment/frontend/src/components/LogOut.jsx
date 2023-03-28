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
		console.log('L state', location.state);
		if (location.state.from === '/products' || location.state.from === '/') {
			console.log('going nowhere');
			navigate(location.state.from);
		} else {
			console.log('back to login');
			navigate('/login');
		}
	}, [dispatch, navigate, location]);

	return null;
};

export default LogOut;
