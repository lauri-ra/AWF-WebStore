import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { dataTestIds } from '../tests/constants/components';

const BottomPanel = ({ user }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleDelete = () => {
		dispatch(removeUser(user.id));
		navigate('/users');
	};

	return (
		<div className='mt-2 mb-1'>
			<Link to={`/users/${user.id}/modify`}>
				<button
					data-testid={dataTestIds.clickId.modify}
					className='mx-2 mt-2 mb-1 rounded-md bg-sky-500 px-2 py-1 font-semibold text-white hover:bg-sky-400'
				>
					Modify
				</button>
			</Link>
			<button
				data-testid={dataTestIds.clickId.delete}
				onClick={handleDelete}
				className='mx-2 rounded-md bg-rose-400 px-2 py-1 font-semibold text-white hover:bg-sky-400'
			>
				Delete
			</button>
		</div>
	);
};

const User = () => {
	const { id } = useParams();
	const user = useSelector((state) => state.users.find((item) => item.id === id));
	const currentUser = useSelector((state) => state.auth);

	return (
		<div data-testid={dataTestIds.containerId.inspect} className='flex flex-col items-center'>
			<div data-testid={dataTestIds.valueId.name} className='text-xl font-semibold'>
				{user.name}
			</div>
			<div data-testid={dataTestIds.valueId.role}>role: {user.role}</div>
			<div data-testid={dataTestIds.valueId.email}>email: {user.email}</div>

			{user.id !== currentUser.id && <BottomPanel user={user} />}
		</div>
	);
};

export default User;
