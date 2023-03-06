import { useDispatch } from 'react-redux';
import { dataTestIds } from '../tests/constants/components';
import { logIn } from '../redux/actionCreators/authActions';
import { useField } from '../hooks';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const email = useField('text');
	const password = useField('password');

	const handleLogin = (event) => {
		event.preventDefault();

		const loginCreds = {
			email: email.value,
			password: password.value,
		};

		dispatch(logIn(loginCreds));
		navigate('/');
	};

	return (
		<div>
			<div className='flex justify-center pt-5 text-4xl'>Log in</div>

			<div className='my-8 flex justify-center'>
				<form className='flex flex-col' data-testid={dataTestIds.containerId.form}>
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
					<button
						data-testid={dataTestIds.clickId.submit}
						className='my-2 rounded-md bg-sky-500 py-1 font-semibold text-white hover:bg-sky-400'
						onClick={handleLogin}
					>
						log in
					</button>
				</form>
			</div>
		</div>
	);
};

export default LoginForm;
