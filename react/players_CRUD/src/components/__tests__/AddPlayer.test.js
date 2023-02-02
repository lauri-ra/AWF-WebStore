/** @format */

import { fireEvent, render, screen } from '@testing-library/react';
import { AddPlayer } from '../AddPlayer.jsx';
/* eslint-disable testing-library/no-container */
/* eslint-disable testing-library/no-node-access */

test('Renders a form', () => {
	const { container } = render(<AddPlayer />);
	expect(container.querySelector('form')).toBeInTheDocument();
});

test('Form includes text input for player name', () => {
	const { container } = render(<AddPlayer handleSubmit={() => {}} />);
	const input = container.querySelector('input[type="text"][name="name"]');
	expect(input).toBeInTheDocument();
	expect(input).toHaveAttribute('id', 'input-player');
});

test('Form includes a submit button', () => {
	render(<AddPlayer handleSubmit={() => {}} />);
	const button = screen.getByRole('button');
	expect(button).toBeInTheDocument();
	expect(button).toHaveAttribute('type', 'submit');
});

test('handleSubmit callback is called when form is submitted', () => {
	const submitHandler = jest.fn();
	const { container } = render(<AddPlayer handleSubmit={submitHandler} />);

	const form = container.querySelector('form');
	fireEvent.submit(form);

	expect(submitHandler).toHaveBeenCalledTimes(1);
});
