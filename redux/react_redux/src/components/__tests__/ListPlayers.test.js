/** @format */

import { render, screen } from '@testing-library/react';
import { ListPlayers } from '../ListPlayers.jsx';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';

let mockStore;
beforeEach(() => {
  mockStore = configureMockStore();
  // const submitHandler = jest.fn();
});

test('renders a list with id "players-list"', () => {
  render(
    <Provider store={mockStore({})}>
      <ListPlayers selectPlayer={() => {}} />
    </Provider>
  );
  const listElem = screen.getByRole('list');
  expect(listElem).toBeInTheDocument();
  expect(listElem).toHaveAttribute('id', 'players-list');
});

test('list contains as many items as there are players in players prop', () => {
  const players = [
    {
      id: 1,
      name: 'Player One',
      isActive: true
    },
    {
      id: 2,
      name: 'Player Two',
      isActive: false
    }
  ];
  const store = mockStore({
    players: players
  });
  render(
    <Provider store={store}>
      <ListPlayers selectPlayer={() => {}} />
    </Provider>
  );

  const listItems = screen.getAllByRole('listitem');
  expect(listItems).toHaveLength(players.length);
});

test('list items have ids of the form "player-{id}"', () => {
  const players = [
    {
      id: 1,
      name: 'Player One',
      isActive: true
    },
    {
      id: 2,
      name: 'Player Two',
      isActive: false
    }
  ];

  const store = mockStore({
    players: players
  });
  render(
    <Provider store={store}>
      <ListPlayers selectPlayer={() => {}} />
    </Provider>
  );

  const listItems = screen.getAllByRole('listitem');

  listItems.forEach((item, i) => {
    expect(item).toHaveAttribute('id', `player-${players[i].id}`);
  });
});

test('list items contain links to players', () => {
  const players = [
    {
      id: 1,
      name: 'Player One',
      isActive: true
    },
    {
      id: 2,
      name: 'Player Two',
      isActive: false
    }
  ];

  const store = mockStore({
    players: players
  });
  render(
    <Provider store={store}>
      <ListPlayers selectPlayer={() => {}} />
    </Provider>
  );

  const listItems = screen.getAllByRole('listitem');
  const linkItems = screen.getAllByRole('link');

  listItems.forEach((item, i) => {
    expect(item).toContainElement(linkItems[i]);
  });
});
