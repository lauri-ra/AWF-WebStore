/** @format */

import { fireEvent, render, screen } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';
import { AuthUser } from '../AuthUser';
/* eslint-disable testing-library/no-container */
/* eslint-disable testing-library/no-node-access */

test('renders a form with id "auth-form"', () => {
	const { container } = render(<AuthUser handleSubmit={() => {}} />);
	expect(container.querySelector('form#auth-form')).toBeInTheDocument();
});

test('form has a text input for username', () => {
	const { container } = render(<AuthUser handleSubmit={() => {}} />);
	const input = container.querySelector('input[type="text"][name="username"]');
	expect(input).toBeInTheDocument();
	expect(input).toHaveAttribute('id', 'username');
});

test('form has a password input', () => {
	const { container } = render(<AuthUser handleSubmit={() => {}} />);
	const input = container.querySelector(
		'input[type="password"][name="password"]'
	);
	expect(input).toBeInTheDocument();
	expect(input).toHaveAttribute('id', 'password');
});

test('initially submit button shows "Login" and link has text "Register"', () => {
	render(<AuthUser handleSubmit={() => {}} />);

	expect(screen.getByRole('link', { name: /register/i })).toBeInTheDocument();
	expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
});

test('clicking link toggles heading and submit button to "Register" and link to "Login"', async () => {
	render(<AuthUser handleSubmit={() => {}} />);

	UserEvent.click(screen.getByRole('link', { name: /register/i }));
	expect(
		await screen.findByRole('link', { name: /login/i })
	).toBeInTheDocument();
	expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
});

test('handleSubmit callback is called when form is submitted during "Login"', async () => {
	const submitHandler = jest.fn();
	const { container } = render(<AuthUser handleSubmit={submitHandler} />);

	await screen.findByRole('link', { name: /register/i });

	const username = container.querySelector(
		'input[type="text"][name="username"]'
	);
	const password = container.querySelector(
		'input[type="password"][name="password"]'
	);

	const form = container.querySelector('form#auth-form');

	// User fireEvent to simulate typing in the inputs
	fireEvent.change(username, { target: { value: 'username' } });
	fireEvent.change(password, { target: { value: 'password' } });

	fireEvent.submit(form);

	expect(submitHandler).toHaveBeenCalledTimes(1);
});

test('handleSubmit callback is called when form is submitted during "Registration"', async () => {
	const submitHandler = jest.fn();
	const { container } = render(<AuthUser handleSubmit={submitHandler} />);

	UserEvent.click(screen.getByRole('link', { name: /register/i }));
	await screen.findByRole('link', { name: /login/i });

	const username = container.querySelector(
		'input[type="text"][name="username"]'
	);
	const password = container.querySelector(
		'input[type="password"][name="password"]'
	);
	const form = container.querySelector('form#auth-form');

	fireEvent.change(username, { target: { value: 'username' } });
	fireEvent.change(password, { target: { value: 'password' } });
	fireEvent.submit(form);

	expect(submitHandler).toHaveBeenCalledTimes(1);
});

test("The form is not rendered when 'isLoggedIn' is true", () => {
	const { container } = render(<AuthUser isLoggedIn />);
	expect(container.querySelector('form#auth-form')).not.toBeInTheDocument();
});

test("renders a 'logout link when 'isLoggedIn' is true", () => {
	render(<AuthUser isLoggedIn />);
	expect(screen.getByRole('link', { name: /logout/i })).toBeInTheDocument();
});

test("Clicking 'Log Out' link calls 'handleLogout' callback", () => {
	const logoutHandler = jest.fn();
	render(<AuthUser isLoggedIn handleLogout={logoutHandler} />);

	fireEvent.click(screen.getByRole('link', { name: /logout/i }));
	expect(logoutHandler).toHaveBeenCalledTimes(1);
});
