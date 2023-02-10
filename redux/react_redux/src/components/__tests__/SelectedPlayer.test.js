/** @format */

import { render, screen } from '@testing-library/react';
import { SelectedPlayer } from '../SelectedPlayer.jsx';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';

let mockStore;
beforeEach(() => {
  mockStore = configureMockStore();
  // const submitHandler = jest.fn();
});

test('renders active player correctly', () => {
  const activePlayer = {
    id: 1,
    name: 'Active Player',
    isActive: true
  };

  const store = mockStore({
    selectedPlayer: activePlayer
  });

  render(
    <Provider store={store}>
      <SelectedPlayer />
    </Provider>
  );

  expect(
    screen.getByText(activePlayer.name, {
      selector: '#selected-player #player-name'
    })
  ).toBeInTheDocument();

  expect(
    screen.getByText('active', {
      selector: '#selected-player #player-status'
    })
  ).toBeInTheDocument();
});

test('renders inactive player correctly', () => {
  const inactivePlayer = {
    id: 2,
    name: 'Inactive Player',
    isActive: false
  };

  const store = mockStore({
    selectedPlayer: inactivePlayer
  });

  render(
    <Provider store={store}>
      <SelectedPlayer />
    </Provider>
  );

  expect(
    screen.getByText(inactivePlayer.name, {
      selector: '#selected-player #player-name'
    })
  ).toBeInTheDocument();

  expect(
    screen.getByText('inactive', {
      selector: '#selected-player #player-status'
    })
  ).toBeInTheDocument();
});
