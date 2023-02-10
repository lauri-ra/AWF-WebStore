import configureMockStore from 'redux-mock-store';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { postPlayer } from '../../redux/actionCreators/thunks/AddPlayer';
import { AddPlayer } from '../AddPlayer';
let store;
/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */

beforeEach(() => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  store = mockStore({});
});

test('Renders a form', () => {
  const { container } = render(
    <Provider store={store}>
      <AddPlayer />
    </Provider>
  );
  expect(container.querySelector('form')).toBeInTheDocument();
});

test('Form includes text input for player name', () => {
  const { container } = render(
    <Provider store={store}>
      <AddPlayer />
    </Provider>
  );
  const input = container.querySelector('input[type="text"][name="name"]');
  expect(input).toBeInTheDocument();
  expect(input.id).toBe('input-player');
});

test('Form includes a submit button', () => {
  render(
    <Provider store={store}>
      <AddPlayer />
    </Provider>
  );
  const button = screen.getByRole('button');
  expect(button).toBeInTheDocument();
  expect(button.getAttribute('type')).toBe('submit');
});

test('postPlayer is dispatched when form is submitted with played info', async () => {
  store.dispatch = jest.fn();
  const { container } = render(
    <Provider store={store}>
      <AddPlayer />
    </Provider>
  );
  const form = container.querySelector('form');
  fireEvent.submit(form);
  await waitFor(() => expect(store.dispatch).toHaveBeenCalledTimes(1));
  expect(store.dispatch.mock.calls[0][0].toString()).toBe(postPlayer().toString());
});
