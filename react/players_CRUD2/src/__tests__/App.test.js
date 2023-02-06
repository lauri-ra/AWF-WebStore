/** @format */

import {
	fireEvent,
	render,
	screen,
	waitFor,
	waitForElementToBeRemoved,
} from '@testing-library/react';
import UserEvent from '@testing-library/user-event';
import App from '../App.jsx';
import { players } from '../mocks/players';
import { rest, server } from '../mocks/server';
/* eslint-disable testing-library/no-container */
/* eslint-disable testing-library/no-node-access */

const fillLoginFormWith = async (username, password, container) => {
	const usernameInput = container.querySelector('input[type="text"][name~="username"]');
	await UserEvent.type(usernameInput, username, { delay: 10 });
	const passwordInput = container.querySelector('input[type="password"][name~="password"]');
	await UserEvent.type(passwordInput, password, { delay: 10 });
};

test('should fetch all players from backend after successful login', async () => {
	const { container } = render(<App />);
	await fillLoginFormWith('username', 'password', container);
	const authForm = container.querySelector('#auth-form');
	fireEvent.submit(authForm);

	await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));
	await waitFor(() => container.querySelector('input[name="name"]'));
	const listItems = await screen.findAllByRole('listitem');

	expect(listItems).toHaveLength(players.length);
	listItems.forEach((item, i) => {
		expect(item).toHaveAttribute('id', `player-${players[i].id}`);
	});
});

test('should show logout link after login', async () => {
	const { container } = render(<App />);
	await fillLoginFormWith('username', 'password', container);
	const authForm = container.querySelector('#auth-form');
	fireEvent.submit(authForm);

	await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));
	const logoutButton = await screen.findByText(/logout/i);
	expect(logoutButton).toBeInTheDocument();
});

test('should show error status after failed login (incorrect credentials)', async () => {
	server.use(
		rest.get('**/api/players', (req, res, ctx) =>
			res(ctx.networkError('Network error'))
		)
	);

	const { container } = render(<App />);
	await fillLoginFormWith('username', 'password', container);

	const authForm = container.querySelector('#auth-form');
	fireEvent.submit(authForm);

	expect(
		await screen.findByText('An error has occurred!!!')
	).toBeInTheDocument();
});

test('should remove players from DOM after logout', async () => {
	const { container } = render(<App />);
	await fillLoginFormWith('username', 'password', container);

	const authForm = container.querySelector('#auth-form');
	fireEvent.submit(authForm);

	await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));
	const logoutButton = await screen.findByText(/logout/i);
	expect(logoutButton).toBeInTheDocument();

	await UserEvent.click(logoutButton);
	expect(screen.queryAllByRole('listitem')).toHaveLength(0);
});

test('should show logout link after successful registration', async () => {
	const { container } = render(<App />);
	const registrationLink = screen.getByRole('link', { text: /register/i });
	await UserEvent.click(registrationLink);

	await fillLoginFormWith('username', 'password', container);

	const authForm = container.querySelector('#auth-form');
	fireEvent.submit(authForm);

	await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));
	const logoutButton = await screen.findByText(/logout/i);
	expect(logoutButton).toBeInTheDocument();
});

test('should fetch all players from backend after successful registration', async () => {
	const { container } = render(<App />);
	const registrationLink = screen.getByRole('link', { text: /register/i });
	await UserEvent.click(registrationLink);

	await fillLoginFormWith('username', 'password', container);

	const authForm = container.querySelector('#auth-form');
	fireEvent.submit(authForm);

	await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));
	await waitFor(() => container.querySelector('input[name="name"]'));
	const listItems = await screen.findAllByRole('listitem');

	expect(listItems).toHaveLength(players.length);
	listItems.forEach((item, i) => {
		expect(item).toHaveAttribute('id', `player-${players[i].id}`);
	});
});

