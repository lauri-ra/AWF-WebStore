import { render, screen } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';
import { SelectedPlayer } from '../SelectedPlayer.jsx';

import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  deleteSelectedPlayer,
  updateSelectedPlayer
} from '../../redux/actionCreators/thunks/SelectedPlayer';

/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
let mockStore;
beforeEach(() => {
  const middlewares = [thunk];
  mockStore = configureMockStore(middlewares);
  // const submitHandler = jest.fn();
});

test('renders an element with id "selected-player"', () => {
  const selectedPlayer = {
    id: 1,
    name: 'Player One',
    isActive: true
  };
  const { container } = render(
    <Provider store={mockStore({ selectedPlayer })}>
      <SelectedPlayer />
    </Provider>
  );

  const infoElement = container.querySelector('#selected-player');
  expect(infoElement).toBeDefined();
  expect(infoElement).toBeInTheDocument();
});

test('renders active player correctly', () => {
  const selectedPlayer = {
    id: 1,
    name: 'Active Player',
    isActive: true
  };
  render(
    <Provider store={mockStore({ selectedPlayer })}>
      <SelectedPlayer />
    </Provider>
  );
  expect(
    screen.getByText(`${selectedPlayer.id}`, {
      selector: '#selected-player .player-id'
    })
  ).toBeInTheDocument();
  expect(
    screen.getByText(selectedPlayer.name, {
      selector: '#selected-player #player-name'
    })
  ).toBeInTheDocument();
  expect(
    screen.getByText('active', {
      selector: '#selected-player #player-status #checkbox-label'
    })
  ).toBeInTheDocument();
});

test('renders inactive player correctly', () => {
  const selectedPlayer = {
    id: 2,
    name: 'Inactive Player',
    isActive: false
  };
  render(
    <Provider store={mockStore({ selectedPlayer })}>
      <SelectedPlayer />
    </Provider>
  );
  expect(
    screen.getByText(`${selectedPlayer.id}`, {
      selector: '#selected-player .player-id'
    })
  ).toBeInTheDocument();
  expect(
    screen.getByText(selectedPlayer.name, {
      selector: '#selected-player #player-name'
    })
  ).toBeInTheDocument();
  expect(
    screen.getByText('inactive', {
      selector: '#selected-player #player-status #checkbox-label'
    })
  ).toBeInTheDocument();
});

test('renders "Delete" button with class "btn-delete"', () => {
  const selectedPlayer = {
    id: 1,
    name: 'Active Player',
    isActive: true
  };
  render(
    <Provider store={mockStore({ selectedPlayer })}>
      <SelectedPlayer />
    </Provider>
  );
  const buttons = screen.getAllByRole('button');
  const deleteButton = buttons.filter(button => button.classList.contains('btn-delete'))[0];
  expect(deleteButton).toBeInTheDocument();
});

test('deleteSelectedPlayer is dispatched when "Delete" button is clicked', async () => {
  const selectedPlayer = {
    id: 1,
    name: 'Active Player',
    isActive: true
  };
  const store = mockStore({ selectedPlayer });
  store.dispatch = jest.fn();
  render(
    <Provider store={store}>
      <SelectedPlayer />
    </Provider>
  );
  const buttons = screen.getAllByRole('button');
  const deleteButton = buttons.filter(button => button.classList.contains('btn-delete'))[0];
  expect(deleteButton).toBeInTheDocument();
  await UserEvent.click(deleteButton);

  expect(store.dispatch).toHaveBeenCalledTimes(1);
  expect(store.dispatch.mock.calls[0][0].toString()).toBe(deleteSelectedPlayer().toString());
});

test("renders Update button with class 'btn-update'", () => {
  const selectedPlayer = {
    id: 1,
    name: 'Active Player',
    isActive: true
  };
  render(
    <Provider store={mockStore({ selectedPlayer })}>
      <SelectedPlayer />
    </Provider>
  );
  const buttons = screen.getAllByRole('button');
  const updateButton = buttons.filter(button => button.classList.contains('btn-update'))[0];
  expect(updateButton).toBeInTheDocument();
});

test("updateSelectedPlayer is dispatched when 'Update' button is clicked", async () => {
  const selectedPlayer = {
    id: 1,
    name: 'Active Player',
    isActive: true
  };
  const store = mockStore({ selectedPlayer });
  store.dispatch = jest.fn();
  render(
    <Provider store={store}>
      <SelectedPlayer />
    </Provider>
  );
  // Get the checkbox and click it
  const checkbox = screen.getByRole('checkbox');
  await UserEvent.click(checkbox);
  // Get the update button and click it
  const buttons = screen.getAllByRole('button');
  const updateButton = buttons.filter(button => button.classList.contains('btn-update'))[0];
  expect(updateButton).toBeInTheDocument();
  await UserEvent.click(updateButton);

  expect(store.dispatch).toHaveBeenCalledTimes(1);
  expect(store.dispatch.mock.calls[0][0].toString()).toBe(updateSelectedPlayer().toString());
});
