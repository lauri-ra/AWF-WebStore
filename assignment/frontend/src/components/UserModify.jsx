import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dataTestIds } from '../tests/constants/components';
import { updateUser, getUser } from '../redux/actionCreators/usersActions';

/**
 *
 * @param {string} selectedOption
 * @param {function} handleOptionChange
 * @returns Select component that allows the user to select a role.
 */
const RoleSelect = ({ selectedOption, handleOptionChange }) => {
	return (
		<select
			data-testid={dataTestIds.selectId.role}
			className='my-2 flex flex-col border-2 py-3 px-3'
			value={selectedOption}
			onChange={handleOptionChange}
		>
			<option value='customer'>customer</option>
			<option value='admin'>admin</option>
		</select>
	);
};

/**
 *
 * @param {obect} user
 * @param {string} selectedOption
 * @returns Button component that allows the user to submit or cancel the changes.
 */
const ModfiyButtons = ({ user, selectedOption }) => {
	const navigate = useNavigate();
	const isDisabled = selectedOption === user.role;
	return (
		<div className='my-2'>
			<button
				data-testid={dataTestIds.clickId.submit}
				className='mx-2 rounded-md bg-sky-500 px-2 py-1 font-semibold text-white hover:bg-sky-400'
				type='submit'
				disabled={isDisabled}
			>
				Submit
			</button>
			<button
				data-testid={dataTestIds.clickId.cancel}
				className='mx-2 rounded-md bg-sky-500 px-2 py-1 font-semibold text-white hover:bg-sky-400'
				onClick={() => navigate(-1)}
				type='button'
			>
				Cancel
			</button>
		</div>
	);
};

/**
 *
 * @returns UserModify component. Gets the user by id and allows the user to modify them.
 * Fetches the user if it is not in the store. Also contains functions handling option
 * changes and updates to user status
 */
const UserModify = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [selectedOption, setSelectedOption] = useState(null);

	const users = useSelector((state) => state.users);

	useEffect(() => {
		if (users.length === 0) {
			dispatch(getUser(id));
		} else {
			const user = users.find((usr) => usr.id === id);
			setSelectedOption(user.role);
		}
	}, [dispatch, id, users]);

	const user = users.find((usr) => usr.id === id);

	if (!user) return null;

	const handleOptionChange = (event) => {
		setSelectedOption(event.target.value);
	};

	const handleUpdate = (event) => {
		event.preventDefault();
		const updatedUser = { id: id, role: selectedOption };
		dispatch(updateUser(updatedUser));
		navigate(-1);
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
			<ModfiyButtons user={user} selectedOption={selectedOption} />
		</form>
	);
};

export default UserModify;