test('should show error status after failed registration (invalid credentials)', async () => {
	server.use(
		rest.post('**/api/users', (req, res, ctx) =>
			res(
				ctx.status(400),
				ctx.json({ error: { username: 'username already taken' } })
			)
		)
	);

	const { container } = render(<App />);
	const registrationLink = screen.getByRole('link', { text: /register/i });
	await UserEvent.click(registrationLink);

	await fillLoginFormWith('username', 'password', container);

	const authForm = container.querySelector('#auth-form');
	fireEvent.submit(authForm);

	expect(
		await screen.findByText('An error has occurred!!!')
	).toBeInTheDocument();
});

test('should show error status when loading players fails', async () => {
	server.use(
		rest.get('**/api/players', (req, res, ctx) =>
			res(ctx.networkError('Network error'))
		)
	);

	const { container } = render(<App />);
	await fillLoginFormWith('username', 'password', container);

	const authForm = container.querySelector('#auth-form');
	fireEvent.submit(authForm);

	expect(
		await screen.findByText('An error has occurred!!!')
	).toBeInTheDocument();
});

test('should fetch single player data from backend when link is clicked', async () => {
	const { container } = render(<App />);
	await fillLoginFormWith('username', 'password', container);

	const authForm = container.querySelector('#auth-form');
	fireEvent.submit(authForm);

	await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));
	await waitFor(() => container.querySelector('input[name="name"]'));
	const listItems = await screen.findAllByRole('listitem');
	const linkElement = listItems[0].querySelector('a');
	await UserEvent.click(linkElement);

	await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));
	expect(
		screen.getByText(`${players[0].id}`, { selector: '.player-id' })
	).toBeInTheDocument();
	expect(
		screen.getByText(players[0].name, { selector: '#player-name' })
	).toBeInTheDocument();
});

test('should show error status when clicking link and loading player data fails', async () => {
	server.use(
		rest.get('**/api/players/:playerId', (req, res, ctx) =>
			res(ctx.networkError('Network error'))
		)
	);

	const { container } = render(<App />);
	await fillLoginFormWith('username', 'password', container);

	const authForm = container.querySelector('#auth-form');
	fireEvent.submit(authForm);

	await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));
	const listItems = await screen.findAllByRole('listitem');
	const linkElement = listItems[0].querySelector('a');
	await UserEvent.click(linkElement);

	expect(
		await screen.findByText('An error has occurred!!!')
	).toBeInTheDocument();
});

test('should send POST request to backend and add new player to "#players-list"', async () => {
	const { container } = render(<App />);

	await fillLoginFormWith('username', 'password', container);
	const authForm = container.querySelector('#auth-form');
	fireEvent.submit(authForm);

	await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));
	const name = container.querySelector('input[name="name"]');
	await UserEvent.type(name, 'New Player', { delay: 10 });

	const addForm = container.querySelector('form');
	fireEvent.submit(addForm);

	await screen.findByText(/New Player/i, { selector: 'a' });
	expect(screen.getAllByRole('listitem')).toHaveLength(players.length + 1);
	expect(container.querySelector('#request-status').textContent).toMatch(
		/finished/i
	);
});

test('should show error status and not add new player if POST request fails', async () => {
	server.use(
		rest.post('**/api/players', (req, res, ctx) =>
			res(ctx.networkError('Network error'))
		)
	);

	const { container } = render(<App />);
	await fillLoginFormWith('username', 'password', container);

	const authForm = container.querySelector('#auth-form');
	fireEvent.submit(authForm);

	await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));
	// await waitFor(() => container.querySelector('input[name="name"]'));
	const name = container.querySelector('input[name="name"]');
	await UserEvent.type(name, 'New Player', { delay: 10 });

	const addForm = container.querySelector('form');
	fireEvent.submit(addForm);

	expect(
		await screen.findByText('An error has occurred!!!')
	).toBeInTheDocument();
	expect(screen.getAllByRole('listitem')).toHaveLength(players.length);
});

test('should send DELETE request to backend and delete player when "Delete" button is clicked', async () => {
	const { container } = render(<App />);
	await fillLoginFormWith('username', 'password', container);

	const authForm = container.querySelector('#auth-form');
	fireEvent.submit(authForm);

	await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));
	// await waitFor(() => container.querySelector('input[name="name"]'));
	const listItems = await screen.findAllByRole('listitem');
	const linkElement = listItems[0].querySelector('a');
	await UserEvent.click(linkElement);

	const button = await screen.findByText(/delete/i);
	await UserEvent.click(button);

	await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));
	expect(screen.getAllByRole('listitem')).toHaveLength(players.length - 1);
});

