import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dataTestIds } from '../tests/constants/components.js';
import { register } from '../redux/actionCreators/authActions.js';
import { useField } from '../hooks/index.js';
import { useNavigate } from 'react-router-dom';

/**
 *
 * @param {object} name
 * @param {object} email
 * @param {object} password
 * @param {object} pwConfirmation
 * @param {function} handleRegister
 * @returns Form component with inputs and button for registration.
 */
const RegisterForm = ({ name, email, password, pwConfirmation, handleRegister }) => {
	return (
		<form className='flex flex-col' data-testid={dataTestIds.containerId.form}>
			<input
				data-testid={dataTestIds.inputId.name}
				placeholder='name'
				className='my-2 block w-60 rounded-lg border bg-neutral-200 p-2 text-left text-gray-600 outline-none drop-shadow-md hover:border-sky-500 focus:border-sky-500'
				{...name}
			/>
			<input
				data-testid={dataTestIds.inputId.email}
				placeholder='email'
				className='my-2 block w-60 rounded-lg border bg-neutral-200 p-2 text-left text-gray-600 outline-none drop-shadow-md hover:border-sky-500 focus:border-sky-500'
				{...email}
			/>
			<input
				data-testid={dataTestIds.inputId.password}
				placeholder='password'
				className='my-2 block w-60 rounded-lg border bg-neutral-200 p-2 text-left text-gray-600 outline-none drop-shadow-md hover:border-sky-500 focus:border-sky-500'
				{...password}
			/>
			<input
				data-testid={dataTestIds.inputId.passwordConfirmation}
				placeholder='confirm password'
				className='my-2 block w-60 rounded-lg border bg-neutral-200 p-2 text-left text-gray-600 outline-none drop-shadow-md hover:border-sky-500 focus:border-sky-500'
				{...pwConfirmation}
			/>
			<button
				data-testid={dataTestIds.clickId.submit}
				className='my-2 rounded-md bg-sky-500 py-1 font-semibold text-white hover:bg-sky-400'
				onClick={handleRegister}
			>
				sign up
			</button>
		</form>
	);
};

/**
 *
 * @returns Register component with form for registering a new user.
 * Contains functions for handling input changes, submitting the form and
 * navigating to the home page with successful registration.
 */
const Register = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const auth = useSelector((state) => state.auth);

	const name = useField('text');
	const email = useField('text');
	const password = useField('password');
	const pwConfirmation = useField('password');

	const handleRegister = (event) => {
		event.preventDefault();

		const registerCreds = {
			name: name.value,
			email: email.value,
			password: password.value,
			passwordConfirmation: pwConfirmation.value,
		};

		dispatch(register(registerCreds));
	};

	useEffect(() => {
		// Check if the user is authenticated and has a valid role
		if (auth.role === 'customer' || auth.role === 'admin') {
			// Navigate to the home page
			navigate('/');
		}
	}, [auth]);

	return (
		<div>
			<div className='flex justify-center pt-5 text-4xl'>Register</div>

			<div className='my-8 flex justify-center'>
				<RegisterForm
					name={name}
					email={email}
					password={password}
					pwConfirmation={pwConfirmation}
					handleRegister={handleRegister}
				/>
			</div>
		</div>
	);
};

export default Register;
