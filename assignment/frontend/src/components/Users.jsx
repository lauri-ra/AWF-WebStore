import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUsers, removeUser } from '../redux/actionCreators/usersActions';
import { dataTestIds } from '../tests/constants/components';

const BottomPanel = ({ user }) => {
	const dispatch = useDispatch();

	const handleDelete = () => {
		dispatch(removeUser(user.id));
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

const Users = () => {
	const dispatch = useDispatch();
	const users = useSelector((state) => state.users);
	const currentUser = useSelector((state) => state.auth);

	useEffect(() => {
		if (users.length <= 1) {
			dispatch(getUsers());
		}
	}, []);

	return (
		<div data-testid={dataTestIds.containerId.main}>
			<div className='flex justify-center text-3xl'>All users</div>
			<div className='mx-5 grid grid-cols-4 place-items-center gap-3 pt-3'>
				{users.map((user) => (
					<div
						key={user.id}
						data-testid={`list-item-${user.id}-container`}
						className='my-3.5 w-64 rounded-md bg-sky-200 px-3.5 py-2 shadow-lg ring-1 ring-white/10 transition duration-100 hover:scale-105 hover:bg-sky-300'
					>
						<div data-testid={dataTestIds.valueId.name} className='mx-2 font-semibold'>
							{user.name}
						</div>
						<div data-testid={dataTestIds.valueId.role} className='mx-2'>
							{user.role}
						</div>
						<Link
							to={`/users/${user.id}`}
							data-testid={dataTestIds.linkId.inspect}
							className='mx-2 underline'
						>
							inspect user
						</Link>

						{user.id !== currentUser.id && <BottomPanel user={user} />}
					</div>
				))}
			</div>
		</div>
	);
};

export default Users;