test('should show error status and not delete player if DELETE request fails', async () => {
	server.use(
		rest.delete('**/api/players/:playerId', (req, res, ctx) =>
			res(ctx.networkError('Network error'))
		)
	);
	const { container } = render(<App />);
	await fillLoginFormWith('username', 'password', container);

	const authForm = container.querySelector('#auth-form');
	fireEvent.submit(authForm);

	await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));
	const listItems = await screen.findAllByRole('listitem');
	const linkElement = listItems[0].querySelector('a');
	await UserEvent.click(linkElement);

	const button = await screen.findByText(/delete/i);
	await UserEvent.click(button);

	await screen.findByText('An error has occurred!!!');
	expect(screen.getAllByRole('listitem')).toHaveLength(players.length);
});

test('should send PUT request to backend and update player when "Update" button is clicked', async () => {
	const { container } = render(<App />);
	await fillLoginFormWith('username', 'password', container);

	const authForm = container.querySelector('#auth-form');
	fireEvent.submit(authForm);

	await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));
	const listItems = await screen.findAllByRole('listitem');
	const linkElement = listItems[0].querySelector('a');
	await UserEvent.click(linkElement);

	await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));

	// Check that the checkbox is unchecked
	// get all checkboxes and get the one with the id of "checkbox"
	let checkbox = screen.getAllByRole('checkbox').find((checkbox) => {
		return checkbox.id === 'checkbox';
	});
	expect(checkbox).not.toBeChecked();

	// Click the checkbox to update the player
	await UserEvent.click(checkbox);

	const updateButton = screen
		.getAllByRole('button')
		.find((button) => button.classList.contains('btn-update'));
	await UserEvent.click(updateButton);

	await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));
	server.use(
		rest.get('**/api/players/:playerId', (req, res, ctx) => {
			if (!req.headers.has('Authorization')) {
				return res(ctx.status(401));
			}

			if (
				!req.headers.has('Accept') ||
				!req.headers.get('Accept').includes('json')
			) {
				return res(ctx.status(406));
			}
			return res(
				ctx.json({
					id: 1,
					name: 'Gus MacGyver',
					isActive: true,
				})
			);
		})
	);
	await UserEvent.click(linkElement);
	await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));

	// Check that the checkbox is checked
	checkbox = screen.getAllByRole('checkbox').find((checkbox) => {
		return checkbox.id === 'checkbox';
	});

	expect(checkbox).toBeChecked();
	expect(screen.getAllByRole('listitem')).toHaveLength(players.length);
});

test('should show error status and not update player if PUT request fails', async () => {
	server.use(
		rest.put('**/api/players/:playerId', (req, res, ctx) =>
			res(ctx.networkError('Network error'))
		)
	);

	const { container } = render(<App />);
	await fillLoginFormWith('username', 'password', container);

	const authForm = container.querySelector('#auth-form');
	fireEvent.submit(authForm);

	// await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
	await waitFor(() => container.querySelector('input[name="name"]'));
	const listItems = await screen.findAllByRole('listitem');
	const linkElement = listItems[0].querySelector('a');
	await UserEvent.click(linkElement);

	await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));

	// Check that the checkbox is unchecked
	// get all checkboxes and get the one with the id of "checkbox"
	const checkbox = screen.getAllByRole('checkbox').find((checkbox) => {
		return checkbox.id === 'checkbox';
	});
	expect(checkbox).not.toBeChecked();

	// Click the checkbox to update the player
	await UserEvent.click(checkbox);

	const updateButton = screen
		.getAllByRole('button')
		.find((button) => button.classList.contains('btn-update'));
	await UserEvent.click(updateButton);

	await screen.findByText('An error has occurred!!!');
	expect(screen.getAllByRole('listitem')).toHaveLength(players.length);
});
