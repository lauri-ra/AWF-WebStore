import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dataTestIds } from '../tests/constants/components';
import { getUser, updateUser } from '../redux/actionCreators/usersActions';

const RoleSelect = ({ selectedOption, handleOptionChange }) => {
	return (
		<div data-testid={dataTestIds.selectId.role} className='my-2 flex flex-col border-2 py-3 px-3'>
			<label>
				<input
					type='radio'
					value='customer'
					checked={selectedOption === 'customer'}
					onChange={handleOptionChange}
				/>
				Customer
			</label>

			<label>
				<input
					type='radio'
					value='admin'
					checked={selectedOption === 'admin'}
					onChange={handleOptionChange}
				/>
				Admin
			</label>
		</div>
	);
};

const ModfiyButtons = ({ user }) => {
	return (
		<div className='my-2'>
			<button
				className='mx-2 rounded-md bg-sky-500 px-2 py-1 font-semibold text-white hover:bg-sky-400'
				type='submit'
			>
				Submit
			</button>
			<button
				className='mx-2 rounded-md bg-sky-500 px-2 py-1 font-semibold text-white hover:bg-sky-400'
				onClick={() => navigate(`/users/${user.id}`)}
				type='button'
			>
				Cancel
			</button>
		</div>
	);
};

const UserModify = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [selectedOption, setSelectedOption] = useState(null);

	useEffect(() => {
		dispatch(getUser(id));
	}, []);

	const users = useSelector((state) => state.users);

	useEffect(() => {
		if (users.length === 1) {
			setSelectedOption(users[0].role);
		}
	}, [users]);

	if (users.length !== 1) {
		return null;
	}

	const user = users[0];

	const handleOptionChange = (event) => {
		setSelectedOption(event.target.value);
	};

	const handleUpdate = () => {
		const updatedUser = { id: id, role: selectedOption };
		dispatch(updateUser(updatedUser));
		navigate('/users');
	};

	return (
		<form
			data-testid={dataTestIds.containerId.form}
			onSubmit={handleUpdate}
			className='flex flex-col items-center justify-start'
		>
			<div data-testid={dataTestIds.valueId.name} className='my-2 text-xl font-semibold'>
				{user.name}
			</div>

			<RoleSelect selectedOption={selectedOption} handleOptionChange={handleOptionChange} />
			<ModfiyButtons user={user} />
		</form>
	);
};

export default UserModify;
