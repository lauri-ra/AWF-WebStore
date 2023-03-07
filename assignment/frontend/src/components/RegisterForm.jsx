import { useDispatch } from 'react-redux';
import { dataTestIds } from '../tests/constants/components';
import { register } from '../redux/actionCreators/authActions';
import { useField } from '../hooks';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const name = useField('text');
	const email = useField('text');
	const password = useField('password');
	const passwordConfirm = useField('password');

	const handleRegister = (event) => {
		event.preventDefault();

		const registerCreds = {
			name: name.value,
			email: email.value,
			password: password.value,
			passwordConfirm: passwordConfirm.value,
		};

		console.log(registerCreds);
		dispatch(register(registerCreds));
		navigate('/');
	};

	return (
		<div>
			<div className='flex justify-center pt-5 text-4xl'>Register</div>

			<div className='my-8 flex justify-center'>
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
						{...passwordConfirm}
					/>
					<button
						data-testid={dataTestIds.clickId.submit}
						className='my-2 rounded-md bg-sky-500 py-1 font-semibold text-white hover:bg-sky-400'
						onClick={handleRegister}
					>
						sign up
					</button>
				</form>
			</div>
			<button onClick={handleRegister}>test</button>
		</div>
	);
};

export default RegisterForm;
